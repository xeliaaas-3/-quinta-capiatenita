"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import ImagePicker from "../components/ImagePicker";
import { Save, RefreshCw, Check, AlertCircle, Plus, Trash2, Image as ImageIcon, FolderOpen, Monitor, Smartphone } from "lucide-react";
import type { PhotosConfig, HeroImage } from "@/lib/store";

const SECTION_LABELS: Record<string, string> = {
  piscina: "Piscina con Cascada",
  quincho: "Quincho Equipado",
  salon: "Salón Principal",
  ninos: "Espacio para Niños",
  cumpleanos: "Cumpleaños",
  bodas: "Bodas",
  babyshower: "Baby Shower",
  bautizos: "Bautizos",
  corporativos: "Corporativos",
  familiares: "Reuniones Familiares",
};

const GALLERY_CATEGORIES = ["piscina", "quincho", "salon", "eventos", "exterior"];

// ---- Thumbnail preview ----
function Thumb({ url }: { url: string }) {
  const [err, setErr] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => { setErr(false); setKey(k => k + 1); }, [url]);

  if (!url) return (
    <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-xl">
      <ImageIcon size={22} className="text-white/10" />
    </div>
  );
  if (err) return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-red-500/5 rounded-xl gap-1">
      <AlertCircle size={18} className="text-red-400/50" />
      <span className="text-[10px] text-red-400/50">URL inválida</span>
    </div>
  );
  return (
    <Image key={key} src={url} alt="" fill className="object-cover rounded-xl"
      onError={() => setErr(true)} sizes="200px" unoptimized />
  );
}

