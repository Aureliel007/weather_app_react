import { vi } from 'vitest';

export function jsonResponse(
  body: unknown,
  init: { ok?: boolean; status?: number } = {}
): Response {
  return {
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => body,
  } as Response;
}

export const moscowGeocoding = {
  results: [{ name: 'Москва', country: 'Россия', latitude: 55.75, longitude: 37.61 }],
};

export const moscowForecast = {
  current: {
    temperature_2m: 15.4,
    weather_code: 0,
    wind_speed_10m: 12.2,
    relative_humidity_2m: 50,
    surface_pressure: 1010.3,
  },
};

export function stubWeatherFetch(overrides: { geocoding?: unknown; forecast?: unknown } = {}) {
  const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
    const url = input.toString();
    if (url.includes('geocoding-api')) return jsonResponse(overrides.geocoding ?? moscowGeocoding);
    if (url.includes('api.open-meteo.com/v1/forecast'))
      return jsonResponse(overrides.forecast ?? moscowForecast);
    throw new Error(`Unexpected fetch: ${url}`);
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}
