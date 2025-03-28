

function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-3 w-full">

            {/* Copyright Section */}
            <div className="text-center text-sm mt-4 opacity-70">
                © {new Date().getFullYear()} Hotel Tracker. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
