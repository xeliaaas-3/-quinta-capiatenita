import { Instagram, Facebook, Phone, MapPin, Mail } from "lucide-react";
import Terms from "./Terms";

const navLinks = [
  { label: "Instalaciones", href: "#instalaciones" },
  { label: "Eventos", href: "#eventos" },
  { label: "Galería", href: "#galeria" },
  { label: "Precios", href: "#precios" },
  { label: "Reservas", href: "#reservas" },
  { label: "Contacto", href: "#contacto" },
];

const eventTypes = [
  "Cumpleaños", "Bodas", "Baby Shower",
  "Bautizos", "Corporativos", "Reuniones Familiares",
];

export default function Footer() {
  return (
    <footer className="bg-[#163826] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Quinta Capiateñita
            </h3>
            <p className="text-[#C9A66B] text-xs tracking-[0.2em] uppercase mb-4">
              Capiatá · Paraguay
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Donde los mejores momentos se convierten en recuerdos inolvidables.
              El venue premium de Capiatá para tus celebraciones.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A66B] flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.facebook.com/quintacapiatenita"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A66B] flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-[#C9A66B] mb-5">
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-[#C9A66B] mb-5">
              Tipos de Eventos
            </h4>
            <ul className="space-y-3">
              {eventTypes.map((e) => (
                <li key={e}>
                  <a
                    href="#eventos"
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {e}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase text-[#C9A66B] mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C9A66B] flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  Capiatá, Departamento Central, Paraguay
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#C9A66B] flex-shrink-0" />
                <a
                  href="tel:+595983222020"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  +595 983 222 020
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#C9A66B] flex-shrink-0" />
                <a
                  href="mailto:lacapiatenita25@gmail.com"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  lacapiatenita25@gmail.com
                </a>
              </li>
            </ul>

            <a
              href={`https://wa.me/595983222020?text=${encodeURIComponent("Hola, quiero consultar disponibilidad para Quinta Capiateñita.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BE5A] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row gap-2 justify-between items-center">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Quinta Capiateñita. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Terms />
            <span className="text-white/20 text-xs">Capiatá, Paraguay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
