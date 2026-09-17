import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { CuratedWings } from './components/CuratedWings';
import { RecordWall } from './components/RecordWall';
import { ReadingModal } from './components/ReadingModal';
import { IntakeModal } from './components/IntakeModal';
import { ShareModal } from './components/ShareModal';
import { CuratorDeskModal } from './components/CuratorDeskModal';
import { Toast } from './components/Toast';
import { Artifact, Category } from './types';
import { FOUNDATIONAL_RECORDS } from './data/initialRecords';
import { fetchRemoteArtifacts, insertRemoteArtifact, updateRemoteArtifactStatus } from './services/supabase';
import { getLocalStories, saveLocalStory, getLocalTributes, incrementLocalTribute } from './services/storage';

export const App: React.FC = () => {
  const [records, setRecords] = useState<Artifact[]>(FOUNDATIONAL_RECORDS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [readingArtifact, setReadingArtifact] = useState<Artifact | null>(null);
  const [sharingArtifact, setSharingArtifact] = useState<Artifact | null>(null);
  const [isIntakeOpen, setIsIntakeOpen] = useState<boolean>(false);
  const [isDeskOpen, setIsDeskOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show neon feedback toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Initial Data Sync: Foundation + LocalStorage + Supabase
  useEffect(() => {
    const initData = async () => {
      const local = getLocalStories();
      let combined = [...local, ...FOUNDATIONAL_RECORDS];

      // Fetch from Supabase
      const remote = await fetchRemoteArtifacts();
      if (remote.length > 0) {
        const existingIds = new Set(remote.map((r) => r.id));
        combined = [...remote, ...combined.filter((r) => !existingIds.has(r.id))];
      }

      // Merge stored tributes
      const tributeMap = getLocalTributes();
      const finalized = combined.map((r) => ({
        ...r,
        tributes: (r.tributes || 0) + (tributeMap[r.id] || 0)
      }));

      setRecords(finalized);

      // Check deep link hash
      const hash = decodeURIComponent(window.location.hash || '');
      if (hash.startsWith('#record=')) {
        const targetId = hash.slice(8).trim();
        const found = finalized.find((r) => r.id === targetId);
        if (found) {
          setReadingArtifact(found);
        }
      }
    };

    initData();
  }, []);

  // Handle Tribute ("Witness Intention")
  const handleTribute = (id: string) => {
    incrementLocalTribute(id);
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, tributes: (r.tributes || 0) + 1 } : r))
    );
    if (readingArtifact && readingArtifact.id === id) {
      setReadingArtifact((prev) => (prev ? { ...prev, tributes: prev.tributes + 1 } : null));
    }
    showToast(`🕯️ INTENTION WITNESSED`);
  };

  // Handle New Submission
  const handleDepositSubmit = async (newArtifact: Artifact) => {
    saveLocalStory(newArtifact);
    await insertRemoteArtifact(newArtifact);
    setRecords((prev) => [newArtifact, ...prev]);
    showToast(`ACCESSION ${newArtifact.id} PERMANENTLY STAMPED`);
  };

  // Handle Record Withdrawal
  const handleWithdraw = async (id: string) => {
    await updateRemoteArtifactStatus(id, 'Withdrawn');
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showToast(`RECORD ${id} WITHDRAWN`);
  };

  const handleSelectWing = (cat: Category) => {
    setSelectedCategory(cat);
    const el = document.getElementById('collection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-void text-paper selection:bg-acid selection:text-black font-sans relative">
      {/* Toast */}
      <Toast message={toastMessage} />

      {/* Header */}
      <Navbar
        onOpenDeposit={() => setIsIntakeOpen(true)}
        onOpenDesk={() => setIsDeskOpen(true)}
        onShowToast={showToast}
      />

      <main id="top">
        {/* Hero */}
        <Hero
          onOpenDeposit={() => setIsIntakeOpen(true)}
          onExploreClick={() => {
            document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectSpecimen={() => {
            const specimen = records.find((r) => r.id === 'A—004218') || records[0];
            setReadingArtifact(specimen);
          }}
        />

        {/* Ticker */}
        <Ticker />

        {/* Curated Wings */}
        <CuratedWings onSelectWing={handleSelectWing} />

        {/* Permanent Collection Wall */}
        <RecordWall
          records={records}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectRecord={(artifact) => setReadingArtifact(artifact)}
        />

        {/* Philosophy Credo Callout */}
        <section className="py-20 px-4 md:px-10 border-b-4 border-paper bg-panel">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <span className="font-sans font-black text-7xl md:text-9xl text-acid select-none leading-none">
              ∞
            </span>
            <div className="text-left">
              <span className="font-mono text-xs font-black text-pink uppercase tracking-widest block mb-2">
                ARCHIVAL CREDO // PERMANENT NOTE
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-paper uppercase tracking-tight leading-tight">
                Every unfinished thing is evidence that someone once imagined a finished version.
              </h2>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-10 border-t-4 border-paper bg-void text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="font-mono text-xs font-black text-acid tracking-widest uppercase block mb-1">
              THE MUSEUM OF UNFINISHED THINGS
            </span>
            <p className="font-mono text-sm text-paper/70 max-w-md mb-4">
              A public digital institution devoted to work that stopped before its intended conclusion.
            </p>
            <span className="font-mono text-[11px] text-paper/40 uppercase">
              EST. 2026 • ANONYMOUS & ATTRIBUTED RECORDS PRESERVED
            </span>
          </div>

          <div className="flex flex-wrap gap-6 font-mono text-xs font-bold text-paper/80">
            <a href="#top" className="hover:text-acid transition-colors">TOP ↑</a>
            <a href="#exhibitions" className="hover:text-acid transition-colors">EXHIBITIONS</a>
            <a href="#collection" className="hover:text-acid transition-colors">ARCHIVE</a>
            <button 
              type="button" 
              onClick={() => setIsIntakeOpen(true)}
              className="hover:text-pink transition-colors uppercase"
            >
              POST RECORD ＋
            </button>
            <a
              href="https://github.com/404existential/museum-of-unfinished-things"
              target="_blank"
              rel="noopener noreferrer"
              className="text-acid hover:underline"
            >
              GITHUB REPOSITORY ↗
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsIntakeOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-pink hover:bg-acid text-black border-3 border-paper font-mono font-black text-sm px-5 py-3 flex items-center gap-2 shadow-brutal-acid hover:shadow-brutal-cyan hover:-translate-y-1 transition-all"
        title="Leave an unfinished record in the archive"
      >
        <span>＋</span>
        <span>LEAVE A RECORD</span>
      </button>

      {/* Modals */}
      <ReadingModal
        artifact={readingArtifact}
        onClose={() => setReadingArtifact(null)}
        onTribute={handleTribute}
        onShare={(art) => {
          setReadingArtifact(null);
          setSharingArtifact(art);
        }}
      />

      <IntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onSubmit={handleDepositSubmit}
        onViewRecord={(art) => setReadingArtifact(art)}
      />

      <ShareModal
        artifact={sharingArtifact}
        onClose={() => setSharingArtifact(null)}
        onShowToast={showToast}
      />

      <CuratorDeskModal
        isOpen={isDeskOpen}
        onClose={() => setIsDeskOpen(false)}
        records={records}
        onWithdrawRecord={handleWithdraw}
        onSelectRecord={(art) => setReadingArtifact(art)}
        onShowToast={showToast}
      />
    </div>
  );
};

export default App;
