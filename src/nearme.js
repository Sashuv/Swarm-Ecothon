import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NearMe.css';  // Make sure the CSS file is imported
import beeIcon from './beeicon.png';  // Adjust the path as necessary

function NearMe() {
  const [bees, setBees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/bees-nearby')
      .then(response => {
        setBees(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bees:', error);
        setError('Failed to fetch bees');
        setLoading(false);
      });
  }, []);

  const handleBeeClick = beeName => {
    navigate(`/bee/${beeName}`);
  };

  return (
    <div className="nearme-container">
      <h1 className="nearme-title">Bees Nearby</h1>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && bees.length === 0 && <p className="no-bees-message">No bees found nearby.</p>}
      {!loading && !error && bees.length > 0 && (
        <ul className="nearme-list">
          {bees.map((bee, index) => (
            <li key={index} onClick={() => handleBeeClick(bee)} style={{ cursor: 'pointer' }}>
              <img src={beeIcon} alt="Bee" style={{ marginRight: '8px', verticalAlign: 'middle', width:'50px' }} />
              {bee}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NearMe;
