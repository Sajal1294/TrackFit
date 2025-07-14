import React from 'react';

function StatsPanel({ workouts = [] }) {
  const valid = workouts.filter(w => w && typeof w.distance === 'number');

  const totalDistance = valid.reduce((sum, w) => sum + w.distance, 0);
  const totalDuration = valid.reduce((sum, w) => sum + w.duration, 0);
 const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
  const averagePace = totalDistance ? (totalDuration / totalDistance).toFixed(2) : 0;

  return (
    <div className="stats-panel">
      <h2>📊 Workout Summary</h2>
      <p><strong>Total Workouts:</strong> {valid.length}</p>
      <p><strong>Total Distance:</strong> {totalDistance} km</p>
      <p><strong>Total Duration:</strong> {totalDuration} mins</p>
      <p><strong>Total Calories:</strong> {totalCalories} kcal</p>
      <p><strong>Average Pace:</strong> {averagePace} min/km</p>
    </div>
  );
}

export default StatsPanel;
