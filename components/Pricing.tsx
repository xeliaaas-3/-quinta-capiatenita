"use client";
import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";

const features = ["Hasta 100 personas", "Piscina incluida", "Quincho equipado", "Wi-Fi + sonido JBL"];

const weekendPlans = [
  {
    label: "Día",
    hours: "10:00 – 18:00 hs",
    price: "400.000",
    highlight: false,
  },
  {
    label: "Noche",
    hours: "19:00 – 00:00 hs",
    price: "400.000",
    highlight: false,
  },
  {
    label: "Día Completo",
    hours: "09:00 – 00:00 hs",
    price: "700.000",
    highlight: true,
  },
];

const extras = [
  { label: "Hora adicional", price: "Consultar", sub: "Sujeto a disponibilidad" },
  { label: "Servicio de limpieza", price: "150.000 Gs.", sub: "Opcional" },
  { label: "Set adicional de utensilios", price: "20.000 Gs.", sub: "Por set extra" },
];

export default function Pricing() {
  return (
    <section id="precios" className="py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C9A66B] text-sm tracking-[0.3em] uppercase font-medium">
            Tarifas
          </span>
          <h2
            className="text-[#1F4D36] mt-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            Tarifas Flexibles
          </h2>
          <p className="text-gray-400 mt-4 max-w-md mx-auto">
            Elegí el horario que mejor se adapte a tu evento.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Lunes a Jueves — single plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-[#EAE2D4] rounded-2xl p-8 flex flex-col gap-6"
          >
            <div>
              <h3
                className="text-[#1F4D36] text-xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Lunes a Jueves
              </h3>
              <div className="h-px bg-[#F5F0E8]" />
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 tracking-[0.15em] uppercase mb-2">
                Horario único ampliable
              </p>
              <p className="text-sm text-gray-400 mb-4">10:00 a 18:00 hs</p>
              <div className="flex items-end gap-1">
                <span className="text-[#C9A66B] font-bold"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", lineHeight: 1 }}>
                  Gs. 360.000
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 flex-1">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <Check size={15} className="text-[#1F4D36] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#reservas"
              className="text-center text-sm font-semibold py-3 rounded-xl bg-[#F5F0E8] text-[#1F4D36] hover:bg-[#1F4D36] hover:text-white transition-all duration-300"
            >
              Reservar
            </a>
          </motion.div>

          {/* Viernes a Domingo — three plans */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border-2 border-[#C9A66B] rounded-2xl p-8 flex flex-col gap-6"
          >
            <div>
              <h3
                className="text-[#1F4D36] text-xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Viernes a Domingo
              </h3>
              <div className="h-px bg-[#F5F0E8]" />
            </div>

            <div className="space-y-3 flex-1">
              {weekendPlans.map((plan) => (
                <div
                  key={plan.label}
                  className={`flex items-center justify-between py-3 border-b border-[#F5F0E8] last:border-0 ${
                    plan.highlight ? "opacity-100" : ""
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400">
                      {plan.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{plan.hours}</p>
                  </div>
                  <span
                    className={`font-bold text-lg ${
                      plan.highlight ? "text-[#C9A66B]" : "text-[#C9A66B]"
                    }`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Gs. {plan.price}
                  </span>
                </div>
              ))}
            </div>

            <ul className="space-y-2.5">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <Check size={15} className="text-[#1F4D36] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#reservas"
              className="text-center text-sm font-semibold py-3 rounded-xl bg-[#C9A66B] text-white hover:bg-[#B8935A] transition-all duration-300"
            >
              Reservar
            </a>
          </motion.div>
        </div>

        {/* Servicios adicionales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#F5F0E8] rounded-3xl p-8 mb-8"
        >
          <h3
            className="text-[#1F4D36] font-bold text-lg mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Servicios adicionales
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {extras.map((e) => (
              <div key={e.label} className="bg-white rounded-2xl p-5">
                <p className="font-semibold text-[#1F4D36] text-sm">{e.label}</p>
                <p className="text-[#C9A66B] font-bold text-lg mt-1">{e.price}</p>
                <p className="text-xs text-gray-400 mt-0.5">{e.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info reserva */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-[#1F4D36]/5 border border-[#1F4D36]/10 rounded-2xl p-6 flex gap-4"
        >
          <Info size={20} className="text-[#1F4D36] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong className="text-[#1F4D36]">Reserva:</strong> 50% de seña por transferencia bancaria · Banco UENO · Cuenta 18482189 · Juan D. Figueredo</p>
            <p><strong className="text-[#1F4D36]">Saldo:</strong> 50% restante al llegar (efectivo o transferencia)</p>
            <p><strong className="text-[#1F4D36]">Cambio de fecha:</strong> Con 15 días de anticipación sin cargo</p>
            <p><strong className="text-[#1F4D36]">Fechas especiales y feriados:</strong> Consultar precio aparte</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
