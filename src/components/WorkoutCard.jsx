import React from 'react';
import useIntersection from '../hooks/useIntersection';
import { FaFire, FaStopwatch, FaRoute } from 'react-icons/fa';
import '../styles.css'

const WorkoutCard = ({ workout }) => {
  const { type, distance, duration, calories, location } = workout;
  const [ref, isVisible] = useIntersection(0.3);

  return (
    <div
      ref={ref}
      className={`workout-card ${isVisible ? 'fade-in' : 'fade-out'}`}
    >
      <h3 className="workout-title">🏃‍♂️ {type}</h3>
      <div className="workout-details">
        <p><FaFire /> {calories} kcal</p>
        <p><FaStopwatch /> {duration} mins</p>
        <p><FaRoute /> {distance} km</p>
        {location && (
          <p><strong>📍 {location.lat.toFixed(2)}, {location.lng.toFixed(2)}</strong></p>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
