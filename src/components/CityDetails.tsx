import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTimezone, formatLocalDate, formatLocalTime } from '../lib/timeApi';
import type { TimeApiResponse } from '../lib/timeApi';
import { findCityByTimezone } from '../data/cities';
import './CityDetails.css';

const CityDetails = () => {
	const { '*': splat, cityId } = useParams();
	// support param captured as either :cityId or splat
	const param = cityId ?? splat ?? '';
	const timezone = decodeURIComponent(param || '');
	const navigate = useNavigate();

	const [data, setData] = useState<TimeApiResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		if (!timezone) return;
		setLoading(true);
		setError(null);
		try {
			const res = await fetchTimezone(timezone);
			setData(res);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to load timezone data');
			setData(null);
		} finally {
			setLoading(false);
		}
	}, [timezone]);

	useEffect(() => {
		load();
	}, [load]);

	// auto-refresh every 60s
	useEffect(() => {
		const id = setInterval(() => {
			load();
		}, 60_000);
		return () => clearInterval(id);
	}, [load]);

	const city = timezone ? findCityByTimezone(timezone) : null;

			const getDayNight = (utcIso?: string, tz?: string) => {
				if (!utcIso || !tz) return '🌗';
				const hourString = new Intl.DateTimeFormat('en-US', {
					timeZone: tz,
					hour: '2-digit',
					hour12: false,
				}).format(new Date(utcIso));
				const localHour = Number(hourString);
				return localHour >= 6 && localHour < 18 ? '🌞' : '🌙';
			};

		return (
			<section>
				<div className="city-details">
					<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<h2 style={{ margin: 0 }}>{city ? city.name : timezone || 'City'}</h2>
						<button className="btn-ghost" onClick={() => navigate(-1)}>Back</button>
					</div>

					{loading && <div style={{ marginTop: 12 }}>Loading time...</div>}
					{error && <div style={{ marginTop: 12, color: 'crimson' }}>{error}</div>}

					{data && (
						<div style={{ marginTop: 12 }}>
							<div className="city-details__time">
											{getDayNight(data.utc_datetime, data.timezone)}{' '}
											{formatLocalTime(data.utc_datetime, data.timezone)}
							</div>

							<div className="city-details__meta" style={{ marginTop: 8 }}>
											{formatLocalDate(data.utc_datetime, data.timezone)}
							</div>

							<div className="city-details__meta" style={{ marginTop: 12 }}>
								<div>Timezone: <strong>{data.timezone}</strong></div>
								<div>Abbreviation: <strong>{data.abbreviation}</strong></div>
								<div>UTC Offset: <strong>{data.utc_offset}</strong></div>
								<div>Unix time: <strong>{data.unixtime}</strong></div>
							</div>

							<div className="city-details__actions">
								<button className="btn-primary" onClick={load}>Refresh</button>
								<button className="btn-ghost" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button>
							</div>
						</div>
					)}
				</div>
			</section>
		);
};

export default CityDetails;
