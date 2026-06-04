"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Waves, Flame, Car, Wifi, Music } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 100,
    suffix: "",
    label: "Personas",
    description: "Capacidad máxima para tu celebración",
  },
  {
    icon: Waves,
    value: 2,
    suffix: "",
    label: "Niveles de Piscina",
    description: "Cascada y zona playa segura para niños",
  },
  {
    icon: Flame,
    value: 1,
    suffix: "",
    label: "Quincho Equipado",
    description: "Parrilla multiuso y plancha a gas profesional",
  },
  {
    icon: Car,
    value: 10,
    suffix: "",
    label: "Estacionamientos",
    description: "Playa privada para hasta 10 vehículos",
  },
  {
    icon: Wifi,
    value: 1,
    suffix: "",
    label: "WiFi Incluido",
    description: "Conectividad en todo el espacio",
  },
  {
    icon: Music,
    value: 1,
    suffix: "",
    label: "Sonido JBL 320",
    description: "Sistema de audio profesional incluido",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    if (target === 1) { setCount(1); return; }
    const duration = 1800;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  const display = target === 1 ? "✓" : `${count}${suffix}`;

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-[#1F4D36]"
      style={{ fontFamily: "'Playfair Display', serif" }}>
      {display}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-[#C9A66B] text-sm tracking-[0.3em] uppercase font-medium">
            La Experiencia
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
            Todo lo que necesitás para
            <br />
            <em style={{ color: "#C9A66B", fontStyle: "italic" }}>
              tu celebración perfecta
            </em>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[#F5F0E8] rounded-3xl overflow-hidden shadow-xl shadow-black/5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white p-8 flex flex-col items-center text-center gap-3 group hover:bg-[#1F4D36] transition-all duration-500 cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5F0E8] group-hover:bg-white/10 flex items-center justify-center transition-colors duration-500">
                  <Icon size={22} className="text-[#C9A66B]" />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <div>
                  <p className="text-sm font-semibold text-[#1F4D36] group-hover:text-white transition-colors duration-500 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-gray-400 group-hover:text-white/60 transition-colors duration-500 leading-snug hidden md:block">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10 text-gray-400 text-sm italic"
        >
          "Donde los mejores momentos se convierten en recuerdos inolvidables."
        </motion.p>
      </div>
    </section>
  );
}
