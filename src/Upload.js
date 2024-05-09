import React from 'react';
import category from './beecategory.json';
import { Link } from 'react-router-dom';

function Upload() {
    return (
        <div>
            {category.map((bee, index) => (
                <div key={index}>
                    {/* Wrap the clickable content inside the Link component */}
                    <Link to={`/details/${bee.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h1>{bee.name}</h1>
                        <img src={bee.imageUrl} alt={bee.name} style={{ width: 200 }} />
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Upload;
