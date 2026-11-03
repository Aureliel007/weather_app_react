import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SearchForm } from '@/components/SearchForm';
import { StaticMap } from '@/components/StaticMap';
import { StatusMessage } from '@/components/StatusMessage';
import { WeatherCard } from '@/components/WeatherCard';
import { useWeather, type WeatherState } from '@/hooks/useWeather';

function WeatherPanel({ state }: { state: WeatherState }) {
  switch (state.status) {
    case 'idle':
    case 'loading':
      return <StatusMessage variant="loading" title="Загружаем данные..." />;
    case 'error':
      return (
        <StatusMessage
          variant="error"
          title="Не удалось получить погоду"
          description={state.message}
        />
      );
    case 'success':
      return <WeatherCard data={state.data} />;
  }
}

export function WeatherPage() {
  const { city = '' } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const { state, search } = useWeather();

  useEffect(() => {
    if (city) void search(city);
  }, [city, search]);

  return (
    <>
      <SearchForm
        onSearch={(next) => navigate(`/weather/${encodeURIComponent(next)}`)}
        disabled={state.status === 'loading'}
      />

      <div className="mt-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
        <WeatherPanel state={state} />
        {state.status === 'success' && (
          <StaticMap
            latitude={state.data.latitude}
            longitude={state.data.longitude}
            title={state.data.name}
          />
        )}
      </div>

      <div className="mt-6">
        <Link
          to="/"
          className="text-sm text-mist-400 underline-offset-4 hover:text-mist-100 hover:underline"
        >
          ← На главную
        </Link>
      </div>
    </>
  );
}
