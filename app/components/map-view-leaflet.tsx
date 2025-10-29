"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import type { SampleInterview } from '../data/mockData';
import 'leaflet/dist/leaflet.css';

const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

type LeafletMapProps = {
  interviews: SampleInterview[];
  className?: string;
};

const LeafletMap = ({ interviews, className = '' }: LeafletMapProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultCenter = useMemo<[number, number]>(() => {
    if (interviews.length === 0) {
      return [37.7749, -122.4194];
    }
    return interviews[0].location.coordinates;
  }, [interviews]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    // Clean up existing map if it exists
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Create new map instance
    const map = L.map(containerRef.current, {
      center: defaultCenter,
      zoom: 3,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers
    interviews.forEach((interview) => {
      const marker = L.marker(interview.location.coordinates, {
        title: interview.title,
      }).addTo(map);

      marker.bindPopup(`
        <div style="padding: 4px;">
          <p style="font-size: 14px; font-weight: 600; margin: 0 0 4px 0;">${interview.title}</p>
          <p style="font-size: 12px; color: #666; margin: 0 0 4px 0;">${interview.location.label}</p>
          <p style="font-size: 12px; color: #2e6b6a; margin: 0;">${interview.tags.join(', ')}</p>
        </div>
      `);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isMounted, interviews, defaultCenter]);

  if (!isMounted) {
    return (
      <div
        className={[
          'flex h-[520px] w-full items-center justify-center rounded-[32px] border border-subtle bg-soft text-sm text-muted shadow-[0_30px_65px_-42px_rgba(36,30,26,0.45)]',
          className,
        ].join(' ')}
      >
        Loading map…
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={[
        'h-full min-h-[520px] w-full overflow-hidden rounded-[32px] border border-subtle bg-surface shadow-[0_30px_65px_-40px_rgba(36,30,26,0.45)]',
        className,
      ].join(' ')}
    />
  );
};

export default LeafletMap;
