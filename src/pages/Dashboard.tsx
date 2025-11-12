import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Trophy, BookOpen, BarChart3, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
    };
    fetchProfile();
  }, [user]);

  const menuItems = [
    {
      title: 'Financeiro',
      description: 'Gerencie seus gastos semanais',
      icon: DollarSign,
      color: 'bg-success',
      route: '/financeiro'
    },
    {
      title: 'Metas',
      description: 'Defina e acompanhe seus objetivos',
      icon: Trophy,
      color: 'bg-warning',
      route: '/metas'
    },
    {
      title: 'Educação Financeira',
      description: 'Aprenda sobre finanças',
      icon: BookOpen,
      color: 'bg-primary',
      route: '/educacao'
    },
    {
      title: 'Gráficos e Relatórios',
      description: 'Visualize suas análises',
      icon: BarChart3,
      color: 'bg-premium',
      route: '/relatorios'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Olá, estudante! 👋</h1>
                <p className="text-muted-foreground">O que você quer fazer hoje?</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Seus pontos</p>
                  <p className="text-2xl font-bold text-warning">{profile?.pontos || 0}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-info text-info-foreground hover:bg-info/90"
                  onClick={() => navigate('/perfil')}
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Card key={item.title} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(item.route)}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`${item.color} p-4 rounded-2xl text-white`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    <Button variant="link" className="px-0 mt-2">
                      Acessar →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Banner */}
        <Card className="bg-gradient-primary text-white overflow-hidden">
          <CardContent className="p-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Continue!</h2>
                <p className="opacity-90">Complete mais conteúdos e ganhe pontos</p>
              </div>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/educacao')}
              >
                Ver conteúdo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
