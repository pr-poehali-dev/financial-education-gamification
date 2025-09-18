import React from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface MoneyCardProps {
  balance: number;
  cardNumber: string;
  holderName: string;
  className?: string;
}

export const MoneyCard: React.FC<MoneyCardProps> = ({
  balance,
  cardNumber,
  holderName,
  className = ""
}) => {
  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-primary via-tertiary to-secondary p-6 text-white shadow-xl animate-bounce-in ${className}`}>
      {/* Декоративные элементы */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10"></div>
      <div className="absolute -left-2 -bottom-2 h-16 w-16 rounded-full bg-white/5"></div>
      
      {/* Иконка карты */}
      <div className="absolute right-6 top-6">
        <Icon name="CreditCard" size={32} className="text-white/80" />
      </div>
      
      {/* Баланс */}
      <div className="mb-4">
        <div className="text-sm font-heading opacity-90">Мой баланс</div>
        <div className="text-4xl font-bold font-comic animate-float">
          {formatBalance(balance)}
        </div>
      </div>
      
      {/* Номер карты */}
      <div className="mb-4 font-mono text-lg tracking-widest">
        {cardNumber.replace(/(.{4})/g, '$1 ').trim()}
      </div>
      
      {/* Имя держателя */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs opacity-75">Владелец</div>
          <div className="font-heading font-semibold">{holderName}</div>
        </div>
        <div className="animate-wiggle">
          💳
        </div>
      </div>
    </Card>
  );
};

export default MoneyCard;