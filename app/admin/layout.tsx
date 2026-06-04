import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin — Quinta Capiateñita",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0D1F16]">{children}</div>;
}
