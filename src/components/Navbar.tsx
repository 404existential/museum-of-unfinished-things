import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Plus, ShieldCheck } from 'lucide-react';
import { sound } from '../services/audio';

interface NavbarProps {
  onOpenDeposit: () => void;
  onOpenDesk: () => void;
  onShowToast: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDeposit, onOpenDesk, onShowToast }) => {
  const [timeStr, setTimeStr] = useState<string>('00:00:00 UTC');
  const [audioActive, setAudioActive] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      setTimeStr(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const active = sound.toggle();
    setAudioActive(active);
    onShowToast(active ? '🔊 AUDIO FEEDBACK ENGAGED' : '🔇 AUDIO MUTED');
  };

  return (
    <header className="sticky top-0 z-50 bg-void/90 backdrop-blur-md border-b-4 border-paper px-4 md:px-10 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Wordmark */}
        <a href="#top" className="flex flex-col group text-left">
          <span className="font-mono text-[10px] md:text-xs font-black tracking-[0.25em] text-acid uppercase group-hover:text-pink transition-colors">
            PUBLIC ARCHIVE // EST. 2026
          </span>
          <strong className="font-sans font-black text-xl md:text-2xl tracking-tighter text-paper uppercase leading-none group-hover:text-acid transition-colors">
            THE MUSEUM <span className="text-pink">OF UNFINISHED</span> THINGS
          </strong>
        </a>

        {/* Right Tools */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* UTC Clock */}
          <div className="hidden lg:flex items-center gap-2 border-2 border-paper/40 px-3 py-1.5 font-mono text-xs font-bold text-paper/80 bg-panel">
            <span className="w-2 h-2 rounded-full bg-acid animate-ping"></span>
            <span>{timeStr}</span>
          </div>

          {/* Audio FX Toggle */}
          <button
            type="button"
            onClick={handleAudioToggle}
            className={`border-2 border-paper font-mono text-xs font-black px-3 py-2 flex items-center gap-1.5 transition-all ${
              audioActive ? 'bg-acid text-black shadow-brutal-pink' : 'bg-panel text-paper hover:bg-white hover:text-black'
            }`}
            title="Toggle tactile sound effects"
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{audioActive ? 'FX ON' : 'FX OFF'}</span>
          </button>

          {/* Curator Desk */}
          <button
            type="button"
            onClick={() => {
              sound.play('click');
              onOpenDesk();
            }}
            className="border-2 border-paper bg-panel text-paper hover:bg-cyan hover:text-black font-mono text-xs font-black px-3 py-2 flex items-center gap-1.5 transition-all"
            title="Contributor and Curator Desk"
          >
            <ShieldCheck className="w-4 h-4 text-cyan group-hover:text-black" />
            <span className="hidden md:inline">DESK</span>
          </button>

          {/* Deposit Button */}
          <button
            type="button"
            onClick={() => {
              sound.play('thud');
              onOpenDeposit();
            }}
            className="border-2 border-black bg-pink hover:bg-acid text-black font-mono text-xs md:text-sm font-black px-4 py-2 flex items-center gap-1.5 shadow-brutal-acid hover:shadow-brutal-cyan hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>POST RECORD</span>
          </button>
        </div>
      </div>
    </header>
  );
};
