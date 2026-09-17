import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '../types';
import { sound } from '../services/audio';

interface CuratedWingsProps {
  onSelectWing: (cat: Category) => void;
}

export const CuratedWings: React.FC<CuratedWingsProps> = ({ onSelectWing }) => {
  const wings = [
    {
      num: 'EXHIBITION 01 / 2026',
      title: 'NEVER LAUNCHED',
      category: 'Software' as Category,
      tag: 'CODE & PLATFORMS',
      desc: 'Projects, tools, and startups built and polished for a launch day that never arrived. Surviving records are full of release dates, renamed branches, and one final adjustment that led to another.',
      bg: 'bg-void',
      border: 'border-acid',
      shadow: 'shadow-brutal-acid',
      accent: 'text-acid',
      btnBg: 'bg-acid text-black hover:bg-white',
      badge: 'SOFTWARE WING'
    },
    {
      num: 'EXHIBITION 02 / 2026',
      title: 'CHAPTER SEVEN',
      category: 'Writing' as Category,
      tag: 'MANUSCRIPTS & VERSE',
      desc: 'Writing projects that stopped in the middle of becoming themselves. Pages survive with crossed-out paragraphs, character maps, and endings that were still being negotiated when the typing stopped.',
      bg: 'bg-void',
      border: 'border-pink',
      shadow: 'shadow-brutal-pink',
      accent: 'text-pink',
      btnBg: 'bg-pink text-black hover:bg-white',
      badge: 'LITERATURE WING'
    },
    {
      num: 'EXHIBITION 03 / 2026',
      title: 'ALMOST A BUSINESS',
      category: 'Business' as Category,
      tag: 'COMMERCE & SPREADSHEETS',
      desc: 'Plans that reached registered domains, spreadsheets, fabric samples, and five-year financial models without serving a first customer. The numbers remain unusually confident.',
      bg: 'bg-void',
      border: 'border-cyan',
      shadow: 'shadow-brutal-cyan',
      accent: 'text-cyan',
      btnBg: 'bg-cyan text-black hover:bg-white',
      badge: 'COMMERCE WING'
    }
  ];

  return (
    <section id="exhibitions" className="py-20 px-4 md:px-10 border-b-4 border-paper bg-panel">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 border-b-4 border-paper pb-8">
          <div>
            <span className="font-mono text-xs font-black text-acid tracking-[0.2em] uppercase block mb-3">
              01 // CURATED ARRANGEMENTS
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl text-paper tracking-tighter uppercase leading-[0.95]">
              CURATED EXHIBITIONS
            </h2>
          </div>
          <div className="font-mono text-xs font-black text-black bg-acid border-2 border-black px-4 py-2 rotate-[-2deg] shadow-brutal-pink self-start md:self-end">
            3 PERMANENT WINGS ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {wings.map((wing, idx) => (
            <article
              key={idx}
              className={`border-4 border-paper ${wing.bg} p-6 md:p-8 flex flex-col justify-between transition-all duration-200 ${wing.shadow} hover:-translate-y-2 hover:border-acid group`}
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-paper/20 pb-3 mb-6">
                  <span className="font-mono text-[10px] md:text-xs font-black text-paper/60">{wing.num}</span>
                  <span className={`font-mono text-[10px] font-black px-2 py-0.5 border border-paper ${wing.accent}`}>
                    {wing.badge}
                  </span>
                </div>

                <h3 className={`font-sans font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight leading-[0.92] mb-6 ${wing.accent}`}>
                  {wing.title}
                </h3>

                <p className="font-serif text-sm md:text-base text-paper/80 leading-relaxed mb-8">
                  {wing.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  onSelectWing(wing.category);
                }}
                className={`w-full border-2 border-black font-mono text-xs font-black py-3 px-4 flex items-center justify-between transition-all ${wing.btnBg}`}
              >
                <span>EXPLORE {wing.category.toUpperCase()} RECORDS</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
