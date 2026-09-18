import React, { useState, useEffect } from 'react';
import { X, Plus, CheckCircle } from 'lucide-react';
import { Artifact, Category } from '../types';
import { CATEGORIES_LIST } from '../data/initialRecords';
import { RecordCard } from './RecordCard';
import { sound } from '../services/audio';

interface IntakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (artifact: Artifact) => Promise<void>;
  onViewRecord: (artifact: Artifact) => void;
}

export const IntakeModal: React.FC<IntakeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onViewRecord
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Writing');
  const [year, setYear] = useState('2024');
  const [reason, setReason] = useState('');
  const [story, setStory] = useState('');
  const [username, setUsername] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedArtifact, setSubmittedArtifact] = useState<Artifact | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleReset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  // Real-time Preview Artifact
  const previewArtifact: Artifact = {
    id: submittedArtifact ? submittedArtifact.id : 'A—PROVISIONAL',
    title: title.trim() || 'UNTITLED RECORD',
    category,
    year: year || '2024',
    status: 'Published',
    visualColor: 'acid',
    shadowColor: 'pink',
    rotation: '-1.4deg',
    description: reason.trim() || 'The circumstances under which intention ceased...',
    text: story.trim() || 'Your story fragment will be preserved here...',
    note: reason.trim() || 'Work paused before conclusion.',
    username: isAnonymous ? 'Anonymous' : username.trim() || 'Anonymous',
    tributes: 1
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !story.trim() || !reason.trim()) return;

    setIsSubmitting(true);
    sound.play('thud');

    const randomAccession = 'A—' + String(Math.floor(1000000 + Math.random() * 9000000));
    const colors: ('pink' | 'acid' | 'cyan' | 'orange' | 'purple')[] = ['pink', 'acid', 'cyan', 'orange', 'purple'];
    const assignedVisual = colors[Math.floor(Math.random() * colors.length)];
    const assignedShadow = colors[Math.floor(Math.random() * colors.length)];

    const newArtifact: Artifact = {
      id: randomAccession,
      title: title.trim(),
      category,
      year: year.trim() || String(new Date().getFullYear()),
      status: 'Published',
      visualColor: assignedVisual,
      shadowColor: assignedShadow,
      rotation: `${(Math.random() * 4 - 2).toFixed(1)}deg`,
      description: reason.trim(),
      text: story.trim(),
      note: reason.trim(),
      username: isAnonymous ? 'Anonymous' : username.trim() || 'Anonymous',
      tributes: 1
    };

    await onSubmit(newArtifact);
    sound.play('chime');
    setSubmittedArtifact(newArtifact);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setTitle('');
    setCategory('Writing');
    setYear('2024');
    setReason('');
    setStory('');
    setUsername('');
    setIsAnonymous(false);
    setSubmittedArtifact(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto cursor-pointer"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.play('click');
          handleReset();
        }
      }}
    >
      <div 
        className="relative w-full max-w-5xl bg-void border-4 border-paper p-6 md:p-10 shadow-brutal-modal max-h-[92vh] overflow-y-auto my-auto text-left cursor-default"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            sound.play('click');
            handleReset();
          }}
          className="absolute right-4 md:right-8 top-4 md:top-8 w-10 h-10 border-2 border-paper bg-panel text-paper hover:bg-pink hover:text-black flex items-center justify-center font-mono font-black"
          aria-label="Close deposit intake"
        >
          <X className="w-6 h-6 stroke-[3]" />
        </button>

        {!submittedArtifact ? (
          <div>
            <div className="border-b-4 border-paper pb-4 mb-8">
              <span className="font-mono text-xs font-black text-pink tracking-widest uppercase block mb-1">
                ARCHIVE INTAKE // NEW RECORD
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-5xl text-paper uppercase tracking-tight">
                LEAVE A RECORD IN THE ARCHIVE
              </h2>
              <p className="font-mono text-paper/70 text-xs md:text-sm mt-2">
                Document what stopped before the end. Nothing here is required to be finished.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Form Column */}
              <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-5">
                <div>
                  <label className="font-mono text-xs font-black text-paper uppercase block mb-1">
                    TITLE OF UNFINISHED WORK *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., The Third Version of a Novel"
                    className="w-full bg-panel border-2 border-paper px-4 py-2.5 font-sans font-bold text-paper outline-none focus:border-acid"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs font-black text-paper uppercase block mb-1">
                      CATEGORY *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full bg-panel border-2 border-paper px-3 py-2.5 font-mono text-xs font-black text-paper outline-none focus:border-acid"
                    >
                      {CATEGORIES_LIST.filter((c) => c !== 'All').map((c) => (
                        <option key={c} value={c}>{c.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-mono text-xs font-black text-paper uppercase block mb-1">
                      YEAR BEGAN
                    </label>
                    <input
                      type="number"
                      min={1900}
                      max={2100}
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full bg-panel border-2 border-paper px-3 py-2.5 font-mono text-xs font-black text-paper outline-none focus:border-acid"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs font-black text-acid uppercase block mb-1">
                    WHY DID IT STOP? *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Exams, rent, lack of capital, loss of momentum, or the spark vanished..."
                    className="w-full bg-panel border-2 border-paper p-3 font-sans text-sm text-paper outline-none focus:border-acid"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs font-black text-paper uppercase block mb-1">
                    THE STORY // SURVIVING FRAGMENTS *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    placeholder="Write what survived. Chapter outlines, the first scene, chord notes, or the last thing you remember..."
                    className="w-full bg-panel border-2 border-paper p-3 font-sans text-sm text-paper outline-none focus:border-acid"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="font-mono text-xs font-black text-paper uppercase block mb-1">
                      CONTRIBUTOR HANDLE
                    </label>
                    <input
                      type="text"
                      disabled={isAnonymous}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username or Moniker"
                      className="w-full bg-panel border-2 border-paper px-3 py-2 font-mono text-xs text-paper outline-none disabled:opacity-40"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-4">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 accent-pink"
                    />
                    <span className="font-mono text-xs font-black text-paper uppercase">
                      KEEP ANONYMOUS
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="border-3 border-black bg-pink hover:bg-acid text-black font-mono font-black text-sm px-8 py-3.5 flex items-center gap-2 shadow-brutal-acid hover:shadow-brutal-cyan transition-all"
                  >
                    <Plus className="w-5 h-5 stroke-[3]" />
                    <span>{isSubmitting ? 'STAMPING...' : 'STAMP INTO ARCHIVE'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="border-2 border-paper text-paper hover:bg-panel font-mono text-xs font-bold px-5 py-3"
                  >
                    CANCEL
                  </button>
                </div>
              </form>

              {/* Real-time Preview Column */}
              <div className="lg:col-span-5 hidden lg:block">
                <span className="font-mono text-[10px] font-black text-acid tracking-widest uppercase block mb-3">
                  REAL-TIME ARCHIVAL CARD PREVIEW
                </span>
                <div className="pointer-events-none transform scale-95 origin-top">
                  <RecordCard
                    artifact={previewArtifact}
                    index={0}
                    onSelect={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Stamped Receipt Screen */
          <div className="text-center py-12 px-4 max-w-xl mx-auto">
            <CheckCircle className="w-16 h-16 text-acid mx-auto mb-4 animate-bounce" />
            <span className="font-mono text-xs font-black text-acid tracking-widest uppercase block mb-2">
              ACCESSION CONFIRMED // INTENTION PRESERVED
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-5xl text-paper uppercase tracking-tight mb-4">
              RECORD REGISTERED
            </h2>
            <div className="border-4 border-black bg-acid text-black font-mono font-black text-3xl sm:text-4xl py-4 px-6 my-6 rotate-[-2deg] shadow-brutal-pink inline-block">
              {submittedArtifact.id}
            </div>
            <p className="font-serif text-paper/80 text-base mb-8">
              "{submittedArtifact.title}" has been permanently stamped into the museum register.
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  const art = submittedArtifact;
                  handleReset();
                  onViewRecord(art);
                }}
                className="border-3 border-black bg-pink hover:bg-cyan text-black font-mono font-black text-xs md:text-sm px-6 py-3 shadow-brutal-white"
              >
                VIEW IN READING ROOM ↗
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="border-2 border-paper bg-panel text-paper hover:bg-white hover:text-black font-mono font-black text-xs md:text-sm px-6 py-3"
              >
                RETURN TO ARCHIVE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
