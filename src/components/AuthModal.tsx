import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string }) => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, onLogin, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) return;
    
    // Simulate auth
    onLogin({ name: mode === 'signup' ? name : email.split('@')[0], email });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        />
      )}
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white/90 backdrop-blur-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20"
        >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {mode === 'signin' ? 'Welcome Back' : 'Create an Account'}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {mode === 'signin'
                ? 'Sign in to access your farm dashboard'
                : 'Join FarmFriend to grow smart and farm better'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 py-3 text-white font-medium hover:bg-green-700 transition-colors shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="font-medium text-green-600 hover:text-green-700 hover:underline transition-colors"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
