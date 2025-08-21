import React from 'react';
import { useTemperature } from '../context/TemperatureContext';
import { getWeatherIcon } from '../utils/weatherUtils';
import WeatherCard from './WeatherCard';
import HighlightCard from './HighlightCard';
import './../styles/MainContent.css';

// Helper to get one forecast per day (the first one after today)
const getDailyForecasts = (forecastList) => {
  const dailyData = [];
  const seenDays = new Set();

  // Add today's date to the set to exclude it from the forecast
  seenDays.add(new Date().getDate());

  for (const item of forecastList) {
    const day = new Date(item.dt * 1000).getDate();
    if (!seenDays.has(day)) {
      seenDays.add(day);
      dailyData.push(item);
      if (dailyData.length === 5) {
        break; // We only need 5 days
      }
    }
  }
  return dailyData;
};

const MainContent = ({ forecast, highlights }) => {
  const { unit, toggleUnit } = useTemperature();

  const convertTemp = (tempC) => {
    if (unit === 'F') {
      return Math.round((tempC * 9/5) + 32);
    }
    return Math.round(tempC);
  };

  const dailyForecasts = getDailyForecasts(forecast.list);
  const { wind, main, visibility } = highlights;

  return (
    <main className="main-content">
      <div className="main-content__header">
        <button
          className={`unit-toggle__btn ${unit === 'C' ? 'active' : ''}`}
          onClick={unit === 'F' ? toggleUnit : null}
          aria-label="Switch to Celsius"
        >°C</button>
        <button
          className={`unit-toggle__btn ${unit === 'F' ? 'active' : ''}`}
          onClick={unit === 'C' ? toggleUnit : null}
          aria-label="Switch to Fahrenheit"
        >°F</button>
      </div>

      <div className="forecast-grid">
        {dailyForecasts.map((day, index) => (
          <WeatherCard
            key={day.dt}
            day={index === 0 ? 'Tomorrow' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
            icon={<img src={getWeatherIcon(day.weather[0].main)} alt={day.weather[0].main} />}
            maxTemp={convertTemp(day.main.temp_max)}
            minTemp={convertTemp(day.main.temp_min)}
            unit={unit}
          />
        ))}
      </div>

      <div className="highlights">
        <h2 className="highlights__title">Today's Highlights</h2>
        <div className="highlights-grid">
          <HighlightCard title="Wind status" value={Math.round(wind.speed * 2.237)} unit="mph">
            <div className="wind-direction" style={{transform: `rotate(${wind.deg}deg)`}}>
                <span className="material-icons">navigation</span>
            </div>
          </HighlightCard>
          <HighlightCard title="Humidity" value={main.humidity} unit="%">
            <div className="progress-bar">
              <div style={{ width: `${main.humidity}%` }}></div>
            </div>
          </HighlightCard>
          <HighlightCard title="Visibility" value={(visibility / 1609).toFixed(1)} unit="miles" />
          <HighlightCard title="Air Pressure" value={main.pressure} unit="mb" />
        </div>
      </div>
    </main>
  );
};

export default MainContent;
