import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-acid text-black border-4 border-black font-mono font-black text-xs md:text-sm px-6 py-3 tracking-widest uppercase shadow-brutal-pink transition-all animate-bounce">
      {message}
    </div>
  );
};
