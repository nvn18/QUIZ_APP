import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Eye } from 'lucide-react';
import { Question } from '../lib/supabase';

interface QuizInterfaceProps {
  questions: Question[];
  photoData: string;
  onComplete: (answers: Array<{ question_id: string; selected_answer: string }>, violations: string[], timeTaken: number) => void;
}

export default function QuizInterface({ questions, photoData, onComplete }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [violations, setViolations] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const startTime = useRef(Date.now());
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    startLiveMonitoring();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const violation = `Tab switched at ${new Date().toLocaleTimeString()}`;
        setViolations(prev => [...prev, violation]);
        setShowWarning(true);
        setTimeout(() => handleAutoSubmit(), 2000);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      stopLiveMonitoring();
    };
  }, []);

  const startLiveMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error('Camera monitoring error:', err);
    }
  };

  const stopLiveMonitoring = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleAutoSubmit = () => {
    const timeTaken = Math.floor((Date.now() - startTime.current) / 1000);
    const answerArray = questions.map(q => ({
      question_id: q.id,
      selected_answer: answers[q.id] || ''
    }));
    stopLiveMonitoring();
    onComplete(answerArray, violations, timeTaken);
  };

  const handleSubmit = () => {
    const timeTaken = Math.floor((Date.now() - startTime.current) / 1000);
    const answerArray = questions.map(q => ({
      question_id: q.id,
      selected_answer: answers[q.id] || ''
    }));
    stopLiveMonitoring();
    onComplete(answerArray, violations, timeTaken);
  };

  const selectAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 60) return 'text-red-500 animate-pulse';
    if (timeLeft <= 300) return 'text-yellow-500';
    return 'text-green-500';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  if (showWarning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-red-400 max-w-md text-center">
          <AlertTriangle className="w-20 h-20 text-red-300 mx-auto mb-4 animate-pulse" />
          <h2 className="text-3xl font-bold text-white mb-4">Violation Detected!</h2>
          <p className="text-white/90 mb-2">You switched tabs during the examination.</p>
          <p className="text-white/90">The exam is being terminated...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/20">
            <div className="flex items-center gap-4">
              <div className="bg-red-500 p-2 rounded-full">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold flex items-center gap-2">
                  Live Monitoring
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
                <div className="text-white/60 text-sm">Active Proctoring</div>
              </div>
            </div>

            <div className={`text-3xl font-mono font-bold ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 font-medium">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-white/80 font-medium">{progress.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {question.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {question.question_text}
                </h3>

                <div className="space-y-3">
                  {(['A', 'B', 'C', 'D'] as const).map((option) => {
                    const optionText = question[`option_${option.toLowerCase()}` as keyof Question] as string;
                    const isSelected = answers[question.id] === option;

                    return (
                      <button
                        key={option}
                        onClick={() => selectAnswer(option)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-green-400/30 to-blue-400/30 border-green-400'
                            : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold flex-shrink-0 ${
                              isSelected
                                ? 'bg-green-400 border-green-400 text-white'
                                : 'border-white/40 text-white/60'
                            }`}
                          >
                            {option}
                          </div>
                          <span className="text-white pt-1">{optionText}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  className="flex-1 bg-white/10 border border-white/30 text-white font-semibold py-3 px-6 rounded-xl hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                    className="flex-1 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="w-80 bg-white/5 border-l border-white/20 p-6">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-red-400" />
                Live Monitoring
              </h3>

              <div className="bg-black/40 rounded-xl overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="text-white/60 text-xs mb-1">Questions Answered</div>
                  <div className="text-white font-bold text-xl">
                    {Object.keys(answers).length} / {questions.length}
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="text-white/60 text-xs mb-1">Violations</div>
                  <div className={`font-bold text-xl ${violations.length > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {violations.length}
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="text-white/60 text-xs mb-1">Time Remaining</div>
                  <div className={`font-bold text-xl ${getTimerColor()}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              {violations.length > 0 && (
                <div className="mt-4 bg-red-500/20 border border-red-400 rounded-lg p-3">
                  <div className="text-red-200 text-xs font-semibold mb-2">Recent Violations:</div>
                  <div className="text-red-300 text-xs space-y-1">
                    {violations.slice(-3).map((v, i) => (
                      <div key={i}>{v}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
