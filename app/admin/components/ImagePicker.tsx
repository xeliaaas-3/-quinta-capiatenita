"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Search, Check, Link, Grid2X2, Upload, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Curated Unsplash image library for the quinta
const UNSPLASH_LIBRARY = [
  // Piscinas
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", tag: "piscina" },
  { src: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800&q=80", tag: "piscina" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", tag: "piscina" },
  { src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80", tag: "piscina" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80", tag: "piscina" },
  // Quincho / BBQ
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", tag: "quincho" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", tag: "quincho" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", tag: "quincho" },
  { src: "https://images.unsplash.com/photo-1544025162-d76538d30abe?w=800&q=80", tag: "quincho" },
  // Salón / Eventos
  { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", tag: "salon" },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", tag: "salon" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80", tag: "salon" },
  { src: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80", tag: "salon" },
  // Bodas
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", tag: "boda" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80", tag: "boda" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", tag: "boda" },
  // Cumpleaños
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", tag: "cumpleaños" },
  { src: "https://images.unsplash.com/photo-1558636508-e0969431e349?w=800&q=80", tag: "cumpleaños" },
  // Baby Shower
  { src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80", tag: "babyshower" },
  { src: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80", tag: "babyshower" },
  // Exterior / Jardines
  { src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80", tag: "exterior" },
  { src: "https://images.unsplash.com/photo-1444964280367-c8fbd9c9e0e4?w=800&q=80", tag: "exterior" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", tag: "exterior" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", tag: "exterior" },
  // Corporativo
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", tag: "corporativo" },
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", tag: "corporativo" },
  // Hero / Atardecer
  { src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=85", tag: "hero" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=85", tag: "hero" },
  { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85", tag: "hero" },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=85", tag: "hero" },
];

const TAGS = ["todas", "mis fotos", "piscina", "quincho", "salon", "boda", "cumpleaños", "babyshower", "exterior", "corporativo", "hero"];

interface Props {
  open: boolean;
  currentUrl: string;
  onSelect: (url: string) => void;
  onClose: () => void;
  inUseImages?: string[];
}

export default function ImagePicker({ open, currentUrl, onSelect, onClose, inUseImages = [] }: Props) {
  const [tab, setTab] = useState<"library" | "url">("library");
  const [tag, setTag] = useState("todas");
  const [search, setSearch] = useState("");
  const [customUrl, setCustomUrl] = useState(currentUrl);
  const [selected, setSelected] = useState(currentUrl);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  // Uploaded images (Cloudinary)
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [hiddenImages, setHiddenImages] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setSelected(currentUrl); setCustomUrl(currentUrl); setUploadError(null); }
  }, [open, currentUrl]);

  useEffect(() => {
    if (tab === "url" && inputRef.current) inputRef.current.focus();
  }, [tab]);

  // Load persisted data from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("quinta_uploaded_images");
      if (stored) setUploadedImages(JSON.parse(stored));
      const hidden = localStorage.getItem("quinta_hidden_images");
      if (hidden) setHiddenImages(new Set(JSON.parse(hidden)));
    } catch { /* ignore */ }
  }, []);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type and size (max 10MB)
    if (!file.type.startsWith("image/")) {
      setUploadError("Solo se permiten archivos de imagen.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("El archivo no puede superar los 10 MB.");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Error al subir");

      const url: string = data.url;

      // Persist uploaded URLs in localStorage
      const updated = [url, ...uploadedImages];
      setUploadedImages(updated);
      localStorage.setItem("quinta_uploaded_images", JSON.stringify(updated));

      // Auto-select and switch to "mis fotos"
      setSelected(url);
      setTag("mis fotos");
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
      // Reset input so same file can be re-uploaded
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function hideImage(src: string) {
    const updated = new Set([...hiddenImages, src]);
    setHiddenImages(updated);
    localStorage.setItem("quinta_hidden_images", JSON.stringify([...updated]));
    if (selected === src) setSelected("");
  }

  // Merge all image sources
  const allImages = [
    // Uploaded (Cloudinary) — shown as "mis fotos"
    ...uploadedImages.map(u => ({ src: u, tag: "mis fotos" })),
    // In-use images from config (not already in library or uploaded)
    ...inUseImages
      .filter(u => u && !UNSPLASH_LIBRARY.find(l => l.src === u) && !uploadedImages.includes(u))
      .map(u => ({ src: u, tag: "mis fotos" })),
    // Library — excluding hidden ones
    ...UNSPLASH_LIBRARY.filter(img => !hiddenImages.has(img.src)),
  ];

  const filtered = allImages.filter(img => {
    const matchTag = tag === "todas" || img.tag === tag;
    const matchSearch = !search || img.tag.includes(search.toLowerCase()) || img.src.includes(search);
    return matchTag && matchSearch;
  });

  function handleConfirm() {
    const url = tab === "url" ? customUrl : selected;
    if (url) { onSelect(url); onClose(); }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#0D1F16] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <h3 className="text-white font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Selector de imagen
              </h3>
              <button onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all">
                <X size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5">
              <button onClick={() => setTab("library")}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all ${tab === "library" ? "border-[#C9A66B] text-[#C9A66B]" : "border-transparent text-white/40 hover:text-white"}`}>
                <Grid2X2 size={15} /> Biblioteca
              </button>
              <button onClick={() => setTab("url")}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all ${tab === "url" ? "border-[#C9A66B] text-[#C9A66B]" : "border-transparent text-white/40 hover:text-white"}`}>
                <Link size={15} /> URL personalizada
              </button>
            </div>

            {tab === "library" && (
              <>
                {/* Upload bar */}
                <div className="px-5 pt-4 pb-3 border-b border-white/5 flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 bg-[#C9A66B] hover:bg-[#B8935A] disabled:opacity-60 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all flex-shrink-0"
                  >
                    {uploading
                      ? <><Loader2 size={13} className="animate-spin" /> Subiendo...</>
                      : <><Upload size={13} /> Subir desde PC</>
                    }
                  </button>
                  {uploadError && (
                    <div className="flex items-center gap-1.5 text-red-400 text-xs">
                      <AlertCircle size={13} /> {uploadError}
                    </div>
                  )}
                  {!uploadError && (
                    <p className="text-white/25 text-xs">JPG, PNG, WEBP — máx. 10 MB</p>
                  )}
                </div>

                {/* Search + filter */}
                <div className="px-5 py-3 flex gap-3 border-b border-white/5">
                  <div className="relative flex-1">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white/80 placeholder-white/20 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#C9A66B]/40"
                    />
                  </div>
                  <div className="flex gap-1.5 overflow-x-auto flex-nowrap">
                    {TAGS.map(t => (
                      <button
                        key={t}
                        onClick={() => setTag(t)}
                        className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all capitalize ${tag === t ? "bg-[#1F4D36] text-white" : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"}`}
                      >
                        {t === "mis fotos"
                          ? `mis fotos${uploadedImages.length > 0 ? ` (${uploadedImages.length})` : ""}`
                          : t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <div className="overflow-y-auto flex-1 p-5">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {filtered.map((img, i) => {
                      const isSelected = selected === img.src;
                      const hasError = imgErrors.has(img.src);
                      const isMine = img.tag === "mis fotos";
                      return (
                        <div key={img.src + i} className="relative aspect-square group">
                          <button
                            onClick={() => setSelected(img.src)}
                            className={`relative w-full h-full rounded-xl overflow-hidden border-2 transition-all duration-200 ${isSelected ? "border-[#C9A66B] scale-[0.97] shadow-lg shadow-[#C9A66B]/20" : "border-transparent hover:border-white/30"}`}
                          >
                            {hasError ? (
                              <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                <Upload size={16} className="text-white/20" />
                              </div>
                            ) : (
                              <Image
                                src={img.src}
                                alt={img.tag}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="150px"
                                unoptimized
                                onError={() => setImgErrors(prev => new Set([...prev, img.src]))}
                              />
                            )}
                            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white/70 text-[10px] px-2 py-1.5 font-medium capitalize opacity-0 group-hover:opacity-100 transition-opacity">
                              {img.tag}
                            </span>
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#C9A66B]/20 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-[#C9A66B] flex items-center justify-center shadow-lg">
                                  <Check size={16} className="text-white" />
                                </div>
                              </div>
                            )}
                          </button>

                          {/* Delete button — en todas las fotos */}
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              if (isMine) {
                                const updated = uploadedImages.filter(u => u !== img.src);
                                setUploadedImages(updated);
                                localStorage.setItem("quinta_uploaded_images", JSON.stringify(updated));
                                if (selected === img.src) setSelected("");
                              } else {
                                hideImage(img.src);
                              }
                            }}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 hover:bg-red-500 flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all z-10"
                            title="Eliminar foto"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      );
                    })}

                    {/* Upload placeholder tile */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="relative aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-[#C9A66B]/40 flex flex-col items-center justify-center gap-2 text-white/20 hover:text-[#C9A66B]/60 transition-all disabled:opacity-40"
                    >
                      {uploading
                        ? <Loader2 size={20} className="animate-spin text-[#C9A66B]" />
                        : <><Upload size={20} /><span className="text-[10px]">Subir foto</span></>
                      }
                    </button>

                    {filtered.length === 0 && !uploading && (
                      <div className="col-span-4 flex flex-col items-center justify-center py-16 text-white/20">
                        <Search size={28} className="mb-2" />
                        <p className="text-sm">Sin resultados para &quot;{search}&quot;</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {tab === "url" && (
              <div className="flex-1 p-6 flex flex-col gap-5">
                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">URL de la imagen</label>
                  <input
                    ref={inputRef}
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={customUrl}
                    onChange={e => { setCustomUrl(e.target.value); setSelected(e.target.value); }}
                    className="w-full bg-white/5 border border-white/10 text-white/80 placeholder-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C9A66B]/50 font-mono"
                  />
                  <p className="text-white/25 text-xs mt-2">Pegá cualquier URL pública de imagen (Unsplash, Google Drive, etc.)</p>
                </div>
                {customUrl && (
                  <div className="flex-1 relative rounded-2xl overflow-hidden bg-white/5 min-h-[200px]">
                    <Image src={customUrl} alt="preview" fill className="object-contain" sizes="600px" unoptimized onError={() => {}} />
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-5 border-t border-white/5 flex items-center justify-between gap-4">
              {selected && tab === "library" && (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={selected} alt="sel" fill className="object-cover" sizes="48px" unoptimized />
                </div>
              )}
              {(!selected || tab === "url") && <div className="w-12 h-12 rounded-xl bg-white/5 flex-shrink-0" />}

              <div className="flex gap-3 ml-auto">
                <button onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:bg-white/5 text-sm transition-all">
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!selected && !customUrl}
                  className="px-6 py-2.5 rounded-xl bg-[#C9A66B] hover:bg-[#B8935A] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all"
                >
                  Seleccionar imagen
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
