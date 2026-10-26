import { Droplets, Gauge, Wind, type LucideIcon } from 'lucide-react';
import type { WeatherData } from '@/types/weather';
import { getWeatherInfo } from '@/utils/weatherCodes';

interface DetailProps {
  Icon: LucideIcon;
  label: string;
  value: string;
}

function Detail({ Icon, label, value }: DetailProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <Icon className="size-5 text-mist-400" aria-hidden />
      <dt className="text-xs text-mist-400">{label}</dt>
      <dd className="text-sm font-medium tabular-nums">{value}</dd>
    </div>
  );
}

export function WeatherCard({ data }: { data: WeatherData }) {
  const { description, Icon } = getWeatherInfo(data.weatherCode);
  const place = data.country ? `${data.name}, ${data.country}` : data.name;

  return (
    <section aria-label={`Погода: ${place}`} className="animate-rise motion-reduce:animate-none">
      <h2 className="text-sm text-mist-400">{place}</h2>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-8xl font-bold tracking-tighter text-sun-400 tabular-nums">
          {Math.round(data.temperature)}°
        </p>
        <div className="flex flex-col items-center gap-2 text-center">
          <Icon className="size-14" aria-hidden />
          <span className="text-sm">{description}</span>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
        <Detail Icon={Wind} label="Ветер" value={`${Math.round(data.windSpeed)} км/ч`} />
        <Detail Icon={Droplets} label="Влажность" value={`${Math.round(data.humidity)}%`} />
        <Detail Icon={Gauge} label="Давление" value={`${Math.round(data.pressure)} гПа`} />
      </dl>
    </section>
  );
}
