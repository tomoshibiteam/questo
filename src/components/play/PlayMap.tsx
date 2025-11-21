"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Step = {
  id: string;
  lat: number;
  lng: number;
  placeName: string;
};

type Props = {
  steps: Step[];
  activeStepIndex: number;
  completedStepIndexes: number[];
  currentPosition?: [number, number];
  mapKey?: string;
};

function FlyTo({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom(), { duration: 0.6 });
  }, [map, position]);
  return null;
}

export default function PlayMap({
  steps,
  activeStepIndex,
  completedStepIndexes,
  currentPosition,
  mapKey,
}: Props) {
  const center: [number, number] = useMemo(() => {
    if (!steps.length) return [35, 135];
    const sum = steps.reduce(
      (acc, s) => {
        acc[0] += s.lat;
        acc[1] += s.lng;
        return acc;
      },
      [0, 0],
    );
    return [sum[0] / steps.length, sum[1] / steps.length];
  }, [steps]);

  const polyline = steps.map((s) => [s.lat, s.lng]) as [number, number][];
  const active = steps[activeStepIndex];
  return (
    <MapContainer
      key={mapKey ?? "play-map"}
      center={center}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {polyline.length > 1 && (
        <Polyline positions={polyline} pathOptions={{ color: "#10b981", weight: 4 }} />
      )}
      {steps.map((step, idx) => {
        const isActive = idx === activeStepIndex;
        const isCompleted = completedStepIndexes.includes(idx);
        const baseColor = isActive ? "#047857" : isCompleted ? "#34d399" : "#94a3b8";
        const ringColor = isActive ? "#22c55e" : baseColor;
        return (
          <CircleMarker
            key={step.id}
            center={[step.lat, step.lng]}
            radius={12}
            pathOptions={{ color: ringColor, fillColor: baseColor, fillOpacity: 0.9, weight: 3 }}
          >
            <Tooltip>{`Step ${idx + 1}: ${step.placeName}`}</Tooltip>
          </CircleMarker>
        );
      })}
      {currentPosition && (
        <CircleMarker
          center={currentPosition}
          radius={8}
          pathOptions={{ color: "#2563eb", fillColor: "#2563eb", fillOpacity: 0.8 }}
        >
          <Tooltip>現在地</Tooltip>
        </CircleMarker>
      )}
      {active && <FlyTo position={[active.lat, active.lng]} />}
    </MapContainer>
  );
}
