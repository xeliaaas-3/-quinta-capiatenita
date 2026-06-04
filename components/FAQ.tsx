"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "¿Cuál es la capacidad máxima del espacio?",
    a: "La quinta tiene una capacidad máxima de 100 personas entre todos los espacios disponibles: piscina, quincho, salón principal y jardines.",
  },
  {
    q: "¿Qué incluye el alquiler?",
    a: "El alquiler incluye acceso completo a la piscina (sistema ionizador, cascada, zona niños), quincho con parrilla multiuso y plancha a gas, salón principal con TV retráctil, Wi-Fi, mesa de billar y sistema de sonido JBL 320, cama elástica, sillas y mesas con mantel para hasta 40 personas con utensilios incluidos, y estacionamiento privado.",
  },
  {
    q: "¿Cómo confirmo mi reserva?",
    a: "Se requiere el 50% del valor total como seña, abonado por transferencia bancaria a Banco UENO, cuenta 18482189, titular Juan D. Figueredo. El saldo restante se paga en efectivo o transferencia al momento de ingresar.",
  },
  {
    q: "¿Puedo cambiar la fecha de mi reserva?",
    a: "Sí, podés cambiar la fecha con al menos 15 días de anticipación sin ningún cargo. Casos con menos tiempo quedan sujetos a evaluación. El adelanto no es reembolsable en caso de cancelación.",
  },
  {
    q: "¿Hay estacionamiento disponible?",
    a: "Sí, contamos con una playa de estacionamiento privada con capacidad para hasta 10 vehículos dentro del predio.",
  },
  {
    q: "¿Está disponible la piscina durante todo el horario?",
    a: "Sí, la piscina está disponible durante todo el tiempo que tenés el espacio reservado. Contamos con zona de dos niveles, cascada decorativa y área playa especial para niños.",
  },
  {
    q: "¿Puedo traer mi propio catering o bebidas?",
    a: "Sí, podés traer catering externo y bebidas. El quincho está totalmente equipado para que lo uses a tu gusto.",
  },
  {
    q: "¿Se permiten fuegos artificiales o música alta?",
    a: "No se permiten fuegos artificiales, fogatas ni actividades peligrosas. En cuanto a la música, debe mantenerse en un volumen razonable que no afecte a los vecinos.",
  },
  {
    q: "¿Hay servicio de limpieza disponible?",
    a: "Sí, ofrecemos servicio de limpieza opcional por Gs. 150.000. Podés incluirlo al momento de hacer tu reserva.",
  },
  {
    q: "¿Emiten facturas?",
    a: "Sí, podés solicitar factura completando los datos de RUC y razón social en el formulario de reserva.",
  },
  {
    q: "¿Qué pasa si el propietario cancela por fuerza mayor?",
    a: "En caso de que nosotros debamos cancelar por causas de fuerza mayor, te devolvemos el 100% del adelanto abonado.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Estamos en San Roque González c/ Adán Ramírez, Capiatá, Departamento Central, Paraguay. Podés consultarnos por WhatsApp y te compartimos la ubicación exacta.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-28 bg-[#F5F0E8]">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C9A66B] text-sm tracking-[0.3em] uppercase font-medium">FAQ</span>
          <h2
            className="text-[#1F4D36] mt-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
          >
            Preguntas Frecuentes
          </h2>
          <p className="text-gray-400 mt-4">
            Resolvemos las dudas más comunes antes de tu reserva.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F5F0E8]/50 transition-colors"
              >
                <span className="font-medium text-[#1F4D36] text-sm leading-snug pr-2">{faq.q}</span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F5F0E8] flex items-center justify-center text-[#1F4D36]">
                  {open === i ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-[#F5F0E8] pt-4">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-gray-400 text-sm mb-4">¿Tenés alguna otra pregunta?</p>
          <a
            href={`https://wa.me/595983222020?text=${encodeURIComponent("Hola, tengo una consulta sobre Quinta Capiateñita.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1F4D36] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#163826] transition-colors text-sm"
          >
            Consultanos por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
