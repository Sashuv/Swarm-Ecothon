import React from 'react';
import { useParams } from 'react-router-dom';
import category from './beecategory.json';
import InputForm from './Input';

function Details() {
    const { beeId } = useParams();
    const bee = category.find(b => b.id.toString() === beeId);

    return (
        <div>
            {bee ? (
                <div>
                    <h1>{bee.name}</h1>
                    <img src={bee.imageUrl} alt={bee.name} style={{ width: 200 }} />
                    <p>{bee.description}</p>
                    {/* Pass the selected bee's name as a prop */}
                    <InputForm selectedBeeName={bee.name} />
                </div>
            ) : (
                <p>No bee found.</p>
            )}
        </div>
    );
}

export default Details;
