import React, { useEffect, useState } from 'react';
import './styles.css';
import FitnessChart from './components/FitnessChart';
import WorkoutCard from './components/WorkoutCard';
import StatsPanel from './components/StatsPanel';

function App() {
  const [location, setLocation] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [networkType, setNetworkType] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  // 1. Geolocation - Set start location on load
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const current = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(current);
          setStartLocation(current);
        },
        (error) => console.error('Error getting location:', error)
      );
    } else {
      alert('Geolocation not supported');
    }
  }, []);

  // 2. Network Information API
  useEffect(() => {
    const connection = navigator.connection || navigator.webkitConnection;
    if (connection) {
      setNetworkType(connection.effectiveType);
      const updateType = () => setNetworkType(connection.effectiveType);
      connection.addEventListener('change', updateType);
      return () => connection.removeEventListener('change', updateType);
    }
  }, []);

  // 3. Dummy Workout Data
  useEffect(() => {
    if (!location) return;

    setWorkouts([
      {
        type: 'Running',
        distance: 5,
        duration: 30,
        calories: 250,
        location,
      },
      {
        type: 'Cycling',
        distance: 10,
        duration: 45,
        calories: 400,
        location,
      },
      {
        type: 'Walking',
        distance: 3,
        duration: 20,
        calories: 150,
        location,
      },
      {
        type: 'Swimming',
        distance: 2,
        duration: 40,
        calories: 300,
        location,
      },
      {
        type: 'Hiking',
        distance: 8,
        duration: 60,
        calories: 500,
        location,
      },
      {
        type: 'Skating',
        distance: 4,
        duration: 25,
        calories: 220,
        location,
      },
      {
        type: 'Rowing',
        distance: 6,
        duration: 35,
        calories: 320,
        location,
      },
    ]);
  }, [location]);

  return (
    <div className="App">
      <section className="header-section">
        <h1 className="app-title">TrackFit</h1>
        <p>Your smart outdoor fitness assistant</p>
      </section>

      <section className="status">
        <p><strong>📍 Current Location:</strong> {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Detecting...'}</p>
        <p><strong>🌐 Network:</strong> {networkType || 'Checking...'}</p>

        <div className="location-buttons">
          <button
            onClick={() => {
              if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setEndLocation({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    });
                  },
                  (err) => console.error("Error getting end location", err)
                );
              }
            }}
          >
            📍 Mark End Location
          </button>
        </div>

        {startLocation && endLocation && (
          <div className="location-summary">
            <p><strong>Start:</strong> {startLocation.lat.toFixed(4)}, {startLocation.lng.toFixed(4)}</p>
            <p><strong>End:</strong> {endLocation.lat.toFixed(4)}, {endLocation.lng.toFixed(4)}</p>
          </div>
        )}
      </section>

      <StatsPanel workouts={workouts} />

<section className="chart">
  <FitnessChart data={workouts.map((w) => w.calories)} />
</section>


      <section className="workouts">
        {workouts.map((w, i) => (
          <WorkoutCard key={i} workout={w} />
        ))}
      </section>
    </div>
  );
}

export default App;
