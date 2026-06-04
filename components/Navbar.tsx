"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Instalaciones", href: "#instalaciones" },
  { label: "Eventos", href: "#eventos" },
  { label: "Galería", href: "#galeria" },
  { label: "Precios", href: "#precios" },
  { label: "Reservas", href: "#reservas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none group">
            <span
              className={`font-playfair text-xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-[#1F4D36]" : "text-white"
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Quinta Capiateñita
            </span>
            <span
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                scrolled ? "text-[#C9A66B]" : "text-[#C9A66B]"
              }`}
            >
              Capiatá · Paraguay
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#C9A66B] ${
                  scrolled ? "text-[#1F4D36]" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservas"
              className="bg-[#C9A66B] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#B8935A] transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 hover:-translate-y-0.5"
            >
              Reservar
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors ${
              scrolled ? "text-[#1F4D36]" : "text-white"
            }`}
            aria-label="Menú"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-[#1F4D36] flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
              <span
                className="text-white font-playfair text-xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Quinta Capiateñita
              </span>
              <button onClick={() => setMenuOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-2 p-8 flex-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 hover:text-[#C9A66B] text-2xl font-playfair py-4 border-b border-white/10 transition-colors"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#reservas"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setMenuOpen(false)}
                className="mt-8 bg-[#C9A66B] text-white text-center text-lg font-semibold px-8 py-4 rounded-full hover:bg-[#B8935A] transition-colors"
              >
                Reservar Ahora
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
