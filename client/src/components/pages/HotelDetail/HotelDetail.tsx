import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Hotel = {
  hotel_id: number;
  hotel_name: string;
  address: string;
  city: string;
  country_trans: string;
  url: string;
  review_nr: number;
  latitude: number;
  longitude: number;
  property_highlight_strip: { name: string }[];
  facilities_block: { facilities: { name: string }[] };
  rawData: {
    photoUrls: string[];
    reviewScore: number;
    reviewScoreWord: string;
    priceBreakdown?: {
      grossPrice?: {
        value: number;
      };
    };
  };
};

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`https://cookings.onrender.com/hotels/${id}`);

        if (!response.ok) throw new Error("Failed to fetch hotel details");

        const result = await response.json();
        setHotel(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const getBetterPhotoUrl = (url: string) => {
    return url.replace("/square60/", "/square400/");
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (!hotel) {
    return <div>Hotel not found.</div>;
  }

  const photoUrl = hotel.rawData?.photoUrls?.[0];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-block px-4 py-2 mb-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
      >
        ← Back to Search
      </button>

      {/* Hotel Image */}
      {photoUrl && (
        <img
          src={getBetterPhotoUrl(photoUrl)}
          alt={hotel.hotel_name}
          className="w-full h-80 object-cover rounded-xl shadow-lg"
        />
      )}

      {/* Hotel Name and Rating */}
      <div>
        <h1 className="text-3xl font-bold">{hotel.hotel_name}</h1>
        <p className="text-gray-500">
          {hotel.city}, {hotel.country_trans}
        </p>
        {hotel.rawData?.reviewScore && (
          <p className="mt-1 text-yellow-600">
            {hotel.rawData.reviewScore} ★ {hotel.rawData.reviewScoreWord}
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Address</h2>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${hotel.address}, ${hotel.city}, ${hotel.country_trans}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {hotel.address}
        </a>
      </div>

      {/* Highlights */}
      {hotel.property_highlight_strip?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Highlights</h2>
          <ul className="list-disc list-inside space-y-1">
            {hotel.property_highlight_strip.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Facilities */}
      {hotel.facilities_block?.facilities?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Facilities</h2>
          <ul className="list-disc list-inside space-y-1">
            {hotel.facilities_block.facilities.map((facility, index) => (
              <li key={index}>{facility.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Price */}
      {hotel.rawData?.priceBreakdown?.grossPrice?.value && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Price</h2>
          <p className="text-green-600 font-bold">
            ${hotel.rawData.priceBreakdown.grossPrice.value.toFixed(2)}
          </p>
        </div>
      )}

      {/* Booking Link */}
      <div>
        <a
          href={hotel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          View on Booking.com
        </a>
      </div>
    </div>
  );
};

export default HotelDetail;
