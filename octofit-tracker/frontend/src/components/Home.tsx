import { getApiBaseUrl } from '../api';

export function Home() {
  const apiBaseUrl = getApiBaseUrl();
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="mb-4">OctoFit Tracker</h1>
          <p className="lead">
            Track your fitness activities, manage teams, and compete on leaderboards!
          </p>
          
          <div className="alert alert-info mt-4">
            <h5>API Configuration</h5>
            <p>
              <strong>API Base URL:</strong> <code>{apiBaseUrl}</code>
            </p>
            <small className="text-muted">
              The API URL is configured based on your environment. For Codespaces,
              ensure <code>VITE_CODESPACE_NAME</code> is set in <code>.env.local</code>.
            </small>
          </div>

          <div className="row mt-5">
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">👥 Users</h5>
                  <p className="card-text">
                    View all users and their fitness profiles.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏆 Teams</h5>
                  <p className="card-text">
                    Join teams and collaborate with other fitness enthusiasts.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏃 Activities</h5>
                  <p className="card-text">
                    Log your workouts and track your fitness progress.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">📊 Leaderboard</h5>
                  <p className="card-text">
                    Compete with other users and teams for top rankings.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">💪 Workouts</h5>
                  <p className="card-text">
                    Browse and create custom workout plans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
