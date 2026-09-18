import React, { useState, useMemo } from 'react';
import { Search, X, RefreshCw, Dices, Flame } from 'lucide-react';
import { Artifact, SortOption } from '../types';
import { CATEGORIES_LIST } from '../data/initialRecords';
import { RecordCard } from './RecordCard';
import { sound } from '../services/audio';

interface RecordWallProps {
  records: Artifact[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectRecord: (artifact: Artifact) => void;
  onTribute?: (id: string) => void;
  onRandomRecord?: () => void;
  userWitnessedIds?: Set<string>;
}

export const RecordWall: React.FC<RecordWallProps> = ({
  records,
  selectedCategory,
  onSelectCategory,
  onSelectRecord,
  onTribute,
  onRandomRecord,
  userWitnessedIds = new Set()
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('accession-desc');
  const [onlyWitnessed, setOnlyWitnessed] = useState(false);

  const filteredRecords = useMemo(() => {
    // Normalizer to handle unicode em-dash and regular hyphens interchangeably
    const normalize = (str: string) => str.replace(/[—–-]/g, '-').toLowerCase();
    const qNorm = normalize(searchQuery.trim());

    let result = records.filter((r) => {
      // Category filter
      const matchCategory = selectedCategory === 'All' || r.category.toLowerCase() === selectedCategory.toLowerCase();
      
      // Witnessed filter
      const matchWitnessed = !onlyWitnessed || userWitnessedIds.has(r.id);

      // Search match
      const searchableContent = normalize(
        `${r.id} ${r.title} ${r.category} ${r.year} ${r.description} ${r.text} ${r.username} ${r.note}`
      );
      const matchSearch = !qNorm || searchableContent.includes(qNorm);

      return matchCategory && matchWitnessed && matchSearch;
    });

    // Sorting with bug fixes
    result.sort((a, b) => {
      if (sortOption === 'accession-desc') {
        return b.id.localeCompare(a.id);
      }
      if (sortOption === 'year-asc') {
        return parseInt(a.year || '0', 10) - parseInt(b.year || '0', 10);
      }
      if (sortOption === 'year-desc') {
        return parseInt(b.year || '0', 10) - parseInt(a.year || '0', 10);
      }
      if (sortOption === 'tributes-desc') {
        return (b.tributes || 0) - (a.tributes || 0);
      }
      return 0;
    });

    return result;
  }, [records, selectedCategory, searchQuery, sortOption, onlyWitnessed, userWitnessedIds]);

  const totalWitnessCount = useMemo(() => {
    return records.reduce((acc, curr) => acc + (curr.tributes || 0), 0);
  }, [records]);

  return (
    <section id="collection" className="relative py-24 px-4 md:px-10 border-b-4 border-paper bg-void overflow-hidden">
      {/* Background Giant Watermark */}
      <div 
        aria-hidden="true" 
        className="absolute right-2 top-10 text-[22vw] font-sans font-black tracking-tighter text-white/[0.02] select-none pointer-events-none leading-none z-0"
      >
        ARCHIVE
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="border-b-8 border-paper pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-left">
            <span className="font-mono text-xs md:text-sm font-black text-acid tracking-[0.2em] uppercase block mb-3">
              02 // THE PERMANENT ARCHIVE
            </span>
            <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-paper tracking-tight uppercase leading-[0.88]">
              RECORDS IN THE ARCHIVE
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            <div className="font-mono text-xs md:text-sm font-black bg-acid text-black border-3 border-black px-4 py-2.5 rotate-[-2deg] shadow-brutal-pink whitespace-nowrap flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-black text-black" />
              <span>{totalWitnessCount} WITNESSED</span>
            </div>
            <div className="font-mono text-xs md:text-sm font-black bg-pink text-black border-3 border-paper px-4 py-2.5 rotate-[1.5deg] shadow-brutal-cyan whitespace-nowrap">
              {records.length} STORIES HELD
            </div>
          </div>
        </div>

        {/* Search and Filters Toolbar */}
        <div className="bg-panel border-4 border-paper p-6 md:p-8 mb-16 shadow-brutal-acid rotate-[-0.5deg]">
          {/* Search Bar & Random Record Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="flex items-center border-b-4 border-acid bg-black/70 px-4 py-3">
                <Search className="w-5 h-5 text-acid mr-3 shrink-0" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="search by title, category, accession, author, or fragment..."
                  className="w-full bg-transparent font-mono text-base md:text-lg text-paper outline-none placeholder:text-paper/40"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-paper hover:text-pink p-1 ml-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Serendipity / Random Record Trigger */}
            {onRandomRecord && (
              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  onRandomRecord();
                }}
                className="border-2 border-black bg-acid hover:bg-white text-black font-mono font-black text-xs md:text-sm px-5 py-3 flex items-center justify-center gap-2 shadow-sm transition-all self-stretch sm:self-auto shrink-0"
                title="Open a random unfinished record from the archive"
              >
                <Dices className="w-4 h-4" />
                <span>RANDOM RECORD</span>
              </button>
            )}
          </div>

          {/* Category Chips, Witnessed Filter, and Sort Dropdown */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              {CATEGORIES_LIST.map((cat) => {
                const isActive = selectedCategory === cat && !onlyWitnessed;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      sound.play('click');
                      setOnlyWitnessed(false);
                      onSelectCategory(cat);
                    }}
                    className={`border-2 border-paper font-mono text-[11px] md:text-xs font-black px-3.5 py-1.5 uppercase transition-all ${
                      isActive
                        ? 'bg-paper text-black shadow-brutal-pink -translate-y-0.5'
                        : 'bg-black text-paper hover:bg-acid hover:text-black hover:border-acid'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}

              {/* Filter: Witnessed By Me */}
              <button
                type="button"
                onClick={() => {
                  sound.play('click');
                  setOnlyWitnessed(!onlyWitnessed);
                }}
                className={`border-2 font-mono text-[11px] md:text-xs font-black px-3.5 py-1.5 uppercase transition-all flex items-center gap-1.5 ${
                  onlyWitnessed
                    ? 'bg-acid text-black border-black shadow-brutal-pink -translate-y-0.5'
                    : 'bg-black text-acid border-acid hover:bg-acid hover:text-black'
                }`}
                title="Show only records you have witnessed"
              >
                <Flame className={`w-3.5 h-3.5 ${onlyWitnessed ? 'fill-black' : 'fill-acid'}`} />
                <span>WITNESSED ({userWitnessedIds.size})</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-paper/60 uppercase">SORT:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-black text-paper border-2 border-paper font-mono text-xs font-black px-3 py-1.5 uppercase outline-none cursor-pointer hover:border-acid"
              >
                <option value="accession-desc">Newest Accession</option>
                <option value="year-asc">Oldest Year</option>
                <option value="year-desc">Most Recent Year</option>
                <option value="tributes-desc">Most Witnessed 🕯️</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collection Grid */}
        {filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 items-start">
            {filteredRecords.map((artifact, index) => (
              <RecordCard
                key={artifact.id}
                artifact={artifact}
                index={index}
                onSelect={onSelectRecord}
                onTribute={onTribute}
                isWitnessed={userWitnessedIds.has(artifact.id)}
              />
            ))}
          </div>
        ) : (
          <div className="border-4 border-dashed border-paper/40 p-16 text-center my-12 bg-panel">
            <span className="font-mono text-xs font-black text-pink uppercase tracking-widest block mb-2">
              ZERO MATCHES
            </span>
            <h3 className="font-sans font-black text-3xl md:text-4xl text-paper uppercase mb-4">
              NO RECORDS FOUND IN THIS SECTOR
            </h3>
            <p className="font-serif text-paper/70 max-w-md mx-auto mb-8">
              {onlyWitnessed
                ? 'You have not witnessed any records matching the current filters yet. Honor an intention to populate this view.'
                : 'The requested title, fragment or category is not presently registered in the collection.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setOnlyWitnessed(false);
                onSelectCategory('All');
              }}
              className="border-2 border-black bg-acid hover:bg-pink text-black font-mono text-xs font-black px-6 py-3 flex items-center gap-2 mx-auto shadow-brutal-pink transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>CLEAR SEARCH & FILTERS</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

