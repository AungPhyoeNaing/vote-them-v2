import React, { useState, useEffect } from 'react';
import { CATEGORIES, CANDIDATES } from '../constants';
import { CategoryId, Candidate } from '../types';
import { castVote, hasVotedInCategory } from '../services/voteService';
import { CheckCircle2, ChevronRight, Lock, GraduationCap, X, AlertTriangle } from 'lucide-react';

interface VotingInterfaceProps {
  onAdminClick: () => void;
}

const VotingInterface: React.FC<VotingInterfaceProps> = ({ onAdminClick }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(CategoryId.KING);
  const [votedCategories, setVotedCategories] = useState<Record<string, boolean>>({});
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const status: Record<string, boolean> = {};
    CATEGORIES.forEach(cat => {
      status[cat.id] = hasVotedInCategory(cat.id);
    });
    setVotedCategories(status);
  }, []);

  const handleVote = async (candidate: Candidate) => {
    if (votedCategories[activeCategory]) return;
    setSelectedCandidate(candidate);
  };

  const handleInitiateVote = () => {
    setShowConfirmModal(true);
  };

  const confirmVote = async () => {
    if (!selectedCandidate) return;
    
    setIsSubmitting(true);
    const success = await castVote(selectedCandidate.id, activeCategory);
    
    if (success) {
      setVotedCategories(prev => ({ ...prev, [activeCategory]: true }));
      setShowConfirmModal(false); // Close confirmation immediately
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedCandidate(null);
      }, 2000);
    }
    setIsSubmitting(false);
  };

  const filteredCandidates = CANDIDATES.filter(c => c.categoryId === activeCategory);
  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);
  const currentCategoryColor = currentCategory?.color || 'bg-uni-600';

  return (
    <div className="min-h-screen bg-slate-50 pb-24 relative overflow-x-hidden font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-uni-600 p-1.5 rounded text-white shadow-sm">
              <GraduationCap size={20} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-slate-800 leading-none tracking-tight">
                IT Fresher '25
              </h1>
              <span className="text-[10px] uppercase font-bold text-uni-600 tracking-wider">Official Voting</span>
            </div>
          </div>
          <button onClick={onAdminClick} className="text-slate-300 hover:text-uni-600 transition-colors p-2">
            <Lock size={16} />
          </button>
        </div>
        
        {/* Category Pill Navigation */}
        <div className="bg-white border-b border-slate-100">
          <div className="flex overflow-x-auto no-scrollbar py-3 px-4 gap-3 snap-x max-w-md mx-auto">
            {CATEGORIES.map(cat => {
              const isVoted = votedCategories[cat.id];
              const isActive = activeCategory === cat.id;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all snap-start border flex items-center gap-1
                    ${isActive 
                      ? `${cat.color} text-white border-transparent shadow-md transform scale-105` 
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    }
                    ${isVoted && !isActive ? 'bg-slate-100 text-slate-400 border-slate-100' : ''}
                  `}
                >
                  {cat.label}
                  {isVoted && <CheckCircle2 size={12} className="inline" />}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        <div className="mb-6 text-center">
          <h2 className={`text-2xl font-black uppercase tracking-tight ${currentCategoryColor.replace('bg-', 'text-')}`}>
            {currentCategory?.label}
          </h2>
          {votedCategories[activeCategory] ? (
            <div className="inline-block mt-2 px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold shadow-sm">
               ✓ Vote Registered
            </div>
          ) : (
            <p className="text-slate-500 text-sm mt-1 font-medium">Select a candidate to view profile</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredCandidates.map((candidate, idx) => (
            <div 
              key={candidate.id}
              onClick={() => handleVote(candidate)}
              className={`
                group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 animate-slide-up bg-white border border-slate-200 shadow-sm
                ${votedCategories[activeCategory] ? 'opacity-50 grayscale pointer-events-none' : 'hover:-translate-y-1 hover:shadow-lg'}
              `}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden">
                <img 
                  src={candidate.imageUrl} 
                  alt={candidate.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-white/95 text-slate-900 text-xs font-bold px-2.5 py-1 rounded shadow-sm border border-slate-100">
                  #{candidate.number}
                </div>
              </div>
              
              <div className="p-3 bg-white">
                <p className="text-slate-800 font-bold truncate text-sm">{candidate.name}</p>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mt-0.5">{candidate.class}</p>
              </div>
              
              {/* Selection Border */}
              {selectedCandidate?.id === candidate.id && (
                <div className={`absolute inset-0 border-[3px] border-${currentCategoryColor.split('-')[1]}-600 z-10 rounded-xl pointer-events-none`} />
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Expanded Profile Sheet */}
      {selectedCandidate && (
        <div 
          className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm animate-fade-in" 
          onClick={() => setSelectedCandidate(null)}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-t-3xl shadow-2xl animate-slide-up max-h-[95vh] overflow-y-auto flex flex-col no-scrollbar"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button Floating */}
            <button 
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
                <X size={24} />
            </button>

            {/* Big Image Section */}
            <div className="w-full aspect-[3/4] relative shrink-0">
               <img 
                 src={selectedCandidate.imageUrl} 
                 className="w-full h-full object-cover"
                 alt={selectedCandidate.name}
               />
               <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 px-3 py-1 rounded-full text-lg font-bold shadow-lg border border-white/50">
                  #{selectedCandidate.number}
               </div>
            </div>

            {/* Content Section (Overlapping Image slightly) */}
            <div className="p-6 flex flex-col bg-white relative -mt-8 rounded-t-3xl">
                {/* Drag Handle */}
               <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 shrink-0" />

               <h3 className="text-3xl font-black text-slate-800 leading-tight mb-2 text-center">
                  {selectedCandidate.name}
               </h3>
               <p className="text-center text-slate-500 font-medium mb-6">{selectedCandidate.class}</p>

               {selectedCandidate.quote && (
                 <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 italic text-slate-600 text-center relative">
                   "{selectedCandidate.quote}"
                 </div>
               )}

               <div className="mt-auto space-y-3 pt-4">
                  <button
                    onClick={handleInitiateVote}
                    className={`
                      w-full py-4 rounded-xl font-bold text-white shadow-xl shadow-blue-900/10 transition-transform active:scale-[0.98] flex items-center justify-center gap-3 text-lg
                      ${currentCategoryColor} hover:opacity-90
                    `}
                  >
                    Vote for {selectedCandidate.name.split(' ')[0]} <ChevronRight size={20} />
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-scale-up border border-slate-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Your Vote</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                You are about to vote for <span className="font-bold text-slate-900">{selectedCandidate.name}</span> as <span className="font-bold text-slate-900">{currentCategory?.label}</span>. 
                <br /><br />
                <span className="text-xs text-slate-400">This action cannot be undone.</span>
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmVote}
                  disabled={isSubmitting}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-white transition-all shadow-md active:scale-95 flex justify-center items-center ${currentCategoryColor}`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/95 animate-fade-in">
          <div className="text-center p-8 max-w-xs w-full animate-slide-up">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Vote Recorded!</h2>
            <p className="text-slate-500 text-sm">Thank you for voting in the <br/><strong>{currentCategory?.label}</strong> category.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingInterface;