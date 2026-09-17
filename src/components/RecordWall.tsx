import React, { useState, useMemo } from 'react';
import { Search, X, RefreshCw } from 'lucide-react';
import { Artifact, SortOption } from '../types';
import { CATEGORIES_LIST } from '../data/initialRecords';
import { RecordCard } from './RecordCard';
import { sound } from '../services/audio';

interface RecordWallProps {
  records: Artifact[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onSelectRecord: (artifact: Artifact) => void;
}

export const RecordWall: React.FC<RecordWallProps> = ({
  records,
  selectedCategory,
  onSelectCategory,
  onSelectRecord
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('accession-desc');

  const filteredRecords = useMemo(() => {
    let result = records.filter((r) => {
      const matchCategory = selectedCategory === 'All' || r.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        `${r.id} ${r.title} ${r.category} ${r.year} ${r.description} ${r.text} ${r.username} ${r.note}`
          .toLowerCase()
          .includes(q);
      return matchCategory && matchSearch;
    });

    // Sorting
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
  }, [records, selectedCategory, searchQuery, sortOption]);

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

          <div className="font-mono text-xs md:text-sm font-black bg-pink text-black border-3 border-paper px-4 py-2.5 rotate-[-3deg] shadow-brutal-cyan self-start md:self-end whitespace-nowrap">
            {records.length} STORIES HELD
          </div>
        </div>

        {/* Search and Filters Toolbar */}
        <div className="bg-panel border-4 border-paper p-6 md:p-8 mb-16 shadow-brutal-acid rotate-[-0.5deg]">
          {/* Search Bar */}
          <div className="relative mb-6">
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

          {/* Category Chips and Sort Dropdown */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES_LIST.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      sound.play('click');
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
              The requested title, fragment or category is not presently registered in the collection.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
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
