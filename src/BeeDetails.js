import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import beeData from './beecategory.json';
import './BeeDetails.css';  // Import the CSS file here

function BeeDetails() {
  const { beeName } = useParams();
  const [selectedBee, setSelectedBee] = useState(null);

  useEffect(() => {
    const bee = beeData.find(b => b.name.toLowerCase().trim() === beeName.toLowerCase().trim());
    setSelectedBee(bee);
  }, [beeName]);

  if (!selectedBee) {
    return <p>Bee not found. Please check the URL and try again.</p>;
  }

  return (
    <div className="bee-details-container">
      <h2 className="bee-details-title">{selectedBee.name}</h2>
      <img src={selectedBee.imageUrl} alt={selectedBee.name} className="bee-details-img" />
      <p className="bee-details-text">{selectedBee.Scientificname}</p>
      <p className="bee-details-text">{selectedBee.Appearance}</p>
      <p className="bee-details-text">{selectedBee.Habitat}</p>
      <h3 className="bee-details-section-heading">Associated Flowers</h3>
      <ul className="bee-details-list">
        {selectedBee.flowers.map((flower, index) => (
          <li key={index} className="bee-details-list-item">
            <strong>{flower.flowerName}</strong>: {flower.description}
            <br />
            <img src={flower.flowerImageUrl} alt={flower.flowerName} />
            <p><strong>Environments:</strong> {flower.environments.join(', ')}</p>
            <p><strong>Benefits:</strong> {flower.benefits.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BeeDetails;
