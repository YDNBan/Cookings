import React from "react";
import { useNavigate } from "react-router-dom";

type Hotel = {
  hotelId: number;
  hotelName: string;
  hotelImage: string;
  hotelAddress: string;
};

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center bg-white rounded-lg p-4 shadow-md">
      <img
        src={hotel.hotelImage}
        alt={hotel.hotelName}
        className="w-[150px] h-auto rounded-md mr-4"
      />
      <div className="text-left text-black">
        <h2 className="text-xl font-bold mb-2">{hotel.hotelName}</h2>
        <p className="text-base">{hotel.hotelAddress}</p>
      </div>
      <button
        onClick={() => navigate(`/hotels/${hotel.hotelId}`)}
        className="absolute bottom-4 right-4 text-blue-500 text-sm underline hover:text-blue-700 transition"
      >
        Read More
      </button>
    </div>
  );
};

export default HotelCard;