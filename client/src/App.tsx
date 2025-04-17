import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";
import Hero from "./components/pages/Hero/Hero";
import Results from './components/pages/Results/Results';
import HotelDetail from "./components/pages/HotelDetail/HotelDetail";
import Info from "./components/pages/Info/Info";
import Footer from "./components/organisms/Footer";
import Contact from "./components/pages/Contact/Contact";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> 
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/search" element={<Results />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/info" element={<Info/>} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
