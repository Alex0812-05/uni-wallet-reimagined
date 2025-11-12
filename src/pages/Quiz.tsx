import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const quizData = [
  {
    pergunta: 'O que é mais importante ao receber o primeiro salário?',
    opcoes: [
      'Gastar tudo em compras',
      'Guardar uma parte e investir',
      'Emprestar para amigos',
      'Deixar parado na conta corrente'
    ],
    correta: 1
  },
  {
    pergunta: 'Qual a melhor forma de controlar gastos?',
    opcoes: [
      'Não se preocupar com isso',
      'Anotar todas as despesas',
      'Gastar apenas com cartão de crédito',
      'Evitar olhar o saldo'
    ],
    correta: 1
  },
  {
    pergunta: 'O que é um investimento?',
    opcoes: [
      'Gastar dinheiro em festas',
      'Aplicar dinheiro para ter retorno futuro',
      'Comprar roupas caras',
      'Viajar bastante'
    ],
    correta: 1
  },
  {
    pergunta: 'Qual é a regra de ouro do planejamento financeiro?',
    opcoes: [
      'Gastar tudo que ganhar',
      'Guardar o que sobrar',
      'Guardar primeiro, gastar depois',
      'Usar sempre o cheque especial'
    ],
    correta: 2
  },
  {
    pergunta: 'O que fazer com dívidas?',
    opcoes: [
      'Ignorá-las',
      'Fazer novas dívidas para pagar as antigas',
      'Negociar e pagar o quanto antes',
      'Esperar prescreverem'
    ],
    correta: 2
  }
];

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tipo } = location.state || { tipo: 'geral' };
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast.error('Selecione uma resposta');
      return;
    }

    if (selectedAnswer === quizData[currentQuestion].correta) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    setShowResult(true);
    const finalScore = selectedAnswer === quizData[currentQuestion].correta ? score + 1 : score;
    
    // Save result
    if (user) {
      await supabase.from('quiz_results').insert({
        user_id: user.id,
        tipo_conteudo: tipo,
        pontuacao: finalScore,
        total_questoes: quizData.length
      });

      // Award points
      const pontos = finalScore * 20;
      const { data: currentProfile } = await supabase
        .from('profiles')
        .select('pontos')
        .eq('id', user.id)
        .single();

      if (currentProfile) {
        await supabase
          .from('profiles')
          .update({ pontos: (currentProfile.pontos || 0) + pontos })
          .eq('id', user.id);
      }
    }
  };

  if (showResult) {
    const finalScore = selectedAnswer === quizData[currentQuestion].correta ? score + 1 : score;
    const percentage = (finalScore / quizData.length) * 100;
    
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-primary mx-auto flex items-center justify-center text-white text-4xl font-bold mb-4">
                {finalScore}
              </div>
              <h2 className="text-2xl font-bold mb-2">Quiz Concluído!</h2>
              <p className="text-lg text-muted-foreground">
                Você acertou <span className="font-bold text-success">{finalScore}</span> de {quizData.length} questões
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                ({percentage.toFixed(0)}% de aproveitamento)
              </p>
            </div>
            
            <div className="space-y-3">
              {percentage >= 80 && (
                <p className="text-success font-semibold">🎉 Excelente desempenho!</p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p className="text-warning font-semibold">👍 Bom trabalho!</p>
              )}
              {percentage < 60 && (
                <p className="text-muted-foreground">Continue estudando para melhorar!</p>
              )}
              
              <p className="text-sm text-muted-foreground">
                Você ganhou <span className="font-bold text-primary">{finalScore * 20} pontos</span>!
              </p>
            </div>

            <div className="mt-6 space-y-2">
              <Button onClick={() => navigate('/educacao')} className="w-full">
                Voltar para Educação
              </Button>
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="w-full">
                Ir para Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">
                  Questão {currentQuestion + 1} de {quizData.length}
                </span>
                <span className="text-sm font-semibold">
                  Pontuação: {score * 20} pts
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all"
                  style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-6">{question.pergunta}</h2>

            <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => setSelectedAnswer(parseInt(v))}>
              <div className="space-y-3">
                {question.opcoes.map((opcao, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer py-3">
                      {opcao}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <Button onClick={handleNext} className="w-full mt-6" size="lg">
              {currentQuestion + 1 < quizData.length ? 'Próxima' : 'Finalizar Quiz'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
