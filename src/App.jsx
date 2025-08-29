import { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/Overlays.css';
import SidePanel from './components/SidePanel';
import MainContent from './components/MainContent';
import SearchPanel from './components/SearchPanel';
import { fetchWeatherByCoords } from './services/weatherService';
import { useTheme } from './context/ThemeContext';

// imágenes
import fondo from "./img/fondoOscuro.jpg"; 
import fondoblanco from "./img/fondoBlanco.jpg"; 

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [selectedCity, setSelectedCity] = useState({ 
    lat: 51.5074, 
    lon: -0.1278,
    name: "London" 
  });

  const { isLightMode, setIsLightMode } = useTheme();
  const toggleTheme = () => setIsLightMode(!isLightMode);

  const getWeather = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherByCoords(lat, lon);
      setWeatherData(data);
    } catch (err) {
      setError('Could not fetch weather data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleGetLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
          setSelectedCity({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: "My Location"
          });
        },
        (err) => {
          setError('Location access denied. Please enable it in your browser settings.');
          console.error(err);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather(selectedCity.lat, selectedCity.lon);
  }, [selectedCity]);

  const handleCitySelect = (city) => {
    setSelectedCity({
      lat: city.lat,
      lon: city.lon,
      name: city.name
    });
    setIsSearchOpen(false);
  };

  if (isSearchOpen) {
    return (
      <SearchPanel
        onClose={() => setIsSearchOpen(false)}
        onCitySelect={handleCitySelect}
      />
    );
  }

  return (
    <div className="flex h-screen">
      {/* SidePanel fijo */}
      <div className="w-72 z-20 relative">
        <SidePanel
          currentWeather={weatherData?.current}
          onGetLocation={handleGetLocation}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      </div>

      {/* MainContent con fondo dinámico */}
      <div
      className="flex-1 relative overflow-auto"
      style={{
        backgroundImage: isLightMode ? `url(${fondoblanco})` : `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
        filter: isLightMode ? "brightness(100%)" : "brightness(85%)",
  }}
>
        {/* Overlay degradado */}
        <div
          className="absolute inset-0"
          style={{
            background: isLightMode
              ? "rgba(255,255,255,0.6)"
              : "rgba(0,0,0,0.6)",
            backdropFilter: "blur(3px)"
          }}
        />

        {/* Contenido */}
        <div className="relative z-10 p-6">
          {loading && <div className="loading-overlay">Loading...</div>}
          {error && <div className="error-overlay">{error}</div>}

          {!loading && !error && weatherData && (
            <MainContent
              forecast={weatherData.forecast}
              highlights={weatherData.current}
            />
          )}

          {/* Botón de tema */}
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {isLightMode ? "🌙 Oscuro" : "☀️ Claro"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
