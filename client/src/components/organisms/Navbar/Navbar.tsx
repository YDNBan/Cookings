import '../../../index.css';

function Navbar() {
    return (
        <div className="relative w-screen h-[150px] bg-blue-900 text-white flex items-center justify-center">
            {/* Logo positioned separately */}
            <img 
                src="/map-marker-512.webp"
                alt="" 
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-35 h-auto object-contain p-4"
            />

            {/* Container for title and navigation links */}
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-bold text-shadow-md">Hotel Tracker</h1>
                <div className="flex flex-row justify-evenly gap-5 p-4">
                    <a className="px-5 py-3 text-white bg-gray-800 rounded-[15px] hover:bg-[#4c7d7d]" href="/">Home</a>
                    <a className="px-5 py-3 text-white bg-gray-800 rounded-[15px] hover:bg-[#4c7d7d]" href="/search">Search</a>
                    <a className="px-5 py-3 text-white bg-gray-800 rounded-[15px] hover:bg-[#4c7d7d]" href="/info">Info</a>
                    <a className="px-5 py-3 text-white bg-gray-800 rounded-[15px] hover:bg-[#4c7d7d]" href="/contact">Contact</a>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
