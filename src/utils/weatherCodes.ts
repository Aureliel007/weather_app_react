import type { LucideIcon } from 'lucide-react';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  CircleHelp,
  Sun,
} from 'lucide-react';

export interface WeatherInfo {
  description: string;
  Icon: LucideIcon;
}

interface WeatherGroup extends WeatherInfo {
  codes: number[];
}

const WEATHER_GROUPS: WeatherGroup[] = [
  { codes: [0], description: 'Ясно', Icon: Sun },
  { codes: [1, 2], description: 'Переменная облачность', Icon: CloudSun },
  { codes: [3], description: 'Пасмурно', Icon: Cloud },
  { codes: [45, 48], description: 'Туман', Icon: CloudFog },
  { codes: [51, 53, 55], description: 'Морось', Icon: CloudDrizzle },
  { codes: [61, 63, 65, 80, 81, 82], description: 'Дождь', Icon: CloudRain },
  { codes: [71, 73, 75, 77, 85, 86], description: 'Снег', Icon: CloudSnow },
  { codes: [95, 96, 99], description: 'Гроза', Icon: CloudLightning },
];

const CODE_TO_GROUP = new Map<number, WeatherGroup>(
  WEATHER_GROUPS.flatMap((group) => group.codes.map((code) => [code, group] as const))
);

export function getWeatherInfo(code: number): WeatherInfo {
  const group = CODE_TO_GROUP.get(code);
  return group
    ? { description: group.description, Icon: group.Icon }
    : { description: 'Неизвестно', Icon: CircleHelp };
}
