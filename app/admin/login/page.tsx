"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Contraseña incorrecta");
    }
  }

  return (
    <div className="min-h-screen bg-[#0D1F16] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-[#1F4D36] border border-[#C9A66B]/30 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-[#C9A66B]" />
          </div>
          <h1
            className="text-white text-2xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Panel de Administración
          </h1>
          <p className="text-white/40 text-sm mt-1">Quinta Capiateñita</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/60 text-xs font-medium mb-2 tracking-wider uppercase">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresá tu contraseña"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[#C9A66B]/50 transition-colors text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A66B] hover:bg-[#B8935A] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="text-center text-white/20 text-xs mt-8">
          Contraseña por defecto en desarrollo: <code className="text-white/40">admin1234</code>
          <br />
          Configurá <code className="text-white/40">ADMIN_PASSWORD</code> en <code className="text-white/40">.env.local</code>
        </p>
      </div>
    </div>
  );
}
