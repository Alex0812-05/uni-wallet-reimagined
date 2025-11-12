import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Trophy, Lock, BarChart3, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { PremiumDialog } from '@/components/PremiumDialog';

const Perfil = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cidade: '',
    estado: '',
    pais: ''
  });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setProfile(data);
        setFormData({
          nome: data.nome || '',
          telefone: data.telefone || '',
          cidade: data.cidade || '',
          estado: data.estado || '',
          pais: data.pais || ''
        });
      }
    }
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', user?.id);

    if (error) {
      toast.error('Erro ao atualizar perfil');
    } else {
      toast.success('Perfil atualizado com sucesso!');
      setEditing(false);
      fetchProfile();
    }
  };

  const nextLevel = 200;
  const progressToNext = profile ? (profile.pontos / nextLevel) * 100 : 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Meu perfil</h1>
            <p className="text-muted-foreground">Gerencie suas informações</p>
          </div>
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full bg-warning flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {profile?.nivel || 'Iniciante'}
                  </span>
                  <span className="text-sm">⭐ {profile?.pontos || 0} pontos</span>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-4">
                  {/* Progress Cards */}
                  <div className="bg-gradient-card p-4 rounded-xl text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm opacity-90">Próximo nível</span>
                      <Trophy className="h-5 w-5" />
                    </div>
                    <p className="text-2xl font-bold">{nextLevel} pts</p>
                    <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                      <div className="bg-white rounded-full h-2" style={{ width: `${progressToNext}%` }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-premium p-4 rounded-xl text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm opacity-90">Conquistas</span>
                      <Lock className="h-5 w-5" />
                    </div>
                    <p className="text-2xl font-bold">Em breve</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <Input
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label>Cidade</Label>
                <Input
                  value={formData.cidade}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Input
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  disabled={!editing}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>País</Label>
                <Input
                  value={formData.pais}
                  onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                  disabled={!editing}
                />
              </div>
            </div>
            {editing ? (
              <div className="flex gap-2">
                <Button onClick={handleUpdate} className="flex-1">Salvar</Button>
                <Button onClick={() => setEditing(false)} variant="outline" className="flex-1">Cancelar</Button>
              </div>
            ) : (
              <Button onClick={() => setEditing(true)} className="w-full">✏️ Editar Perfil</Button>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/relatorios')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Relatórios e Gráficos</h3>
                  <p className="text-sm text-muted-foreground">Visualize suas estatísticas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-premium cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setPremiumOpen(true)}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Lock className="h-6 w-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold">Plano Premium</h3>
                  <p className="text-sm opacity-90">Recursos exclusivos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logout */}
        <Button
          variant="destructive"
          className="w-full"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair da Conta
        </Button>
      </div>

      <PremiumDialog open={premiumOpen} onOpenChange={setPremiumOpen} />
    </div>
  );
};

export default Perfil;
