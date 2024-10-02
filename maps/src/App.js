// src/App.js
import React, { useState, useEffect } from 'react';
import Map from './Map';

function App() {
  const [vehiclePosition, setVehiclePosition] = useState([17.38504, 78.48667]);
  const [routePath, setRoutePath] = useState([vehiclePosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5000/api/vehicle/current') // Fetch from backend
        .then((response) => response.json())
        .then((data) => {
          const newPosition = [data.latitude, data.longitude];
          setVehiclePosition(newPosition);
          setRoutePath((prevPath) => [...prevPath, newPosition]);
        })
        .catch((error) => console.error('Error fetching vehicle data:', error));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id='two'>
      <h1 id='one'>Vehicle Tracker with Leaflet and Node.js</h1>
      <Map vehiclePosition={vehiclePosition} routePath={routePath} />
    </div>
  );
}
const MyComponent = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Custom logic to handle the refresh
      // Display a confirmation message or perform necessary actions
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return <div>My Component</div>;
};

export default App;
