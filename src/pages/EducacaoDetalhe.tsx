import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EducacaoDetalhe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { conteudo } = location.state || {};

  if (!conteudo) {
    navigate('/educacao');
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/educacao')}>
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{conteudo.titulo}</h1>
            <p className="text-muted-foreground">{conteudo.descricao}</p>
          </div>
        </div>

        {/* Video Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-destructive p-2 rounded-full">
                <span className="text-white text-sm">▶</span>
              </div>
              <h2 className="font-semibold">Vídeo Educativo</h2>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src={conteudo.videoUrl}
                title={conteudo.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>

        {/* Quiz CTA */}
        <Card className="bg-gradient-primary text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Teste seus conhecimentos!</h2>
            <p className="mb-6 opacity-90">Faça o quiz sobre este conteúdo e ganhe pontos</p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/quiz', { state: { tipo: conteudo.tipo } })}
            >
              📝 Fazer o Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducacaoDetalhe;
