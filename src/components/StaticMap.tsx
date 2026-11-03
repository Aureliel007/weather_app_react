import { mapService } from '@/services/MapService';
import { useElementSize } from '@/hooks/useElementSize';

const HEIGHT_RATIO = 0.75;
const FALLBACK_WIDTH = 400;

interface StaticMapProps {
  latitude: number;
  longitude: number;
  title: string;
  zoom?: number;
}

export function StaticMap({ latitude, longitude, title, zoom = 10 }: StaticMapProps) {
  const [containerRef, { width }] = useElementSize<HTMLDivElement>();
  const cssWidth = Math.round(width || FALLBACK_WIDTH);

  return (
    <div ref={containerRef} className="mt-6">
      <img
        src={mapService.getStaticMapUrl(
          latitude,
          longitude,
          cssWidth,
          cssWidth * HEIGHT_RATIO,
          zoom
        )}
        alt={`Карта: ${title}`}
        loading="lazy"
        width={cssWidth}
        height={Math.round(cssWidth * HEIGHT_RATIO)}
        className="block h-auto w-full rounded-xl ring-1 ring-white/10"
      />
    </div>
  );
}
