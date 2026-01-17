import { VoteState, UserVotes } from '../types';

const USER_VOTE_KEY = 'it_fresher_user_votes';
const API_URL = '/api'; // Proxied to Node server

export const getUserVotes = (): UserVotes => {
  const stored = localStorage.getItem(USER_VOTE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const hasVotedInCategory = (categoryId: string): boolean => {
  const userVotes = getUserVotes();
  return !!userVotes[categoryId];
};

export const castVote = async (candidateId: string, categoryId: string): Promise<{ success: boolean; error?: string }> => {
  // 1. Client-side check
  if (hasVotedInCategory(categoryId)) {
    return { success: false, error: 'You have already voted in this category (Device Check).' };
  }

  try {
    // 2. Send vote to Node.js Backend
    const response = await fetch(`${API_URL}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidateId, categoryId }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        console.error(`API Error (${response.status})`);
        return { 
          success: false, 
          error: data?.error || `Server Error (${response.status})` 
        };
    }

    if (data && data.success) {
      // 3. Update local state on success
      const userVotes = getUserVotes();
      userVotes[categoryId] = candidateId;
      localStorage.setItem(USER_VOTE_KEY, JSON.stringify(userVotes));
      return { success: true };
    } else {
      return { success: false, error: data?.error || 'Unknown error' };
    }
  } catch (error) {
    console.error('Network Error:', error);
    return { success: false, error: 'Network error. Is the server running?' };
  }
};

export const getVoteStats = async (): Promise<VoteState> => {
  try {
    const response = await fetch(`${API_URL}/stats`);
    if (response.ok) {
      return await response.json();
    }
    console.error('Failed to fetch stats');
    return {};
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {};
  }
};

export const resetAllVotes = async () => {
  const confirmed = confirm("Are you sure? This will wipe the database permanently.");
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_URL}/reset`, { method: 'POST' });
    const data = await response.json();

    if (data.success) {
      localStorage.removeItem(USER_VOTE_KEY);
      window.location.reload();
    } else {
      alert('Failed to reset database.');
    }
  } catch (error) {
    console.error(error);
    alert('Error connecting to backend. Is the server running?');
  }
};