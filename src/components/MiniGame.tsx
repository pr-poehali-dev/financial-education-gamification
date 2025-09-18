import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  reward: number;
}

const gameQuestions: Question[] = [
  {
    id: '1',
    question: 'What should you do with your money first?',
    options: ['Потратить на сладости', 'Отложить часть на сбережения', 'Дать другу', 'Потерять'],
    correct: 1,
    explanation: 'Правильно! Сначала нужно отложить деньги на сбережения, а потом тратить.',
    reward: 50
  },
  {
    id: '2',
    question: 'Что такое бюджет?',
    options: ['Большая сумма денег', 'План доходов и расходов', 'Кошелек', 'Банкомат'],
    correct: 1,
    explanation: 'Верно! Бюджет - это план того, сколько денег ты получаешь и тратишь.',
    reward: 75
  },
  {
    id: '3',
    question: 'Для чего нужны сбережения?',
    options: ['Чтобы хранить дома', 'На случай непредвиденных трат', 'Чтобы похвастаться', 'Не нужны вообще'],
    correct: 1,
    explanation: 'Отлично! Сбережения помогают в сложных ситуациях и для больших покупок.',
    reward: 100
  }
];

interface MiniGameProps {
  onReward: (amount: number) => void;
}

export const MiniGame: React.FC<MiniGameProps> = ({ onReward }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const question = gameQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === question.correct) {
      const newScore = score + question.reward;
      setScore(newScore);
      onReward(question.reward);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    return (
      <Card className="p-6 bg-gradient-to-br from-tertiary/20 to-primary/20 text-center animate-bounce-in">
        <div className="mb-4 text-6xl animate-wiggle">🏆</div>
        <h3 className="text-2xl font-comic font-bold text-primary mb-2">
          Поздравляем!
        </h3>
        <p className="text-lg font-heading mb-4">
          Ты завершил игру и заработал <span className="font-bold text-primary">{score}₽</span>!
        </p>
        <Button 
          onClick={resetGame}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-comic"
        >
          <Icon name="RotateCcw" size={20} className="mr-2" />
          Играть снова
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-quaternary/10 to-secondary/10">
      {/* Прогресс */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-comic font-bold text-primary">
            Финансовая викторина
          </h3>
          <div className="text-sm font-heading bg-tertiary text-tertiary-foreground px-3 py-1 rounded-full">
            {currentQuestion + 1} из {gameQuestions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / gameQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Вопрос */}
      <div className="mb-6">
        <h4 className="text-lg font-heading font-semibold mb-4 text-center">
          {question.question}
        </h4>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={
                showResult
                  ? index === question.correct
                    ? 'default'
                    : selectedAnswer === index
                    ? 'destructive'
                    : 'outline'
                  : 'outline'
              }
              className={`w-full text-left justify-start p-4 h-auto font-comic text-base transition-all duration-200 ${
                !showResult && 'hover:scale-102 hover:shadow-md'
              }`}
              onClick={() => !showResult && handleAnswerSelect(index)}
              disabled={showResult}
            >
              <span className="mr-3 font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
              {showResult && index === question.correct && (
                <Icon name="CheckCircle" size={20} className="ml-auto" />
              )}
              {showResult && selectedAnswer === index && index !== question.correct && (
                <Icon name="XCircle" size={20} className="ml-auto" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Результат */}
      {showResult && (
        <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 animate-bounce-in">
          <div className="flex items-start gap-3">
            <div className="text-2xl">
              {selectedAnswer === question.correct ? '🎉' : '📚'}
            </div>
            <div>
              <p className="font-heading font-semibold mb-2">
                {selectedAnswer === question.correct ? 'Правильно!' : 'Не совсем...'}
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                {question.explanation}
              </p>
              {selectedAnswer === question.correct && (
                <p className="text-sm font-bold text-primary">
                  +{question.reward}₽ к балансу!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Навигация */}
      {showResult && (
        <div className="flex justify-center">
          <Button 
            onClick={nextQuestion}
            className="bg-primary hover:bg-primary/90 text-white font-comic px-8"
          >
            {currentQuestion < gameQuestions.length - 1 ? (
              <>
                Следующий вопрос
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </>
            ) : (
              <>
                Завершить игру
                <Icon name="Trophy" size={20} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default MiniGame;