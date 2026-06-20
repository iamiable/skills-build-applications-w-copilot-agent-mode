import { useState, useEffect } from 'react';
import { fetchFromApi, extractArrayFromResponse } from '../api';

interface Activity {
  _id: string;
  userId: string;
  type: string;
  duration: number;
  distance?: number;
  calories: number;
  timestamp?: string;
  createdAt?: string;
}

export function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetchFromApi('/activities');
        const data = extractArrayFromResponse(response) as Activity[];
        setActivities(data);
        setError(null);
      } catch (err) {
        setError('Failed to load activities');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.type}</td>
                  <td>{activity.duration}</td>
                  <td>{activity.distance || '-'}</td>
                  <td>{activity.calories}</td>
                  <td>
                    {(activity.timestamp || activity.createdAt) 
                      ? new Date(activity.timestamp || activity.createdAt || '').toLocaleDateString()
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
