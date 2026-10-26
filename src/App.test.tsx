import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { stubWeatherFetch } from '@/test/mockFetch';
import { App } from './App';

describe('Главный экран погоды', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('до первого поиска показывает пустое состояние', () => {
    render(<App />);
    expect(screen.getByText('Погода ещё не найдена')).toBeInTheDocument();
  });

  it('по поиску города показывает температуру, описание и детали', async () => {
    stubWeatherFetch();
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Название города'), 'Москва');
    await user.click(screen.getByRole('button', { name: 'Найти' }));

    expect(await screen.findByText('15°')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Погода: Москва, Россия' })).toBeInTheDocument();
    expect(screen.getByText('Ясно')).toBeInTheDocument();
    expect(screen.getByText('12 км/ч')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('1010 гПа')).toBeInTheDocument();
  });

  it('если город не найден, показывает сообщение об ошибке', async () => {
    stubWeatherFetch({ geocoding: { results: [] } });
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Название города'), 'Helpmeplease');
    await user.click(screen.getByRole('button', { name: 'Найти' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Город «Helpmeplease» не найден');
  });

  it('пустой ввод не отправляет запрос', async () => {
    const fetchMock = stubWeatherFetch();
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Название города'), '   ');
    await user.click(screen.getByRole('button', { name: 'Найти' }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText('Погода ещё не найдена')).toBeInTheDocument();
  });

  it('во время загрузки кнопка поиска заблокирована', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise<Response>(() => {}))
    );
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('Название города'), 'Москва');
    await user.click(screen.getByRole('button', { name: 'Найти' }));

    expect(await screen.findByText('Загружаем данные...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Найти' })).toBeDisabled();
  });
});
