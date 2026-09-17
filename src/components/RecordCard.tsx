import React from 'react';
import { Artifact } from '../types';
import { sound } from '../services/audio';

interface RecordCardProps {
  artifact: Artifact;
  index: number;
  onSelect: (artifact: Artifact) => void;
}

export const RecordCard: React.FC<RecordCardProps> = ({ artifact, index, onSelect }) => {
  // Shadow and accent mapping
  const shadowClasses: Record<string, string> = {
    pink: 'shadow-brutal-pink hover:shadow-brutal-acid',
    acid: 'shadow-brutal-acid hover:shadow-brutal-cyan',
    cyan: 'shadow-brutal-cyan hover:shadow-brutal-pink',
    orange: 'shadow-brutal-orange hover:shadow-brutal-acid',
    purple: 'shadow-brutal-purple hover:shadow-brutal-pink'
  };

  const badgeBgs = ['bg-pink text-black', 'bg-cyan text-black', 'bg-acid text-black', 'bg-orange text-black'];
  const badgeClass = badgeBgs[index % badgeBgs.length];

  const headerColors: Record<string, string> = {
    pink: 'bg-pink/20 text-pink border-pink',
    acid: 'bg-acid/20 text-acid border-acid',
    cyan: 'bg-cyan/20 text-cyan border-cyan',
    orange: 'bg-orange/20 text-orange border-orange',
    purple: 'bg-purple/20 text-purple border-purple',
    paper: 'bg-paper/20 text-paper border-paper'
  };

  const headerStyle = headerColors[artifact.visualColor] || headerColors.pink;
  const shadowClass = shadowClasses[artifact.shadowColor || 'pink'] || 'shadow-brutal-pink';

  const paddedNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => {
        sound.play('click');
        onSelect(artifact);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          sound.play('click');
          onSelect(artifact);
        }
      }}
      style={{ transform: artifact.rotation || 'rotate(0deg)' }}
      className={`group relative bg-panel border-4 border-paper flex flex-col justify-between cursor-pointer transition-all duration-300 hover:rotate-0 hover:-translate-y-3 hover:scale-[1.02] ${shadowClass} select-none overflow-visible min-h-[460px]`}
    >
      {/* 45-degree Angled Yellow UNFINISHED Hazard Tape */}
      <div 
        aria-hidden="true" 
        className="absolute -right-9 top-6 bg-acid text-black font-mono font-black text-[9px] tracking-widest px-10 py-1 rotate-45 border-2 border-black z-20 shadow-sm"
      >
        UNFINISHED
      </div>

      {/* Bottom Left Stamped RECORD Tag */}
      <div 
        aria-hidden="true" 
        className={`absolute -left-3 -bottom-3 ${badgeClass} border-2 border-black font-mono font-black text-[10px] tracking-wider px-2.5 py-1 rotate-[-3deg] z-20 shadow-sm`}
      >
        RECORD // {paddedNumber}
      </div>

      {/* Card Header & Visual Title Block */}
      <div>
        <div className={`p-6 border-b-4 border-paper relative ${headerStyle}`}>
          <div className="flex items-center justify-between font-mono text-xs font-black mb-3">
            <span className="bg-black text-paper px-2 py-0.5 border border-paper/40">
              {artifact.id}
            </span>
            <span className="uppercase text-[11px] font-extrabold tracking-wider opacity-80">
              {artifact.category}
            </span>
          </div>

          <h3 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tighter leading-[0.9] break-words">
            {artifact.title}
          </h3>
        </div>

        {/* Card Body Details */}
        <div className="p-6 text-left">
          <div className="flex items-center justify-between border-b-2 border-paper/20 pb-3 mb-4 font-mono text-xs">
            <span className="text-paper/60 uppercase">{artifact.year}</span>
            <span className="bg-paper text-black font-black text-[10px] px-2 py-0.5 uppercase border border-black">
              {artifact.status}
            </span>
          </div>

          <p className="font-serif text-sm text-paper/80 leading-relaxed line-clamp-4">
            {artifact.description || artifact.text}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-0 border-t-2 border-paper/20 flex items-center justify-between font-mono text-xs text-paper/60">
        <span className="truncate max-w-[150px]">
          CONTRIBUTOR: <strong className="text-paper font-black">{artifact.username}</strong>
        </span>
        <span className="text-acid font-black text-xs flex items-center gap-1">
          <span>🕯️</span>
          <span>{artifact.tributes}</span>
        </span>
      </div>
    </article>
  );
};
