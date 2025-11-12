import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

interface PremiumDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PremiumDialog = ({ open, onOpenChange }: PremiumDialogProps) => {
  const handleSubscribe = () => {
    toast.info('Esta é apenas uma demonstração. A compra ainda não está disponível nesta versão do aplicativo.');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="WalletYoUni" className="w-12 h-12" />
            <DialogTitle className="text-2xl">Plano Premium</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Free Trial Badge */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-4 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold text-lg">14 dias grátis</span>
            </div>
            <p className="text-sm opacity-90">Experimente todos os recursos premium sem compromisso</p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Monthly Plan */}
            <Card className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Plano Mensal</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">R$ 29,90</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Acesso completo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Relatórios ilimitados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Suporte prioritário</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Annual Plan */}
            <Card className="border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold">
                Mais popular
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Plano Anual</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">R$ 249,90</span>
                    <span className="text-muted-foreground">/ano</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Equivalente a R$ 20,82/mês
                  </p>
                  <p className="text-sm text-emerald-600 font-semibold mt-1">
                    Economize 30%
                  </p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Acesso completo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Relatórios ilimitados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Suporte prioritário</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">Recursos exclusivos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Subscribe Button */}
          <Button onClick={handleSubscribe} className="w-full" size="lg">
            <Sparkles className="mr-2 h-5 w-5" />
            Assinar agora
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Esta é uma versão de demonstração do aplicativo WalletYoUni
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
