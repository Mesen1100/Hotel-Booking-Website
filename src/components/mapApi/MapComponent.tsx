import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from 'react';
import { HotelLocation } from '@/app/[lang]/details/page';
import markerIcon from "../../assets/icons/marker-icon.png";



const customIcon = L.icon({
  iconUrl: markerIcon.src,
  iconSize: [38, 38],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76]
});

interface Props {
  mapApi?: HotelLocation;
}

const MapComponent: React.FC<Props> = ({ mapApi }) => {
  const defaultCenter: [number, number] = [0, 0];
  const [latitude, setLatitude] = useState<number>(defaultCenter[0]);
  const [longitude, setLongitude] = useState<number>(defaultCenter[1]);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newLatitude = mapApi?.latitude ?? defaultCenter[0];
    const newLongitude = mapApi?.longitude ?? defaultCenter[1];
    setLatitude(newLatitude);
    setLongitude(newLongitude);
  }, [mapApi]);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([latitude, longitude], 13);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);

      return () => {
        map.remove();
      };
    } else {
      console.error('Map container element not found');
    }
  }, [latitude, longitude]);

  return (
    <div ref={mapRef} id="map" style={{ height: '400px', width: '100%' }}></div>
  );
};

export default MapComponent;
