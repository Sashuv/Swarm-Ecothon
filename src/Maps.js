import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import osm from './osm-provider';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import useGeoLocation from './useGeoLocation';
import { Link } from 'react-router-dom';
import './Maps.css';
const markerIcon = new L.Icon({
    iconUrl: '../images/beeicon.png',
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

const personIcon = new L.Icon({
    iconUrl: '../images/561237.png',
    iconSize: [35, 45],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
});

function Maps() {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [beesNearby, setBeesNearby] = useState([]);
    const [bees, setBees] = useState([]);  // Updated state variable to hold bee data
    const ZOOM = 9;
    const mapRef = useRef();
    const location = useGeoLocation();
    const audioRef = useRef();  // Reference for the audio element

    const sendLocationToBackend = async (location) => {
        try {
            const response = await fetch('http://localhost:3001/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: location.coordinates.lat,
                    longitude: location.coordinates.lng
                })
            });
            if (!response.ok) {
                throw new Error('Failed to send location');
            }
            const result = await response.json();
            console.log('Location sent successfully:', result);
        } catch (error) {
            console.error('Error sending location:', error);
        }
    };

    // Function to find nearby bees based on user location
    const findNearbyBees = async () => {
        if (location.loaded && !location.error) {
            try {
                const response = await fetch('http://localhost:3001/bees-nearby', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userLatitude: location.coordinates.lat,
                        userLongitude: location.coordinates.lng
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch nearby bees');
                }
                const beesNearbyNames = await response.json();
                setBeesNearby(beesNearbyNames); // Update state with the fetched names
                console.log('Nearby bees:', beesNearbyNames);
            } catch (error) {
                console.error('Error fetching nearby bees:', error);
            }
        } else {
            alert(location.error.message || 'Location not available');
        }
    };
    



    

 const showMyLocation = () => {
    if (location.loaded && !location.error) {
        mapRef.current.flyTo(
            [location.coordinates.lat, location.coordinates.lng],
            ZOOM,
            { animate: true }
        );
        if (audioRef.current) {
            audioRef.current.play();
        }
        sendLocationToBackend(location); // Send location to the backend
    } else {
        alert(location.error.message);
    }
};


    // Fetch bee data from an API
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3001/data');  // Adjust the API endpoint as necessary
            if (!response.ok) {
                throw new Error('Failed to fetch bee data');
            }
            const jsonData = await response.json();
            setBees(jsonData);
            
        } catch (error) {
            console.error('Error fetching bee data:', error);
        }
    };

    // Use useEffect to call fetchData when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='container'>
<<<<<<< HEAD
            <h1>Bee Map</h1>
            <MapContainer style = {{width: '900px', height: '550px'}}center={center} zoom={ZOOM} ref={mapRef}>
=======
            <h1>Interactive Bee-Map</h1>
            <MapContainer className = 'MapContainer' style = {{width: '900px', height: '550px'}}center={center} zoom={ZOOM} ref={mapRef}>
>>>>>>> 8ea440b0 (Fixed Maps, Css)
                {location.loaded && !location.error && (
                    <Marker icon={personIcon} position={[location.coordinates.lat, location.coordinates.lng]}></Marker>
                )}
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                {bees.map((bee, idx) => (
                    <Marker key={idx} position={[bee.Latitude, bee.Longitude]} icon={markerIcon}>
<<<<<<< HEAD
                        <Popup>
                            <b>{bee['bee-type']}</b><br />
                            <img src={bee.ImageUrl} alt={bee['bee-type']} style={{width: '100px'}} /><br />
                            Latitude: {bee.Latitude}, Longitude: {bee.Longitude}
                            <p>{bee.Caption}</p>
                            <p>{bee.Username}</p>
                        </Popup>
                    </Marker>
=======
                    <Popup>
                    <strong><p>{bee.Username}</p></strong>
                        <b>{bee['bee-type']}</b><br />
                        <img src={bee.ImageUrl} alt={bee['bee-type']} style={{width: '200px'}} /><br />
                        Latitude: {bee.Latitude}, Longitude: {bee.Longitude}
                        <p>{bee.Caption}</p>
                        
                    </Popup>
                </Marker>
                
>>>>>>> 8ea440b0 (Fixed Maps, Css)
                ))}
            </MapContainer>
            <audio src='../audio/sui.mp3' ref={audioRef} type='audio/mp3' />  {/* Audio element with no controls */}
            <div className='Button-Group'>

            
            <button className='bee-button' onClick={showMyLocation}>Locate Me</button>
            <Link to={`/upload`} >
                <button className='bee-button'> Upload </button>        
            </Link>
            
            <Link to={{
    pathname: '/nearme',

}} >
<<<<<<< HEAD
    <button className='bee-button' onClick={findNearbyBees}>I want a bee</button>
=======
    <button className='bee-button' onClick={findNearbyBees}>I Want A Bee</button>
>>>>>>> 8ea440b0 (Fixed Maps, Css)
</Link>
</div>
        </div>
    );
}

<<<<<<< HEAD
export default Maps;
=======
export default Maps;
>>>>>>> 8ea440b0 (Fixed Maps, Css)
