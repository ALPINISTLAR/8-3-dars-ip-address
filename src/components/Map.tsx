import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  ipLocation: {
    location?: {
      lat: number;
      lng: number;
    };
    code: number;
  };
  ipAddress: string;
  error: boolean;
}

const Map: React.FC<MapProps> = ({ ipLocation, ipAddress, error }) => {
  const mapRef = useRef<any>(null);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const position =
    ipLocation?.location === undefined
      ? ipLocation?.code
      : ipLocation?.location;

  useEffect(() => {
    position === 422 ? setLatitude(null) : setLatitude(position?.lat);
    position === 422 ? setLongitude(null) : setLongitude(position?.lng);
  }, [ipLocation]);

  if (!error && latitude === undefined) {
    return (
      <>
        <div className="flex h-full items-center justify-center">
          <p>We are fetching your location...</p>
        </div>
      </>
    );
  }

  return (
    <>
      {latitude !== null && position ? (
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ height: "100%", width: "100%", zIndex: "-1" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Additional map layers or components can be added here */}

          <Marker position={[latitude, longitude]}>
            <Popup>
              longitude
              <p>Here You are!</p>
            </Popup>
          </Marker>
          <ChangeCenter position={[latitude, longitude]} />
        </MapContainer>
      ) : (
        <p className="text-center text-red-500">
          OOPS! Something Went Wrong 😥
        </p>
      )}
    </>
  );
};

interface ChangeCenterProps {
  position: [number, number];
}

const ChangeCenter: React.FC<ChangeCenterProps> = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

export default Map;
