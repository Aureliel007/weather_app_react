import { mapService } from '@/services/MapService';

interface StaticMapProps {
  latitude: number;
  longitude: number;
  title: string;
}

export function StaticMap({ latitude, longitude, title }: StaticMapProps) {
  return (
    <img
      src={mapService.getStaticMapUrl(latitude, longitude)}
      alt={`Карта: ${title}`}
      loading="lazy"
      className="mt-6 w-full rounded-xl ring-1 ring-white/10"
    />
  );
}
