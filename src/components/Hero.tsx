import React from 'react';
import { ArrowDownRight, Plus, Sparkles } from 'lucide-react';
import { sound } from '../services/audio';

interface HeroProps {
  onOpenDeposit: () => void;
  onExploreClick: () => void;
  onSelectSpecimen: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDeposit, onExploreClick, onSelectSpecimen }) => {
  return (
    <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24 px-4 md:px-10 border-b-4 border-paper bg-void">
      {/* Massive Ghost Watermark in Background */}
      <div 
        aria-hidden="true" 
        className="absolute -right-10 top-0 text-[18vw] font-sans font-black tracking-tighter text-white/[0.03] select-none pointer-events-none leading-none z-0"
      >
        ARCHIVE
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Headline */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 bg-acid text-black font-mono font-black text-xs px-3 py-1 mb-6 border-2 border-black rotate-[-2deg] shadow-brutal-pink">
            <Sparkles className="w-3.5 h-3.5" />
            <span>A PUBLIC DIGITAL ARCHIVE // EST. 2026</span>
          </div>

          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-paper uppercase leading-[0.92] mb-8">
            Everything here was once <span className="text-acid underline decoration-pink decoration-wavy decoration-4">intended</span> to become something else.
          </h1>

          <p className="font-mono text-paper/80 text-sm md:text-lg max-w-2xl leading-relaxed mb-10">
            Software, novels, albums, businesses, films, prototypes and experiments that stopped somewhere before the end. The museum does not preserve success—it preserves evidence of human intention.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => {
                sound.play('click');
                onExploreClick();
              }}
              className="border-3 border-paper bg-paper text-black hover:bg-acid hover:border-black font-mono font-black text-sm md:text-base px-6 py-3.5 flex items-center gap-3 shadow-brutal-cyan hover:shadow-brutal-pink hover:-translate-y-1 transition-all"
            >
              <span>ENTER THE ARCHIVE</span>
              <ArrowDownRight className="w-5 h-5 stroke-[3]" />
            </button>

            <button
              type="button"
              onClick={() => {
                sound.play('thud');
                onOpenDeposit();
              }}
              className="border-3 border-paper bg-panel text-paper hover:bg-pink hover:text-black hover:border-black font-mono font-black text-sm md:text-base px-6 py-3.5 flex items-center gap-3 shadow-brutal-acid hover:shadow-brutal-cyan hover:-translate-y-1 transition-all"
            >
              <Plus className="w-5 h-5 stroke-[3]" />
              <span>LEAVE A RECORD</span>
            </button>
          </div>
        </div>

        {/* Right Floating Specimen Record */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              sound.play('paper');
              onSelectSpecimen();
            }}
            className="w-full max-w-sm cursor-pointer group relative transition-all duration-300 transform hover:-translate-y-3 hover:rotate-0 rotate-2"
          >
            {/* Background layered sheets for 3D maximalist depth */}
            <div className="absolute inset-0 bg-cyan border-3 border-paper transform -rotate-3 translate-x-3 translate-y-3 shadow-brutal-pink group-hover:rotate-0 transition-transform"></div>
            <div className="absolute inset-0 bg-orange border-3 border-paper transform rotate-4 -translate-x-2 -translate-y-2 group-hover:rotate-0 transition-transform"></div>

            {/* Front Specimen Card */}
            <div className="relative bg-panel border-4 border-paper p-6 md:p-8 text-left shadow-brutal-acid">
              {/* Slanted Hazard Tape */}
              <div className="absolute -right-8 top-5 bg-acid text-black border-2 border-black font-mono font-black text-[10px] tracking-widest px-8 py-1 rotate-45 shadow-sm">
                UNFINISHED
              </div>

              <div className="flex items-center justify-between border-b-2 border-paper/30 pb-3 mb-4">
                <span className="font-mono text-xs font-black text-acid">SPECIMEN // 004218</span>
                <span className="font-mono text-[10px] font-bold text-paper/60 uppercase">SOFTWARE</span>
              </div>

              <h3 className="font-sans font-black text-2xl md:text-3xl text-paper uppercase tracking-tight leading-tight mb-4 group-hover:text-pink transition-colors">
                A RECORD WITHOUT AN END
              </h3>

              <p className="font-serif text-sm text-paper/70 italic leading-relaxed mb-6">
                "By version fourteen the personal site had an identity, an archive, and a button leading nowhere. The domain expired before the button was given a purpose."
              </p>

              <div className="border-t-2 border-paper/30 pt-3 flex items-center justify-between font-mono text-xs font-bold text-cyan">
                <span>STATUS: UNATTENDED</span>
                <span className="group-hover:translate-x-1 transition-transform">INSPECT ↗</span>
              </div>
            </div>
          </div>
          <span className="font-mono text-[11px] text-muted tracking-widest uppercase mt-6">
            CLICK SPECIMEN TO INSPECT PROVENANCE
          </span>
        </div>
      </div>
    </section>
  );
};
