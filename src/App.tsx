import { SearchForm } from '@/components/SearchForm';
import { StatusMessage } from '@/components/StatusMessage';
import { WeatherCard } from '@/components/WeatherCard';
import { useWeather, type WeatherState } from '@/hooks/useWeather';

function WeatherPanel({ state }: { state: WeatherState }) {
  switch (state.status) {
    case 'idle':
      return (
        <StatusMessage
          variant="empty"
          title="Погода ещё не найдена"
          description="Введите название города, чтобы увидеть, что за окном."
        />
      );
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

export function App() {
  const { state, search } = useWeather();

  return (
    <main className="min-h-screen bg-linear-to-b from-night-700 via-night-900 to-night-950 px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight">Погода</h1>
        <p className="mt-1 text-mist-400">Узнайте текущую погоду в любом городе.</p>

        <div className="mt-8">
          <SearchForm onSearch={search} disabled={state.status === 'loading'} />
        </div>

        <div className="mt-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          <WeatherPanel state={state} />
        </div>
      </div>
    </main>
  );
}
