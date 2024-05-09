import React from 'react';
import category from './beecategory.json';
import { Link } from 'react-router-dom';
import './Upload.css'; // Import your CSS file

function Upload() {
    return (
        <div className="upload-container">
            <h1 className="page-title">SELECT A BEE TYPE</h1>
            <div className="bee-grid">
                {category.map((bee, index) => (
                    <Link to={`/details/${bee.id}`} key={index} className="bee-link">
                        <div className="bee-item">
                            <img src={bee.imageUrl} alt={bee.name} className="bee-image" />
                            <span className="bee-name">{bee.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

<<<<<<< HEAD
export default Upload;
=======
export default Upload;
>>>>>>> 8ea440b0 (Fixed Maps, Css)
