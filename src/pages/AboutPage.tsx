import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <>
      <h2 className="text-xl font-semibold">О приложении</h2>
      <div className="mt-4 space-y-4 text-mist-400">
        <p>
          Это учебное приложение для получения актуальной погоды: оно находит город через Open-Meteo Geocoding API и
          показывает текущие температуру, ветер, влажность и давление через Open-Meteo Forecast API.
        </p>
        <p>
          Под карточкой погоды отображается статичная карта Яндекса с отметкой найденного города.
        </p>
        <p>
          Стек: React, TypeScript, React Router, Vite, Tailwind CSS, Vitest и React Testing Library.
        </p>
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
