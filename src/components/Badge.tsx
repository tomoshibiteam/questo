import { ReactNode } from "react";

export default function Badge({
  children,
  color = "emerald",
}: {
  children: ReactNode;
  color?: "emerald" | "slate" | "amber" | "sky";
}) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-800",
    slate: "bg-slate-100 text-slate-800",
    amber: "bg-amber-50 text-amber-800",
    sky: "bg-sky-50 text-sky-800",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colorMap[color]}`}>
      {children}
    </span>
  );
}
