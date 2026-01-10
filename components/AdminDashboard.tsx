import React, { useEffect, useState, useMemo } from 'react';
import { VoteState, CategoryId, Candidate } from '../types';
import { CANDIDATES, CATEGORIES } from '../constants';
import { subscribeToVotes, resetAllVotes } from '../services/voteService';
import { LogOut, LayoutDashboard, Users, Trophy, Activity, RefreshCw } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [votes, setVotes] = useState<VoteState>({});
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const unsubscribe = subscribeToVotes((newVotes) => {
      setVotes(prev => {
        // Handle both direct object and functional updates
        const updated = typeof newVotes === 'function' ? newVotes(prev) : newVotes;
        return updated;
      });
      setLastUpdated(new Date());
    });
    return () => unsubscribe();
  }, []);

  // Optimized Data Processing
  const dashboardData = useMemo(() => {
    const totalVotes = Object.values(votes).reduce((a: number, b: number) => a + b, 0);

    // Process categories with sorted candidates
    const categoryStats = CATEGORIES.map(category => {
      const candidates = CANDIDATES.filter(c => c.categoryId === category.id);
      
      const candidatesWithVotes = candidates.map(c => {
        const count = votes[c.id] || 0;
        return {
          ...c,
          votes: count,
        };
      });

      // Sort by votes descending
      const sorted = candidatesWithVotes.sort((a, b) => b.votes - a.votes);
      const totalCategoryVotes = sorted.reduce((sum, c) => sum + c.votes, 0);
      const leader = sorted[0];
      const runnerUp = sorted[1];
      const leadMargin = leader && runnerUp ? leader.votes - runnerUp.votes : 0;

      return {
        ...category,
        totalVotes: totalCategoryVotes,
        candidates: sorted.map(c => ({
          ...c,
          percentage: totalCategoryVotes > 0 ? ((c.votes / totalCategoryVotes) * 100).toFixed(1) : '0.0'
        })),
        leader,
        leadMargin
      };
    });

    return { totalVotes, categoryStats };
  }, [votes]);

  const { totalVotes, categoryStats } = dashboardData;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2 rounded-xl shadow-lg">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                Live Results
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <p className="text-xs text-slate-500 font-bold">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Activity size={18} />
              </div>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Votes</span>
            </div>
            <div className="text-4xl font-black text-slate-800">{totalVotes}</div>
          </div>
          
          <div className="col-span-2 md:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Users size={18} />
              </div>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Est. Voters</span>
            </div>
            <div className="text-4xl font-black text-slate-800">~{Math.ceil(totalVotes / 1.5)}</div>
          </div>

          <div className="col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                 <RefreshCw size={14} className="text-slate-400" />
                 <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">System Status</span>
              </div>
               <div className="text-sm text-slate-600 font-medium">
                 Connection: <span className="text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-md">Stable</span>
               </div>
            </div>
            <button 
                onClick={() => { if(confirm("DANGER: Wipe all database records?")) resetAllVotes() }}
                className="px-5 py-3 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-md shadow-red-200 transition-all uppercase tracking-wide active:scale-95"
             >
               Reset DB
             </button>
          </div>
        </div>

        {/* 🏆 LIVE PODIUM (Top Leaders) */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 px-1">
            <Trophy className="text-yellow-500" size={20} /> Current Leaders
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryStats.map((cat) => (
              <div key={cat.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative group hover:-translate-y-1 transition-transform duration-300">
                <div className={`h-2 w-full ${cat.color}`}></div>
                <div className="p-5 flex flex-col items-center text-center">
                   <div className="relative mb-3">
                     <img 
                        src={cat.leader.imageUrl} 
                        className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 shadow-lg"
                        alt="Leader"
                     />
                     <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm border-2 border-white flex items-center gap-1">
                        <Trophy size={10} /> #1
                     </div>
                   </div>
                   <h3 className="font-extrabold text-slate-900 leading-tight text-lg">{cat.leader.name}</h3>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-4">{cat.label}</p>
                   
                   <div className="w-full bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-3xl font-black text-slate-800">{cat.leader.votes}</span>
                        <span className="text-xs font-bold text-slate-400 mb-1">votes</span>
                      </div>
                      {cat.leadMargin > 0 ? (
                        <div className="text-[10px] text-emerald-600 font-bold bg-emerald-50 rounded-md px-2 py-1 inline-block">
                          +{cat.leadMargin} lead
                        </div>
                      ) : (
                        <div className="text-[10px] text-orange-600 font-bold bg-orange-50 rounded-md px-2 py-1 inline-block">
                           Tied
                        </div>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 DETAILED BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categoryStats.map(cat => (
            <div key={cat.id} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                  {cat.label} Race
                </h3>
                <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">
                  {cat.totalVotes} total
                </span>
              </div>
              
              <div className="divide-y divide-slate-50">
                {cat.candidates.map((candidate, idx) => (
                  <div key={candidate.id} className="px-6 py-4 hover:bg-slate-50 transition-colors relative overflow-hidden group">
                    {/* Progress Bar Background */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-slate-50 transition-all duration-700 ease-out -z-10"
                      style={{ width: `${candidate.percentage}%` }}
                    />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="font-mono text-slate-300 font-bold w-4 text-center text-sm group-hover:text-slate-500 transition-colors">
                        {idx + 1}
                      </div>
                      <img 
                        src={candidate.imageUrl} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <h4 className="font-bold text-slate-800 text-sm truncate pr-2">
                            {candidate.name}
                          </h4>
                          <span className="font-black text-slate-900 text-sm">
                            {candidate.votes}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-bold uppercase tracking-wider truncate">{candidate.class}</span>
                          <span className="text-slate-400 font-mono font-medium">{candidate.percentage}%</span>
                        </div>
                        
                        {/* Visual Bar for Mobile Clarity */}
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${cat.color} transition-all duration-500`} 
                            style={{ width: `${candidate.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;