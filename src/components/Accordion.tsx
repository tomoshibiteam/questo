'use client';

import { useState } from "react";

type Item = {
  title: string;
  content: string;
};

export default function Accordion({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((item, idx) => (
        <AccordionItem key={idx} {...item} />
      ))}
    </div>
  );
}

function AccordionItem({ title, content }: Item) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-900"
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <span className="text-xs text-emerald-700">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="px-4 pb-3 text-sm text-slate-600">{content}</p>}
    </div>
  );
}
