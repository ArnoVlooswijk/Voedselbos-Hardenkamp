'use client';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function TotaalOverzicht() {
  useEffect(() => {
    // DIT IS DE FIX: we ruimen de oude kaart eerst op
    const container = L.DomUtil.get('map');
    if (container != null) {
      container._leaflet_id = null;
    }

    // Nu maken we de kaart pas aan
    const map = L.map('map').setView([52.3, 6.5], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    return () => map.remove();
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h1>Kaart Voedselbos Hardenkamp</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
}
