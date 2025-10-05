import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Award } from 'lucide-react';
import { Question } from '../lib/supabase';

interface ResultsPageProps {
  questions: Question[];
  answers: Array<{ question_id: string; selected_answer: string }>;
  violations: string[];
  timeTaken: number;
  userName: string;
  onShowFeedback: () => void;
}

export default function ResultsPage({
  questions,
  answers,
  violations,
  timeTaken,
  userName,
  onShowFeedback
}: ResultsPageProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const calculateScore = () => {
    let correct = 0;
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.question_id);
      if (question && answer.selected_answer === question.correct_answer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 70;

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} min ${secs} sec`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 mb-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className={`p-6 rounded-full ${passed ? 'bg-gradient-to-br from-green-400 to-teal-500' : 'bg-gradient-to-br from-red-400 to-pink-500'} shadow-lg`}>
                {passed ? (
                  <Award className="w-16 h-16 text-white" />
                ) : (
                  <AlertTriangle className="w-16 h-16 text-white" />
                )}
              </div>
            </div>

            <h1 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
            <p className="text-white/80 text-lg">Great job, {userName}!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-white/60 text-sm mb-2">Your Score</div>
              <div className="text-5xl font-bold text-white mb-2">
                {animatedScore}/{questions.length}
              </div>
              <div className={`text-2xl font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                {percentage}%
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-white/60 text-sm mb-2">Status</div>
              <div className={`inline-block px-6 py-3 rounded-full font-bold text-lg ${
                passed
                  ? 'bg-gradient-to-r from-green-400 to-teal-500 text-white'
                  : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
              }`}>
                {passed ? 'PASSED' : 'FAILED'}
              </div>
              <div className="text-white/60 text-sm mt-2">
                {passed ? 'Congratulations!' : 'Better luck next time'}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
              <div className="text-white/60 text-sm mb-2">Time Taken</div>
              <div className="text-3xl font-bold text-white mb-2">
                {formatTime(timeTaken)}
              </div>
              <div className="text-white/60 text-sm">
                Out of 30 minutes
              </div>
            </div>
          </div>

          {violations.length > 0 && (
            <div className="bg-red-500/20 border-2 border-red-400 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-300" />
                <h3 className="text-xl font-bold text-red-200">Violations Detected</h3>
              </div>
              <p className="text-red-300 mb-3">
                {violations.length} violation{violations.length !== 1 ? 's' : ''} recorded during your examination:
              </p>
              <div className="space-y-2">
                {violations.map((v, i) => (
                  <div key={i} className="bg-red-900/30 rounded-lg p-3 text-red-200 text-sm">
                    {v}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 mb-6">
          <h2 className="text-2xl font-bold text-white mb-6">Detailed Breakdown</h2>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers.find(a => a.question_id === question.id);
              const isCorrect = userAnswer?.selected_answer === question.correct_answer;

              return (
                <div
                  key={question.id}
                  className={`bg-white/5 rounded-xl p-6 border-2 ${
                    isCorrect ? 'border-green-400/50' : 'border-red-400/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full flex-shrink-0 ${
                      isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white/60 font-medium">Question {index + 1}</span>
                        <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-xs font-medium">
                          {question.category}
                        </span>
                      </div>

                      <h3 className="text-white font-semibold mb-4">{question.question_text}</h3>

                      <div className="grid gap-3">
                        <div className={`p-3 rounded-lg ${
                          userAnswer?.selected_answer === 'A'
                            ? isCorrect
                              ? 'bg-green-500/20 border-2 border-green-400'
                              : 'bg-red-500/20 border-2 border-red-400'
                            : question.correct_answer === 'A'
                            ? 'bg-green-500/20 border-2 border-green-400'
                            : 'bg-white/5 border border-white/10'
                        }`}>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-white">A.</span>
                            <span className="text-white/90">{question.option_a}</span>
                          </div>
                        </div>

                        <div className={`p-3 rounded-lg ${
                          userAnswer?.selected_answer === 'B'
                            ? isCorrect
                              ? 'bg-green-500/20 border-2 border-green-400'
                              : 'bg-red-500/20 border-2 border-red-400'
                            : question.correct_answer === 'B'
                            ? 'bg-green-500/20 border-2 border-green-400'
                            : 'bg-white/5 border border-white/10'
                        }`}>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-white">B.</span>
                            <span className="text-white/90">{question.option_b}</span>
                          </div>
                        </div>

                        <div className={`p-3 rounded-lg ${
                          userAnswer?.selected_answer === 'C'
                            ? isCorrect
                              ? 'bg-green-500/20 border-2 border-green-400'
                              : 'bg-red-500/20 border-2 border-red-400'
                            : question.correct_answer === 'C'
                            ? 'bg-green-500/20 border-2 border-green-400'
                            : 'bg-white/5 border border-white/10'
                        }`}>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-white">C.</span>
                            <span className="text-white/90">{question.option_c}</span>
                          </div>
                        </div>

                        <div className={`p-3 rounded-lg ${
                          userAnswer?.selected_answer === 'D'
                            ? isCorrect
                              ? 'bg-green-500/20 border-2 border-green-400'
                              : 'bg-red-500/20 border-2 border-red-400'
                            : question.correct_answer === 'D'
                            ? 'bg-green-500/20 border-2 border-green-400'
                            : 'bg-white/5 border border-white/10'
                        }`}>
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-white">D.</span>
                            <span className="text-white/90">{question.option_d}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center gap-4 text-sm">
                        <div className="text-white/60">
                          Your answer: <span className={isCorrect ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                            {userAnswer?.selected_answer || 'Not answered'}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-white/60">
                            Correct answer: <span className="text-green-400 font-bold">{question.correct_answer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onShowFeedback}
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Continue to Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
