import React, { useEffect, useState, useMemo } from 'react';
import { VoteState, CategoryId, Candidate } from '../types';
import { CANDIDATES, CATEGORIES } from '../constants';
import { getVoteStats, resetAllVotes } from '../services/voteService';
import { LogOut, LayoutDashboard, Users, Trophy, Activity, RefreshCw, Sparkles } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [votes, setVotes] = useState<VoteState>({});
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    const data = await getVoteStats();
    setVotes(data);
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dashboardData = useMemo(() => {
    const totalVotes = Object.values(votes).reduce((a: number, b: number) => a + b, 0);

    const categoryStats = CATEGORIES.map(category => {
      const candidates = CANDIDATES.filter(c => c.categoryId === category.id);
      
      const candidatesWithVotes = candidates.map(c => {
        const count = votes[c.id] || 0;
        return {
          ...c,
          votes: count,
        };
      });

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
    <div className="min-h-screen bg-mesh text-slate-800 pb-20 font-sans relative overflow-x-hidden">
      
      {/* Background Decorative Blobs (Consistent with Voting Interface) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glass Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-lg ring-2 ring-white/50">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                Results Dashboard
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {isRefreshing ? (
                   <span className="flex h-2 w-2 relative">
                     <span className="animate-spin absolute inline-flex h-full w-full rounded-full border-2 border-emerald-500 border-t-transparent"></span>
                   </span>
                ) : (
                   <span className="flex h-2 w-2 relative">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-400"></span>
                   </span>
                )}
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
                onClick={fetchData}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-sm border border-indigo-100 active:scale-95"
            >
                <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
                <span className="hidden sm:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            </button>
            <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-red-600 bg-white/50 hover:bg-white rounded-xl transition-all shadow-sm border border-white/40 active:scale-95"
            >
                <LogOut size={18} />
                <span className="hidden sm:inline">Exit</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel col-span-2 md:col-span-1 p-6 rounded-3xl shadow-lg hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Activity size={18} />
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Votes</span>
            </div>
            <div className="text-5xl font-black text-slate-800 tracking-tight">{totalVotes}</div>
          </div>
          
          <div className="glass-panel col-span-2 md:col-span-1 p-6 rounded-3xl shadow-lg hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <Users size={18} />
              </div>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Est. Voters</span>
            </div>
            <div className="text-5xl font-black text-slate-800 tracking-tight">~{Math.ceil(totalVotes / 1.5)}</div>
          </div>

          <div className="glass-panel col-span-2 p-6 rounded-3xl shadow-lg flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <RefreshCw size={16} className="text-slate-400" />
                 <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">System Status</span>
              </div>
               <div className="flex items-center gap-2">
                 <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 shadow-sm flex items-center gap-1">
                    <Sparkles size={12} /> Server Active
                 </div>
                 <div className="text-xs text-slate-400 font-mono hidden sm:block">Port: 3001</div>
               </div>
            </div>
            <button 
                onClick={() => { if(confirm("DANGER: Wipe all database records?")) resetAllVotes() }}
                className="px-5 py-3 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-lg shadow-red-200 transition-all uppercase tracking-wide active:scale-95"
             >
               Reset DB
             </button>
          </div>
        </div>

        {/* 🏆 LIVE PODIUM (Top Leaders) */}
        <div>
          <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2 px-1">
            <Trophy className="fill-yellow-400 text-yellow-600" size={24} /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
                Current Leaders
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryStats.map((cat, idx) => (
              <div key={cat.id} className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border-2 border-white overflow-hidden relative group hover:-translate-y-2 transition-all duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className={`h-2 w-full ${cat.color}`}></div>
                <div className="p-6 flex flex-col items-center text-center">
                   <div className="relative mb-4">
                     <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200 to-transparent rounded-full animate-pulse blur-xl"></div>
                     <img 
                        src={cat.leader.imageUrl} 
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl relative z-10"
                        alt="Leader"
                     />
                     <div className="absolute -bottom-3 -right-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                        <Trophy size={12} className="fill-white" /> 1st
                     </div>
                   </div>
                   <h3 className="font-black text-slate-900 text-xl leading-tight mb-1">{cat.leader.name}</h3>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-5 bg-slate-100 px-2 py-1 rounded-md">{cat.label}</p>
                   
                   <div className="w-full bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
                      <div className="flex justify-center items-baseline gap-1 mb-1">
                        <span className="text-4xl font-black text-slate-800 tracking-tighter">{cat.leader.votes}</span>
                        <span className="text-xs font-bold text-slate-400">votes</span>
                      </div>
                      {cat.leadMargin > 0 ? (
                        <div className="text-[10px] text-emerald-600 font-bold bg-emerald-100/50 rounded-full px-3 py-1 inline-flex items-center gap-1">
                          <Activity size={10} /> +{cat.leadMargin} lead
                        </div>
                      ) : (
                        <div className="text-[10px] text-orange-600 font-bold bg-orange-100/50 rounded-full px-3 py-1 inline-block">
                           Neck and Neck
                        </div>
                      )}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 DETAILED BREAKDOWN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          {categoryStats.map(cat => (
            <div key={cat.id} className="glass-panel rounded-3xl shadow-lg border border-white/50 overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-slate-100/50 flex justify-between items-center bg-white/40">
                <h3 className="font-black text-slate-800 flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${cat.color} ring-2 ring-white shadow-sm`}></span>
                  {cat.label} Race
                </h3>
                <span className="text-xs font-bold text-slate-500 bg-white/80 px-3 py-1.5 rounded-xl shadow-sm backdrop-blur-sm">
                  {cat.totalVotes} total
                </span>
              </div>
              
              <div className="divide-y divide-slate-100/50 flex-1">
                {cat.candidates.map((candidate, idx) => (
                  <div key={candidate.id} className="px-6 py-4 hover:bg-white/40 transition-colors relative overflow-hidden group">
                    {/* Progress Bar Background */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-white/30 transition-all duration-1000 ease-out -z-10"
                      style={{ width: `${candidate.percentage}%` }}
                    />
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`
                        font-bold w-6 h-6 flex items-center justify-center rounded-full text-[10px] border border-slate-100
                        ${idx === 0 ? 'bg-yellow-400 text-white border-yellow-300 shadow-sm' : 
                          idx === 1 ? 'bg-slate-300 text-white border-slate-300' : 
                          idx === 2 ? 'bg-orange-300 text-white border-orange-300' : 'bg-slate-100 text-slate-400'}
                      `}>
                        {idx + 1}
                      </div>
                      <img 
                        src={candidate.imageUrl} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:scale-110 transition-transform"
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
                          <span className="text-slate-500 font-bold uppercase tracking-wider truncate text-[10px] opacity-70">{candidate.class}</span>
                          <span className="text-slate-500 font-mono font-bold">{candidate.percentage}%</span>
                        </div>
                        
                        {/* Visual Bar for Mobile Clarity */}
                        <div className="w-full bg-slate-200/50 h-1.5 rounded-full mt-2 overflow-hidden backdrop-blur-sm">
                          <div 
                            className={`h-full rounded-full ${cat.color} transition-all duration-1000 ease-out`} 
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