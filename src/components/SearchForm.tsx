import { Search } from 'lucide-react';
import { useState, type SyntheticEvent } from 'react';

interface SearchFormProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export function SearchForm({ onSearch, disabled = false }: SearchFormProps) {
  const [value, setValue] = useState('');

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const city = value.trim();
    if (city) onSearch(city);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="city" className="sr-only">
        Название города
      </label>
      <input
        id="city"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Например, Санкт-Петербург"
        autoComplete="off"
        className="min-w-0 flex-1 rounded-xl bg-white/5 px-4 py-3 text-mist-100 ring-1 ring-white/10 placeholder:text-mist-400 focus:outline-none focus:ring-2 focus:ring-sun-400"
      />
      <button
        type="submit"
        disabled={disabled}
        className="flex items-center gap-2 rounded-xl bg-sun-400 px-5 py-3 font-semibold text-night-950 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-mist-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Search className="size-4" aria-hidden />
        Найти
      </button>
    </form>
  );
}
