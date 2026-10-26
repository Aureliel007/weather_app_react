import { useCallback, useEffect, useRef, useState } from 'react';
import { getWeatherByCity } from '@/api/weatherApi';
import type { WeatherData } from '@/types/weather';

export type WeatherState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: WeatherData }
  | { status: 'error'; message: string };

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Неизвестная ошибка';
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}

export function useWeather(): { state: WeatherState; search: (city: string) => Promise<void> } {
  const [state, setState] = useState<WeatherState>({ status: 'idle' });
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const search = useCallback(async (city: string) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setState({ status: 'loading' });

    try {
      const data = await getWeatherByCity(city, controller.signal);
      setState({ status: 'success', data });
    } catch (error) {
      if (isAbortError(error)) return;
      setState({ status: 'error', message: toErrorMessage(error) });
    }
  }, []);

  return { state, search };
}
