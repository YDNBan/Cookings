import React, { useState } from "react";
import "./apiSearchbar.css";

interface ApiSearchbarProps {
    onSearch: (query: string) => void; // Ensuring onSearch is a function that takes a string
}

const ApiSearchbar: React.FC<ApiSearchbarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form className="api-searchbar search-bar-container" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="Search for hotels..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default ApiSearchbar;
