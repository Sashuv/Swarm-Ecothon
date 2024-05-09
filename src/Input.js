import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to import useNavigate from react-router-dom
import useGeoLocation from './useGeoLocation';

function InputForm({ selectedBeeName }) {
    const [inputs, setInputs] = useState({
        imageUrl: '',
        caption: '',
        username: '',
        name: selectedBeeName,
    });
    const [submissionStatus, setSubmissionStatus] = useState(''); // State to manage submission status message
    const navigate = useNavigate(); // Hook for navigation
    const location = useGeoLocation();

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location.loaded && !location.error) {
            const postData = {
                ...inputs,
                Latitude: location.coordinates.lat,
                Longitude: location.coordinates.lng
            };
            console.log(postData);
            fetch('http://localhost:3001/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setSubmissionStatus('Submission Done'); // Update submission status message
                setTimeout(() => navigate('/'), 2000); // Navigate back to home page after 2 seconds
            })
            .catch((error) => {
                console.error('Error:', error);
                setSubmissionStatus('Submission Failed'); // Update status message on error
            });
        } else {
            console.error('Geolocation not loaded or error:', location.error);
            setSubmissionStatus('Geolocation error, try again.'); // Update status message on geolocation error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="imageUrl" value={inputs.imageUrl} onChange={handleChange} placeholder="Image URL" />
            <input type="text" name="caption" value={inputs.caption} onChange={handleChange} placeholder="Caption" />
            <input type="text" name="username" value={inputs.username} onChange={handleChange} placeholder="Username" />
            <button type="submit">Submit</button>
            {submissionStatus && <p>{submissionStatus}</p>} {/* Display submission status message */}
        </form>
    );
}

export default InputForm;
