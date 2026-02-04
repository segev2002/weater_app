export const CITIES = [
  { name: 'Tel Aviv', timezone: 'Asia/Jerusalem' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Paris', timezone: 'Europe/Paris' },
  { name: 'Sydney', timezone: 'Australia/Sydney' },
  { name: 'Moscow', timezone: 'Europe/Moscow' },
  { name: 'Cairo', timezone: 'Africa/Cairo' },
  { name: 'São Paulo', timezone: 'America/Sao_Paulo' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
];

export const findCityByTimezone = (tz: string) =>
  CITIES.find((c) => c.timezone === tz) || null;
