"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const events = [
  {
    name: "Cumpleaños",
    description: "Celebrá tu día especial con estilo y comodidad",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
  },
  {
    name: "Bodas",
    description: "El escenario perfecto para el día más importante",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
  {
    name: "Baby Shower",
    description: "Recibí a tu bebé con la celebración que merece",
    image: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&q=80",
  },
  {
    name: "Bautizos",
    description: "Un momento sagrado rodeado de amor y naturaleza",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    name: "Corporativos",
    description: "Eventos empresariales en un entorno premium",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    name: "Reuniones Familiares",
    description: "Reuní a toda la familia en un espacio único",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  },
];

export default function Events() {
  return (
    <section id="eventos" className="py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#C9A66B] text-sm tracking-[0.3em] uppercase font-medium">
            Para cada ocasión
          </span>
          <h2
            className="text-[#1F4D36] mt-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Celebramos contigo
            <br />
            <em style={{ color: "#C9A66B", fontStyle: "italic" }}>
              cada momento importante
            </em>
          </h2>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-72"
            >
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Base overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#1F4D36]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                  className="transform group-hover:-translate-y-2 transition-transform duration-500"
                >
                  <h3
                    className="text-white text-xl font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {event.name}
                  </h3>
                  <p className="text-white/70 text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {event.description}
                  </p>
                </motion.div>
                <a
                  href="#reservas"
                  className="mt-4 text-[#C9A66B] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1"
                >
                  Consultar disponibilidad →
                </a>
              </div>

              {/* Golden corner accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#C9A66B] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-lg" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-gray-400 mb-6">
            ¿Tenés otro tipo de evento? Consultanos, adaptamos el espacio a tu necesidad.
          </p>
          <a
            href="#reservas"
            className="inline-flex items-center gap-3 bg-[#1F4D36] hover:bg-[#163826] text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#1F4D36]/20 hover:-translate-y-1"
          >
            Consultar disponibilidad
          </a>
        </motion.div>
      </div>
    </section>
  );
}
