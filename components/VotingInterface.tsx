import React, { useState, useEffect } from 'react';
import { CATEGORIES, CANDIDATES } from '../constants';
import { CategoryId, Candidate } from '../types';
import { castVote, hasVotedInCategory } from '../services/voteService';
import { CheckCircle2, ChevronRight, Lock, Sparkles, X, Heart, Star, Crown, Zap } from 'lucide-react';

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
      }, 2500);
    }
    setIsSubmitting(false);
  };

  const filteredCandidates = CANDIDATES.filter(c => c.categoryId === activeCategory);
  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);
  
  // Dynamic gradient based on category
  const getGradient = (catId: string) => {
    switch(catId) {
      case CategoryId.KING: return 'from-blue-400 to-indigo-600 shadow-blue-400/50';
      case CategoryId.QUEEN: return 'from-pink-400 to-rose-600 shadow-pink-400/50';
      case CategoryId.MISTER: return 'from-teal-400 to-emerald-600 shadow-teal-400/50';
      case CategoryId.MISS: return 'from-violet-400 to-purple-600 shadow-purple-400/50';
      default: return 'from-slate-400 to-slate-600';
    }
  };

  const getIcon = (catId: string) => {
    switch(catId) {
      case CategoryId.KING: return <Crown size={14} />;
      case CategoryId.QUEEN: return <Star size={14} />;
      case CategoryId.MISTER: return <Zap size={14} />;
      case CategoryId.MISS: return <Heart size={14} />;
      default: return <Sparkles size={14} />;
    }
  }

  const activeGradient = getGradient(activeCategory);

  return (
    <div className="min-h-screen bg-mesh relative overflow-x-hidden font-sans pb-24">
      
      {/* Background Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Sticky Header with Blur */}
      <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-sm transition-all duration-300">
        <div className="max-w-md mx-auto w-full">
            <div className="px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className={`bg-gradient-to-br ${activeGradient} p-2 rounded-xl text-white shadow-lg transition-all duration-500`}>
                    <Sparkles size={20} className="animate-pulse-fast" />
                    </div>
                    <div className="flex flex-col">
                    <h1 className="text-xl font-extrabold text-slate-800 leading-none tracking-tight">
                        FRESHER '25
                    </h1>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Vote Now</span>
                    </div>
                </div>
                <button onClick={onAdminClick} className="text-slate-400 hover:text-indigo-600 transition-colors bg-white/50 p-2 rounded-full">
                    <Lock size={18} />
                </button>
            </div>
            
            {/* Category Selector with Fixed Height Container to prevent jumping */}
            <div className="relative h-16 w-full">
                <div className="absolute inset-0 flex overflow-x-auto no-scrollbar gap-3 px-4 items-center">
                    {CATEGORIES.map(cat => {
                    const isVoted = votedCategories[cat.id];
                    const isActive = activeCategory === cat.id;
                    const gradient = getGradient(cat.id);
                    
                    return (
                        <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
                            relative whitespace-nowrap px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 flex-shrink-0
                            ${isActive 
                            ? `bg-gradient-to-r ${gradient} text-white shadow-lg scale-105 ring-2 ring-white z-10` 
                            : 'bg-white/80 text-slate-500 hover:bg-white'
                            }
                            ${isVoted && !isActive ? 'opacity-60 grayscale' : ''}
                        `}
                        >
                        {getIcon(cat.id)}
                        {cat.label}
                        {isActive && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>}
                        </button>
                    );
                    })}
                    {/* Large spacer to ensure last item is fully visible and touchable */}
                    <div className="w-8 flex-shrink-0 h-1"></div>
                </div>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 mt-6">
        <div className="mb-6 text-center animate-fade-in">
           {votedCategories[activeCategory] ? (
             <div className="glass-panel inline-flex items-center gap-2 px-6 py-2 rounded-full text-emerald-600 font-bold shadow-sm">
                <CheckCircle2 size={18} className="fill-emerald-100" /> Vote Registered
             </div>
           ) : (
             <p className="text-slate-600 font-medium bg-white/30 inline-block px-4 py-1 rounded-full text-sm backdrop-blur-sm">
               Tap a card to view profile
             </p>
           )}
        </div>

        <div className="grid grid-cols-2 gap-4 pb-10">
          {filteredCandidates.map((candidate, idx) => (
            <div 
              key={candidate.id}
              onClick={() => handleVote(candidate)}
              className={`
                relative group rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 animate-slide-up bg-white shadow-md border-4 border-white
                ${votedCategories[activeCategory] ? 'opacity-50 grayscale pointer-events-none' : 'hover:-translate-y-2 hover:shadow-2xl hover:rotate-1'}
              `}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden rounded-2xl">
                <img 
                  src={candidate.imageUrl} 
                  alt={candidate.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Number Badge */}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-black px-2 py-1 rounded-lg shadow-sm">
                  #{candidate.number}
                </div>

                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-t ${activeGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-300`} />
              </div>
              
              <div className="p-3 text-center">
                <h3 className="text-slate-800 font-extrabold truncate text-sm">{candidate.name}</h3>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider bg-slate-100 inline-block px-2 py-0.5 rounded-md mt-1">
                  {candidate.class}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Fun Expanded Profile Modal */}
      {selectedCandidate && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-md animate-fade-in p-0 sm:p-4" 
          onClick={() => setSelectedCandidate(null)}
        >
          <div 
            className="bg-white w-full max-w-sm sm:rounded-3xl rounded-t-3xl shadow-2xl animate-slide-up flex flex-col max-h-[90vh] overflow-hidden relative ring-4 ring-white"
            onClick={e => e.stopPropagation()}
          >
            {/* Background Blob in Modal */}
            <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${activeGradient} rounded-full opacity-20 blur-3xl pointer-events-none`} />

            {/* Close Button */}
            <button 
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 z-20 bg-white/50 hover:bg-white text-slate-800 p-2 rounded-full backdrop-blur-md transition-all shadow-sm"
            >
                <X size={24} />
            </button>

            {/* Image */}
            <div className="w-full aspect-square relative shrink-0">
               <img 
                 src={selectedCandidate.imageUrl} 
                 className="w-full h-full object-cover"
                 alt={selectedCandidate.name}
               />
               <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 pt-0 flex flex-col relative z-10 -mt-10 overflow-y-auto no-scrollbar">
               <div className="text-center">
                 <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${activeGradient} mb-3 shadow-md`}>
                    #{selectedCandidate.number} • {selectedCandidate.class}
                 </span>
                 <h3 className="text-3xl font-black text-slate-900 leading-none mb-4">
                    {selectedCandidate.name}
                 </h3>
               </div>

               {/* Removed Quote Section */}

               <div className="mt-auto space-y-3 pb-4">
                  <button
                    onClick={handleInitiateVote}
                    className={`
                      w-full py-4 rounded-2xl font-bold text-white shadow-xl bg-gradient-to-r ${activeGradient} 
                      hover:scale-[1.02] active:scale-[0.95] transition-all flex items-center justify-center gap-2 text-lg
                    `}
                  >
                    <Star className="fill-white" size={20} /> VOTE NOW
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedCandidate && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-6 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-xs p-6 shadow-2xl animate-slide-up border-4 border-white relative overflow-hidden">
             {/* Decorative */}
             <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${activeGradient}`} />
            
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-4 overflow-hidden">
                 <img src={selectedCandidate.imageUrl} className="w-full h-full object-cover" />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-1">Are you sure?</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">
                Voting for <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeGradient} font-bold`}>{selectedCandidate.name}</span>
                <br/> in {currentCategory?.label} category.
              </p>
              
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Nope
                </button>
                <button 
                  onClick={confirmVote}
                  disabled={isSubmitting}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r ${activeGradient} transition-transform active:scale-95 flex justify-center items-center`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "YAAAS!"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Overlay - Confetti Style */}
      {showSuccess && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-white/90 backdrop-blur-sm animate-fade-in">
          <div className="text-center p-8 max-w-xs w-full animate-slide-up relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-yellow-200 to-pink-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            
            <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200 animate-bounce-small">
                <CheckCircle2 size={48} className="text-white" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">VOTED!</h2>
                <p className="text-slate-600 font-medium">You're awesome. <br/>Thanks for participating!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingInterface;