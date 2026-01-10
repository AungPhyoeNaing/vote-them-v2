import { VoteState, UserVotes } from '../types';

const USER_VOTE_KEY = 'it_fresher_user_votes';
const API_URL = '/api.php'; // Relative path works if hosted on same domain

export const getUserVotes = (): UserVotes => {
  const stored = localStorage.getItem(USER_VOTE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const hasVotedInCategory = (categoryId: string): boolean => {
  const userVotes = getUserVotes();
  return !!userVotes[categoryId];
};

export const castVote = async (candidateId: string, categoryId: string): Promise<boolean> => {
  // 1. Client-side check to prevent immediate double voting
  if (hasVotedInCategory(categoryId)) {
    return false;
  }

  try {
    // 2. Send vote to VPS Backend
    const response = await fetch(`${API_URL}?action=vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candidateId, categoryId }),
    });

    if (!response.ok) {
        const text = await response.text();
        console.error(`API Error (${response.status}):`, text);
        alert(`Server Error: ${response.status}. Ensure PHP server is running.`);
        return false;
    }

    const data = await response.json();

    if (data.success) {
      // 3. Update local state on success
      const userVotes = getUserVotes();
      userVotes[categoryId] = candidateId;
      localStorage.setItem(USER_VOTE_KEY, JSON.stringify(userVotes));
      return true;
    } else {
      console.error('Vote failed:', data.error);
      alert('Failed to record vote: ' + data.error);
      return false;
    }
  } catch (error) {
    console.error('Network Error:', error);
    alert('Network error. Ensure "php -S localhost:8000 -t public" is running in a separate terminal.');
    return false;
  }
};

export const subscribeToVotes = (callback: (votes: VoteState | ((prev: VoteState) => VoteState)) => void) => {
  let isMounted = true;

  const fetchStats = async () => {
    if (!isMounted) return;
    try {
      const response = await fetch(`${API_URL}?action=stats`);
      if (response.ok) {
        const data: VoteState = await response.json();
        callback(data);
      }
    } catch (error) {
      // Silently fail on polling errors to avoid spamming console
    }
  };

  // Initial fetch
  fetchStats();

  // Poll every 3 seconds (Simple & Robust for VPS)
  const intervalId = setInterval(fetchStats, 3000);

  return () => {
    isMounted = false;
    clearInterval(intervalId);
  };
};

export const resetAllVotes = async () => {
  const confirmed = confirm("Are you sure? This will wipe the database permanently.");
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_URL}?action=reset`, { method: 'POST' });
    const data = await response.json();

    if (data.success) {
      localStorage.removeItem(USER_VOTE_KEY);
      window.location.reload();
    } else {
      alert('Failed to reset database.');
    }
  } catch (error) {
    console.error(error);
    alert('Error connecting to backend.');
  }
};