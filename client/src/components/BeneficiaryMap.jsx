import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.test-placeholder';
mapboxgl.accessToken = TOKEN;

// Indian theme colors for status
const statusColor = { 
  approved: '#138808',   // Indian Green
  pending: '#FF9933',    // Indian Saffron
  rejected: '#E0115F'    // Ruby Red
};

export default function BeneficiaryMap({ geo }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [heat, setHeat] = useState(false);

  // Initialize map
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [78.9629, 20.5937],
      zoom: 3.6,
    });
  }, []);

  // Render markers
  useEffect(() => {
    if (!mapRef.current || !geo || heat) return;
    // Clear previous markers by storing in map instance
    if (mapRef.current.__markers) {
      mapRef.current.__markers.forEach(m => m.remove());
    }
    mapRef.current.__markers = geo.features.map((f) => {
      const el = document.createElement('div');
      el.style.width='10px'; el.style.height='10px'; el.style.borderRadius='50%';
      el.style.background = statusColor[f.properties.status] || '#ccc';
      el.style.boxShadow='0 0 0 2px rgba(0,0,0,0.3)';
      el.title = `${f.properties.name} (${f.properties.status})`;
      return new mapboxgl.Marker(el).setLngLat(f.geometry.coordinates).addTo(mapRef.current);
    });
  }, [geo, heat]);

  // Heatmap layer toggle
  useEffect(() => {
    if (!mapRef.current || !geo) return;
    const map = mapRef.current;
    const sourceId = 'beneficiary-heat-src';
    const layerId = 'beneficiary-heat';
    if (heat) {
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, { type:'geojson', data: geo });
      }
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type:'heatmap',
          source: sourceId,
          maxzoom:9,
          paint:{
            'heatmap-weight':['interpolate',['linear'],['get','score'],0,0,100,1],
            'heatmap-intensity':['interpolate',['linear'],['zoom'],0,1,9,3],
            'heatmap-color':[
              'interpolate',['linear'],['heatmap-density'],
              0,'rgba(0,0,0,0)',
              0.2,'#000080',      // Navy Blue
              0.4,'#FF9933',      // Saffron
              0.6,'#FFD700',      // Gold
              0.8,'#138808'       // Green
            ],
            'heatmap-radius':['interpolate',['linear'],['zoom'],0,2,9,30],
            'heatmap-opacity':0.75
          }
        });
      }
    } else {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    }
  }, [heat, geo]);

  return (
    <div style={{ width: '100%', height: '300px', position: 'relative' }}>
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        <button 
          onClick={()=>setHeat(h=>!h)} 
          className="text-xs px-3 py-2 rounded-lg font-semibold transition-all duration-300"
          style={{
            background: heat 
              ? 'linear-gradient(135deg, #FF9933 0%, #FFD700 100%)'
              : 'rgba(255, 255, 255, 0.1)',
            color: heat ? '#000' : '#FFF',
            border: '1px solid rgba(255, 153, 51, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {heat ? '📍 Markers' : '🔥 Heatmap'}
        </button>
      </div>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          borderRadius: '12px',
          overflow: 'hidden'
        }} 
      />
    </div>
  );
}