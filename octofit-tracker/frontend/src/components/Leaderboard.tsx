import { useState, useEffect } from 'react';
import { fetchFromApi, extractArrayFromResponse } from '../api';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'users' | 'teams'>('users');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const endpoint = tab === 'teams' ? '/leaderboard/teams' : '/leaderboard';
        const response = await fetchFromApi(endpoint);
        const data = extractArrayFromResponse(response) as any[];
        setLeaderboard(data);
        setError(null);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [tab]);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'users' ? 'active' : ''}`}
            onClick={() => setTab('users')}
          >
            Users
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === 'teams' ? 'active' : ''}`}
            onClick={() => setTab('teams')}
          >
            Teams
          </button>
        </li>
      </ul>

      {leaderboard.length === 0 ? (
        <p>No leaderboard data found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id}>
                  <td>
                    <strong>#{entry.rank}</strong>
                  </td>
                  <td>
                    {entry.userId?.name || entry.teamId?.name || 'Unknown'}
                  </td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
