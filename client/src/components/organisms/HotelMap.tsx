import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type Hotel = {
  hotelId: number;
  hotelName: string;
  hotelAddress: string;
  lat: number;
  lng: number;
};

type Props = {
  hotels: Hotel[];
};

const HotelMap: React.FC<Props> = ({ hotels }) => {
  const center: [number, number] = [35.2271, -80.8431]; // Charlotte, NC

  return (
    <div className="h-[400px] w-full mt-8 rounded-lg overflow-hidden shadow-lg z-[2] relative">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hotels.map((hotel) => (
          <Marker key={hotel.hotelId} position={[hotel.lat, hotel.lng]}>
            <Popup>
              <strong>{hotel.hotelName}</strong>
              <br />
              {hotel.hotelAddress}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HotelMap;
