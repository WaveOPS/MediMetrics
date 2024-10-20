// LocationPicker.js

import React, { useEffect } from 'react';
import L from 'leaflet';

const LocationPicker = ({ onLocationSelect }) => {
    useEffect(() => {
        // Initialize the map and set its view
        const map = L.map('map').setView([51.505, -0.09], 13);

        // Add OSM tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        // Handle click event on the map
        map.on('click', function(e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            // Call the onLocationSelect prop to send lat and lng back
            onLocationSelect(lat, lng);
            
            // Optionally, add a marker
            L.marker([lat, lng]).addTo(map).bindPopup(`Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`).openPopup();
        });

        // Cleanup on component unmount
        return () => {
            map.remove();
        };
    }, [onLocationSelect]); // Only re-run when onLocationSelect changes

    return <div id="map" style={{ height: '300px', width: '100%' }}></div>;
};

export default LocationPicker;
