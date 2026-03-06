"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Veille Livres
        </Link>

        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${open ? "nav-links--open" : ""}`}>
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "nav-link--active" : ""}`}
            onClick={() => setOpen(false)}
          >
            Cette semaine
          </Link>
          <Link
            href="/archives"
            className={`nav-link ${pathname.startsWith("/archives") ? "nav-link--active" : ""}`}
            onClick={() => setOpen(false)}
          >
            Archives
          </Link>
        </div>
      </div>
    </nav>
  );
}
