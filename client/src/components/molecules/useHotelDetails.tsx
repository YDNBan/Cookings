import { useState, useEffect } from "react";
import { baseURL } from "../../services/hotelService";

interface ApiResponse {
  property: {
    name: string;
    reviewScore: number;
    reviewCount: number;
    photoUrls: string[];
    priceBreakdown: {
      grossPrice: {
        value: number;
      };
    };
  };
  [key: string]: any; // For other dynamic keys if needed
}

export const useHotelDetails = (id: string) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${baseURL}/hotels/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch hotel details");
        }

        const jsonData: ApiResponse = await response.json();
        console.log("Fetched Hotel Details:", jsonData); // Log the fetched data

        setData(jsonData);
      } catch (error) {
        console.error(error);
        setError("Error fetching hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  return { data, loading, error };
};
