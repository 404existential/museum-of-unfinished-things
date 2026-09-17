import React from 'react';
import { X, Share2, Flame } from 'lucide-react';
import { Artifact } from '../types';
import { sound } from '../services/audio';

interface ReadingModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onTribute: (id: string) => void;
  onShare: (artifact: Artifact) => void;
}

export const ReadingModal: React.FC<ReadingModalProps> = ({
  artifact,
  onClose,
  onTribute,
  onShare
}) => {
  if (!artifact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-void border-4 border-paper p-6 md:p-12 shadow-brutal-modal max-h-[90vh] overflow-y-auto my-auto text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.play('click');
            onClose();
          }}
          className="absolute right-4 md:right-8 top-4 md:top-8 w-10 h-10 border-2 border-paper bg-panel text-paper hover:bg-pink hover:text-black flex items-center justify-center font-mono font-black transition-colors"
          aria-label="Close record"
        >
          <X className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Accession Header */}
        <div className="border-b-4 border-acid pb-6 mb-8 pr-12">
          <span className="font-mono text-xs md:text-sm font-black text-acid tracking-widest uppercase block mb-2">
            ACCESSION {artifact.id}
          </span>
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
        <div className="border-l-6 border-pink bg-panel p-6 mb-10">
          <span className="font-mono text-xs font-black text-pink uppercase tracking-widest block mb-2">
            WHY IT STOPPED // MARGINALIA
          </span>
          <p className="font-serif italic text-base md:text-lg text-paper/90 leading-normal">
            "{artifact.note || 'The circumstances under which intention ceased were not documented.'}"
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t-3 border-paper/30 pt-6">
          <button
            type="button"
            onClick={() => {
              sound.play('chime');
              onTribute(artifact.id);
            }}
            className="border-2 border-black bg-acid hover:bg-white text-black font-mono font-black text-xs md:text-sm px-6 py-3 flex items-center gap-2 shadow-brutal-pink hover:-translate-y-0.5 transition-all"
          >
            <Flame className="w-4 h-4 fill-black" />
            <span>WITNESS INTENTION ({artifact.tributes})</span>
          </button>

          <div className="flex gap-3">
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
