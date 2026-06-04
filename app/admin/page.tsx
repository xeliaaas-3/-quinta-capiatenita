"use client";
import { useEffect, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import { Calendar, Clock, Users, Phone, Mail, Trash2, ChevronDown, RefreshCw } from "lucide-react";
import type { Reservation, ReservationStatus } from "@/lib/store";

const STATUS_CONFIG: Record<ReservationStatus, { label: string; classes: string; dot: string }> = {
  pendiente:  { label: "Pendiente",  classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",  dot: "bg-amber-400"  },
  confirmada: { label: "Confirmada", classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
  cancelada:  { label: "Cancelada",  classes: "bg-red-500/10 text-red-400 border-red-500/20",        dot: "bg-red-400"   },
};

function StatusBadge({ status }: { status: ReservationStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function StatusDropdown({ reservation, onUpdate }: { reservation: Reservation; onUpdate: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function changeStatus(status: ReservationStatus) {
    setLoading(true);
    setOpen(false);
    await fetch(`/api/admin/reservations/${reservation.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLoading(false);
    onUpdate();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
      >
        <StatusBadge status={reservation.status} />
        <ChevronDown size={13} className="text-white/40" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[#1A2E22] border border-white/10 rounded-xl shadow-2xl z-20 min-w-[150px] py-1">
          {(Object.keys(STATUS_CONFIG) as ReservationStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => changeStatus(s)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-white/5 transition-colors"
            >
              <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[s].dot}`} />
              <span className="text-white/70">{STATUS_CONFIG[s].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ReservationStatus | "todas">("todas");
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/reservations");
    const data = await res.json();
    setReservations(data.reverse());
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta reserva?")) return;
    setDeleting(id);
    await fetch(`/api/admin/reservations/${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  }

  const counts = {
    todas: reservations.length,
    pendiente: reservations.filter((r) => r.status === "pendiente").length,
    confirmada: reservations.filter((r) => r.status === "confirmada").length,
    cancelada: reservations.filter((r) => r.status === "cancelada").length,
  };

  const filtered = filter === "todas" ? reservations : reservations.filter((r) => r.status === filter);

  const statCards = [
    { label: "Total", value: counts.todas, color: "text-white" },
    { label: "Pendientes", value: counts.pendiente, color: "text-amber-400" },
    { label: "Confirmadas", value: counts.confirmada, color: "text-emerald-400" },
    { label: "Canceladas", value: counts.cancelada, color: "text-red-400" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 overflow-auto pt-20 md:pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Reservas
            </h1>
            <p className="text-white/40 text-sm mt-1">Gestión de solicitudes y reservas</p>
          </div>
          <button
            onClick={load}
            className="flex items-center gap-2 text-white/40 hover:text-white text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Actualizar
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, color }) => (
            <div key={label} className="bg-white/5 border border-white/5 rounded-2xl p-5">
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-2">{label}</p>
              <p className={`text-3xl font-bold ${color}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["todas", "pendiente", "confirmada", "cancelada"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                filter === f
                  ? "bg-[#1F4D36] text-white"
                  : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
              }`}
            >
              {f === "todas" ? "Todas" : STATUS_CONFIG[f].label}
              <span className={`ml-2 text-xs ${filter === f ? "text-[#C9A66B]" : "text-white/20"}`}>
                {f === "todas" ? counts.todas : counts[f]}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center h-48 text-white/30">
            <RefreshCw size={24} className="animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <Calendar size={32} className="text-white/10 mb-3" />
            <p className="text-white/30 text-sm">No hay reservas en esta categoría</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  {/* Left: main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="text-white font-semibold">{r.name}</h3>
                      <StatusDropdown reservation={r} onUpdate={load} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-white/50">
                        <Calendar size={14} className="text-[#C9A66B] flex-shrink-0" />
                        <span>Día {r.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/50">
                        <Clock size={14} className="text-[#C9A66B] flex-shrink-0" />
                        <span>{r.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/50">
                        <Phone size={14} className="text-[#C9A66B] flex-shrink-0" />
                        <a href={`tel:${r.phone}`} className="hover:text-white transition-colors truncate">
                          {r.phone}
                        </a>
                      </div>
                      {r.email && (
                        <div className="flex items-center gap-2 text-white/50">
                          <Mail size={14} className="text-[#C9A66B] flex-shrink-0" />
                          <span className="truncate">{r.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 mt-3 flex-wrap">
                      {r.eventType && (
                        <span className="text-xs bg-[#1F4D36]/60 text-[#C9A66B] px-3 py-1 rounded-full">
                          {r.eventType}
                        </span>
                      )}
                      {r.guests && (
                        <span className="flex items-center gap-1.5 text-xs text-white/40">
                          <Users size={12} />
                          {r.guests} invitados
                        </span>
                      )}
                      <span className="text-xs text-white/20">
                        Recibido: {new Date(r.createdAt).toLocaleDateString("es-PY", {
                          day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                      </span>
                    </div>

                    {r.message && (
                      <p className="mt-3 text-xs text-white/30 italic border-l-2 border-white/10 pl-3">
                        {r.message}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={`https://wa.me/${r.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${r.name}, confirmamos tu reserva en Quinta Capiateñita para el día ${r.date} (${r.time}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] text-xs font-medium px-3 py-2 rounded-xl transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deleting === r.id}
                      className="p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
