import React, { useState } from 'react';
import { X, ShieldAlert, Trash2, Eye, Download, CheckSquare } from 'lucide-react';
import { Artifact } from '../types';
import { sound } from '../services/audio';

interface CuratorDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: Artifact[];
  onWithdrawRecord: (id: string) => Promise<void>;
  onSelectRecord: (artifact: Artifact) => void;
  onShowToast: (msg: string) => void;
}

export const CuratorDeskModal: React.FC<CuratorDeskModalProps> = ({
  isOpen,
  onClose,
  records,
  onWithdrawRecord,
  onSelectRecord,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'my' | 'curator'>('my');
  const [passKey, setPassKey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passKey === '404existential' || passKey === 'curator2026' || passKey === 'curator') {
      setIsAuthorized(true);
      sound.play('chime');
      onShowToast('Curator governance authenticated');
    } else {
      sound.play('thud');
      onShowToast('Invalid curator access key');
    }
  };

  const handleToggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === records.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(records.map((r) => r.id)));
    }
  };

  const handleExportCSV = () => {
    const itemsToExport = selectedIds.size > 0 ? records.filter((r) => selectedIds.has(r.id)) : records;
    const header = ['Accession', 'Title', 'Category', 'Year', 'Status', 'Contributor', 'WhyItStopped'];
    const rows = itemsToExport.map((r) => [
      `"${r.id}"`,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.category}"`,
      `"${r.year}"`,
      `"${r.status}"`,
      `"${r.username}"`,
      `"${r.note.replace(/"/g, '""')}"`
    ]);
    const csvContent = [header.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `museum-archive-records-${Date.now()}.csv`;
    link.click();
    sound.play('click');
    onShowToast(`Exported ${itemsToExport.length} records to CSV`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-void border-4 border-paper p-6 md:p-10 shadow-brutal-modal max-h-[90vh] overflow-y-auto my-auto text-left"
        role="dialog"
        aria-modal="true"
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

        <span className="font-mono text-xs font-black text-acid tracking-widest uppercase block mb-1">
          INSTITUTIONAL GOVERNANCE
        </span>
        <h2 className="font-sans font-black text-3xl sm:text-4xl text-paper uppercase tracking-tight mb-6">
          CONTRIBUTOR & CURATOR DESK
        </h2>

        {/* Tab switcher */}
        <div className="flex border-b-4 border-paper mb-8 font-mono text-xs font-black">
          <button
            type="button"
            onClick={() => setActiveTab('my')}
            className={`px-6 py-3 border-r-4 border-paper transition-colors ${
              activeTab === 'my' ? 'bg-acid text-black' : 'bg-panel text-paper hover:text-acid'
            }`}
          >
            MY RECORDS
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('curator')}
            className={`px-6 py-3 border-r-4 border-paper transition-colors ${
              activeTab === 'curator' ? 'bg-pink text-black' : 'bg-panel text-paper hover:text-pink'
            }`}
          >
            CURATOR CONSOLE {isAuthorized && '✓'}
          </button>
        </div>

        {activeTab === 'my' ? (
          <div>
            <p className="font-mono text-xs text-paper/70 mb-6">
              Records you have deposited into the public archive from this machine.
            </p>
            <div className="space-y-3">
              {records.slice(0, 5).map((r) => (
                <div
                  key={r.id}
                  className="border-2 border-paper bg-panel p-4 flex items-center justify-between gap-4 font-mono text-xs"
                >
                  <div>
                    <span className="text-acid font-black mr-3">{r.id}</span>
                    <strong className="text-paper text-sm uppercase">{r.title}</strong>
                    <span className="text-paper/50 ml-3">({r.category}, {r.year})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectRecord(r);
                    }}
                    className="border border-paper px-3 py-1 bg-black text-paper hover:bg-acid hover:text-black font-black"
                  >
                    READ ↗
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {!isAuthorized ? (
              <form onSubmit={handleLogin} className="max-w-md bg-panel border-3 border-paper p-6">
                <div className="flex items-center gap-2 text-pink font-mono text-xs font-black mb-3">
                  <ShieldAlert className="w-4 h-4" />
                  <span>RESTRICTED CURATOR TERMINAL</span>
                </div>
                <p className="font-mono text-xs text-paper/70 mb-4">
                  Enter passkey (<code className="text-acid">404existential</code> or <code className="text-acid">curator2026</code>) to manage archive records:
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={passKey}
                    onChange={(e) => setPassKey(e.target.value)}
                    placeholder="Access Key"
                    className="flex-1 bg-black border-2 border-paper px-3 py-2 font-mono text-xs text-paper outline-none"
                  />
                  <button
                    type="submit"
                    className="border-2 border-black bg-acid text-black font-mono font-black text-xs px-4 py-2 hover:bg-white"
                  >
                    AUTHENTICATE
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-paper/40 pb-4 mb-6">
                  <div className="flex items-center gap-3 font-mono text-xs font-black">
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="border border-paper bg-panel text-paper hover:bg-white hover:text-black px-3 py-1.5 flex items-center gap-1.5"
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      <span>{selectedIds.size === records.length ? 'DESELECT ALL' : 'SELECT ALL'}</span>
                    </button>
                    <span className="text-acid">{selectedIds.size} SELECTED</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="border border-paper bg-panel text-paper hover:bg-cyan hover:text-black px-3 py-1.5 font-mono text-xs font-black flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>EXPORT CSV</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAuthorized(false)}
                      className="border border-paper bg-transparent text-paper/70 hover:text-pink px-3 py-1.5 font-mono text-xs font-bold"
                    >
                      SIGN OUT
                    </button>
                  </div>
                </div>

                <div className="border-2 border-paper overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="bg-panel border-b-2 border-paper text-paper/70">
                        <th className="p-3">SEL</th>
                        <th className="p-3">ACCESSION</th>
                        <th className="p-3">TITLE</th>
                        <th className="p-3">CATEGORY</th>
                        <th className="p-3">STATUS</th>
                        <th className="p-3">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map((r) => {
                        const isChecked = selectedIds.has(r.id);
                        return (
                          <tr key={r.id} className="border-b border-paper/20 hover:bg-panel/60">
                            <td className="p-3">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleSelect(r.id)}
                                className="accent-acid"
                              />
                            </td>
                            <td className="p-3 font-bold text-acid">{r.id}</td>
                            <td className="p-3 font-bold text-paper">{r.title}</td>
                            <td className="p-3 text-cyan">{r.category}</td>
                            <td className="p-3 text-pink">{r.status}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    onSelectRecord(r);
                                  }}
                                  className="text-paper hover:text-acid p-1"
                                  title="Inspect record"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onWithdrawRecord(r.id)}
                                  className="text-paper hover:text-pink p-1"
                                  title="Withdraw record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
