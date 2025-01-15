'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { selectStation } from '@/store/userSlice';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface StationFeature {
  type: 'Feature';
  id: number;
  geometry: { type: 'Point'; coordinates: [number, number]; };
  properties: { Place: string; Address: string; };
}

interface GMapProps {
  googleApiKey: string;
}

const containerStyle = { width: '100%', height: '500px' };

export default function GMap({ googleApiKey }: GMapProps) {
  const dispatch = useDispatch();
  const [stations, setStations] = useState<StationFeature[]>([]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleApiKey
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/stations.geojson');
        const data = await res.json();
        if (data.type === 'FeatureCollection') {
          setStations(data.features);
        }
      } catch (err) {
        console.error('Error fetching stations:', err);
      }
    })();
  }, []);

  const handleMarkerClick = useCallback((station: StationFeature) => {
    console.log('Station clicked:', station.properties.Place);
    dispatch(selectStation(station.id));
  }, [dispatch]);

  const defaultCenter = useMemo(() => ({ lat: 22.3, lng: 114.0 }), []);

  if (loadError) {
    return <div className="text-red-500">Error loading Google Maps: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
    >
      {stations.map((st) => {
        const [lng, lat] = st.geometry.coordinates;
        return (
          <Marker
            key={st.id}
            position={{ lat, lng }}
            onClick={() => handleMarkerClick(st)}
          />
        );
      })}
    </GoogleMap>
  );
}
