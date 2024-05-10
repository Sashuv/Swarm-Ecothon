import React from 'react';
import { useParams } from 'react-router-dom';
import category from './beecategory.json';
import InputForm from './Input';
import './details.css';

function Details() {
    const { beeId } = useParams();
    const bee = category.find(b => b.id.toString() === beeId);
    console.log(bee.name);
    return (
        <div className="details-container"> 
            
            {bee ? (
                
                <div className="bee-details"> {/* Change className to bee-details */}
                   {/* Change className to bee-name */}
                  
                    <img src={bee.imageUrl} alt={bee.name} className="bee-image" /> {/* Change className to bee-image */}
                    <p className="bee-description">{bee.description}</p> {/* Change className to bee-description */}
                    {/* Pass the selected bee's name as a prop */}
                    <InputForm selectedBeeName={bee.name} />
                    
                </div>
            ) : (
                <p className="no-bee">No bee found.</p>
            )}
        </div>
    );
}

export default Details;

