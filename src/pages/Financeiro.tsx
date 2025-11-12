import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, RotateCcw, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

const Financeiro = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('despesas_fixas');
  const [transactions, setTransactions] = useState<any>({
    despesas_fixas: {},
    despesas_variaveis: {},
    investimentos: {}
  });

  const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
  const diasLabels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const getWeekStart = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    return monday.toISOString().split('T')[0];
  };

  const fetchTransactions = async () => {
    if (!user) return;

    const weekStart = getWeekStart();
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .eq('semana_inicio', weekStart);

    if (data) {
      const organized: any = {
        despesas_fixas: {},
        despesas_variaveis: {},
        investimentos: {}
      };

      data.forEach((t: any) => {
        organized[t.tipo][t.dia_semana] = t.valor;
      });

      setTransactions(organized);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const weekStart = getWeekStart();
    
    // Delete existing transactions for this week
    await supabase
      .from('transactions')
      .delete()
      .eq('user_id', user.id)
      .eq('semana_inicio', weekStart);

    // Insert new transactions
    const inserts: any[] = [];
    Object.entries(transactions[activeTab]).forEach(([dia, valor]) => {
      if (valor && parseFloat(String(valor)) > 0) {
        inserts.push({
          user_id: user.id,
          tipo: activeTab,
          dia_semana: dia,
          valor: parseFloat(String(valor)),
          semana_inicio: weekStart
        });
      }
    });

    if (inserts.length > 0) {
      const { error } = await supabase.from('transactions').insert(inserts);
      if (error) {
        toast.error('Erro ao salvar');
      } else {
        toast.success('Semana salva com sucesso!');
      }
    }
  };

  const handleReset = () => {
    setTransactions({
      ...transactions,
      [activeTab]: {}
    });
    toast.success('Valores reiniciados');
  };

  const updateValue = (dia: string, valor: string) => {
    setTransactions({
      ...transactions,
      [activeTab]: {
        ...transactions[activeTab],
        [dia]: valor
      }
    });
  };

  const calculateTotal = (): number => {
    const values = Object.values(transactions[activeTab] || {});
    return values.reduce((sum: number, val: any) => sum + (parseFloat(String(val)) || 0), 0) as number;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                  <ArrowLeft />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">Financeiro Semanal</h1>
                  <p className="text-muted-foreground">Gerencie seus gastos da semana</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Geral</p>
                <p className="text-2xl font-bold text-success">
                  R$ {calculateTotal().toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex items-center gap-4 mb-6">
                <TabsList className="flex-1">
                  <TabsTrigger value="despesas_fixas" className="flex-1">Despesas Fixas</TabsTrigger>
                  <TabsTrigger value="despesas_variaveis" className="flex-1">Despesas Variáveis</TabsTrigger>
                  <TabsTrigger value="investimentos" className="flex-1">Investimentos</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">+ Criar Aba</Button>
              </div>

              <TabsContent value={activeTab} className="space-y-6">
                {/* Days Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {dias.map((dia, index) => (
                    <div key={dia} className="space-y-2">
                      <label className="text-sm font-medium">{diasLabels[index]}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="pl-10"
                          value={transactions[activeTab][dia] || ''}
                          onChange={(e) => updateValue(dia, e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <Card className="bg-muted">
                  <CardContent className="p-4 flex justify-between items-center">
                    <span className="font-semibold">Total de Despesas Fixas</span>
                    <span className="text-2xl font-bold text-destructive">
                      R$ {calculateTotal().toFixed(2).replace('.', ',')}
                    </span>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Button onClick={handleSave} className="bg-success hover:bg-success/90">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Semana
                  </Button>
                  <Button onClick={handleReset} variant="destructive">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reiniciar Semana
                  </Button>
                  <Button onClick={() => navigate('/relatorios')} variant="default">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Ver Relatórios
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Financeiro;
