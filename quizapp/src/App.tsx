import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import PasskeyVerification from './components/PasskeyVerification';
import CameraSetup from './components/CameraSetup';
import QuizInterface from './components/QuizInterface';
import ResultsPage from './components/ResultsPage';
import FeedbackForm from './components/FeedbackForm';
import { mockQuestions } from './data/questions';

type AppState = 'login' | 'verification' | 'camera' | 'quiz' | 'results' | 'feedback';

function App() {
  const [state, setState] = useState<AppState>('login');
  const [userName, setUserName] = useState('');
  const [passkey, setPasskey] = useState('');
  const [photoData, setPhotoData] = useState('');
  const [answers, setAnswers] = useState<Array<{ question_id: string; selected_answer: string }>>([]);
  const [violations, setViolations] = useState<string[]>([]);
  const [timeTaken, setTimeTaken] = useState(0);

  const handleLogin = (name: string, key: string) => {
    setUserName(name);
    setPasskey(key);
    setState('verification');
  };

  const handleVerified = () => {
    setState('camera');
  };

  const handleCameraComplete = (photo: string) => {
    setPhotoData(photo);
    setState('quiz');
  };

  const handleQuizComplete = (
    userAnswers: Array<{ question_id: string; selected_answer: string }>,
    quizViolations: string[],
    time: number
  ) => {
    setAnswers(userAnswers);
    setViolations(quizViolations);
    setTimeTaken(time);
    setState('results');
  };

  const handleShowFeedback = () => {
    setState('feedback');
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    console.log('Feedback submitted:', { rating, comment, userName, passkey });
  };

  const handleRetake = () => {
    setAnswers([]);
    setViolations([]);
    setTimeTaken(0);
    setState('login');
  };

  return (
    <>
      {state === 'login' && <LoginScreen onLogin={handleLogin} />}
      {state === 'verification' && (
        <PasskeyVerification
          passkey={passkey}
          userName={userName}
          onVerified={handleVerified}
        />
      )}
      {state === 'camera' && <CameraSetup onComplete={handleCameraComplete} />}
      {state === 'quiz' && (
        <QuizInterface
          questions={mockQuestions}
          photoData={photoData}
          onComplete={handleQuizComplete}
        />
      )}
      {state === 'results' && (
        <ResultsPage
          questions={mockQuestions}
          answers={answers}
          violations={violations}
          timeTaken={timeTaken}
          userName={userName}
          onShowFeedback={handleShowFeedback}
        />
      )}
      {state === 'feedback' && (
        <FeedbackForm onSubmit={handleFeedbackSubmit} onRetake={handleRetake} />
      )}
    </>
  );
}

export default App;
