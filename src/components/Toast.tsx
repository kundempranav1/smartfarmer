import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 border border-gray-800"
      >
        {type === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-green-400" />
        ) : (
          <Info className="w-5 h-5 text-blue-400" />
        )}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
