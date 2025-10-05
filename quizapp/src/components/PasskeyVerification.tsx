import { useState, useRef, useEffect } from 'react';
import { Shield } from 'lucide-react';

interface PasskeyVerificationProps {
  passkey: string;
  userName: string;
  onVerified: () => void;
}

export default function PasskeyVerification({ passkey, userName, onVerified }: PasskeyVerificationProps) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setError('');

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newDigits.every(d => d) && newDigits.join('') === passkey) {
      setTimeout(onVerified, 500);
    } else if (newDigits.every(d => d)) {
      setError('Invalid passkey. Please try again.');
      setTimeout(() => {
        setDigits(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 1000);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-400 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-4 rounded-full shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Verify Your Identity
          </h2>
          <p className="text-white/80 text-center mb-8">
            Welcome, {userName}! Enter your 6-digit passkey
          </p>

          <div className="flex justify-center gap-3 mb-6">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-14 h-16 text-center text-2xl font-bold bg-white/20 border-2 ${
                  error ? 'border-red-400' : 'border-white/30'
                } rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400 rounded-xl p-3 mb-4">
              <p className="text-red-200 text-center text-sm">{error}</p>
            </div>
          )}

          <div className="bg-yellow-500/20 border border-yellow-400 rounded-xl p-4">
            <p className="text-yellow-200 text-sm text-center">
              Hint: Your passkey is <span className="font-mono font-bold">{passkey}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
