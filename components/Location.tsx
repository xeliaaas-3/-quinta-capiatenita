"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "San Roque González c/ Adán Ramírez, Capiatá",
    sub: "Departamento Central, Paraguay",
  },
  {
    icon: Phone,
    label: "Teléfono / WhatsApp",
    value: "+595 983 222 020",
    href: "tel:+595983222020",
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: "Lunes a Sábado: 09:00 – 18:00",
    sub: "Consultas también por WhatsApp",
  },
];

export default function Location() {
  return (
    <section id="contacto" className="py-28 bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C9A66B] text-sm tracking-[0.3em] uppercase font-medium">
            Cómo llegar
          </span>
          <h2
            className="text-[#1F4D36] mt-3"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
            }}
          >
            Ubicación y Contacto
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-3xl overflow-hidden shadow-2xl shadow-black/10 min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.8!2d-57.4533!3d-25.3548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da5c0e5c1af27%3A0xabcdef1234567890!2sSan%20Roque%20Gonz%C3%A1lez%2C%20Capiat%C3%A1%2C%20Paraguay!5e0!3m2!1ses!2spy!4v1700000000000!5m2!1ses!2spy"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px", filter: "contrast(1.1) saturate(0.8)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Quinta Capiateñita"
            />
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {contactInfo.map(({ icon: Icon, label, value, sub, href }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F5F0E8] flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#1F4D36]" />
                </div>
                <div>
                  <p className="text-xs text-[#C9A66B] font-medium tracking-wider uppercase mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-semibold text-[#1F4D36] hover:text-[#C9A66B] transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold text-[#1F4D36]">{value}</p>
                  )}
                  {sub && <p className="text-sm text-gray-400 mt-0.5">{sub}</p>}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/595983222020?text=${encodeURIComponent("Hola, quiero consultar disponibilidad para Quinta Capiateñita.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/25 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">Consultar por WhatsApp</p>
                <p className="text-white/80 text-sm">Respuesta inmediata</p>
              </div>
            </a>

            {/* Social links */}
            <div className="bg-white rounded-2xl p-5 flex items-center gap-4">
              <p className="text-sm text-gray-400 flex-1">Seguinos en redes</p>
              <a
                href="https://instagram.com/quintacapiatenita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#F5F0E8] flex items-center justify-center hover:bg-[#1F4D36] hover:text-white text-[#1F4D36] transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#F5F0E8] flex items-center justify-center hover:bg-[#1F4D36] hover:text-white text-[#1F4D36] transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
