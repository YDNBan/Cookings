import React, { useState } from "react";
import "./apiSearchbar.css";

const ApiSearchbar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (event) => { // This function will handle form submission
        event.preventDefault(); // Prevent the default form submission behavior
        if (query.trim()){ // A valid input will execute onSearch. (Also removes white spaces)
            onSearch(query); // Pass query to express backend
        }
    };

    return (
        <form className="api-searchbar" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Enter API query..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Fetch</button>
        </form>
    );
};

export default ApiSearchbar;
