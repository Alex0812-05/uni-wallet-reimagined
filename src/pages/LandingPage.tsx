import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Wallet, Target, GraduationCap, Trophy, Facebook, Instagram, Mail, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-library.jpg";
import step1Image from "@/assets/step1-mobile.jpg";
import step2Image from "@/assets/step2-laptop.jpg";
import step3Image from "@/assets/step3-students.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="WalletYoUni" className="h-8 w-8" />
            <span className="text-xl font-bold text-success">WalletYoUni</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('recursos')} className="text-sm hover:text-success transition-colors">
              Recursos
            </button>
            <button onClick={() => scrollToSection('como-funciona')} className="text-sm hover:text-success transition-colors">
              Como Funciona
            </button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-sm hover:text-success transition-colors">
              Depoimentos
            </button>
            <button onClick={() => scrollToSection('contato')} className="text-sm hover:text-success transition-colors">
              Contato
            </button>
          </nav>

          <Button 
            onClick={() => navigate('/auth')}
            className="bg-success hover:bg-success/90 text-white"
          >
            Começar Agora
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative pt-24 pb-20 px-4 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(22, 101, 52, 0.7), rgba(22, 101, 52, 0.7)), url(${heroImage})`,
          minHeight: '600px'
        }}
      >
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Aprenda Educação<br />
              Financeira de Forma<br />
              <span className="text-warning">Divertida</span>
            </h1>
            <p className="text-lg mb-8 text-white/90">
              O WalletYoUni é a plataforma gamificada que ensina estudantes universitários a controlar suas finanças, definir metas e construir um futuro próspero através de quizzes, desafios e conteúdos educativos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-warning hover:bg-warning/90 text-foreground font-semibold"
              >
                Começar Gratuitamente
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/auth')}
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">
            Tudo que você precisa para dominar suas finanças
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Uma plataforma completa com ferramentas práticas e conteúdo educativo para transformar sua relação com o dinheiro
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg bg-success/5">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-bold text-lg mb-2">Controle Financeiro</h3>
                <p className="text-sm text-muted-foreground">
                  Organize suas gastos por categorias e acompanhe seus hábitos semanalmente
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-primary/5">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Metas Inteligentes</h3>
                <p className="text-sm text-muted-foreground">
                  Defina objetivos financeiros e acompanhe seu progresso com barras visuais
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-warning/5">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 rounded-full bg-warning/20 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-warning" />
                </div>
                <h3 className="font-bold text-lg mb-2">Educação Gamificada</h3>
                <p className="text-sm text-muted-foreground">
                  Aprenda com conteúdos interativos, vídeos e artigos especializados
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-premium/5">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 rounded-full bg-premium/20 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-premium" />
                </div>
                <h3 className="font-bold text-lg mb-2">Quizzes & Pontos</h3>
                <p className="text-sm text-muted-foreground">
                  Teste seus conhecimentos e ganhe pontos para desbloquear novos conteúdos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">Como Funciona</h2>
          <p className="text-center text-muted-foreground mb-12">
            Simples, prático e eficiente em apenas 3 passos
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg overflow-hidden">
              <div className="relative">
                <img src={step1Image} alt="Cadastro" className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                  1
                </div>
              </div>
              <CardContent className="pt-6 text-center">
                <h3 className="font-bold text-xl mb-3">Cadastre-se Gratuitamente</h3>
                <p className="text-sm text-muted-foreground">
                  Crie sua conta em apenas 2 minutos e comece sua jornada de educação financeira
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden">
              <div className="relative">
                <img src={step2Image} alt="Organize" className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                  2
                </div>
              </div>
              <CardContent className="pt-6 text-center">
                <h3 className="font-bold text-xl mb-3">Organize suas Finanças</h3>
                <p className="text-sm text-muted-foreground">
                  Registre suas receitas e despesas acompanhe seu progresso com ferramentas visuais
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden">
              <div className="relative">
                <img src={step3Image} alt="Aprenda" className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
                  3
                </div>
              </div>
              <CardContent className="pt-6 text-center">
                <h3 className="font-bold text-xl mb-3">Aprenda e Evolua</h3>
                <p className="text-sm text-muted-foreground">
                  Complete quizzes, ganhe pontos e desenvolva habilidades financeiras para a vida toda
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-success text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm text-white/80">Estudantes Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-sm text-white/80">Taxa de Satisfação</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm text-white/80">Conteúdos Educativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">R$ 2M+</div>
              <div className="text-sm text-white/80">Economizados pelos Usuários</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4">O que nossos usuários dizem</h2>
          <p className="text-center text-muted-foreground mb-12">
            Histórias reais de transformação financeira
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center font-bold text-success">
                    MS
                  </div>
                  <div>
                    <div className="font-bold">Maria Silva</div>
                    <div className="text-sm text-muted-foreground">Estudante de Administração</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "O WalletYoUni mudou completamente minha relação com o dinheiro. Consegui economizar R$ 3.000 em 6 meses para comprar meu notebook!"
                </p>
                <div className="flex gap-1 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    JS
                  </div>
                  <div>
                    <div className="font-bold">João Santos</div>
                    <div className="text-sm text-muted-foreground">Estudante de Engenharia</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "Os quizzes são incríveis! Aprendi mais sobre investimentos em 3 meses do que em anos de faculdade. Recomendo para todos os universitários."
                </p>
                <div className="flex gap-1 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-premium/20 flex items-center justify-center font-bold text-premium">
                    AC
                  </div>
                  <div>
                    <div className="font-bold">Ana Costa</div>
                    <div className="text-sm text-muted-foreground">Estudante de Economia</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "Interface super intuitiva e conteúdo de qualidade. Finalmente consegui organizar meus gastos e já estou planejando meu intercâmbio!"
                </p>
                <div className="flex gap-1 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary via-info to-success text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para transformar sua vida financeira?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Junte-se a milhares de estudantes que já estão construindo um futuro financeiro próspero
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-warning hover:bg-warning/90 text-foreground font-semibold"
          >
            Começar Gratuitamente Agora
          </Button>
          <p className="text-sm mt-4 text-white/70">
            ✓ 14 dias para sempre • Sem cartão de crédito • Acesso imediato
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="contato" className="py-20 px-4 bg-[#1a2332]">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Receba dicas de educação financeira
          </h2>
          <p className="text-white/70 mb-8">
            Cadastre-se e receba conteúdos exclusivos direto no seu email
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Seu melhor email"
              className="bg-white"
            />
            <Button className="bg-success hover:bg-success/90 text-white whitespace-nowrap">
              Inscrever-se
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#1a2332] border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logo} alt="WalletYoUni" className="h-8 w-8" />
                <span className="text-lg font-bold text-success">WalletYoUni</span>
              </div>
              <p className="text-sm text-white/70 mb-4">
                Aprenda, economize e evolua financeiramente enquanto se diverte.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">Produto</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Atualizações</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">Empresa</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Imprensa</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-white">Suporte</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comunidade</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <div>© 2024 WalletYoUni. Todos os direitos reservados.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/70 transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white/70 transition-colors">Termos</a>
              <a href="#" className="hover:text-white/70 transition-colors">Cookies</a>
              <a href="#" className="hover:text-white/70 transition-colors">Powered by Lovable</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
