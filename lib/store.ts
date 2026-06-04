import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(filename: string, defaultValue: T): T {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) return defaultValue;
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8")) as T;
  } catch {
    return defaultValue;
  }
}

function writeJson(filename: string, data: unknown): void {
  // Ensure data dir exists (important when using Railway volumes)
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
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
  return readJson<Reservation[]>("reservations.json", []);
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

const DEFAULT_PHOTOS: PhotosConfig = {
  hero: [
    { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85", posDesktop: "center center", posMobile: "center center" },
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=85", posDesktop: "center center", posMobile: "center center" },
    { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85", posDesktop: "center center", posMobile: "center center" },
    { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=85", posDesktop: "center center", posMobile: "center center" },
  ],
  facilities: {
    piscina: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85",
    quincho: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85",
    salon: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=85",
    ninos: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=85",
  },
  events: {
    cumpleanos: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
    bodas: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    babyshower: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&q=80",
    bautizos: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    corporativos: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    familiares: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
  gallery: [
    { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85", category: "piscina", alt: "Piscina resort" },
    { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=85", category: "salon", alt: "Salón de eventos" },
    { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=85", category: "eventos", alt: "Evento especial" },
    { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=85", category: "quincho", alt: "Quincho gourmet" },
    { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=85", category: "salon", alt: "Salón decorado" },
    { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=85", category: "eventos", alt: "Cumpleaños" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85", category: "eventos", alt: "Boda elegante" },
    { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85", category: "quincho", alt: "Asado y parrilla" },
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85", category: "piscina", alt: "Piscina de noche" },
    { src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=85", category: "exterior", alt: "Jardines exteriores" },
    { src: "https://images.unsplash.com/photo-1444964280367-c8fbd9c9e0e4?w=600&q=85", category: "exterior", alt: "Atardecer en la quinta" },
    { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=85", category: "eventos", alt: "Evento corporativo" },
  ],
};

export function getPhotos(): PhotosConfig {
  return readJson<PhotosConfig>("photos.json", DEFAULT_PHOTOS);
}

export function savePhotos(config: PhotosConfig): void {
  writeJson("photos.json", config);
}
