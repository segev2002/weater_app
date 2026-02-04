export interface TimeApiResponse {
  abbreviation: string;
  datetime: string; // ISO8601 with offset
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
  client_ip?: string;
}

const BASE = 'https://time.now/developer/api';

export const formatLocalTime = (utcIso: string, timeZone: string) =>
  new Intl.DateTimeFormat(undefined, {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(utcIso));

export const formatLocalDate = (utcIso: string, timeZone: string) =>
  new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(utcIso));

export async function fetchTimezone(tz: string): Promise<TimeApiResponse> {
  const url = `${BASE}/timezone/${encodeURIComponent(tz)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch time for ${tz}: ${res.status} ${res.statusText}`);
    }
    const data = (await res.json()) as TimeApiResponse;
    return data;
  } catch (err) {
    throw err;
  }
}
