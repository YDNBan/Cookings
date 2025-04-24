import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";

type Hotel = {
  hotel_id: number;
  accessibilityLabel: string;
  property: {
    name: string;
    reviewScore: number;
    latitude: number;
    longitude: number;
    photoUrls: string[];
  };
};

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const navigate = useNavigate();
  const { name, reviewScore, latitude, longitude, photoUrls } = hotel.property;
  const { accessibilityLabel } = hotel;

  const [address, setAddress] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  // Extract the "distance from downtown" from accessibilityLabel
  useEffect(() => {
    const extractDistance = () => {
      const distanceMatch = accessibilityLabel.match(/(\d+(\.\d+)?\s?(km|m)\s*from downtown)/);
      if (distanceMatch) {
        const distanceValue = parseFloat(distanceMatch[1]);
        const unit = distanceMatch[3];

        // Convert to km if in meters
        const distanceInKm = unit === "m" ? distanceValue / 1000 : distanceValue;
        setDistance(`${distanceInKm.toFixed(1)} km from downtown`);
      } else {
        setDistance("Distance unknown");
      }
    };

    extractDistance();
  }, [accessibilityLabel]);

  // Fetch the address using OpenStreetMap's reverse geocoding
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
          {
            headers: {
              "User-Agent": "Cookings/1.0 (cayscue@uncc.edu)", 
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        if (data?.address) {
          const { house_number, road, city, state, postcode } = data.address;

          const formattedAddress = [house_number, road, city, state, postcode]
            .filter(Boolean)
            .join(", ");

          setAddress(formattedAddress || "Address not available");
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address");
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  // Shorten address if it's too long
  const truncatedAddress =
    address && address.length > 20 ? `${address.slice(0, 20)}...` : address;

  return (
    <div className="relative flex items-center bg-white rounded-lg p-4 shadow-md">
      <img
        src={photoUrls?.[0]}
        alt={name}
        className="w-[150px] h-auto rounded-md mr-4"
      />
      <div className="text-left text-black">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-sm mb-1">⭐ {reviewScore}/10</p>
        <p className="text-sm text-gray-600 flex items-center">
          <FiMapPin className="mr-2" />
          {truncatedAddress || "Loading address..."} {distance || "Loading distance..."}
        </p>
      </div>
      <button
        onClick={() => navigate(`/hotels/${hotel.hotel_id}`)}
        className="absolute bottom-4 right-4 text-blue-500 text-sm underline hover:text-blue-700 transition"
      >
        Read More
      </button>
    </div>
  );
};

export default HotelCard;