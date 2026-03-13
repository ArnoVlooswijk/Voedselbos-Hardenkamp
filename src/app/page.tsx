"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// We laden de kaart dynamisch zodat hij niet crasht tijdens het opstarten
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

export default function VoedselbosKaart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Zodra de pagina "mounted" is, weten we dat we veilig kunnen laden
    setMounted(true);
    
    // Fix voor de Leaflet marker icoontjes die soms verdwijnen in Next.js
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
      });
    });
  }, []);

  if (!mounted) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Kaart wordt geladen...</div>;

  return (
    <main style={{ height: '100vh', width: '100%' }}>
      <MapContainer 
        center={[52.333, 6.467]} 
        zoom={16} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[52.333, 6.467]}>
          <Popup>
            🌳 <strong>Voedselbos Hardenkamp</strong> <br /> 
            Welkom op de kaart!
          </Popup>
        </Marker>
      </MapContainer>
    </main>
  );
}
