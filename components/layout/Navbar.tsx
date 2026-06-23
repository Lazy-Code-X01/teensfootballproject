"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/context/ModalContext";

const navLinks = [
  { label: "Home", href: "/", activeFor: [] as string[] },
  { label: "About", href: "/about", activeFor: [] as string[] },
  { label: "League", href: "/league", activeFor: [] as string[] },
  { label: "Media", href: "/media", activeFor: [] as string[] },
  { label: "Sponsors", href: "/sponsors", activeFor: [] as string[] },
  { label: "Impact", href: "/impact", activeFor: ["/stories"] },
  { label: "Contact", href: "/contact", activeFor: [] as string[] },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useModal();

  const isActive = (link: typeof navLinks[0]) => {
    if (link.href === "/") return pathname === "/";
    if (pathname === link.href || pathname.startsWith(link.href + "/")) return true;
    return link.activeFor.some((p) => pathname === p || pathname.startsWith(p + "/"));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/90 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display text-2xl tracking-wider text-primary-light">
              TFP
            </span>
            <span className="hidden sm:block text-sm font-semibold text-white/80 leading-tight">
              Teens Football<br />Project
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(link)
                      ? "text-primary-light"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal("trial")}
              className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md bg-primary hover:bg-primary-dark text-white transition-colors duration-200"
            >
              Join the League
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-dark/95 backdrop-blur-md border-t border-white/10`}
      >
        <ul className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive(link)
                    ? "text-primary-light bg-primary/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 pb-1">
            <button
              onClick={() => openModal("trial")}
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold rounded-md bg-primary hover:bg-primary-dark text-white transition-colors duration-200"
            >
              Join the League
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
