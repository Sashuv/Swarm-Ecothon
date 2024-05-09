import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import osm from './osm-provider';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import useGeoLocation from './useGeoLocation';
import { Link } from 'react-router-dom';

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
    const [bees, setBees] = useState([]);  // Updated state variable to hold bee data
    const ZOOM = 9;
    const mapRef = useRef();
    const location = useGeoLocation();
    const audioRef = useRef();  // Reference for the audio element

    const showMyLocation = () => {
        if (location.loaded && !location.error) {
            mapRef.current.flyTo(
                [location.coordinates.lat, location.coordinates.lng],
                ZOOM,
                { animate: true }
            );
            if (audioRef.current) {
                audioRef.current.play();  // Play the audio using the reference
            }
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
            <MapContainer center={center} zoom={ZOOM} ref={mapRef}>
                {location.loaded && !location.error && (
                    <Marker icon={personIcon} position={[location.coordinates.lat, location.coordinates.lng]}></Marker>
                )}
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                {bees.map((bee, idx) => (
                    <Marker key={idx} position={[bee.Latitude, bee.Longitude]} icon={markerIcon}>
                        <Popup>
                            <b>{bee['bee-type']}</b><br />
                            <img src={bee.ImageUrl} alt={bee['bee-type']} style={{width: '100px'}} /><br />
                            Latitude: {bee.Latitude}, Longitude: {bee.Longitude}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <audio src='../audio/sui.mp3' ref={audioRef} type='audio/mp3' />  {/* Audio element with no controls */}
            <button className='LocateButton' onClick={showMyLocation}>Locate Me</button>
            <Link to={`/upload`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <button className='Upload Button'> Upload </button>        
            </Link>
        </div>
    );
}

export default Maps;
