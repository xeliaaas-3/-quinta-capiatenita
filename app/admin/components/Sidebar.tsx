"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Image as ImageIcon, LogOut, ExternalLink, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Reservas" },
  { href: "/admin/fotos", icon: ImageIcon, label: "Fotos" },
];

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-7 border-b border-white/5 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-base leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Quinta Capiateñita
          </p>
          <p className="text-[#C9A66B] text-xs mt-0.5 tracking-wider">Panel de Administración</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-white/40 hover:text-white md:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active ? "bg-[#1F4D36] text-white" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}>
              <Icon size={17} className={active ? "text-[#C9A66B]" : ""} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-5 border-t border-white/5 space-y-1">
        <a href="/" target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
          <ExternalLink size={17} />
          Ver sitio web
        </a>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <LogOut size={17} />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0A1710] border-b border-white/5 flex items-center px-4 h-14">
        <button onClick={() => setOpen(true)} className="text-white/60 hover:text-white mr-4">
          <Menu size={22} />
        </button>
        <p className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
          Quinta Capiateñita
        </p>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-[#0A1710] h-full shadow-2xl">
            <NavContent onClose={() => setOpen(false)} />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 min-h-screen bg-[#0A1710] border-r border-white/5 flex-col">
        <NavContent />
      </aside>
    </>
  );
}
