import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Relatorios = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    // Fetch transactions for charts
    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('semana_inicio', { ascending: true });

    if (transactions && transactions.length > 0) {
      // Process weekly data
      const weekData = processWeeklyData(transactions);
      setWeeklyData(weekData);

      // Process monthly data (mock for now)
      const monthData = processMonthlyData(transactions);
      setMonthlyData(monthData);
    } else {
      // Mock data for demonstration
      setWeeklyData([
        { dia: 'Seg', valor: 120 },
        { dia: 'Ter', valor: 80 },
        { dia: 'Qua', valor: 150 },
        { dia: 'Qui', valor: 90 },
        { dia: 'Sex', valor: 200 },
        { dia: 'Sáb', valor: 180 },
        { dia: 'Dom', valor: 100 }
      ]);

      setMonthlyData([
        { semana: 'Sem 1', gastos: 450, ganhos: 1000 },
        { semana: 'Sem 2', gastos: 520, ganhos: 1000 },
        { semana: 'Sem 3', gastos: 480, ganhos: 1000 },
        { semana: 'Sem 4', gastos: 510, ganhos: 1000 }
      ]);
    }
  };

  const processWeeklyData = (transactions: any[]) => {
    const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
    const diasLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    
    const totals: any = {};
    dias.forEach(dia => totals[dia] = 0);

    transactions.forEach((t: any) => {
      if (totals[t.dia_semana] !== undefined) {
        totals[t.dia_semana] += parseFloat(t.valor);
      }
    });

    return dias.map((dia, index) => ({
      dia: diasLabels[index],
      valor: totals[dia]
    }));
  };

  const processMonthlyData = (transactions: any[]) => {
    // Group by week and calculate totals
    const weekGroups: any = {};
    
    transactions.forEach((t: any) => {
      const week = t.semana_inicio;
      if (!weekGroups[week]) {
        weekGroups[week] = { gastos: 0, ganhos: 0 };
      }
      weekGroups[week].gastos += parseFloat(t.valor);
    });

    return Object.entries(weekGroups).map(([week, data]: [string, any], index) => ({
      semana: `Sem ${index + 1}`,
      gastos: data.gastos,
      ganhos: 1000 // Mock value
    }));
  };

  const hasData = weeklyData.length > 0 && monthlyData.length > 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Gráficos e Relatórios</h1>
            <p className="text-muted-foreground">Visualize suas análises financeiras</p>
          </div>
        </div>

        {!hasData && (
          <Card className="bg-info/10 border-info">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground">
                ℹ️ Esses dados são apenas exemplos ilustrativos. 
                Comece a registrar suas transações para ver seus dados reais.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Weekly Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Gastos por Dia da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip formatter={(value: any) => `R$ ${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="valor" fill="hsl(var(--primary))" name="Gastos (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Comparação Semanal do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis />
                <Tooltip formatter={(value: any) => `R$ ${value.toFixed(2)}`} />
                <Legend />
                <Line type="monotone" dataKey="gastos" stroke="hsl(var(--destructive))" name="Gastos" strokeWidth={2} />
                <Line type="monotone" dataKey="ganhos" stroke="hsl(var(--success))" name="Ganhos" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Gasto (Semana)</h3>
              <p className="text-2xl font-bold text-destructive">
                R$ {weeklyData.reduce((sum, d) => sum + d.valor, 0).toFixed(2).replace('.', ',')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Média Diária</h3>
              <p className="text-2xl font-bold text-warning">
                R$ {(weeklyData.reduce((sum, d) => sum + d.valor, 0) / 7).toFixed(2).replace('.', ',')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Maior Gasto</h3>
              <p className="text-2xl font-bold text-primary">
                R$ {Math.max(...weeklyData.map(d => d.valor)).toFixed(2).replace('.', ',')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;
