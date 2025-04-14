import React, { useEffect, useRef } from "react";
import ApiSearchbar from "../../organisms/apiSearchbar/apiSearchbar";
import { useSearch } from "../../molecules/useSearch";
import { useSearchParams, useNavigate } from "react-router-dom";
import HotelMap from "../../organisms/HotelMap";

const Results: React.FC = () => {
  const { data, loading, error, handleSearch } = useSearch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  type Job = {
    hotelId: number;
    hotelName: string;
    hotelImage: string;
    hotelAddress: string;
    lat: number;
    lng: number;
  };

  const dummyHotels: Job[] = [
    {
      hotelId: 1,
      hotelName: "Grand Charlotte Hotel",
      hotelImage: "https://via.placeholder.com/150",
      hotelAddress: "123 Main St, Charlotte, NC",
      lat: 35.2271,
      lng: -80.8431,
    },
    {
      hotelId: 2,
      hotelName: "Queen City Inn",
      hotelImage: "https://via.placeholder.com/150",
      hotelAddress: "456 Elm St, Charlotte, NC",
      lat: 35.226446,
      lng: -80.839209,
    },
    {
      hotelId: 3,
      hotelName: "Uptown Suites",
      hotelImage: "https://via.placeholder.com/150",
      hotelAddress: "789 Pine St, Charlotte, NC",
      lat: 35.226446,
      lng: -80.839209,
    },
    {
      hotelId: 4,
      hotelName: "Southern Comfort Hotel",
      hotelImage: "https://via.placeholder.com/150",
      hotelAddress: "101 Maple Ave, Charlotte, NC",
      lat: 35.22814,
      lng: -80.844402,
    },
    {
      hotelId: 5,
      hotelName: "Skyline View Resort",
      hotelImage: "https://via.placeholder.com/150",
      hotelAddress: "202 Oak Dr, Charlotte, NC",
      lat: 35.226446,
      lng: -80.839209,
    },
  ];

  return (
    <section className="relative w-full min-h-screen text-white">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src="/hotel-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[-1]" />

      {/* Main layout container */}
      <div className="relative z-10 flex flex-row h-full p-5 gap-4">
        {/* Left side: Results */}
        <div className="w-1/2 overflow-y-auto" ref={resultsRef}>
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Here are your results for Charlotte, NC!
          </h1>

          <ApiSearchbar onSearch={handleSearch} />

          {loading ? (
            <div className="flex justify-center items-center h-24">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 mt-6">
              {dummyHotels.map((hotel) => (
                <div
                  key={hotel.hotelId}
                  className="relative flex items-center bg-white rounded-lg p-4 shadow-md"
                >
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
              ))}
            </div>
          )}

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Right side: Map, stretched to match height of results */}
        <div className="w-1/2 sticky top-0 self-start">
          <div
            style={{
              height: resultsRef.current?.offsetHeight || "100%",
              transition: "height 0.3s ease",
            }}
          >
            <HotelMap hotels={dummyHotels} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
