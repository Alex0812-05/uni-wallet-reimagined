import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, TrendingUp, Award, Plus, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Metas = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [goals, setGoals] = useState<any[]>([]);
  const [newGoal, setNewGoal] = useState({ nome: '', valor_alvo: '', prazo: '' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, [user]);

  const fetchGoals = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setGoals(data);
    }
  };

  const createGoal = async () => {
    if (!user || !newGoal.nome || !newGoal.valor_alvo) return;

    const { error } = await supabase.from('goals').insert({
      user_id: user.id,
      nome: newGoal.nome,
      valor_alvo: parseFloat(newGoal.valor_alvo),
      prazo: newGoal.prazo || null
    });

    if (error) {
      toast.error('Erro ao criar meta');
    } else {
      toast.success('Meta criada!');
      setOpen(false);
      setNewGoal({ nome: '', valor_alvo: '', prazo: '' });
      fetchGoals();
    }
  };

  const updateGoalValue = async (goalId: string, newValue: number) => {
    const { error } = await supabase
      .from('goals')
      .update({ valor_atual: newValue })
      .eq('id', goalId);

    if (!error) {
      fetchGoals();
    }
  };

  const addMoney = async (goal: any) => {
    const amount = prompt('Quanto deseja adicionar? (R$)');
    if (amount) {
      const newValue = goal.valor_atual + parseFloat(amount);
      await updateGoalValue(goal.id, newValue);
      toast.success('Dinheiro adicionado!');
    }
  };

  const withdrawMoney = async (goal: any) => {
    const amount = prompt('Quanto deseja retirar? (R$)');
    if (amount) {
      const newValue = Math.max(0, goal.valor_atual - parseFloat(amount));
      await updateGoalValue(goal.id, newValue);
      toast.success('Dinheiro retirado!');
    }
  };

  const totalSaved = goals.reduce((sum, g) => sum + (g.valor_atual || 0), 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.valor_alvo, 0);
  const achievedGoals = goals.filter(g => g.valor_atual >= g.valor_alvo).length;

  const calculateDaysLeft = (prazo: string) => {
    if (!prazo) return null;
    const today = new Date();
    const targetDate = new Date(prazo);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Metas Financeiras</h1>
            <p className="text-muted-foreground">Defina e acompanhe seus objetivos financeiros</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Metas</p>
                  <p className="text-2xl font-bold text-primary">{goals.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-success/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Poupado</p>
                  <p className="text-2xl font-bold text-success">R$ {totalSaved.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="bg-premium/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-premium" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Metas Atingidas</p>
                  <p className="text-2xl font-bold text-premium">{achievedGoals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-success hover:bg-success/90">
                <Plus className="mr-2 h-4 w-4" />
                Criar Meta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Meta Financeira</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome da Meta</Label>
                  <Input
                    value={newGoal.nome}
                    onChange={(e) => setNewGoal({ ...newGoal, nome: e.target.value })}
                    placeholder="Ex: Viagem de férias"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Valor Alvo (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newGoal.valor_alvo}
                    onChange={(e) => setNewGoal({ ...newGoal, valor_alvo: e.target.value })}
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Prazo (opcional)</Label>
                  <Input
                    type="date"
                    value={newGoal.prazo}
                    onChange={(e) => setNewGoal({ ...newGoal, prazo: e.target.value })}
                  />
                </div>
                <Button onClick={createGoal} className="w-full">Criar Meta</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = (goal.valor_atual / goal.valor_alvo) * 100;
            const daysLeft = goal.prazo ? calculateDaysLeft(goal.prazo) : null;

            return (
              <Card key={goal.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{goal.nome}</h3>
                        {goal.prazo && (
                          <p className="text-sm text-muted-foreground">
                            📅 Prazo: {new Date(goal.prazo).toLocaleDateString('pt-BR')}
                            {daysLeft !== null && (
                              <span className={daysLeft < 0 ? 'text-destructive ml-2' : 'text-warning ml-2'}>
                                {daysLeft < 0 ? `${Math.abs(daysLeft)} dias em atraso` : `${daysLeft} dias restantes`}
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">R$ {goal.valor_atual.toFixed(2).replace('.', ',')}</p>
                        <p className="text-sm text-muted-foreground">de R$ {goal.valor_alvo.toFixed(2).replace('.', ',')}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso</span>
                        <span className="font-semibold">{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-3">
                        <div
                          className="bg-primary rounded-full h-3 transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                      {progress >= 100 && (
                        <div className="mt-2 flex items-center gap-2 text-success">
                          <Award className="h-5 w-5" />
                          <span className="font-semibold">✨ Continuar a gerar</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => addMoney(goal)} className="flex-1 bg-success hover:bg-success/90">
                        ⊕ Aplicar Dinheiro
                      </Button>
                      <Button onClick={() => withdrawMoney(goal)} variant="destructive" className="flex-1">
                        ⊖ Extrair Dinheiro
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {goals.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhuma meta cadastrada</h3>
                <p className="text-muted-foreground mb-4">Comece criando sua primeira meta financeira!</p>
                <Button onClick={() => setOpen(true)}>Criar Primeira Meta</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Metas;
