import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Friend {
  id: string;
  name: string;
  cardNumber: string;
  avatar?: string;
}

interface TransferModalProps {
  friends: Friend[];
  onTransfer: (friendId: string, amount: number) => void;
  children: React.ReactNode;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  friends,
  onTransfer,
  children
}) => {
  const [selectedFriend, setSelectedFriend] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleTransfer = () => {
    if (selectedFriend && amount && Number(amount) > 0) {
      onTransfer(selectedFriend, Number(amount));
      setSelectedFriend('');
      setAmount('');
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-secondary/20 to-quaternary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-comic text-primary flex items-center gap-2">
            <Icon name="Send" size={24} />
            Перевести деньги другу
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Выбор друга */}
          <div className="space-y-2">
            <Label className="text-base font-heading">Кому отправить?</Label>
            <div className="grid grid-cols-2 gap-2">
              {friends.map((friend) => (
                <button
                  key={friend.id}
                  onClick={() => setSelectedFriend(friend.id)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedFriend === friend.id
                      ? 'border-primary bg-primary/10 scale-105'
                      : 'border-gray-200 hover:border-secondary hover:scale-102'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-tertiary text-tertiary-foreground font-bold">
                        {friend.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm font-heading font-semibold">{friend.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {friend.cardNumber.slice(-4)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Сумма перевода */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-base font-heading">Сумма</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-lg font-comic"
                min="1"
                max="1000"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₽
              </span>
            </div>
          </div>

          {/* Быстрые суммы */}
          <div className="space-y-2">
            <Label className="text-sm font-heading">Быстрый выбор</Label>
            <div className="flex gap-2">
              {[50, 100, 200, 500].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="flex-1 font-comic hover:bg-tertiary hover:text-tertiary-foreground"
                >
                  {quickAmount}₽
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Кнопка перевода */}
        <Button
          onClick={handleTransfer}
          disabled={!selectedFriend || !amount || Number(amount) <= 0}
          className="w-full bg-primary hover:bg-primary/90 text-white font-comic text-lg py-6 animate-bounce-in"
        >
          <Icon name="ArrowRight" size={20} className="mr-2" />
          Отправить {amount}₽
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TransferModal;