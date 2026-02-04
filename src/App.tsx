import './App.css';
import { BrowserRouter, useLocation } from 'react-router-dom'; 
import { Routes, Route, Link } from "react-router-dom";
import City from './components/City';
import About from './components/About';
import CityDetails from './components/CityDetails';
const AppLayout = () => {
  const location = useLocation();

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="brand">World Clock</div>
        <nav className="app-nav">
          {/* Home link appears only when on the About page per spec */}
          {location.pathname === '/about' && (
            <Link className="nav-link" to="/">Home</Link>
          )}
          <Link className="nav-link" to="/about">About</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<City />} />
          <Route path="/city/:cityId" element={<CityDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
