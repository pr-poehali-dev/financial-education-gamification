import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface AuthModalProps {
  isOpen: boolean;
  onSuccess: (userData: { name: string; contact: string; type: 'email' | 'phone' }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onSuccess }) => {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [authType, setAuthType] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    code: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    
    // Имитация отправки кода
    setTimeout(() => {
      setIsLoading(false);
      setStep('verify');
    }, 2000);
  };

  const handleVerify = async () => {
    setIsLoading(true);
    
    // Имитация проверки кода
    setTimeout(() => {
      setIsLoading(false);
      onSuccess({
        name: formData.name,
        contact: authType === 'email' ? formData.email : formData.phone,
        type: authType
      });
    }, 1500);
  };

  const formatPhoneDisplay = (phone: string) => {
    return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
  };

  if (step === 'verify') {
    return (
      <Dialog open={isOpen}>
        <DialogContent className="sm:max-w-[400px] bg-gradient-to-br from-primary/5 to-secondary/5">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-bounce-in">
              <Icon name="Shield" size={32} className="text-white" />
            </div>
            <DialogTitle className="text-2xl font-comic text-primary">
              Подтвердите регистрацию
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="text-center">
              <p className="text-muted-foreground font-heading">
                Мы отправили код подтверждения на
              </p>
              <p className="font-bold font-comic text-lg text-primary">
                {authType === 'email' ? formData.email : formatPhoneDisplay(formData.phone)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code" className="text-base font-heading">
                Код подтверждения
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="Введите 4-значный код"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="text-center text-2xl font-comic tracking-wider"
                maxLength={4}
                autoFocus
              />
              <p className="text-xs text-muted-foreground text-center">
                Не получили код? <button className="text-primary hover:underline">Отправить заново</button>
              </p>
            </div>

            <Button
              onClick={handleVerify}
              disabled={formData.code.length !== 4 || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-comic text-lg py-6"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Проверяем код...
                </>
              ) : (
                <>
                  <Icon name="CheckCircle" size={20} className="mr-2" />
                  Подтвердить
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-primary/5 to-secondary/5">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-bounce-in">
            <img 
              src="/img/7f20d965-6b08-4152-bc17-567389dd9e88.jpg" 
              alt="Mascot" 
              className="w-12 h-12 rounded-full"
            />
          </div>
          <DialogTitle className="text-2xl font-comic text-primary">
            Добро пожаловать в Финансики!
          </DialogTitle>
          <p className="text-muted-foreground font-heading">
            Создайте аккаунт для изучения финансовой грамотности
          </p>
        </DialogHeader>

        <div className="py-6">
          <Tabs value={authType} onValueChange={(value: 'email' | 'phone') => setAuthType(value)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email" className="font-comic">
                <Icon name="Mail" size={18} className="mr-2" />
                Почта
              </TabsTrigger>
              <TabsTrigger value="phone" className="font-comic">
                <Icon name="Phone" size={18} className="mr-2" />
                Телефон
              </TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-heading">
                  Как тебя зовут?
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введи свое имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="font-comic text-base"
                />
              </div>

              <TabsContent value="email" className="space-y-2 mt-0">
                <Label htmlFor="email" className="text-base font-heading">
                  Электронная почта
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="font-comic text-base"
                />
              </TabsContent>

              <TabsContent value="phone" className="space-y-2 mt-0">
                <Label htmlFor="phone" className="text-base font-heading">
                  Номер телефона
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="font-comic text-base"
                />
              </TabsContent>
            </div>

            <Card className="p-4 mt-6 bg-secondary/10 border-secondary/20">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={20} className="text-secondary mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-semibold mb-1">Безопасность данных</p>
                  <p>Все данные используются только для обучения. Это детская версия банковского приложения для изучения финансовой грамотности.</p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleRegister}
              disabled={!formData.name || (authType === 'email' ? !formData.email : !formData.phone) || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-comic text-lg py-6 mt-6"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Отправляем код...
                </>
              ) : (
                <>
                  <Icon name="Send" size={20} className="mr-2" />
                  Получить код подтверждения
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Нажимая кнопку, вы соглашаетесь с{' '}
              <button className="text-primary hover:underline">условиями использования</button>
            </p>
          </div>
        </TabsContent>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;