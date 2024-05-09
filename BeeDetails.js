import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import beeData from './beecategory.json';

function BeeDetails() {
  const { beeName } = useParams();
  const [selectedBee, setSelectedBee] = useState(null);

  useEffect(() => {
    console.log("Bee name from URL:", beeName);  // Check the exact format of beeName
    const bee = beeData.find(b => b.name.toLowerCase().trim() === beeName.toLowerCase().trim());
    console.log("Found bee:", bee); // Check what bee object is found
    setSelectedBee(bee);
  }, [beeName]);

  if (!selectedBee) {
    console.log("No bee matched the given name. Check the data and URL parameter.");
    return <p>Bee not found. Please check the URL and try again.</p>;
  }

  return (
    <div>
      <h2>{selectedBee.name}</h2>
      <img src={selectedBee.imageUrl} alt={selectedBee.name} />
      <strong><h2>Scientific Name</h2></strong>
      <p>{selectedBee.Scientificname}</p>
      <strong><h2>Appearance</h2></strong>
      <p>{selectedBee.Appearance}</p>
      <strong><h2>Habitat</h2></strong>
      <p>{selectedBee.Habitat}</p>
      <h3>Associated Flowers</h3>
      <ul>
        {selectedBee.flowers.map((flower, index) => (
          <li key={index}>
            <strong>{flower.flowerName}</strong>: {flower.description}
            <br />
            <img src={flower.flowerImageUrl} alt={flower.flowerName} style={{ width: '100px' }} />
              <strong><h2>Flora Environments</h2></strong>: {flower.environments.join(', ')} 
            <strong><h2>Benefits</h2></strong>: {flower.benefits.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BeeDetails;
