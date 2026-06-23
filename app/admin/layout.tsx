"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Calendar, Trophy, BarChart3,
  Newspaper, ImageIcon, Users, Building2,
  Settings, LogOut, Bell, ChevronRight,
} from "lucide-react";

const navGroups = [
  {
    label: "Main",
    items: [
      { label: "Overview",  href: "/admin/dashboard",  icon: LayoutDashboard },
      { label: "Fixtures",  href: "/admin/fixtures",   icon: Calendar },
      { label: "Results",   href: "/admin/results",    icon: Trophy },
      { label: "Standings", href: "/admin/standings",  icon: BarChart3 },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "News",    href: "/admin/news",    icon: Newspaper },
      { label: "Gallery", href: "/admin/gallery", icon: ImageIcon },
      { label: "Teams",   href: "/admin/teams",   icon: Users },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Sponsors", href: "/admin/sponsors", icon: Building2 },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

const mobileNav = [
  { label: "Home",     href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Fixtures", href: "/admin/fixtures",  icon: Calendar },
  { label: "News",     href: "/admin/news",      icon: Newspaper },
  { label: "Gallery",  href: "/admin/gallery",   icon: ImageIcon },
  { label: "Settings", href: "/admin/settings",  icon: Settings },
];

const pageTitles: Record<string, string> = {
  "/admin/dashboard":  "Overview",
  "/admin/fixtures":   "Fixtures",
  "/admin/results":    "Results",
  "/admin/standings":  "Standings",
  "/admin/news":       "News",
  "/admin/gallery":    "Gallery",
  "/admin/teams":      "Teams",
  "/admin/sponsors":   "Sponsors",
  "/admin/settings":   "Settings",
};

function logout(router: ReturnType<typeof useRouter>) {
  document.cookie = "tfp-admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
  router.push("/admin/login");
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  const pageTitle = pageTitles[pathname] ?? "Admin";

  return (
    <div className="min-h-screen bg-[#080808]">

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-[240px] flex-col bg-[#0d0d0d] md:flex" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>

        {/* Logo area */}
        <div className="px-5 pt-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="font-display text-sm text-white">TFP</span>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-white">TFP Admin</p>
              <p className="font-sans text-[10px] text-gray-500">2026 Season</p>
            </div>
          </div>
        </div>

        <div className="mx-4 mb-4 h-px bg-white/[0.06]" />

        {/* Nav groups */}
        <nav className="flex-1 overflow-hidden px-3 pb-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="mb-2 px-3 font-sans text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-sm transition-all duration-150 ${
                        active
                          ? "bg-primary/[0.12] text-white"
                          : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
                      }`}
                    >
                      {/* Active left accent */}
                      {active && (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                      )}
                      <Icon
                        className={`h-[17px] w-[17px] shrink-0 transition-colors ${
                          active ? "text-primary" : "text-gray-600 group-hover:text-gray-300"
                        }`}
                      />
                      <span className="flex-1">{item.label}</span>
                      {active && <ChevronRight className="h-3 w-3 text-primary/50" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom: admin profile (click to logout) */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="p-3">
          <button
            onClick={() => logout(router)}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-150 hover:bg-red-500/10"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/20 font-display text-xs text-primary group-hover:bg-red-500/20 transition-colors">
              A
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="font-sans text-xs font-semibold text-white group-hover:text-red-400 transition-colors">Admin</p>
              <p className="truncate font-sans text-[10px] text-gray-500">admin@tfp.com</p>
            </div>
            <LogOut className="h-[15px] w-[15px] shrink-0 text-gray-600 group-hover:text-red-400 transition-colors" />
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="md:ml-[240px]">

        {/* Mobile top bar */}
        <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-4 py-3 md:hidden" style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <span className="font-display text-xs text-white">TFP</span>
            </div>
            <span className="font-sans text-sm font-semibold text-white">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary" />
            </button>
          </div>
        </header>

        {/* Desktop header bar */}
        <header className="hidden items-center justify-between px-6 py-3.5 md:flex" style={{ background: "#0d0d0d", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-sm">
            <span className="text-gray-500">Admin</span>
            <ChevronRight className="h-3.5 w-3.5 text-gray-700" />
            <span className="font-semibold text-white">{pageTitle}</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button className="relative text-gray-400 transition-colors hover:text-white">
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 pb-24 pt-20 md:px-6 md:pb-8 md:pt-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden" style={{ background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {mobileNav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-3 transition-colors ${
                active ? "text-primary" : "text-gray-600"
              }`}
            >
              <Icon className="h-[20px] w-[20px]" />
              <span className="font-sans text-[9px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
