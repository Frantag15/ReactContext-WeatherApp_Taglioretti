import { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/Overlays.css';
import SidePanel from './components/SidePanel';
import MainContent from './components/MainContent';
import SearchPanel from './components/SearchPanel';
import { fetchWeatherByCoords } from './services/weatherService';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const handleCitySelect = (lat, lon) => {
    getWeather(lat, lon);
    setIsSearchOpen(false);
  };

  // Fetch weather for a default location (London) on initial load
  useEffect(() => {
    getWeather(51.5074, -0.1278);
  }, []);

  if (isSearchOpen) {
    return (
      <SearchPanel
        onClose={() => setIsSearchOpen(false)}
        onCitySelect={handleCitySelect}
      />
    );
  }

  return (
    <div className="app-container">
      {loading && <div className="loading-overlay">Loading...</div>}
      {error && <div className="error-overlay">{error}</div>}

      {!loading && !error && weatherData && (
        <>
          <SidePanel
            currentWeather={weatherData.current}
            onGetLocation={handleGetLocation}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
          <MainContent
            forecast={weatherData.forecast}
            highlights={weatherData.current}
          />
        </>
      )}
    </div>
  );
}

export default App;
