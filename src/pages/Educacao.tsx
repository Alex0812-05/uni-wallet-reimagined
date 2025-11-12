import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play } from 'lucide-react';

const conteudos = [
  {
    id: 1,
    titulo: 'Primeiro Salário',
    descricao: 'Como gastar bem e investir no futuro',
    videoUrl: 'https://www.youtube.com/embed/4m4f2eqHYGQ',
    tipo: 'primeiro_salario'
  },
  {
    id: 2,
    titulo: 'Educação Financeira Básica',
    descricao: 'Fundamentos para organizar suas finanças',
    videoUrl: 'https://www.youtube.com/embed/0dNgTApiqpk',
    tipo: 'educacao_basica'
  },
  {
    id: 3,
    titulo: 'Investimentos para Iniciantes',
    descricao: 'Comece a investir o quanto antes',
    videoUrl: 'https://www.youtube.com/embed/NbD9f4ntR8s',
    tipo: 'investimentos'
  }
];

const Educacao = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Educação Financeira</h1>
            <p className="text-muted-foreground">Aprenda sobre finanças e ganhe pontos</p>
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid gap-6">
          {conteudos.map((conteudo) => (
            <Card key={conteudo.id} className="overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-destructive p-3 rounded-full">
                    <Play className="h-6 w-6 text-white fill-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{conteudo.titulo}</h3>
                    <p className="text-muted-foreground">{conteudo.descricao}</p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => navigate(`/educacao/${conteudo.id}`, { state: { conteudo } })}
                >
                  Assistir Vídeo
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Educacao;
