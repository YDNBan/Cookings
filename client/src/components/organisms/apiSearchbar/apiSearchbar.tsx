import React, { useState } from "react";
import '../../../index.css'
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
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input className="border-white"
                type="text" 
                placeholder="Search For Hotel..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="bg-blue-900 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" type="submit">Search</button>
        </form>
    );
};

export default ApiSearchbar;
