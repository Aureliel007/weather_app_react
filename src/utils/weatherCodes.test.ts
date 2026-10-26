import { Sun } from 'lucide-react';
import { getWeatherInfo } from './weatherCodes';

describe('getWeatherInfo', () => {
  it('возвращает иконку', () => {
    const info = getWeatherInfo(0);
    expect(info.description).toBe('Ясно');
    expect(info.Icon).toBe(Sun);
  });

  it('группирует разные коды дождя под одной подписью', () => {
    [61, 63, 65, 80, 82].forEach((code) => {
      expect(getWeatherInfo(code).description).toBe('Дождь');
    });
  });

  it('возвращает Неизвестно для несуществующего кода', () => {
    expect(getWeatherInfo(9999).description).toBe('Неизвестно');
  });
});
