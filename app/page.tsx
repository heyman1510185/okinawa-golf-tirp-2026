"use client";

import { useMemo, useState } from "react";
import trip from "@/data/trip.json";

type Event = {
  id: string;
  day: string;
  time?: string;
  category?: string;
  title: string;
  notes?: string;
  area?: string;
  mapUrl?: string;
  sortKey: number;
};

type TripData = {
  events: Event[];
};

const data = trip as TripData;

const dayToDate = (day: string) => {
  const [m, d] = day.split("/").map((v) => Number(v));
  if (!m || !d) return null;
  return new Date(2026, m - 1, d);
};

const formatRange = (days: string[]) => {
  if (!days.length) return "";
  const dates = days
    .map(dayToDate)
    .filter((d): d is Date => d !== null)
    .sort((a, b) => a.getTime() - b.getTime());

  if (!dates.length) return "";
  const start = dates[0];
  const end = dates[dates.length - 1];
  const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;
  return `${fmt(start)} - ${fmt(end)}`;
};

const splitTitle = (title: string) => {
  const parts = title.split("_");
  if (parts.length >= 2) {
    return { prefix: parts[0], main: parts.slice(1).join("_") };
  }
  return { prefix: "", main: title };
};

export default function Home() {
  const events = data.events;

  const days = useMemo(() => {
    const set = new Set(events.map((e) => e.day));
    return Array.from(set).sort((a, b) => {
      const da = dayToDate(a)?.getTime() ?? 0;
      const db = dayToDate(b)?.getTime() ?? 0;
      return da - db;
    });
  }, [events]);

  const categories = useMemo(() => {
    const set = new Set(events.map((e) => e.category).filter(Boolean));
    return Array.from(set).sort() as string[];
  }, [events]);

  const areas = useMemo(() => {
    const set = new Set(events.map((e) => e.area).filter(Boolean));
    return Array.from(set).sort() as string[];
  }, [events]);

  const [activeDay, setActiveDay] = useState(days[0] ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState("all");
  const [mapOnly, setMapOnly] = useState(false);

  const rangeLabel = useMemo(() => formatRange(days), [days]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((e) => e.day === activeDay)
      .filter((e) =>
        selectedCategories.length
          ? selectedCategories.includes(e.category ?? "")
          : true
      )
      .filter((e) => (selectedArea === "all" ? true : e.area === selectedArea))
      .filter((e) => (mapOnly ? Boolean(e.mapUrl) : true));
  }, [events, activeDay, selectedCategories, selectedArea, mapOnly]);

  const areaLinks = useMemo(() => {
    const map = new Map<string, Event[]>();
    filteredEvents.forEach((event) => {
      if (!event.area || !event.mapUrl) return;
      if (!map.has(event.area)) map.set(event.area, []);
      map.get(event.area)?.push(event);
    });
    return Array.from(map.entries());
  }, [filteredEvents]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const shareData = {
      title: "OKINAWA GOLF TRIP 2026",
      text: "OKINAWA GOLF TRIP 2026 — Schedule",
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("リンクをコピーしました");
      }
    } catch {
      // ignore share errors
    }
  };

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-[480px] px-5 pb-24 pt-8">
        <header className="mb-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-sky-100/90">
                Travel Shiori
              </p>
              <h1 className="title-font text-3xl text-white">
                OKINAWA GOLF TRIP 2026
              </h1>
              <p className="mt-2 text-sm text-sky-100/90">{rangeLabel}</p>
            </div>
            <button
              onClick={handleShare}
              className="rounded-full bg-sand-50/80 px-4 py-2 text-xs font-medium text-ocean-700 shadow-soft"
              type="button"
            >
              Share
            </button>
          </div>
        </header>

        <section className="mb-6">
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={`min-w-[72px] rounded-full px-4 py-2 text-sm transition-all ${
                  activeDay === day
                    ? "bg-accent-500 text-white shadow-soft"
                    : "bg-white/60 text-ocean-700"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-card bg-white/65 p-4 shadow-soft backdrop-blur-sm">
          <div className="mb-3 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  selectedCategories.includes(category)
                    ? "bg-accent-500 text-white"
                    : "bg-white/80 text-ocean-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-ocean-700">Area</label>
              <select
                value={selectedArea}
                onChange={(event) => setSelectedArea(event.target.value)}
                className="mt-1 w-full rounded-full border border-white/60 bg-white/90 px-3 py-2 text-sm text-ocean-700"
              >
                <option value="all">All areas</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 text-xs text-ocean-700">
              <input
                type="checkbox"
                checked={mapOnly}
                onChange={(event) => setMapOnly(event.target.checked)}
                className="h-4 w-4 rounded border-white/60 text-accent-500"
              />
              Map only
            </label>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-3 flex items-center gap-3 text-sky-100/90">
            <span className="text-xs uppercase tracking-[0.3em]">Timeline</span>
            <div className="h-px flex-1 bg-white/30" />
          </div>

          <div className="relative flex flex-col gap-4">
            <div className="absolute left-3 top-2 h-full w-px bg-white/40" />
            {filteredEvents.map((event) => {
              const { prefix, main } = splitTitle(event.title);
              return (
                <article
                  key={event.id}
                  className="relative rounded-card bg-sand-50 p-5 pl-8 shadow-soft"
                >
                  <div className="absolute left-[7px] top-6 h-3 w-3 rounded-full bg-coral-500" />
                  <div className="flex items-center gap-2 text-xs text-ocean-700">
                    <span className="tabular-nums font-semibold">
                      {event.time || "All day"}
                    </span>
                    {event.category && (
                      <span className="rounded-full bg-ocean-500/15 px-2 py-0.5 text-[10px] font-medium text-ocean-700">
                        {event.category}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-ocean-700">
                    {prefix && (
                      <span className="mr-2 text-xs uppercase tracking-[0.2em] text-accent-500">
                        {prefix}
                      </span>
                    )}
                    {main}
                  </h3>
                  {event.notes && (
                    <p className="mt-2 text-sm leading-relaxed text-ocean-700/80">
                      {event.notes}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between text-xs text-ocean-700/70">
                    <span>{event.area?.replace(/_/g, " ")}</span>
                    {event.mapUrl && (
                      <a
                        href={event.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-ocean-500 px-3 py-1 text-xs font-medium text-white transition hover:bg-ocean-700"
                      >
                        Map ↗
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-12 rounded-card bg-white/70 p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.3em] text-ocean-700">
              Map by Area
            </span>
            <div className="h-px flex-1 bg-ocean-500/20" />
          </div>

          {areaLinks.length === 0 ? (
            <p className="text-sm text-ocean-700/70">
              この日の地図リンクはまだありません。
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {areaLinks.map(([area, events]) => (
                <div key={area}>
                  <h4 className="text-sm font-semibold text-accent-500">
                    {area.replace(/_/g, " ")}
                  </h4>
                  <div className="mt-2 flex flex-col gap-2">
                    {events.map((event) => (
                      <a
                        key={event.id}
                        href={event.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-sand-50 px-3 py-2 text-xs text-ocean-700"
                      >
                        {event.title}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="text-center text-xs text-sky-100/90">
          Enjoy the trip. Keep hydrated.
        </footer>
      </div>
    </main>
  );
}
