// TODO: STYLE SEE MORE BUTTON

import React, { useEffect, useRef, useState, useMemo } from "react";
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

  const [sortBy, setSortBy] = useState<
    | "review-asc"
    | "review-desc"
    | "price-asc"
    | "price-desc"
    | "distance-asc"
    | "distance-desc"
    | null
  >(null);

  const hotels: Hotel[] = data?.result?.hotels || [];

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

  // Helper: Extract numeric distance from accessibilityLabel
  const extractDistanceFromLabel = (label: string): number => {
    const match = label.match(/([\d.]+)\s*km/i);
    return match ? parseFloat(match[1]) : Infinity;
  };

  // Calculate average price of hotels
  const averagePrice = useMemo(() => {
    const prices = hotels
      .map((hotel: Hotel) => hotel?.property?.priceBreakdown?.grossPrice?.value)
      .filter((price: number | undefined) => typeof price === "number");

    if (prices.length === 0) return 0;

    const total = prices.reduce((sum: number, price: number) => sum + price, 0);
    return total / prices.length;
  }, [hotels]);

  // Sort hotels
  const sortedHotels = useMemo(() => {
    const sorted = [...hotels];

    switch (sortBy) {
      case "review-asc":
        return sorted.sort((a, b) => a.property.reviewScore - b.property.reviewScore);
      case "review-desc":
        return sorted.sort((a, b) => b.property.reviewScore - a.property.reviewScore);
      case "price-asc":
        return sorted.sort(
          (a, b) =>
            (a.property.priceBreakdown?.grossPrice?.value ?? Infinity) -
            (b.property.priceBreakdown?.grossPrice?.value ?? Infinity)
        );
      case "price-desc":
        return sorted.sort(
          (a, b) =>
            (b.property.priceBreakdown?.grossPrice?.value ?? 0) -
            (a.property.priceBreakdown?.grossPrice?.value ?? 0)
        );
      case "distance-asc":
        return sorted.sort(
          (a, b) =>
            extractDistanceFromLabel(a.accessibilityLabel) -
            extractDistanceFromLabel(b.accessibilityLabel)
        );
      case "distance-desc":
        return sorted.sort(
          (a, b) =>
            extractDistanceFromLabel(b.accessibilityLabel) -
            extractDistanceFromLabel(a.accessibilityLabel)
        );
      default:
        return hotels;
    }
  }, [hotels, sortBy]);

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

        <div className="relative z-10 flex flex-row h-full p-5 gap-4">
          {/* Left side: Results */}
          <div className="w-1/2 overflow-y-auto" ref={resultsRef}>
            <h1 className="text-3xl font-bold text-white mb-6 text-center">
              Here are your results for {data?.result?.destination_info?.label || "your search"}!
            </h1>

            <ApiSearchbar onSearch={handleSearch} />

            {/* Sort dropdown */}
            <div className="flex justify-end mb-4">
              <select
                value={sortBy || ""}
                onChange={(e) =>
                  setSortBy( e.target.value as
                      | "review-asc"
                      | "review-desc"
                      | "price-asc"
                      | "price-desc"
                      | "distance-asc"
                      | "distance-desc"
                      | null
                  )}
                className="bg-white text-black px-4 py-2 rounded-md mt-5">
                <option value="">Sort by</option>
                <option value="review-asc">Review Score (Low to High)</option>
                <option value="review-desc">Review Score (High to Low)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="distance-asc">Distance (Close to Far)</option>
                <option value="distance-desc">Distance (Far to Close)</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-24">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 mt-6">
                {sortedHotels.length > 0 ? (
                  sortedHotels
                    .slice(0, visibleHotelsCount)
                    .map((hotel) => (
                      <HotelCard
                        key={hotel.hotel_id}
                        hotel={hotel}
                        averagePrice={averagePrice}
                      />
                    ))
                ) : (
                  <p className="text-white">No results found.</p>
                )}
              </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {sortedHotels.length > visibleHotelsCount && (
              <div className="flex justify-center mt-4">
  <div className="w-full max-w-xl">
    <button
      onClick={handleSeeMore}
      className="w-full bg-blue-900 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
    >
      See More
    </button>
  </div>
</div>



            )}
          </div>

          {/* Right side: Map */}
          <div className="w-1/2 sticky top-0 self-start">
            <div
              style={{
                height: resultsRef.current?.offsetHeight || "100%",
                transition: "height 0.3s ease",
              }}>
              <HotelMap hotels={data?.hotels || []} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Results;
