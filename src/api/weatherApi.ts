import type { WeatherData } from '@/types/weather';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

interface GeocodingResult {
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
}

interface GeocodingResponse {
  results?: GeocodingResult[];
}

interface ForecastResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
    surface_pressure: number;
  };
}

async function geocodeCity(cityName: string, signal?: AbortSignal): Promise<GeocodingResult> {
  const params = new URLSearchParams({
    name: cityName,
    count: '1',
    language: 'ru',
    format: 'json',
  });

  const response = await fetch(`${GEOCODING_URL}?${params}`, { signal });
  if (!response.ok) throw new Error(`Ошибка поиска города: ${response.status}`);

  const data = (await response.json()) as GeocodingResponse;
  const result = data.results?.[0];

  if (!result) throw new Error(`Город «${cityName}» не найден`);
  return result;
}

async function fetchForecast(
  latitude: number,
  longitude: number,
  signal?: AbortSignal
): Promise<ForecastResponse['current']> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,surface_pressure',
    timezone: 'auto',
  });

  const response = await fetch(`${FORECAST_URL}?${params}`, { signal });
  if (!response.ok) throw new Error(`Ошибка получения погоды: ${response.status}`);

  const data = (await response.json()) as ForecastResponse;
  return data.current;
}

export async function getWeatherByCity(
  cityName: string,
  signal?: AbortSignal
): Promise<WeatherData> {
  const location = await geocodeCity(cityName, signal);
  const current = await fetchForecast(location.latitude, location.longitude, signal);

  return {
    name: location.name,
    country: location.country ?? '',
    temperature: current.temperature_2m,
    weatherCode: current.weather_code,
    windSpeed: current.wind_speed_10m,
    humidity: current.relative_humidity_2m,
    pressure: current.surface_pressure,
  };
}
