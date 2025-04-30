import { useState } from "react";

interface ApiResponse {
  // Define the expected structure of your API response if known
  [key: string]: any; // Use a more specific type if possible
}

export const useSearch = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (query: string) => {
    if (!query.trim()) return; // Prevent empty searches

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://cookings.onrender.com/hotels/?query=${query}`);
      console.log(query);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const parsedData: ApiResponse = await response.json();
      setData(parsedData);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handleSearch };
};
