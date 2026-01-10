import React, { useState, useEffect } from 'react';
import VotingInterface from './components/VotingInterface';
import AdminDashboard from './components/AdminDashboard';
import { ADMIN_PIN } from './constants';
import { School, AlertCircle, ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'user' | 'admin-login' | 'admin'>('user');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setView('admin-login');
      } else if (hash === '#dashboard') {
         setView('admin');
      } else {
        setView('user');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      window.location.hash = 'dashboard';
      setView('admin');
      setError('');
      setPin('');
    } else {
      setError('Incorrect PIN');
    }
  };

  const renderContent = () => {
    if (view === 'admin') {
      return <AdminDashboard onLogout={() => { window.location.hash = ''; setView('user'); }} />;
    }

    if (view === 'admin-login') {
      return (
        <div className="min-h-screen bg-mesh flex items-center justify-center p-4 font-sans relative overflow-hidden">
          {/* Background Elements */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
          </div>

          <div className="glass-panel p-8 rounded-3xl w-full max-w-sm border border-white/40 shadow-2xl relative z-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl shadow-lg text-white transform -rotate-3 hover:rotate-0 transition-transform">
                <School size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-black text-center text-slate-800 mb-1">Faculty Access</h2>
            <p className="text-center text-slate-500 text-sm mb-6 font-medium">Restricted Area</p>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN CODE"
                  className="w-full bg-white/60 border-2 border-white/50 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-center tracking-[0.5em] text-lg font-bold placeholder-slate-400"
                  autoFocus
                />
              </div>
              {error && (
                <div className="text-red-500 text-xs flex items-center justify-center gap-2 bg-red-50/80 py-2 rounded-lg font-bold">
                  <AlertCircle size={14} /> {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Access Dashboard
              </button>
              <button
                type="button"
                onClick={() => { window.location.hash = ''; }}
                className="w-full text-slate-500 text-sm py-2 hover:text-slate-800 rounded-lg transition-colors font-bold flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Back to Voting
              </button>
            </form>
          </div>
        </div>
      );
    }

    return <VotingInterface onAdminClick={() => { window.location.hash = 'admin'; }} />;
  };

  return (
    <>
      {renderContent()}
    </>
  );
};

export default App;