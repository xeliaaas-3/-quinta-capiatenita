"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type Filter = "todos" | "piscina" | "quincho" | "salon" | "eventos" | "exterior";

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85",
    category: "piscina",
    alt: "Piscina resort",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=85",
    category: "salon",
    alt: "Salón de eventos",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=85",
    category: "eventos",
    alt: "Evento especial",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=85",
    category: "quincho",
    alt: "Quincho gourmet",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=85",
    category: "salon",
    alt: "Salón decorado",
    span: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=85",
    category: "eventos",
    alt: "Cumpleaños",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85",
    category: "eventos",
    alt: "Boda elegante",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85",
    category: "quincho",
    alt: "Asado y parrilla",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85",
    category: "piscina",
    alt: "Piscina de noche",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=85",
    category: "exterior",
    alt: "Jardines exteriores",
    span: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1444964280367-c8fbd9c9e0e4?w=600&q=85",
    category: "exterior",
    alt: "Atardecer en la quinta",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=85",
    category: "eventos",
    alt: "Evento corporativo",
    span: "",
  },
];

const filters: { key: Filter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "piscina", label: "Piscina" },
  { key: "quincho", label: "Quincho" },
  { key: "salon", label: "Salón" },
  { key: "eventos", label: "Eventos" },
  { key: "exterior", label: "Exterior" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = activeFilter === "todos"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : 0));
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : 0));
  }, [filtered.length]);

  return (
    <section id="galeria" className="py-28 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-[#C9A66B] text-sm tracking-[0.3em] uppercase font-medium">
            Galería
          </span>
          <h2
            className="text-[#1F4D36] mt-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            Viví la experiencia
          </h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === f.key
                  ? "bg-[#1F4D36] text-white shadow-lg shadow-[#1F4D36]/20"
                  : "bg-white text-gray-500 hover:bg-[#1F4D36]/10 hover:text-[#1F4D36]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span}`}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn
                    size={28}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 lightbox-overlay"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[80vh] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            <div className="absolute bottom-6 text-white/50 text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
