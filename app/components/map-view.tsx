"use client";

import dynamic from 'next/dynamic';
import type { SampleInterview } from '../data/mockData';

const LeafletMap = dynamic<MapViewProps>(() => import('./map-view-leaflet').then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex h-[520px] w-full items-center justify-center rounded-[32px] border border-subtle bg-soft text-sm text-muted shadow-[0_30px_65px_-42px_rgba(36,30,26,0.45)]">
      Loading map…
    </div>
  ),
});

export type MapViewProps = {
  interviews: SampleInterview[];
  className?: string;
};

const MapView = ({ interviews, className }: MapViewProps) => {
  return <LeafletMap interviews={interviews} className={className} />;
};

export default MapView;
