"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";

const sections = [
  {
    title: "Generalidades",
    content: [
      "La reserva implica la aceptación plena de estos términos y condiciones.",
      "La capacidad máxima del espacio es de 100 personas. No se permitirá el ingreso de invitados adicionales.",
      "Está prohibido el uso de fuegos artificiales, fogatas y cualquier actividad que represente un riesgo para las personas o las instalaciones.",
      "El volumen de la música debe mantenerse en niveles razonables que no afecten a los vecinos del entorno.",
    ],
  },
  {
    title: "Reserva y Pago",
    content: [
      "La reserva se confirma con el pago del 50% del valor total por adelantado, vía transferencia bancaria a Banco UENO, cuenta 18482189, titular Juan D. Figueredo.",
      "El 50% restante deberá abonarse en efectivo o transferencia al momento de ingresar al espacio. Este pago es un requisito obligatorio para el ingreso.",
      "Las fechas especiales y feriados tienen tarifas diferenciadas. Consultar precio aparte.",
    ],
  },
  {
    title: "Cancelación y Cambio de Fecha",
    content: [
      "El adelanto abonado no es reembolsable bajo ninguna circunstancia por parte del cliente.",
      "Se permite el cambio de fecha con un mínimo de 15 días de anticipación, sin costo adicional, sujeto a disponibilidad.",
      "En caso de que el propietario deba cancelar el evento por causas de fuerza mayor debidamente justificadas, se realizará la devolución del 100% del adelanto abonado.",
    ],
  },
  {
    title: "Uso de las Instalaciones",
    content: [
      "El cliente deberá respetar estrictamente los horarios de ingreso y salida establecidos en la reserva.",
      "El servicio de limpieza es opcional y tiene un costo adicional de Gs. 150.000. En caso de no contratarlo, el espacio deberá entregarse en condiciones aceptables de orden.",
      "Los residuos deben depositarse en los basureros designados dentro del predio.",
      "El cliente es responsable por el comportamiento de todos sus invitados durante el evento.",
    ],
  },
  {
    title: "Responsabilidades",
    content: [
      "Quinta Capiateñita no se hace responsable por pérdidas, hurtos o robos de pertenencias personales de los asistentes.",
      "El propietario no asume responsabilidad por accidentes, lesiones o caídas ocurridas durante la permanencia en el predio.",
      "Cualquier daño ocasionado a las instalaciones o mobiliario durante el evento será responsabilidad exclusiva del contratante, quien deberá hacerse cargo de la reparación o reposición correspondiente.",
    ],
  },
];

export default function Terms() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger link */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-[#C9A66B] hover:text-[#B8935A] text-sm underline underline-offset-2 transition-colors"
      >
        <FileText size={14} />
        Términos y Condiciones
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-[#F5F0E8]">
                <div>
                  <h2 className="text-[#1F4D36] font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Términos y Condiciones
                  </h2>
                  <p className="text-gray-400 text-xs mt-1">Quinta Capiateñita · Capiatá, Paraguay</p>
                </div>
                <button onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#F5F0E8] hover:bg-[#EAE2D4] flex items-center justify-center transition-colors text-[#1F4D36]">
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto flex-1 px-8 py-6 space-y-8">
                <p className="text-sm text-gray-500 leading-relaxed bg-[#F5F0E8] rounded-xl p-4">
                  Al realizar una reserva en Quinta Capiateñita, el contratante declara haber leído, entendido y aceptado en su totalidad los siguientes términos y condiciones.
                </p>

                {sections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-[#1F4D36] font-semibold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="w-4 h-0.5 bg-[#C9A66B]" />
                      {section.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {section.content.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-500 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B] flex-shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-8 py-5 border-t border-[#F5F0E8] flex items-center justify-between gap-4">
                <p className="text-xs text-gray-400">
                  Al reservar, aceptás estos términos automáticamente.
                </p>
                <button onClick={() => setOpen(false)}
                  className="bg-[#1F4D36] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#163826] transition-colors">
                  Entendido
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
