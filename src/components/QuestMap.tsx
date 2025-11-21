"use client";

import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  type MapContainerProps,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconPng from "leaflet/dist/images/marker-icon.png";
import shadowPng from "leaflet/dist/images/marker-shadow.png";

type Props = {
  lat: number;
  lng: number;
  hint: string;
  className?: string;
} & Partial<MapContainerProps>;

// Next.js で Leaflet のアイコンパスが崩れないよう初期化する。
const defaultIcon = new L.Icon({
  iconRetinaUrl: typeof iconRetina === "string" ? iconRetina : iconRetina.src,
  iconUrl: typeof iconPng === "string" ? iconPng : iconPng.src,
  shadowUrl: typeof shadowPng === "string" ? shadowPng : shadowPng.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function QuestMap({
  lat,
  lng,
  hint,
  className,
  ...rest
}: Props) {
  useEffect(() => {
    L.Marker.prototype.options.icon = defaultIcon;
  }, []);

  const isClient = typeof window !== "undefined";

  if (!isClient) {
    return (
      <div className="flex h-48 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-sm text-slate-500">
        マップを読み込み中...
      </div>
    );
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      className={className ?? "h-48 w-full rounded-xl"}
      scrollWheelZoom={false}
      {...rest}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>{hint}</Popup>
      </Marker>
    </MapContainer>
  );
}