// ---- Focal point picker ----
// Renders a thumbnail; clicking sets objectPosition as "X% Y%"
function FocalPicker({
  url,
  value,
  onChange,
  label,
}: {
  url: string;
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Parse current value to dot position
  function parsePos(pos: string): { x: number; y: number } {
    const parts = pos.trim().split(/\s+/);
    const parseP = (s: string) => {
      if (s.endsWith("%")) return parseFloat(s);
      if (s === "left") return 0;
      if (s === "right") return 100;
      if (s === "top") return 0;
      if (s === "bottom") return 100;
      return 50;
    };
    return { x: parseP(parts[0] ?? "50%"), y: parseP(parts[1] ?? "50%") };
  }

  const dot = parsePos(value);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    onChange(`${x}% ${y}%`);
  }

  return (
    <div className="space-y-1.5">
      <span className="text-white/40 text-xs flex items-center gap-1.5">
        {label === "Desktop" ? <Monitor size={11} /> : <Smartphone size={11} />}
        {label}
      </span>
      <div
        ref={ref}
        className="relative h-20 rounded-xl overflow-hidden cursor-crosshair bg-white/5 border border-white/10 hover:border-[#C9A66B]/40 transition-colors"
        onClick={handleClick}
        title="Hacé clic para establecer el punto focal"
      >
        {url ? (
          <Image src={url} alt="" fill className="object-cover" sizes="200px" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon size={16} className="text-white/10" />
          </div>
        )}
        {/* Focal dot */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg bg-[#C9A66B]/80 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
        />
        {/* Crosshair lines */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/30 pointer-events-none"
          style={{ left: `${dot.x}%` }}
        />
        <div
          className="absolute left-0 right-0 h-px bg-white/30 pointer-events-none"
          style={{ top: `${dot.y}%` }}
        />
      </div>
      <p className="text-white/25 text-[10px] font-mono">{value}</p>
    </div>
  );
}

// ---- Single image slot editor ----
function ImageSlot({
  label, url, aspectClass = "h-36", allUrls,
  onChange,
}: {
  label: string; url: string; aspectClass?: string; allUrls: string[];
  onChange: (v: string) => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3">
        {label && <span className="text-white/60 text-sm font-medium block">{label}</span>}

        {/* Preview */}
        <div className={`relative ${aspectClass} rounded-xl overflow-hidden bg-white/5 cursor-pointer group`}
          onClick={() => setPickerOpen(true)}>
          <Thumb url={url} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center rounded-xl">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-white/90 text-[#1F4D36] text-xs font-semibold px-3 py-1.5 rounded-full">
              <FolderOpen size={13} /> Cambiar imagen
            </span>
          </div>
        </div>

        {/* URL input + pick button */}
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={e => onChange(e.target.value)}
            placeholder="https://..."
            className="flex-1 min-w-0 bg-white/5 border border-white/10 text-white/70 placeholder-white/20 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#C9A66B]/50 transition-colors"
          />
          <button
            onClick={() => setPickerOpen(true)}
            className="flex-shrink-0 flex items-center gap-1.5 bg-[#1F4D36]/60 hover:bg-[#1F4D36] text-white/70 hover:text-white text-xs font-medium px-3 py-2 rounded-xl transition-all"
          >
            <FolderOpen size={13} />
            <span className="hidden sm:inline">Galería</span>
          </button>
        </div>
      </div>

      <ImagePicker
        open={pickerOpen}
        currentUrl={url}
        inUseImages={allUrls}
        onSelect={onChange}
        onClose={() => setPickerOpen(false)}
      />
    </>
  );
}

// ---- Hero image card (with focal point pickers) ----
function HeroSlot({
  index,
  item,
  allUrls,
  onChange,
  onDelete,
}: {
  index: number;
  item: HeroImage;
  allUrls: string[];
  onChange: (v: Partial<HeroImage>) => void;
  onDelete: () => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-sm font-medium">Foto {index + 1}</span>
          <button
            onClick={onDelete}
            className="w-7 h-7 rounded-full bg-black/40 hover:bg-red-500/80 flex items-center justify-center text-white/50 hover:text-white transition-all"
          >
            <Trash2 size={13} />
          </button>
        </div>

        {/* Preview */}
        <div
          className="relative h-44 rounded-xl overflow-hidden bg-white/5 cursor-pointer group"
          onClick={() => setPickerOpen(true)}
        >
          <Thumb url={item.src} />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center rounded-xl">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-white/90 text-[#1F4D36] text-xs font-semibold px-3 py-1.5 rounded-full">
              <FolderOpen size={13} /> Cambiar imagen
            </span>
          </div>
        </div>

        {/* URL input */}
        <div className="flex gap-2">
          <input
            type="url"
            value={item.src}
            onChange={e => onChange({ src: e.target.value })}
            placeholder="https://..."
            className="flex-1 min-w-0 bg-white/5 border border-white/10 text-white/70 placeholder-white/20 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#C9A66B]/50 transition-colors"
          />
          <button
            onClick={() => setPickerOpen(true)}
            className="flex-shrink-0 flex items-center gap-1.5 bg-[#1F4D36]/60 hover:bg-[#1F4D36] text-white/70 hover:text-white text-xs font-medium px-3 py-2 rounded-xl transition-all"
          >
            <FolderOpen size={13} />
            <span className="hidden sm:inline">Galería</span>
          </button>
        </div>

        {/* Focal point pickers */}
        <div className="border-t border-white/5 pt-3 space-y-1">
          <p className="text-white/30 text-xs mb-3">
            Hacé clic en la imagen para ajustar el encuadre
          </p>
          <div className="grid grid-cols-2 gap-3">
            <FocalPicker
              url={item.src}
              value={item.posDesktop}
              onChange={v => onChange({ posDesktop: v })}
              label="Desktop"
            />
            <FocalPicker
              url={item.src}
              value={item.posMobile}
              onChange={v => onChange({ posMobile: v })}
              label="Mobile"
            />
          </div>
        </div>
      </div>

      <ImagePicker
        open={pickerOpen}
        currentUrl={item.src}
        inUseImages={allUrls}
        onSelect={v => onChange({ src: v })}
        onClose={() => setPickerOpen(false)}
      />
    </>
  );
}

export default function AdminPhotos() {
  const [photos, setPhotos] = useState<PhotosConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "instalaciones" | "eventos" | "galeria">("hero");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/photos");
    setPhotos(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function save() {
    if (!photos) return;
    setSaving(true);
    await fetch("/api/admin/photos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(photos),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  // All URLs currently in config (for ImagePicker "en uso")
  const allConfigUrls = photos ? [
    ...photos.hero.map(h => h.src),
    ...Object.values(photos.facilities),
    ...Object.values(photos.events),
    ...photos.gallery.map(g => g.src),
  ].filter(Boolean) : [];

  if (loading || !photos) return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center pt-20 md:pt-0">
        <RefreshCw size={24} className="text-white/20 animate-spin" />
      </main>
    </div>
  );

  const tabs = [
    { key: "hero" as const, label: "Hero" },
    { key: "instalaciones" as const, label: "Instalaciones" },
    { key: "eventos" as const, label: "Eventos" },
    { key: "galeria" as const, label: "Galería" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-auto pt-20 md:pt-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Gestión de Fotos
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Hacé clic en cualquier imagen para elegir desde la galería
            </p>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-[#C9A66B] hover:bg-[#B8935A] disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
            {saved ? <Check size={16} /> : saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
            {saved ? "Guardado" : saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-white/5 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex-shrink-0 px-5 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${
                activeTab === t.key ? "border-[#C9A66B] text-[#C9A66B]" : "border-transparent text-white/40 hover:text-white"
              }`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* HERO */}
        {activeTab === "hero" && (
          <div>
            <p className="text-white/40 text-sm mb-6">
              Hasta 4 imágenes que rotan en el slideshow. Ajustá el encuadre por separado para escritorio y móvil.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {photos.hero.map((item, i) => (
                <HeroSlot
                  key={i}
                  index={i}
                  item={item}
                  allUrls={allConfigUrls}
                  onChange={v => setPhotos(p => p ? {
                    ...p,
                    hero: p.hero.map((h, j) => j === i ? { ...h, ...v } : h),
                  } : p)}
                  onDelete={() => setPhotos(p => p ? { ...p, hero: p.hero.filter((_, j) => j !== i) } : p)}
                />
              ))}
              {photos.hero.length < 4 && (
                <button
                  onClick={() => setPhotos(p => p ? {
                    ...p,
                    hero: [...p.hero, { src: "", posDesktop: "center center", posMobile: "center center" }],
                  } : p)}
                  className="border-2 border-dashed border-white/10 hover:border-[#C9A66B]/40 rounded-2xl p-8 flex flex-col items-center gap-2 text-white/20 hover:text-[#C9A66B]/60 transition-all min-h-[220px]">
                  <Plus size={24} />
                  <span className="text-sm">Agregar foto</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* INSTALACIONES */}
        {activeTab === "instalaciones" && (
          <div>
            <p className="text-white/40 text-sm mb-6">Foto de portada para cada tarjeta de instalaciones.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Object.entries(photos.facilities).map(([key, url]) => (
                <ImageSlot
                  key={key}
                  label={SECTION_LABELS[key] ?? key}
                  url={url}
                  allUrls={allConfigUrls}
                  onChange={v => setPhotos(p => p ? { ...p, facilities: { ...p.facilities, [key]: v } } : p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* EVENTOS */}
        {activeTab === "eventos" && (
          <div>
            <p className="text-white/40 text-sm mb-6">Foto de fondo para cada tipo de evento.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.entries(photos.events).map(([key, url]) => (
                <ImageSlot
                  key={key}
                  label={SECTION_LABELS[key] ?? key}
                  url={url}
                  aspectClass="h-32"
                  allUrls={allConfigUrls}
                  onChange={v => setPhotos(p => p ? { ...p, events: { ...p.events, [key]: v } } : p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* GALERÍA */}
        {activeTab === "galeria" && (
          <div>
            <p className="text-white/40 text-sm mb-6">
              Fotos de la galería pública. Hacé clic en la imagen para cambiarla desde la biblioteca.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {photos.gallery.map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
                  <div className="relative h-36">
                    <ImageSlot
                      label=""
                      url={item.src}
                      aspectClass="h-36"
                      allUrls={allConfigUrls}
                      onChange={v => setPhotos(p => p ? {
                        ...p, gallery: p.gallery.map((g, j) => j === i ? { ...g, src: v } : g)
                      } : p)}
                    />
                  </div>

                  {/* Meta fields */}
                  <div className="p-3 space-y-2">
                    <div className="flex gap-2">
                      <select
                        value={item.category}
                        onChange={e => setPhotos(p => p ? {
                          ...p, gallery: p.gallery.map((g, j) => j === i ? { ...g, category: e.target.value } : g)
                        } : p)}
                        className="flex-1 bg-white/5 border border-white/10 text-white/70 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#C9A66B]/50">
                        {GALLERY_CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0D1F16]">{c}</option>)}
                      </select>
                      <button
                        onClick={() => setPhotos(p => p ? { ...p, gallery: p.gallery.filter((_, j) => j !== i) } : p)}
                        className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400/60 hover:text-red-400 transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.alt}
                      placeholder="Descripción..."
                      onChange={e => setPhotos(p => p ? {
                        ...p, gallery: p.gallery.map((g, j) => j === i ? { ...g, alt: e.target.value } : g)
                      } : p)}
                      className="w-full bg-white/5 border border-white/10 text-white/60 placeholder-white/20 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#C9A66B]/50"
                    />
                  </div>
                </div>
              ))}

              {/* Add new */}
              <button
                onClick={() => setPhotos(p => p ? {
                  ...p, gallery: [...p.gallery, { src: "", category: "exterior", alt: "Nueva foto" }]
                } : p)}
                className="border-2 border-dashed border-white/10 hover:border-[#C9A66B]/40 rounded-2xl min-h-[200px] flex flex-col items-center justify-center gap-2 text-white/20 hover:text-[#C9A66B]/60 transition-all">
                <Plus size={22} />
                <span className="text-xs">Agregar foto</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
