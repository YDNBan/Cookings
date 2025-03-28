import React from "react";
import ApiSearchbar from "../../organisms/apiSearchbar/apiSearchbar";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate(); // Use navigate to go to a new page

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative w-full h-[500px] flex items-center justify-center text-center text-white z-[1]">
      <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src="/hotel-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      <div className="relative z-1 max-w-[600px] p-5">
        <h1 className="text-4xl mb-2">Find The Right Hotel For You</h1>
        <p className="text-xl mb-5">Compare prices, read reviews, and make the best deal for you.</p>

        <div className="search-bar">
          <ApiSearchbar onSearch={handleSearch} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
