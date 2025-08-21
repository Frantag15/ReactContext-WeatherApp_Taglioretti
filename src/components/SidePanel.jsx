import React from 'react';
import { useTemperature } from '../context/TemperatureContext';
import { formatDate, getWeatherIcon } from '../utils/weatherUtils';
import './../styles/SidePanel.css';

const SidePanel = ({ currentWeather, onGetLocation, onOpenSearch }) => {
  const { unit } = useTemperature();

  if (!currentWeather) {
    return <aside className="side-panel">Loading...</aside>;
  }

  const { name, dt, main, weather } = currentWeather;
  const weatherCondition = weather[0].main;
  const weatherIconSrc = getWeatherIcon(weatherCondition);
  const temp = Math.round(main.temp);

  return (
    <aside className="side-panel">
      <div className="side-panel__controls">
        <button className="side-panel__search-btn" onClick={onOpenSearch}>Search for places</button>
        <button className="side-panel__location-btn" onClick={onGetLocation} aria-label="Get weather for my location">
          <span className="material-icons">my_location</span>
        </button>
      </div>

      <div className="side-panel__weather-icon-container">
        <img src={weatherIconSrc} alt={`${weatherCondition} icon`} />
      </div>

      <h1 className="side-panel__temperature">
        {temp}
        <span className="side-panel__unit">°{unit}</span>
      </h1>
      <h3 className="side-panel__weather-desc">{weatherCondition}</h3>

      <div className="side-panel__footer">
        <span>Today</span>
        <span>•</span>
        <span>{formatDate(dt)}</span>
      </div>

      <div className="side-panel__location">
        <span className="material-icons">location_on</span>
        <span>{name}</span>
      </div>
    </aside>
  );
};

export default SidePanel;
