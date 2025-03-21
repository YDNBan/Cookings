import React from "react";
import "./Hero.css";
import ApiSearchbar from "../../organisms/apiSearchbar/apiSearchbar";
import { useSearch } from "../../molecules/useSearch";

const Hero: React.FC = () => {
  const { data, loading, error, handleSearch } = useSearch();
  const publicUrl = import.meta.env.VITE_PUBLIC_URL ?? "";

  return (
    <section className="Hero">
      <video autoPlay loop muted playsInline className="video-bg">
      <source src={`${publicUrl}/hotel-video.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="content">
        <h1>Find The Right Hotel For You</h1>
        <p>Compare prices, read reviews, and make the best deal for you.</p>

        <div className="search-bar">
          <ApiSearchbar onSearch={handleSearch} />
        </div>

        {/* Display Loading, Error, or Data */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data && (
          <div>
            <h3>Results:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre> {/* Pretty-print JSON */}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
