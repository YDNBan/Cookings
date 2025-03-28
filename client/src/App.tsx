import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";
import Hero from "./components/pages/Hero/Hero";
import SearchResults from "./components/pages/Search/SearchResults"; 
import Footer from "./components/organisms/Footer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> 
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
