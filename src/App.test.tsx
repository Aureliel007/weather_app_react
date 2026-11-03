import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { stubWeatherFetch } from '@/test/mockFetch';
import { AboutPage } from '@/pages/AboutPage';
import { HomePage } from '@/pages/HomePage';
import { Layout } from '@/pages/Layout';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { WeatherPage } from '@/pages/WeatherPage';

function renderRoute(entry = '/') {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="weather/:city" element={<WeatherPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('Главный экран погоды', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('до поиска показывает пустое состояние и форму', () => {
    renderRoute();
    expect(screen.getByText('Погода ещё не найдена')).toBeInTheDocument();
    expect(screen.getByLabelText('Название города')).toBeInTheDocument();
  });

  it('поиск переводит на параметризованный маршрут и показывает погоду с картой', async () => {
    stubWeatherFetch();
    const user = userEvent.setup();
    renderRoute();

    await user.type(screen.getByLabelText('Название города'), 'Москва');
    await user.click(screen.getByRole('button', { name: 'Найти' }));

    expect(await screen.findByText('15°')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Погода: Москва, Россия' })).toBeInTheDocument();
    expect(screen.getByText('Ясно')).toBeInTheDocument();
    expect(screen.getByText('12 км/ч')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('1010 гПа')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Карта: Москва' })).toBeInTheDocument();
  });

  it('по маршруту /weather/:city сразу загружает погоду этого города', async () => {
    const fetchMock = stubWeatherFetch();
    renderRoute('/weather/Казань');

    expect(await screen.findByText('15°')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('name=%D0%9A%D0%B0%D0%B7%D0%B0%D0%BD%D1%8C'),
      expect.anything()
    );
  });

  it('если город не найден, показывает сообщение об ошибке', async () => {
    stubWeatherFetch({ geocoding: { results: [] } });
    const user = userEvent.setup();
    renderRoute();

    await user.type(screen.getByLabelText('Название города'), 'Helpmeplease');
    await user.click(screen.getByRole('button', { name: 'Найти' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Город «Helpmeplease» не найден');
  });

  it('пустой ввод не отправляет запрос и не меняет маршрут', async () => {
    const fetchMock = stubWeatherFetch();
    const user = userEvent.setup();
    renderRoute();

    await user.type(screen.getByLabelText('Название города'), '   ');
    await user.click(screen.getByRole('button', { name: 'Найти' }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText('Погода ещё не найдена')).toBeInTheDocument();
  });

  it('по ссылке "О приложении" открывается статический роут /about', async () => {
    const user = userEvent.setup();
    renderRoute();

    await user.click(screen.getByRole('link', { name: 'О приложении' }));

    expect(await screen.findByRole('heading', { level: 2, name: 'О приложении' })).toBeVisible();
  });

  it('по неизвестному адресу показывает страницу 404', async () => {
    const user = userEvent.setup();
    renderRoute('/duckburg');

    expect(screen.getByText('Страница не найдена')).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Погода' }));
    await waitFor(() => expect(screen.getByText('Погода ещё не найдена')).toBeInTheDocument());
  });
});
