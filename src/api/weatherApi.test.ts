import { afterEach, describe, expect, it, vi } from 'vitest';
import { jsonResponse, stubWeatherFetch } from '@/test/mockFetch';
import { getWeatherByCity } from './weatherApi';

describe('getWeatherByCity', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('собирает данные геокодинга и прогноза в WeatherData', async () => {
    const fetchMock = stubWeatherFetch();

    const data = await getWeatherByCity('Москва');

    expect(data).toEqual({
      name: 'Москва',
      country: 'Россия',
      temperature: 15.4,
      weatherCode: 0,
      windSpeed: 12.2,
      humidity: 50,
      pressure: 1010.3,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('выбрасывает понятную ошибку, если город не найден', async () => {
    stubWeatherFetch({ geocoding: { results: [] } });
    await expect(getWeatherByCity('Duckburg')).rejects.toThrow('Город «Duckburg» не найден');
  });

  it('выбрасывает ошибку при неуспешном HTTP-ответе', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(jsonResponse({}, { ok: false, status: 500 })));
    await expect(getWeatherByCity('Москва')).rejects.toThrow('500');
  });
});
