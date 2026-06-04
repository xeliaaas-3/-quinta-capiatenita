import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(filename: string): T {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) return [] as unknown as T;
  return JSON.parse(fs.readFileSync(filepath, "utf-8")) as T;
}

function writeJson(filename: string, data: unknown): void {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
}

// --- Reservations ---

export type ReservationStatus = "pendiente" | "confirmada" | "cancelada";

export interface Reservation {
  id: string;
  createdAt: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email?: string;
  eventType: string;
  guests: string;
  message?: string;
  status: ReservationStatus;
}

export function getReservations(): Reservation[] {
  return readJson<Reservation[]>("reservations.json");
}

export function addReservation(data: Omit<Reservation, "id" | "createdAt" | "status">): Reservation {
  const reservations = getReservations();
  const reservation: Reservation = {
    ...data,
    id: `res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "pendiente",
  };
  reservations.push(reservation);
  writeJson("reservations.json", reservations);
  return reservation;
}

export function updateReservation(id: string, updates: Partial<Reservation>): Reservation | null {
  const reservations = getReservations();
  const idx = reservations.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  reservations[idx] = { ...reservations[idx], ...updates };
  writeJson("reservations.json", reservations);
  return reservations[idx];
}

export function deleteReservation(id: string): boolean {
  const reservations = getReservations();
  const filtered = reservations.filter((r) => r.id !== id);
  if (filtered.length === reservations.length) return false;
  writeJson("reservations.json", filtered);
  return true;
}

// --- Photos ---

export interface HeroImage {
  src: string;
  posDesktop: string;
  posMobile: string;
}

export interface PhotosConfig {
  hero: HeroImage[];
  facilities: Record<string, string>;
  events: Record<string, string>;
  gallery: { src: string; category: string; alt: string }[];
}

export function getPhotos(): PhotosConfig {
  return readJson<PhotosConfig>("photos.json");
}

export function savePhotos(config: PhotosConfig): void {
  writeJson("photos.json", config);
}
