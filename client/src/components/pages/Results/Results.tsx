import React from "react";
import './Results.css'
import ApiSearchbar from "../../organisms/apiSearchbar/apiSearchbar";
import { useSearch } from "../../molecules/useSearch";

const Results: React.FC = () => {
  const { data, loading, error, handleSearch } = useSearch();
  const publicUrl = import.meta.env.VITE_PUBLIC_URL ?? "";

type Job = {
  hotelId: number,
  hotelName: string, 
  hotelImage: string, //PUT IMAGE URL
  hotelAddress: string,
};

const dummyHotels: Job[] = [
  {
    hotelId: 1,
    hotelName: "Grand Charlotte Hotel",
    hotelImage: "https://via.placeholder.com/150",
    hotelAddress: "123 Main St, Charlotte, NC",
  },
  {
    hotelId: 2,
    hotelName: "Queen City Inn",
    hotelImage: "https://via.placeholder.com/150",
    hotelAddress: "456 Elm St, Charlotte, NC",
  },
  {
    hotelId: 3,
    hotelName: "Uptown Suites",
    hotelImage: "https://via.placeholder.com/150",
    hotelAddress: "789 Pine St, Charlotte, NC",
  },
  {
    hotelId: 4,
    hotelName: "Southern Comfort Hotel",
    hotelImage: "https://via.placeholder.com/150",
    hotelAddress: "101 Maple Ave, Charlotte, NC",
  },
  {
    hotelId: 5,
    hotelName: "Skyline View Resort",
    hotelImage: "https://via.placeholder.com/150",
    hotelAddress: "202 Oak Dr, Charlotte, NC",
  },
];

  return (
    <section className="Hero">
      <div className="overlay"></div>
      <div className="content">
        <h1>Here are your results for Charlotte, NC!{/* NAME OF LOCATION HERE */}</h1> 

        <div className="search-bar">
  <ApiSearchbar onSearch={handleSearch} />
  {/* Display Loading Spinner or Hotel Results */}
  {loading ? (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  ) : (
    <div className="search-results">
      {/* STATIC HOTELS FOR PROOF OF CONCEPT */}
      {dummyHotels.map((hotel) => (
        <div key={hotel.hotelId} className="hotel-card">
          <img src={hotel.hotelImage} alt={hotel.hotelName} />
          <div className="hotel-info">
            <h2>{hotel.hotelName}</h2>
            <p>{hotel.hotelAddress}</p>
          </div>
          <button className="read-more-button">Read More</button>
        </div>
      ))}
    </div>
  )}
  {error && <p style={{ color: "red" }}>{error}</p>}
</div>
      </div>
    </section>
  );
};

export default Results;