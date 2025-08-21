// Helper to format date from UNIX timestamp
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

// Helper to get the correct weather icon image
export const getWeatherIcon = (condition) => {
  const iconMap = {
    Thunderstorm: 'Thunderstorm.svg',
    Drizzle: 'Shower.svg',
    Rain: 'HeavyRain.svg',
    Snow: 'Snow.svg',
    Mist: 'HeavyCloud.svg',
    Smoke: 'HeavyCloud.svg',
    Haze: 'HeavyCloud.svg',
    Dust: 'HeavyCloud.svg',
    Fog: 'HeavyCloud.svg',
    Sand: 'HeavyCloud.svg',
    Ash: 'HeavyCloud.svg',
    Squall: 'HeavyCloud.svg',
    Tornado: 'HeavyCloud.svg',
    Clear: 'Clear.svg',
    Clouds: 'LightCloud.svg',
  };
  const iconFileName = iconMap[condition] || 'Clear.svg';
  return `/weather-icons/${iconFileName}`;
};
