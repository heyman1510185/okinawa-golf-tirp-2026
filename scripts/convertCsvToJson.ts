import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "csv-parse/sync";

const SOURCE_PATH = resolve("docs/sequences_data.csv");
const OUTPUT_PATH = resolve("data/trip.json");

type RawRow = {
  day?: string;
  time?: string;
  category?: string;
  content?: string;
  notes?: string;
  area?: string;
  "google maps"?: string;
};

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

const csv = readFileSync(SOURCE_PATH, "utf-8");
const records: RawRow[] = parse(csv, {
  columns: true,
  skip_empty_lines: true,
  relax_quotes: true,
  relax_column_count: true
});

let lastDay = "";
const events: Event[] = [];

const toDateKey = (day: string) => {
  const [m, d] = day.split("/").map((v) => Number(v));
  if (!m || !d) return 0;
  const date = new Date(2026, m - 1, d);
  return date.getTime();
};

const toTimeMinutes = (time?: string) => {
  if (!time || time.trim() === "-" || time.trim() === "") return null;
  const [h, m] = time.split(":").map((v) => Number(v));
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
};

records.forEach((row, index) => {
  const day = (row.day ?? "").trim();
  if (day) {
    lastDay = day;
  }

  const resolvedDay = day || lastDay;
  if (!resolvedDay) return;

  const time = (row.time ?? "").trim();
  const category = (row.category ?? "").trim();
  const title = (row.content ?? "").trim();
  const notes = (row.notes ?? "").trim();
  const area = (row.area ?? "").trim();
  const mapUrl = (row["google maps"] ?? "").trim();

  const dateKey = toDateKey(resolvedDay);
  const minutes = toTimeMinutes(time);
  const sortKey = dateKey + (minutes ?? 9999);

  events.push({
    id: `${resolvedDay}-${time || "na"}-${index}`,
    day: resolvedDay,
    time: time || undefined,
    category: category || undefined,
    title: title || "",
    notes: notes || undefined,
    area: area || undefined,
    mapUrl: mapUrl || undefined,
    sortKey
  });
});

events.sort((a, b) => a.sortKey - b.sortKey);

mkdirSync(resolve("data"), { recursive: true });
writeFileSync(OUTPUT_PATH, JSON.stringify({ events }, null, 2));

console.log(`Generated ${events.length} events → ${OUTPUT_PATH}`);
