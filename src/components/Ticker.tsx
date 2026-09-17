import React from 'react';

export const Ticker: React.FC = () => {
  const items = [
    'THE MUSEUM DOES NOT PRESERVE SUCCESS',
    'IT PRESERVES EVIDENCE OF INTENTION',
    'THE RECORD IS ENOUGH',
    'NO PRODUCTIVITY LESSONS HERE',
    'STOPPED BEFORE THE END',
    'INTENTION OVER COMPLETION',
    'EVERY UNFINISHED THING IS EVIDENCE'
  ];

  return (
    <div className="bg-acid text-black border-y-4 border-paper overflow-hidden py-3 select-none flex shadow-brutal-pink">
      <div className="flex gap-8 whitespace-nowrap animate-marquee font-mono font-black text-xs md:text-sm tracking-widest uppercase">
        {[...items, ...items, ...items].map((text, i) => (
          <span key={i} className="flex items-center gap-6">
            <span>{text}</span>
            <span className="text-pink text-base">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
};
