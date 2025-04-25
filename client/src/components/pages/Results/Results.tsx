//TODO: ADD SORTING 
  //SORT BY REVIEW (ascending and descending)
  //SORT BY PRICE (ascending and descending)
  //SORT BY DISTANCE (ascending and descending)

import React, { useEffect, useRef, useState } from "react";
import ApiSearchbar from "../../organisms/apiSearchbar/apiSearchbar";
import { useSearch } from "../../molecules/useSearch";
import { useSearchParams, useNavigate } from "react-router-dom";
import HotelMap from "../../organisms/HotelMap";
import HotelCard from "../../atoms/HotelCard";
import { useLocation } from "react-router-dom";

const Results: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const { data, loading, error, handleSearch } = useSearch();
  const [visibleHotelsCount, setVisibleHotelsCount] = useState(5);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  const handleSeeMore = () => {
    setVisibleHotelsCount((prevCount) => prevCount + 5);
  };

  return (
    <>
      {console.log(data)}
      <section className="relative w-full min-h-screen text-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]">
          <source src="/hotel-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[-1]" />

        {/* Main layout container */}
        <div className="relative z-10 flex flex-row h-full p-5 gap-4">
          {/* Left side: Results */}
          <div className="w-1/2 overflow-y-auto" ref={resultsRef}>
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              Here are your results for {data?.result?.destination_info?.label || "your search"}!
            </h1>

            <ApiSearchbar onSearch={handleSearch} />

            {loading ? (
              <div className="flex justify-center items-center h-24">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
                  <div className="grid grid-cols-1 gap-5 mt-6">
                  {/* Render only the first 5 hotels add 5 for each time the user presses "see more" */}
                    {data?.result?.hotels?.length > 0 ? (
                      data?.result?.hotels?.slice(0, visibleHotelsCount).map((hotel) => (
                      <HotelCard key={hotel.hotel_id} hotel={hotel} />
                      ))
                    ) : (<p className="text-white">No results found.</p>)}
                  </div>)}

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* See More Button */}
            {data?.result?.hotels?.length > visibleHotelsCount && (
              <div className="text-center mt-4">
                <button
                  onClick={handleSeeMore}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  See More
                </button>
              </div>)}
          </div>

          {/* Right side: Map */}
          <div className="w-1/2 sticky top-0 self-start">
            <div
              style={{
                height: resultsRef.current?.offsetHeight || "100%",
                transition: "height 0.3s ease",}}>
              <HotelMap hotels={data?.hotels || []} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Results;