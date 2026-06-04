"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import type { HeroImage } from "@/lib/store";

interface HeroProps {
  images: HeroImage[];
}

export default function Hero({ images }: HeroProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background images — no transform, objectPosition controls framing */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          {images.map((img, i) =>
            i === currentImg ? (
              <motion.div
                key={img.src + i}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <Image
                  src={img.src}
                  alt="Quinta Capiateñita"
                  fill
                  priority={i === 0}
                  className="object-cover"
                  style={{
                    objectPosition: isMobile ? img.posMobile : img.posDesktop,
                  }}
                  sizes="100vw"
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
      <div className="absolute inset-0 bg-[#1F4D36]/20 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B] animate-pulse" />
          <span className="text-white/90 text-sm tracking-[0.2em] uppercase font-medium">
            Capiatá · Paraguay
          </span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-white mb-6"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Quinta{" "}
          <em style={{ color: "#C9A66B", fontStyle: "italic" }}>
            Capiateñita
          </em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/85 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light"
          style={{ letterSpacing: "0.01em", lineHeight: 1.5 }}
        >
          Un espacio exclusivo para celebrar sin límites.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-16 h-px bg-[#C9A66B] mx-auto mb-12"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#reservas"
            className="group inline-flex items-center justify-center gap-3 bg-[#C9A66B] hover:bg-[#B8935A] text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-[#C9A66B]/30 hover:-translate-y-1"
          >
            Reservar Fecha
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors text-xs">
              →
            </span>
          </a>
          <a
            href="#instalaciones"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-medium px-10 py-4 rounded-full transition-all duration-300 hover:-translate-y-1"
          >
            Ver Instalaciones
          </a>
        </motion.div>

        {/* Image dots */}
        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex gap-2 justify-center mt-14"
          >
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === currentImg
                    ? "w-8 h-1.5 bg-[#C9A66B]"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Descubrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
