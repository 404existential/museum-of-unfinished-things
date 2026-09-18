import React from 'react';
import { Plus } from 'lucide-react';
import { sound } from '../services/audio';

interface NavbarProps {
  onOpenDeposit: () => void;
  onShowToast: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDeposit }) => {
  return (
    <header className="sticky top-0 z-50 bg-void/95 backdrop-blur-md border-b-4 border-paper px-4 md:px-10 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Wordmark */}
        <a href="#top" className="flex flex-col group text-left">
          <span className="font-mono text-[10px] md:text-xs font-black tracking-[0.25em] text-acid uppercase group-hover:text-pink transition-colors">
            PUBLIC ARCHIVE // EST. 2026
          </span>
          <strong className="font-sans font-black text-xl md:text-2xl lg:text-3xl tracking-tighter text-paper uppercase leading-none group-hover:text-acid transition-colors">
            THE MUSEUM <span className="text-pink">OF UNFINISHED</span> THINGS
          </strong>
        </a>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.play('thud');
              onOpenDeposit();
            }}
            className="border-2 border-black bg-pink hover:bg-acid text-black font-mono text-xs md:text-sm font-black px-4 md:px-5 py-2.5 flex items-center gap-2 shadow-brutal-acid hover:shadow-brutal-cyan hover:-translate-y-0.5 transition-all"
            title="Leave an unfinished record in the archive"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>POST RECORD</span>
          </button>
        </div>
      </div>
    </header>
  );
};

