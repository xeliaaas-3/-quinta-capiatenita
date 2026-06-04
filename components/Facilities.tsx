"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const facilities = [
  {
    title: "Piscina con Cascada",
    subtitle: "Refrescá tu celebración",
    description:
      "Piscina de dos niveles con sistema ionizador (cloro reducido), hermosa cascada decorativa y zona playa segura para los más chicos. Diseñada para que todos disfruten con total comodidad y seguridad.",
    features: ["Sistema ionizador", "Dos niveles", "Cascada decorativa", "Zona playa para niños"],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=85",
    tag: "Premium",
    color: "#1F4D36",
  },
  {
    title: "Quincho Equipado",
    subtitle: "El placer de compartir",
    description:
      "Quincho totalmente equipado con parrilla multiuso, plancha a gas profesional, piletas, mesadas amplias y utensilios completos para 40 personas incluidos. Todo lo que necesitás para el asado perfecto.",
    features: ["Parrilla multiuso", "Plancha a gas profesional", "Piletas y mesadas", "Utensilios para 40 personas"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=85",
    tag: "Equipado",
    color: "#C9A66B",
  },
  {
    title: "Salón Principal",
    subtitle: "Elegancia moderna",
    description:
      "Salón moderno con capacidad para hasta 100 personas, TV retráctil, Wi-Fi, sillones, mesa de billar y sistema de sonido JBL 320. Mesas con mantel y sillas incluidas para una experiencia completa.",
    features: ["Capacidad 100 personas", "TV retráctil + Wi-Fi", "Mesa de billar", "Sillas y mesas con mantel incluidas"],
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=85",
    tag: "Moderno",
    color: "#1F4D36",
  },
  {
    title: "Espacio para Niños",
    subtitle: "Diversión garantizada",
    description:
      "Cama elástica (trampolín) y amplios espacios verdes para que los niños jueguen y se diviertan con total seguridad. El complemento perfecto para que grandes y chicos disfruten por igual.",
    features: ["Cama elástica", "Espacios verdes amplios", "Zona segura", "Ideal para fotografías"],
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=85",
    tag: "Familiar",
    color: "#C9A66B",
  },
];

export default function Facilities() {
  return (
    <section id="instalaciones" className="py-28 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 max-w-2xl"
        >
          <span className="text-[#C9A66B] text-sm tracking-[0.3em] uppercase font-medium">
            Nuestros Espacios
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
            Instalaciones diseñadas
            <br />
            para la{" "}
            <em style={{ color: "#C9A66B", fontStyle: "italic" }}>
              perfección
            </em>
          </h2>
          <p className="text-gray-500 mt-4 text-lg leading-relaxed">
            Cada espacio fue pensado para que tu evento sea exactamente como lo
            imaginaste.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((facility, i) => (
            <motion.article
              key={facility.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span
                  className="absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                  style={{ backgroundColor: facility.color }}
                >
                  {facility.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-[#C9A66B] text-xs tracking-[0.2em] uppercase font-medium mb-2">
                  {facility.subtitle}
                </p>
                <h3
                  className="text-[#1F4D36] text-2xl font-bold mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {facility.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {facility.description}
                </p>

                {/* Features */}
                <ul className="grid grid-cols-2 gap-2 mb-6">
                  {facility.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs text-gray-500"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#F5F0E8] flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B]" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#reservas"
                  className="inline-flex items-center gap-2 text-[#1F4D36] font-semibold text-sm hover:text-[#C9A66B] transition-colors group/link"
                >
                  Reservar este espacio
                  <ArrowRight
                    size={16}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
