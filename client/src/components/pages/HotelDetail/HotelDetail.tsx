import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import dummyHotels from "../../../data/dummyHotels.json";


const HotelDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = dummyHotels.find((h) => h.hotelId === Number(id));

  if (!hotel) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Hotel not found.</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="relative w-full h-[500px] flex items-center justify-center text-center text-white z-[1]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/hotel-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>

      <div className="relative z-10 p-5 max-w-4xl mx-auto">
        {/* White box with rounded corners */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-block px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition text-sm"
          >
            ← Back to Results
          </button>

          <h1 className="text-3xl font-bold mb-4 text-black">{hotel.hotelName}</h1>

          <img
            src={hotel.hotelImage}
            alt={hotel.hotelName}
            className="w-full h-auto rounded-lg shadow-md mb-6 text-black"
          />

          <p className="text-lg text-black mb-2">{hotel.hotelAddress}</p>
          <p className="text-md text-black mb-6">{hotel.description}</p>

          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={() => alert("Booking functionality coming soon!")}
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotelDetail;
