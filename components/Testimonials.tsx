"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rocío Acosta",
    initial: "R",
    color: "#4285F4",
    rating: 5,
    time: "hace 2 semanas",
    text: "Excelente lugar! La piscina es hermosa con la cascada, el quincho muy bien equipado y el salón amplio. Nos atendieron de maravilla. Totalmente recomendado para cumpleaños y reuniones familiares.",
  },
  {
    name: "Mario Villalba",
    initial: "M",
    color: "#34A853",
    rating: 5,
    time: "hace 1 mes",
    text: "Alquilamos para el cumpleaños de 15 de nuestra hija y fue perfecto. El espacio es muy bonito, limpio y cómodo. La piscina encantó a todos. Sin dudas volvemos el año que viene.",
  },
  {
    name: "Laura Benítez",
    initial: "L",
    color: "#EA4335",
    rating: 5,
    time: "hace 1 mes",
    text: "Organizamos el baby shower acá y quedamos muy contentos. Los dueños son muy atentos y el lugar es hermoso. La zona de jardines quedó ideal para las fotos. Lo recomiendo 100%.",
  },
  {
    name: "Diego Fernández",
    initial: "D",
    color: "#FBBC04",
    rating: 5,
    time: "hace 2 meses",
    text: "Muy buen lugar para eventos. La piscina está muy bien mantenida, el quincho tiene todo lo necesario y el estacionamiento es cómodo. El precio es muy accesible para todo lo que ofrecen.",
  },
  {
    name: "Patricia González",
    initial: "P",
    color: "#4285F4",
    rating: 5,
    time: "hace 2 meses",
    text: "Quinta Capiateñita es una joya escondida en Capiatá. La cama elástica fue un éxito total con los chicos. El ambiente es tranquilo y familiar. Todo muy ordenado y bien cuidado.",
  },
  {
    name: "Carlos Rodríguez",
    initial: "C",
    color: "#34A853",
    rating: 5,
    time: "hace 3 meses",
    text: "Hicimos nuestra reunión de fin de año de empresa acá y quedamos muy satisfechos. El salón con el sonido JBL es excelente. Gran predisposición de los dueños para hacer todo más fácil.",
  },
];

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#1F4D36] overflow-hidden relative">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: `radial-gradient(circle, #C9A66B 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-[#C9A66B] text-sm tracking-[0.3em] uppercase font-medium">Reseñas</span>
          <h2 className="text-white mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>
            Lo que dicen nuestros{" "}
            <em style={{ color: "#C9A66B", fontStyle: "italic" }}>clientes</em>
          </h2>

          {/* Google rating badge */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5">
              <GoogleLogo />
              <span className="text-white/80 text-sm font-medium">Google</span>
              <span className="text-white/20 text-sm">·</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#C9A66B] text-[#C9A66B]" />
                ))}
              </div>
              <span className="text-white font-bold text-sm">5.0</span>
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/[0.13] transition-colors duration-300"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: t.color }}>
                  {t.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={11} className="fill-[#C9A66B] text-[#C9A66B]" />
                      ))}
                    </div>
                    <span className="text-white/30 text-xs">{t.time}</span>
                  </div>
                </div>
                <GoogleLogo />
              </div>

              <p className="text-white/75 text-sm leading-relaxed">
                {t.text}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Google Maps CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
          <a
            href="https://maps.app.goo.gl/YourRealGoogleMapsLink"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-sm font-medium px-6 py-3 rounded-full transition-all duration-300"
          >
            <GoogleLogo />
            Ver todas las reseñas en Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}
