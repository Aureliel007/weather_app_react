import { useNavigate } from 'react-router-dom';
import { SearchForm } from '@/components/SearchForm';
import { StatusMessage } from '@/components/StatusMessage';

export function HomePage() {
  const navigate = useNavigate();

  function handleSearch(city: string) {
    navigate(`/weather/${encodeURIComponent(city)}`);
  }

  return (
    <>
      <p className="mt-1 text-mist-400">Узнайте текущую погоду в любом городе.</p>

      <div className="mt-8">
        <SearchForm onSearch={handleSearch} />
      </div>

      <div className="mt-6 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
        <StatusMessage
          variant="empty"
          title="Погода ещё не найдена"
          description="Введите название города, чтобы увидеть, что за окном."
        />
      </div>
    </>
  );
}
