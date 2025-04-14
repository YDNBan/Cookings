import React, { useEffect, useRef } from "react";
import ApiSearchbar from "../../organisms/apiSearchbar/apiSearchbar";
import { useSearch } from "../../molecules/useSearch";
import { useSearchParams, useNavigate } from "react-router-dom";
import HotelMap from "../../organisms/HotelMap";
import dummyHotels from "../../../data/dummyHotels.json";
import HotelCard from "../../atoms/HotelCard";

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
            Here are your results for {query || "your search"}!
          </h1>

          <ApiSearchbar onSearch={handleSearch} />

          {loading ? (
            <div className="flex justify-center items-center h-24">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 mt-6">
              {/* MAKE EVERYTHING IN THE MAP INTO A COMPONENT */}
              {dummyHotels.map((hotel) => (
                <HotelCard key={hotel.hotelId} hotel={hotel}/>
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
