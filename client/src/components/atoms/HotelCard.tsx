import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { FaDollarSign } from "react-icons/fa";

type Hotel = {
  hotel_id: number;
  accessibilityLabel: string;
  property: {
    name: string;
    reviewScore: number;
    latitude: number;
    longitude: number;
    photoUrls: string[];
    reviewScoreWord: string;
    reviewCount: number;
    priceBreakdown?: {
      grossPrice?: {
        value: number;
      };
    };
  };
};

const HotelCard: React.FC<{ hotel: Hotel; averagePrice: number }> = ({
  hotel,
  averagePrice,
}) => {
  const navigate = useNavigate();
  const {
    name,
    reviewScore,
    reviewScoreWord,
    reviewCount,
    latitude,
    longitude,
    photoUrls,
    priceBreakdown,
  } = hotel.property;
  const { accessibilityLabel } = hotel;
  const [address, setAddress] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  const price = priceBreakdown?.grossPrice?.value;

  // Determine price category based on average
  //average is passed from Results.tsx
  const getPriceCategory = (price: number, average: number) => {
    const low = average * 0.8;
    const high = average * 1.2;
    if (price < low) return "Affordable";
    if (price <= high) return "Moderate";
    return "Expensive";
  };

  const priceCategory =
    price && averagePrice ? getPriceCategory(price, averagePrice) : null;

  useEffect(() => {
    const extractDistance = () => {
      const match = accessibilityLabel.match(/(\d+(\.\d+)?)(\s?km|\s?m)\sfrom downtown/);
      if (match) {
        const value = parseFloat(match[1]);
        const unit = match[3].trim();
        const distanceKm = unit === "m" ? value / 1000 : value;
        setDistance(`${distanceKm.toFixed(1)} km from downtown`);
      } else {
        setDistance("Distance unknown");
      }
    };

    extractDistance();
  }, [accessibilityLabel]);

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

        if (!response.ok) throw new Error("Geocoding failed");

        const data = await response.json();
        const { house_number, road, city, state, postcode } = data.address || {};
        const fullAddress = [house_number, road, city, state, postcode].filter(Boolean).join(", ");
        setAddress(fullAddress || "Address not available");
      } catch (error) {
        console.error("Address fetch error:", error);
        setAddress("Error fetching address");
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  const truncatedAddress =
    address && address.length > 20 ? `${address.slice(0, 20)}...` : address;

  const renderPriceIcons = () => {
    if (priceCategory === "Affordable") {
      return <FaDollarSign className="text-green-500" />;
    }
    if (priceCategory === "Moderate") {
      return (
        <>
          <FaDollarSign className="text-yellow-500" />
          <FaDollarSign className="text-yellow-500" />
        </>
      );
    }
    if (priceCategory === "Expensive") {
      return (
        <>
          <FaDollarSign className="text-red-500" />
          <FaDollarSign className="text-red-500" />
          <FaDollarSign className="text-red-500" />
        </>
      );
    }
    return null;
  };

  return (
    <div className="relative flex items-center bg-white rounded-lg p-4 shadow-md">
      <img
        src={photoUrls?.[0]}
        alt={name}
        className="w-[150px] h-auto rounded-md mr-4"
      />
      <div className="text-left text-black">
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-sm mb-1">
          ⭐{reviewScore}/10 {reviewScoreWord} ({reviewCount} Reviews)
        </p>
        <div className={`flex items-center mb-1 text-lg 
          ${priceCategory === "Affordable"
            ? "text-green-500"
            : priceCategory === "Moderate"
            ? "text-yellow-500"
            : priceCategory === "Expensive"
            ? "text-red-500"
            : ""}`}>
          {renderPriceIcons()}
          <p className="ml-3 capitalize">{priceCategory}</p>
        </div>
        <p className="text-sm text-gray-600 flex items-center">
          <FiMapPin className="mr-2" />
          {address ? (
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-600"
              title={address}
            >
              {truncatedAddress}
            </a>
          ) : (
            "Loading address..."
          )}
          &nbsp;{distance || "Loading distance..."}
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
