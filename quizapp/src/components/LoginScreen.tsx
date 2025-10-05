import { useState } from 'react';
import { CircleUser as UserCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (name: string, passkey: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');
  const [passkey, setPasskey] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);

  const generatePasskey = () => {
    const key = Math.floor(100000 + Math.random() * 900000).toString();
    setPasskey(key);
    setShowPasskey(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && passkey) {
      onLogin(name.trim(), passkey);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-full shadow-lg animate-bounce">
              <UserCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white text-center mb-2">
            Veto Online Quiz Platform
          </h1>
          <p className="text-white/80 text-center mb-8">
            Test your knowledge with live proctoring
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                placeholder="Enter your name"
                required
              />
            </div>

            {!showPasskey ? (
              <button
                type="button"
                onClick={generatePasskey}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Generate Passkey
              </button>
            ) : (
              <div>
                <label className="block text-white font-medium mb-2">
                  Your Passkey
                </label>
                <div className="bg-white/20 border-2 border-yellow-400 rounded-xl p-4 text-center">
                  <div className="text-3xl font-mono font-bold text-yellow-300 tracking-widest">
                    {passkey}
                  </div>
                  <p className="text-white/70 text-sm mt-2">
                    Save this passkey to view your results later
                  </p>
                </div>
              </div>
            )}

            {showPasskey && (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Continue to Verification
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
