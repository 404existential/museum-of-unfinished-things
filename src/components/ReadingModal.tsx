import React, { useState, useEffect } from 'react';
import { X, Share2, Flame, Copy, Check, Clock } from 'lucide-react';
import { Artifact } from '../types';
import { sound } from '../services/audio';

interface ReadingModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onTribute: (id: string) => void;
  onShare: (artifact: Artifact) => void;
  onShowToast?: (msg: string) => void;
  isWitnessed?: boolean;
}

export const ReadingModal: React.FC<ReadingModalProps> = ({
  artifact,
  onClose,
  onTribute,
  onShare,
  onShowToast,
  isWitnessed = false
}) => {
  const [burst, setBurst] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    if (!artifact) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artifact, onClose]);

  if (!artifact) return null;

  // Calculate words and estimated reading time
  const fullContent = `${artifact.text || ''} ${artifact.description || ''}`.trim();
  const wordCount = fullContent ? fullContent.split(/\s+/).length : 0;
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 180));

  const handleWitnessClick = () => {
    sound.play('witness');
    onTribute(artifact.id);
    setBurst(true);
    setTimeout(() => setBurst(false), 1000);
  };

  const handleCopyQuote = () => {
    const quoteText = `"${artifact.note || artifact.description}"\n— Accession ${artifact.id} (${artifact.title}), preserved in The Museum of Unfinished Things.`;
    navigator.clipboard?.writeText(quoteText).then(() => {
      sound.play('click');
      setCopiedQuote(true);
      if (onShowToast) onShowToast('Archival marginalia copied to clipboard');
      setTimeout(() => setCopiedQuote(false), 2400);
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto cursor-pointer"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.play('click');
          onClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-void border-4 border-paper p-6 md:p-12 shadow-brutal-modal max-h-[90vh] overflow-y-auto my-auto text-left cursor-default"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.play('click');
            onClose();
          }}
          className="absolute right-4 md:right-8 top-4 md:top-8 w-10 h-10 border-2 border-paper bg-panel text-paper hover:bg-pink hover:text-black flex items-center justify-center font-mono font-black transition-colors z-20"
          aria-label="Close record"
          title="Close (Esc)"
        >
          <X className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Accession Header */}
        <div className="border-b-4 border-acid pb-6 mb-8 pr-12">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="font-mono text-xs md:text-sm font-black text-acid tracking-widest uppercase">
              ACCESSION {artifact.id}
            </span>
            {isWitnessed && (
              <span className="bg-acid text-black font-mono font-black text-[10px] px-2 py-0.5 border border-black uppercase flex items-center gap-1">
                <span>🕯️</span>
                <span>WITNESSED BY YOU</span>
              </span>
            )}
            <span className="font-mono text-[10px] text-paper/50 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readTimeMin} MIN READ // {wordCount} WORDS</span>
            </span>
          </div>
          <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl text-paper uppercase tracking-tight leading-[0.92]">
            {artifact.title}
          </h2>
        </div>

        {/* Provenance Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-3 border-paper bg-panel p-4 md:p-6 mb-8 font-mono text-xs">
          <div>
            <span className="text-paper/60 uppercase block text-[10px]">CATEGORY</span>
            <strong className="text-acid font-black text-sm uppercase">{artifact.category}</strong>
          </div>
          <div>
            <span className="text-paper/60 uppercase block text-[10px]">STARTED</span>
            <strong className="text-paper font-black text-sm">{artifact.year}</strong>
          </div>
          <div>
            <span className="text-paper/60 uppercase block text-[10px]">STATUS</span>
            <strong className="text-pink font-black text-sm uppercase">{artifact.status}</strong>
          </div>
          <div>
            <span className="text-paper/60 uppercase block text-[10px]">CONTRIBUTOR</span>
            <strong className="text-cyan font-black text-sm">{artifact.username}</strong>
          </div>
        </div>

        {/* Story Body */}
        <div className="font-sans text-base md:text-xl text-paper/95 leading-relaxed space-y-6 mb-10 whitespace-pre-line font-medium">
          {artifact.text || artifact.description}
        </div>

        {/* Why it stopped Marginalia Box */}
        <div className="border-l-6 border-pink bg-panel p-6 mb-10 relative">
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="font-mono text-xs font-black text-pink uppercase tracking-widest block">
              WHY IT STOPPED // MARGINALIA
            </span>
            <button
              type="button"
              onClick={handleCopyQuote}
              className="font-mono text-[11px] font-black text-paper/70 hover:text-acid flex items-center gap-1.5 transition-colors border border-paper/30 px-2 py-0.5 bg-black"
              title="Copy marginalia quote to clipboard"
            >
              {copiedQuote ? <Check className="w-3 h-3 text-acid" /> : <Copy className="w-3 h-3" />}
              <span>{copiedQuote ? 'COPIED!' : 'COPY QUOTE'}</span>
            </button>
          </div>
          <p className="font-serif italic text-base md:text-lg text-paper/90 leading-normal">
            "{artifact.note || 'The circumstances under which intention ceased were not documented.'}"
          </p>
        </div>

        {/* Modal Actions */}
        <div className="relative flex flex-wrap items-center justify-between gap-4 border-t-3 border-paper/30 pt-6">
          {/* Floating particle burst indicator */}
          {burst && (
            <div className="absolute -top-10 left-6 z-30 pointer-events-none animate-bounce">
              <div className="bg-acid text-black font-mono font-black text-sm px-4 py-1.5 border-2 border-black shadow-brutal-pink rotate-[-3deg]">
                +1 INTENTION WITNESSED 🔥
              </div>
            </div>
          )}

          {/* Upgraded Witness Intention Button */}
          <button
            type="button"
            onClick={handleWitnessClick}
            className={`border-3 border-black font-mono font-black text-xs md:text-sm px-7 py-3.5 flex items-center gap-2.5 transition-all shadow-brutal-pink hover:-translate-y-0.5 ${
              isWitnessed
                ? 'bg-acid hover:bg-white text-black ring-2 ring-acid ring-offset-2 ring-offset-void'
                : 'bg-acid hover:bg-white text-black'
            }`}
            title="Honor and witness this unfinished work"
          >
            <Flame className="w-5 h-5 fill-black animate-pulse text-black" />
            <span>
              {isWitnessed ? 'WITNESS AGAIN' : 'WITNESS INTENTION'} ({artifact.tributes})
            </span>
            {isWitnessed && (
              <span className="text-[10px] bg-black text-acid px-1.5 py-0.5 border border-acid">
                ✓ LIT
              </span>
            )}
          </button>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                sound.play('click');
                onShare(artifact);
              }}
              className="border-2 border-paper bg-panel text-paper hover:bg-cyan hover:text-black hover:border-cyan font-mono font-black text-xs md:text-sm px-5 py-3 flex items-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>SHARE CARD</span>
            </button>

            <button
              type="button"
              onClick={() => {
                sound.play('click');
                onClose();
              }}
              className="border-2 border-paper bg-transparent text-paper hover:bg-paper hover:text-black font-mono font-black text-xs md:text-sm px-5 py-3 transition-all"
            >
              RETURN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

