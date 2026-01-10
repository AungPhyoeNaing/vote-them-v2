import React, { useState, useEffect } from 'react';
import VotingInterface from './components/VotingInterface';
import AdminDashboard from './components/AdminDashboard';
import { ADMIN_PIN } from './constants';
import { School, AlertCircle } from 'lucide-react';

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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm border border-slate-200 shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-uni-50 rounded-full border border-uni-100">
                <School className="text-uni-600" size={32} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-center text-slate-900 mb-1">Faculty Access</h2>
            <p className="text-center text-slate-500 text-sm mb-6">Enter PIN to access results</p>
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-uni-500 focus:ring-1 focus:ring-uni-500 transition-all text-center tracking-widest text-lg font-mono placeholder-slate-400"
                  autoFocus
                />
              </div>
              {error && (
                <div className="text-red-600 text-xs flex items-center justify-center gap-2 bg-red-50 py-2 rounded-lg font-medium">
                  <AlertCircle size={14} /> {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-uni-600 hover:bg-uni-700 text-white font-bold py-3 rounded-xl transition-colors shadow-sm"
              >
                Access Dashboard
              </button>
              <button
                type="button"
                onClick={() => { window.location.hash = ''; }}
                className="w-full text-slate-500 text-sm py-2 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors font-medium"
              >
                ← Back to Student Voting
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