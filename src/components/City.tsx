import { useEffect, useState } from 'react';
import './City.css';

interface City {
  city: string;
  lat: number;
  lon: number;
}

interface CityWeather extends City {
  temperature: number | null;
  windspeed: number | null;
  time: string | null;
}

const cities: City[] = [
  { city: 'Tokyo', lat: 35.6895, lon: 139.6917 },
  { city: 'Delhi', lat: 28.6139, lon: 77.209 },
  { city: 'Shanghai', lat: 31.2304, lon: 121.4737 },
  { city: 'Dhaka', lat: 23.8103, lon: 90.4125 },
  { city: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { city: 'Cairo', lat: 30.0444, lon: 31.2357 },
  { city: 'Mexico City', lat: 19.4326, lon: -99.1332 },
  { city: 'Beijing', lat: 39.9042, lon: 116.4074 },
  { city: 'Mumbai', lat: 19.076, lon: 72.8777 },
  { city: 'Osaka', lat: 34.6937, lon: 135.5023 },
];

const City = () => {
  const [weather, setWeather] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCityData = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        cities.map(async ({ city, lat, lon }) => {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );

          if (!response.ok) {
            throw new Error(`Failed to load weather for ${city}`);
          }

          const data = await response.json();
          const current = data?.current_weather;

          return {
            city,
            lat,
            lon,
            temperature: typeof current?.temperature === 'number' ? current.temperature : null,
            windspeed: typeof current?.windspeed === 'number' ? current.windspeed : null,
            time: typeof current?.time === 'string' ? current.time : null,
          };
        })
      );

      setWeather(results);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCityData();
  }, []);

  const formatValue = (value: number | null, suffix: string) =>
    value === null ? '—' : `${value.toFixed(1)}${suffix}`;

  return (
    <section className="weather-app">
      <header className="weather-app__header">
        <div>
          <p className="weather-app__eyebrow">Weather snapshot</p>
          <h2>Top 10 Biggest Cities</h2>
          <p className="weather-app__subtext">
            Current temperature and wind speeds powered by Open-Meteo.
          </p>
        </div>
        <button className="weather-app__refresh" onClick={fetchCityData}>
          Refresh
        </button>
      </header>

      {loading && <div className="weather-app__status">Loading weather...</div>}
      {error && <div className="weather-app__status weather-app__status--error">{error}</div>}

      <div className="weather-grid">
        {weather.map((city) => (
          <article key={city.city} className="weather-card">
            <div className="weather-card__title">{city.city}</div>
            <div className="weather-card__temp">
              {formatValue(city.temperature, '°C')}
            </div>
            <div className="weather-card__meta">
              Wind: {formatValue(city.windspeed, ' km/h')}
            </div>
            <div className="weather-card__time">
              Updated {city.time ? new Date(city.time).toLocaleString() : '—'}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default City;
