import { useEffect, useState } from 'react';
import './City.css';
import { CITIES } from '../data/cities';
import { fetchTimezone, formatLocalDate, formatLocalTime } from '../lib/timeApi';
import type { TimeApiResponse } from '../lib/timeApi';
import { Link } from 'react-router-dom';

interface CityTime {
  name: string;
  timezone: string;
  utcDatetime: string | null;
  abbreviation: string | null;
}

const City = () => {
  const [items, setItems] = useState<CityTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(
        CITIES.map(async ({ name, timezone }) => {
          try {
            const data: TimeApiResponse = await fetchTimezone(timezone);
            return {
              name,
              timezone,
              utcDatetime: data.utc_datetime,
              abbreviation: data.abbreviation || null,
            } as CityTime;
          } catch (err) {
            // If one city fails, continue but mark datetime null
            return {
              name,
              timezone,
              utcDatetime: null,
              abbreviation: null,
            } as CityTime;
          }
        })
      );

      setItems(results);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load times.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="weather-app">
      <header className="weather-app__header">
        <div>
          <p className="weather-app__eyebrow">World Clock</p>
          <h2>Popular Cities — Local Time</h2>
          <p className="weather-app__subtext">Current local time powered by time.now API.</p>
        </div>
      </header>

      {loading && <div className="weather-app__status">Loading times...</div>}
      {error && <div className="weather-app__status weather-app__status--error">{error}</div>}

      <div className="weather-grid">
        {items.map((c) => (
          <Link
            key={c.timezone}
            to={`/city/${encodeURIComponent(c.timezone)}`}
            className="weather-card"
            style={{ textDecoration: 'none' }}
          >
            <div className="weather-card__title">{c.name}</div>
            <div className="weather-card__temp">
              {c.utcDatetime ? formatLocalTime(c.utcDatetime, c.timezone) : '—'}
            </div>
            <div className="weather-card__meta">{c.abbreviation ?? '—'}</div>
            <div className="weather-card__time">
              {c.utcDatetime ? formatLocalDate(c.utcDatetime, c.timezone) : '—'}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default City;
