import { useState, useEffect } from 'react';
import { fetchFromApi, extractArrayFromResponse } from '../api';

export function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetchFromApi('/workouts');
        const data = extractArrayFromResponse(response) as any[];
        setWorkouts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load workouts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">
                    <strong>Duration:</strong> {workout.duration} minutes
                  </p>
                  {workout.exercises && workout.exercises.length > 0 && (
                    <div>
                      <strong>Exercises:</strong>
                      <ul className="mt-2">
                        {workout.exercises.map((exercise: any, idx: number) => (
                          <li key={idx}>
                            {exercise.name}
                            {exercise.reps && exercise.sets && (
                              <span className="ms-2 text-muted">
                                ({exercise.reps} reps x {exercise.sets} sets)
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
