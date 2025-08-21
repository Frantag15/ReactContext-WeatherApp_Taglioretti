import React from 'react';
import './../styles/WeatherCard.css';

const WeatherCard = ({ day, icon, maxTemp, minTemp, unit }) => {
  return (
    <div className="weather-card">
      <p className="weather-card__day">{day}</p>
      <div className="weather-card__icon">{icon}</div>
      <div className="weather-card__temps">
        <span>{maxTemp}°{unit}</span>
        <span className="min">{minTemp}°{unit}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
