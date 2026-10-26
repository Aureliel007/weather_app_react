import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { stubWeatherFetch } from '@/test/mockFetch';
import { useWeather } from './useWeather';

describe('useWeather', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('стартует в состоянии idle', () => {
    const { result } = renderHook(() => useWeather());
    expect(result.current.state).toEqual({ status: 'idle' });
  });

  it('переходит в error с текстом ошибки, если город не найден', async () => {
    stubWeatherFetch({ geocoding: { results: [] } });
    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.search('Оавграыщжшва');
    });

    expect(result.current.state).toEqual({
      status: 'error',
      message: 'Город «Оавграыщжшва» не найден',
    });
  });

  it('ответ на устаревший запрос не затирает результат нового', async () => {
    const normalFetch = stubWeatherFetch();
    const slowFetch = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      if (url.includes('geocoding-api') && url.includes('Slow')) {
        return new Promise<Response>((_, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new DOMException('Aborted', 'AbortError'))
          );
        });
      }
      return normalFetch(input);
    });
    vi.stubGlobal('fetch', slowFetch);

    const { result } = renderHook(() => useWeather());

    act(() => {
      void result.current.search('Slow');
    });
    await act(async () => {
      await result.current.search('Москва');
    });

    expect(result.current.state.status).toBe('success');
  });
});
