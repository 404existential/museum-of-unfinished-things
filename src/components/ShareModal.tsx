import React, { useRef, useEffect } from 'react';
import { X, Download, Copy, Share2 } from 'lucide-react';
import { Artifact } from '../types';
import { sound } from '../services/audio';

interface ShareModalProps {
  artifact: Artifact | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ artifact, onClose, onShowToast }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!artifact || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background Void
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, w, h);

    // Thick Brutalist Outer Border
    ctx.strokeStyle = '#f5f2e8';
    ctx.lineWidth = 14;
    ctx.strokeRect(7, 7, w - 14, h - 14);

    // Inner Acid Line
    ctx.strokeStyle = '#d7ff00';
    ctx.lineWidth = 4;
    ctx.strokeRect(28, 28, w - 56, h - 56);

    // Giant Ghost Typography
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.font = '900 130px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('UNFINISHED', 60, 240);

    // Header Wordmark
    ctx.fillStyle = '#d7ff00';
    ctx.font = '900 18px "JetBrains Mono", monospace';
    ctx.letterSpacing = '4px';
    ctx.fillText('THE MUSEUM OF UNFINISHED THINGS // PUBLIC RECORD', 60, 85);

    // Stamped Accession Badge
    ctx.fillStyle = '#ff3b9d';
    ctx.fillRect(60, 115, 240, 48);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeRect(60, 115, 240, 48);
    ctx.fillStyle = '#000000';
    ctx.font = '900 24px "JetBrains Mono", monospace';
    ctx.fillText(artifact.id, 75, 148);

    // Record Title
    ctx.fillStyle = '#f5f2e8';
    ctx.font = '900 56px "Plus Jakarta Sans", sans-serif';
    let titleStr = artifact.title.toUpperCase();
    if (titleStr.length > 28) titleStr = titleStr.slice(0, 26) + '...';
    ctx.fillText(titleStr, 60, 235);

    // Category / Started
    ctx.fillStyle = '#27e7ff';
    ctx.font = '800 20px "JetBrains Mono", monospace';
    ctx.fillText(`${artifact.category.toUpperCase()} // STARTED ${artifact.year} // ${artifact.status.toUpperCase()}`, 60, 285);

    // Divider
    ctx.strokeStyle = '#f5f2e8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(60, 320);
    ctx.lineTo(w - 60, 320);
    ctx.stroke();

    // Narrative Quote Excerpt
    ctx.fillStyle = '#dddddd';
    ctx.font = 'italic 26px "Playfair Display", serif';
    const quote = (artifact.note || artifact.description || artifact.text).replace(/\n/g, ' ').slice(0, 130) + '...';
    ctx.fillText(`"${quote}"`, 60, 385, w - 120);

    // Footer Credo
    ctx.fillStyle = '#ff6b00';
    ctx.font = '900 18px "JetBrains Mono", monospace';
    ctx.fillText(`CONTRIBUTOR: ${artifact.username.toUpperCase()} • EVIDENCE OF INTENTION PRESERVED`, 60, 520);

    // Slanted Hazard Stamp in Corner
    ctx.save();
    ctx.translate(w - 180, 100);
    ctx.rotate((25 * Math.PI) / 180);
    ctx.fillStyle = '#d7ff00';
    ctx.fillRect(-150, -25, 300, 50);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 4;
    ctx.strokeRect(-150, -25, 300, 50);
    ctx.fillStyle = '#000000';
    ctx.font = '900 22px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('UNFINISHED // ARCHIVE', 0, 8);
    ctx.restore();
  }, [artifact]);

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

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `museum-record-${artifact.id}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    sound.play('click');
    onShowToast('Archival certificate downloaded');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#record=${encodeURIComponent(artifact.id)}`;
    navigator.clipboard?.writeText(url).then(() => {
      sound.play('click');
      onShowToast('Citation link copied to clipboard');
    });
  };

  const handleShareX = () => {
    const url = `${window.location.origin}${window.location.pathname}#record=${encodeURIComponent(artifact.id)}`;
    const text = `"${artifact.title}" (${artifact.id}) — preserved in The Museum of Unfinished Things. Everything here was once intended to become something else.`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank', 'noopener');
  };

  const handleShareWhatsApp = () => {
    const url = `${window.location.origin}${window.location.pathname}#record=${encodeURIComponent(artifact.id)}`;
    const text = `*${artifact.title}* (${artifact.id})\nPreserved in The Museum of Unfinished Things:\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
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
        className="relative w-full max-w-3xl bg-void border-4 border-paper p-6 md:p-8 shadow-brutal-modal my-auto text-left cursor-default"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => {
            sound.play('click');
            onClose();
          }}
          className="absolute right-4 top-4 w-9 h-9 border-2 border-paper bg-panel text-paper hover:bg-pink hover:text-black flex items-center justify-center font-mono font-black"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        <span className="font-mono text-xs font-black text-cyan tracking-widest uppercase block mb-1">
          SHARE RECORD
        </span>
        <h2 className="font-sans font-black text-2xl sm:text-3xl text-paper uppercase tracking-tight mb-4">
          ARCHIVAL POSTER CERTIFICATE
        </h2>

        {/* Canvas Display */}
        <div className="border-3 border-paper overflow-hidden mb-6 shadow-brutal-pink">
          <canvas
            ref={canvasRef}
            width={1200}
            height={630}
            className="w-full h-auto block"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            type="button"
            onClick={handleDownload}
            className="border-2 border-black bg-acid hover:bg-white text-black font-mono font-black text-xs py-3 px-2 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD PNG</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="border-2 border-paper bg-panel text-paper hover:bg-pink hover:text-black font-mono font-black text-xs py-3 px-2 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Copy className="w-4 h-4" />
            <span>COPY LINK</span>
          </button>

          <button
            type="button"
            onClick={handleShareX}
            className="border-2 border-paper bg-panel text-paper hover:bg-cyan hover:text-black font-mono font-black text-xs py-3 px-2 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>POST TO X</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="border-2 border-paper bg-panel text-paper hover:bg-orange hover:text-black font-mono font-black text-xs py-3 px-2 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>WHATSAPP</span>
          </button>
        </div>
      </div>
    </div>
  );
};
