"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

type Step = 1 | 2 | 3;

const MONTHS = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];
const DAYS = ["Do","Lu","Ma","Mi","Ju","Vi","Sá"];

function toISO(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ---- Calendar ----
function CalendarPicker({
  selected,
  onSelect,
  bookedDates,
}: {
  selected: string | null;
  onSelect: (iso: string) => void;
  bookedDates: string[];
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const isPast = (d: number) => new Date(year, month, d) < today;
  const isBooked = (d: number) => bookedDates.includes(toISO(year, month, d));
  const isSelected = (d: number) => selected === toISO(year, month, d);

  const prev = () => {
    // Don't go before current month
    if (year === today.getFullYear() && month === today.getMonth()) return;
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);

  };

  const canGoPrev = !(year === today.getFullYear() && month === today.getMonth());

  return (
    <div className="bg-white rounded-2xl border border-[#EAE2D4] p-6 select-none">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prev}
          disabled={!canGoPrev}
          className="w-9 h-9 rounded-full hover:bg-[#F5F0E8] disabled:opacity-30 flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={18} className="text-[#1F4D36]" />
        </button>
        <span className="font-semibold text-[#1F4D36] text-sm">{MONTHS[month]} {year}</span>
        <button onClick={next} className="w-9 h-9 rounded-full hover:bg-[#F5F0E8] flex items-center justify-center transition-colors">
          <ChevronRight size={18} className="text-[#1F4D36]" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array(firstDay).fill(null).map((_, i) => <div key={`b${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
          const booked = isBooked(d);
          const past = isPast(d);
          const sel = isSelected(d);
          const disabled = booked || past;
          return (
            <button
              key={d}
              disabled={disabled}
              onClick={() => onSelect(toISO(year, month, d))}
              className={`w-9 h-9 rounded-full text-sm font-medium mx-auto flex items-center justify-center transition-all duration-200
                ${sel ? "bg-[#1F4D36] text-white shadow-lg scale-110" : ""}
                ${booked && !sel ? "bg-red-50 text-red-300 cursor-not-allowed line-through" : ""}
                ${past && !booked && !sel ? "text-gray-300 cursor-not-allowed" : ""}
                ${!sel && !booked && !past ? "hover:bg-[#F5F0E8] hover:text-[#1F4D36] text-gray-700" : ""}
              `}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 mt-4 pt-4 border-t border-[#F5F0E8]">
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-3 h-3 rounded-full bg-[#1F4D36]" /> Seleccionado
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <span className="w-3 h-3 rounded-full bg-red-100 border border-red-200" /> No disponible
        </div>
      </div>
    </div>
  );
}

// ---- Helpers ----
const EVENT_TYPES = [
  "Cumpleaños","Baby Shower","Evento Corporativo","Boda",
  "Reunión Familiar","Bautizo","Otro",
];

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d)} de ${MONTHS[parseInt(m) - 1]} de ${y}`;
}

// ---- Main component ----
export default function Booking() {
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", eventType: "", guests: "", message: "",
    limpieza: false, cubiertosCant: 0,
    factura: false, ruc: "", razonSocial: "",
  });

  const times = ["10:00 – 18:00 hs", "19:00 – 00:00 hs", "09:00 – 00:00 hs"];

  const extrasTotal =
    (form.limpieza ? 150000 : 0) +
    (form.cubiertosCant * 20000);

  // Fetch booked dates from API
  const fetchBooked = useCallback(async () => {
    try {
      const res = await fetch("/api/booked-dates");
      if (res.ok) setBookedDates(await res.json());
    } catch { /* silent */ }
  }, []);

  useEffect(() => { fetchBooked(); }, [fetchBooked]);

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  const handleWhatsApp = async () => {
    try {
      await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,           // "YYYY-MM-DD"
          time: selectedTime,
          name: form.name,
          phone: form.phone,
          email: form.email,
          eventType: form.eventType,
          guests: form.guests,
          message: [
            form.message,
            form.limpieza ? "Servicio de limpieza incluido" : "",
            form.cubiertosCant > 0 ? `${form.cubiertosCant} set(s) adicional(es) de cubiertos` : "",
            form.factura ? `Factura: RUC ${form.ruc} - ${form.razonSocial}` : "",
          ].filter(Boolean).join(" | "),
        }),
      });
      // Refresh booked dates after saving
      await fetchBooked();
    } catch { /* no bloquear flujo */ }

    const extras = [
      form.limpieza ? "Limpieza: Gs. 150.000" : "",
      form.cubiertosCant > 0
        ? `Cubiertos adicionales x${form.cubiertosCant}: Gs. ${(form.cubiertosCant * 20000).toLocaleString()}`
        : "",
      form.factura ? `Factura - RUC: ${form.ruc} / ${form.razonSocial}` : "",
    ].filter(Boolean).join("\n");

    const dateLabel = selectedDate ? formatDate(selectedDate) : "";
    const msg = encodeURIComponent(
      `Hola, quiero hacer una reserva en Quinta Capiateñita.\n\nFecha: ${dateLabel}\nHorario: ${selectedTime}\nNombre: ${form.name}\nTeléfono: ${form.phone}\nEvento: ${form.eventType}\nInvitados: ${form.guests}${extras ? `\n\nExtras:\n${extras}` : ""}${form.message ? `\n\nMensaje: ${form.message}` : ""}`
    );
    window.open(`https://wa.me/595983222020?text=${msg}`, "_blank");
  };

  return (
    <section id="reservas" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#C9A66B] text-sm tracking-[0.3em] uppercase font-medium">Reservas Online</span>
          <h2 className="text-[#1F4D36] mt-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>
            Asegurá tu fecha
          </h2>
          <p className="text-gray-400 mt-3 max-w-md mx-auto">
            Solo 3 simples pasos y tu evento queda confirmado vía WhatsApp.
          </p>
        </motion.div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-0 mb-12 max-w-sm mx-auto">
          {([1, 2, 3] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <button
                onClick={() => { if (s < step) setStep(s); }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 flex-shrink-0
                  ${step === s ? "bg-[#1F4D36] text-white scale-110 shadow-lg shadow-[#1F4D36]/25" : ""}
                  ${step > s ? "bg-[#C9A66B] text-white" : ""}
                  ${step < s ? "bg-[#F5F0E8] text-gray-400" : ""}
                `}>
                {step > s ? "✓" : s}
              </button>
              {i < 2 && (
                <div className={`flex-1 h-0.5 transition-colors duration-500 ${step > s ? "bg-[#C9A66B]" : "bg-[#F5F0E8]"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-12 items-start justify-center flex-col lg:flex-row">
          {/* Step labels */}
          <div className="hidden lg:flex flex-col gap-4 w-48">
            {[
              { n: 1, icon: Calendar, label: "Elegí tu fecha", sub: "Seleccioná el día y horario" },
              { n: 2, icon: User, label: "Tus datos", sub: "Completá el formulario" },
              { n: 3, icon: CheckCircle, label: "Confirmar", sub: "Via WhatsApp al instante" },
            ].map(({ n, icon: Icon, label, sub }) => (
              <div key={n} className={`flex items-start gap-3 p-4 rounded-2xl transition-all duration-300 ${step === n ? "bg-[#F5F0E8] border border-[#EAE2D4]" : "opacity-40"}`}>
                <Icon size={20} className={step >= n ? "text-[#1F4D36]" : "text-gray-300"} />
                <div>
                  <p className="text-sm font-semibold text-[#1F4D36]">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 max-w-xl w-full">
            <AnimatePresence mode="wait">
              {/* STEP 1 — fecha */}
              {step === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.3 }} className="space-y-6">
                  <CalendarPicker
                    selected={selectedDate}
                    onSelect={d => { setSelectedDate(d); setSelectedTime(null); }}
                    bookedDates={bookedDates}
                  />

                  {selectedDate && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                      <p className="text-sm font-medium text-[#1F4D36]">Elegí el horario:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {times.map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)}
                            className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all duration-200 text-center
                              ${selectedTime === t
                                ? "bg-[#1F4D36] text-white border-[#1F4D36] shadow-lg"
                                : "border-[#EAE2D4] text-gray-600 hover:border-[#1F4D36] hover:text-[#1F4D36]"
                              }`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <button
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(2)}
                    className="w-full bg-[#1F4D36] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-2xl hover:bg-[#163826] transition-all duration-300 hover:shadow-lg disabled:text-gray-400">
                    Continuar →
                  </button>
                </motion.div>
              )}

              {/* STEP 2 — datos */}
              {step === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-[#EAE2D4] rounded-2xl p-6 space-y-5">

                  <p className="text-sm font-semibold text-[#1F4D36] border-b border-[#F5F0E8] pb-3">Datos personales</p>

                  {[
                    { key: "name", label: "Nombre completo *", type: "text", placeholder: "Tu nombre" },
                    { key: "email", label: "Email *", type: "email", placeholder: "tu@email.com" },
                    { key: "phone", label: "Número de teléfono *", type: "tel", placeholder: "+595 9XX XXX XXX" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-[#1F4D36] mb-1.5">{label}</label>
                      <input type={type} placeholder={placeholder} value={form[key as keyof typeof form] as string}
                        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        className="w-full border border-[#EAE2D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F4D36] transition-colors" />
                    </div>
                  ))}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#1F4D36] mb-1.5">Tipo de evento *</label>
                      <select value={form.eventType} onChange={e => setForm(p => ({ ...p, eventType: e.target.value }))}
                        className="w-full border border-[#EAE2D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F4D36] text-gray-600">
                        <option value="">Seleccionar</option>
                        {EVENT_TYPES.map(e => <option key={e}>{e}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1F4D36] mb-1.5">Cantidad de invitados</label>
                      <input type="number" placeholder="Máx. 100" min={1} max={100} value={form.guests}
                        onChange={e => setForm(p => ({ ...p, guests: e.target.value }))}
                        className="w-full border border-[#EAE2D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F4D36]" />
                    </div>
                  </div>

                  {/* Servicios adicionales */}
                  <div className="bg-[#F5F0E8] rounded-2xl p-4 space-y-3">
                    <p className="text-sm font-semibold text-[#1F4D36]">Servicios adicionales</p>
                    <label className="flex items-center justify-between gap-3 cursor-pointer">
                      <div>
                        <p className="text-sm text-gray-700">Servicio de limpieza</p>
                        <p className="text-xs text-gray-400">Limpieza completa al finalizar</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#C9A66B]">Gs. 150.000</span>
                        <input type="checkbox" checked={form.limpieza}
                          onChange={e => setForm(p => ({ ...p, limpieza: e.target.checked }))}
                          className="w-5 h-5 accent-[#1F4D36] cursor-pointer rounded" />
                      </div>
                    </label>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm text-gray-700">Cubiertos adicionales</p>
                        <p className="text-xs text-gray-400">Set extra — Gs. 20.000 c/u</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setForm(p => ({ ...p, cubiertosCant: Math.max(0, p.cubiertosCant - 1) }))}
                          className="w-7 h-7 rounded-full bg-white border border-[#EAE2D4] text-[#1F4D36] font-bold text-lg flex items-center justify-center hover:bg-[#1F4D36] hover:text-white transition-colors">−</button>
                        <span className="w-6 text-center text-sm font-semibold text-[#1F4D36]">{form.cubiertosCant}</span>
                        <button onClick={() => setForm(p => ({ ...p, cubiertosCant: p.cubiertosCant + 1 }))}
                          className="w-7 h-7 rounded-full bg-white border border-[#EAE2D4] text-[#1F4D36] font-bold text-lg flex items-center justify-center hover:bg-[#1F4D36] hover:text-white transition-colors">+</button>
                      </div>
                    </div>
                  </div>

                  {/* Facturación */}
                  <div className="border border-[#EAE2D4] rounded-2xl p-4 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked={form.factura}
                        onChange={e => setForm(p => ({ ...p, factura: e.target.checked }))}
                        className="w-5 h-5 accent-[#1F4D36] rounded" />
                      <div>
                        <p className="text-sm font-semibold text-[#1F4D36]">Solicitar factura</p>
                        <p className="text-xs text-gray-400">Para empresas o personas que necesiten comprobante</p>
                      </div>
                    </label>
                    {form.factura && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        className="grid grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-xs font-medium text-[#1F4D36] mb-1">RUC</label>
                          <input type="text" placeholder="00000000-0" value={form.ruc}
                            onChange={e => setForm(p => ({ ...p, ruc: e.target.value }))}
                            className="w-full border border-[#EAE2D4] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1F4D36]" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#1F4D36] mb-1">Razón social</label>
                          <input type="text" placeholder="Nombre empresa" value={form.razonSocial}
                            onChange={e => setForm(p => ({ ...p, razonSocial: e.target.value }))}
                            className="w-full border border-[#EAE2D4] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#1F4D36]" />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1F4D36] mb-1.5">Mensaje adicional (opcional)</label>
                    <textarea placeholder="Contanos más detalles..." rows={2} value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full border border-[#EAE2D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1F4D36] resize-none" />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(1)}
                      className="px-6 py-3 border border-[#EAE2D4] rounded-xl text-sm text-gray-500 hover:bg-[#F5F0E8] transition-colors">
                      Atrás
                    </button>
                    <button
                      disabled={!form.name || !form.phone || !form.email || !form.eventType}
                      onClick={() => setStep(3)}
                      className="flex-1 bg-[#1F4D36] disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl hover:bg-[#163826] transition-colors disabled:text-gray-400">
                      Revisar reserva →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 — confirmar */}
              {step === 3 && (
                <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-[#EAE2D4] rounded-2xl p-6 space-y-6">

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[#F5F0E8] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-[#1F4D36]" />
                    </div>
                    <h3 className="text-[#1F4D36] text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Revisá tu reserva
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">Confirmá los detalles y enviá por WhatsApp</p>
                  </div>

                  <div className="bg-[#F5F0E8] rounded-xl p-5 space-y-3 text-sm">
                    {([
                      ["Fecha", selectedDate ? formatDate(selectedDate) : ""],
                      ["Horario", selectedTime!],
                      ["Nombre", form.name],
                      ["Teléfono", form.phone],
                      ["Email", form.email],
                      ["Evento", form.eventType],
                      form.guests ? ["Invitados", form.guests] : null,
                    ].filter(Boolean) as [string, string][]).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-gray-500">{k}:</span>
                        <span className="font-semibold text-[#1F4D36]">{v}</span>
                      </div>
                    ))}

                    {(form.limpieza || form.cubiertosCant > 0) && (
                      <div className="border-t border-[#EAE2D4] pt-3 space-y-2">
                        <p className="text-xs font-semibold text-[#1F4D36] uppercase tracking-wider">Extras</p>
                        {form.limpieza && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Limpieza</span>
                            <span className="font-semibold text-[#C9A66B]">Gs. 150.000</span>
                          </div>
                        )}
                        {form.cubiertosCant > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Cubiertos x{form.cubiertosCant}</span>
                            <span className="font-semibold text-[#C9A66B]">
                              Gs. {(form.cubiertosCant * 20000).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {extrasTotal > 0 && (
                          <div className="flex justify-between border-t border-[#EAE2D4] pt-2">
                            <span className="font-semibold text-[#1F4D36]">Total extras</span>
                            <span className="font-bold text-[#1F4D36]">Gs. {extrasTotal.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {form.factura && (
                      <div className="border-t border-[#EAE2D4] pt-3 text-xs text-gray-400">
                        Factura: RUC {form.ruc} — {form.razonSocial}
                      </div>
                    )}
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                    Al confirmar, se requiere el <strong>50% de seña</strong> por transferencia a Banco UENO · Cta. 18482189 · Juan D. Figueredo. El saldo restante se abona al ingresar.
                  </div>

                  <button onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BE5A] text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#25D366]/25 hover:-translate-y-0.5 text-lg">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Confirmar por WhatsApp
                  </button>

                  <button onClick={() => setStep(2)} className="w-full py-3 text-sm text-gray-400 hover:text-[#1F4D36] transition-colors">
                    Volver a editar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
