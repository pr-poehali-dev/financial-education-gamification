import React, { useState } from 'react';
import { MoneyCard } from '@/components/MoneyCard';
import { TransferModal } from '@/components/TransferModal';
import { MiniGame } from '@/components/MiniGame';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'reward';
  amount: number;
  description: string;
  date: Date;
}

const mockFriends = [
  { id: '1', name: 'Аня', cardNumber: '1234567890123456' },
  { id: '2', name: 'Петя', cardNumber: '2345678901234567' },
  { id: '3', name: 'Маша', cardNumber: '3456789012345678' },
  { id: '4', name: 'Дима', cardNumber: '4567890123456789' }
];

const Index = () => {
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'received',
      amount: 1000,
      description: 'Начальный баланс',
      date: new Date()
    }
  ]);

  const handleTransfer = (friendId: string, amount: number) => {
    if (amount > balance) {
      alert('Недостаточно средств!');
      return;
    }

    const friend = mockFriends.find(f => f.id === friendId);
    if (!friend) return;

    setBalance(prev => prev - amount);
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'sent',
      amount,
      description: `Перевод для ${friend.name}`,
      date: new Date()
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleGameReward = (amount: number) => {
    setBalance(prev => prev + amount);
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'reward',
      amount,
      description: 'Награда за правильный ответ',
      date: new Date()
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-quaternary/20 via-secondary/10 to-tertiary/20 font-heading">
      {/* Шапка */}
      <header className="bg-white/90 backdrop-blur-sm border-b-2 border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-bounce-in">
                <img 
                  src="/img/7f20d965-6b08-4152-bc17-567389dd9e88.jpg" 
                  alt="Mascot" 
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-comic font-bold text-primary">
                  Финансики
                </h1>
                <p className="text-sm text-muted-foreground">
                  Изучаем деньги играя!
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary text-white font-comic text-lg px-4 py-2 animate-float">
              {formatCurrency(balance)}
            </Badge>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="card" className="font-comic font-semibold">
              <Icon name="CreditCard" size={20} className="mr-2" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="transfer" className="font-comic font-semibold">
              <Icon name="Send" size={20} className="mr-2" />
              Переводы
            </TabsTrigger>
            <TabsTrigger value="games" className="font-comic font-semibold">
              <Icon name="Gamepad2" size={20} className="mr-2" />
              Игры
            </TabsTrigger>
            <TabsTrigger value="history" className="font-comic font-semibold">
              <Icon name="History" size={20} className="mr-2" />
              История
            </TabsTrigger>
          </TabsList>

          {/* Вкладка карты */}
          <TabsContent value="card" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-comic font-bold text-primary mb-2">
                Моя финансовая карта! 💳
              </h2>
              <p className="text-muted-foreground font-heading">
                Твоя личная карта для изучения финансов
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <MoneyCard
                balance={balance}
                cardNumber="1234567890123456"
                holderName="Юный Финансист"
              />
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <TransferModal friends={mockFriends} onTransfer={handleTransfer}>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-comic text-lg py-6">
                  <Icon name="Send" size={24} className="mr-2" />
                  Перевести другу
                </Button>
              </TransferModal>
            </div>
          </TabsContent>

          {/* Вкладка переводов */}
          <TabsContent value="transfer" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-comic font-bold text-primary mb-2">
                Мои друзья 👥
              </h2>
              <p className="text-muted-foreground font-heading">
                Отправляй деньги друзьям одним кликом!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockFriends.map((friend) => (
                <Card key={friend.id} className="p-4 text-center hover:shadow-lg transition-all duration-200 hover:scale-105">
                  <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold text-tertiary-foreground">
                    {friend.name.charAt(0)}
                  </div>
                  <h3 className="font-comic font-bold text-lg mb-2">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono mb-4">
                    ···· {friend.cardNumber.slice(-4)}
                  </p>
                  <TransferModal friends={[friend]} onTransfer={handleTransfer}>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-comic">
                      <Icon name="Send" size={16} className="mr-1" />
                      Отправить
                    </Button>
                  </TransferModal>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Вкладка игр */}
          <TabsContent value="games" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-comic font-bold text-primary mb-2">
                Финансовые игры! 🎮
              </h2>
              <p className="text-muted-foreground font-heading">
                Изучай основы финансов и зарабатывай монеты!
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <MiniGame onReward={handleGameReward} />
            </div>
          </TabsContent>

          {/* Вкладка истории */}
          <TabsContent value="history" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-comic font-bold text-primary mb-2">
                История операций 📊
              </h2>
              <p className="text-muted-foreground font-heading">
                Все твои финансовые операции
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-3">
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'received' ? 'bg-quaternary/20' :
                        transaction.type === 'sent' ? 'bg-primary/20' : 'bg-tertiary/20'
                      }`}>
                        {transaction.type === 'received' && <Icon name="ArrowDown" size={20} className="text-quaternary" />}
                        {transaction.type === 'sent' && <Icon name="ArrowUp" size={20} className="text-primary" />}
                        {transaction.type === 'reward' && <Icon name="Trophy" size={20} className="text-tertiary" />}
                      </div>
                      <div>
                        <p className="font-heading font-semibold">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date.toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                    <div className={`font-comic font-bold text-lg ${
                      transaction.type === 'sent' ? 'text-primary' : 'text-quaternary'
                    }`}>
                      {transaction.type === 'sent' ? '-' : '+'}
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Футер */}
      <footer className="bg-white/50 backdrop-blur-sm border-t-2 border-primary/20 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground font-heading">
            💰 Изучай финансы весело и безопасно! 🚀
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;