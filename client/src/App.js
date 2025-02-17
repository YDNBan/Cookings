import React, { useState } from 'react'
import './styles/global.css'
import ApiSearchbar from "./components/organisms/apiSearchbar/apiSearchbar";

const App = () => {
  const [data, setData] = useState(null); // To store the API response
  const [loading, setLoading] = useState(false); // To track the loading state
  const [error, setError] = useState(""); // To store error messages

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    try {
      // Fetches the data to our backend 
      const response = await fetch(`http://localhost:5000/api/?query=${query}`);
      if(!response.ok){
        throw new Error("Failed to fetch data")
      }
      const parsedData = await response.json();
      setData(parsedData);

    } catch(error) {
      setError("Error fetching data");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className='App'>
      <h1>My API Tester</h1>
      <ApiSearchbar onSearch={handleSearch} />
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display the data in a readable format */}
        </div>
      )}
    </div>
  );
};

export default App;

/*
function App(){
  return (
    <div className="App">
      <div className="content" >
        <h1>My API Tester!</h1>
      </div>
    </div>
  );
}


export default App
*/