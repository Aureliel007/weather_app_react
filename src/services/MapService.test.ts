import { describe, expect, it } from 'vitest';
import { MapService } from './MapService';

describe('MapService', () => {
  const service = new MapService('test-key');

  it('строит URL статичной карты с координатами, меткой и ключом', () => {
    const url = new URL(service.getStaticMapUrl(55.75, 37.61));

    expect(url.origin + url.pathname).toBe('https://static-maps.yandex.ru/v1');
    expect(url.searchParams.get('ll')).toBe('37.61,55.75');
    expect(url.searchParams.get('pt')).toBe('37.61,55.75,pm2vvm');
    expect(url.searchParams.get('z')).toBe('12');
    expect(url.searchParams.get('size')).toBe('600,450');
    expect(url.searchParams.get('l')).toBe('map');
    expect(url.searchParams.get('apikey')).toBe('test-key');
  });

  it('ограничивает размер карты максимально допустимыми значениями', () => {
    const params = new URL(service.getStaticMapUrl(1, 2, 9000, 9000)).searchParams;
    expect(params.get('size')).toBe('600,450');
  });
});
