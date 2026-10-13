"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <a className="logo" href="#">FK<span>.</span></a>

      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label="Ouvrir le menu"
      >
        ☰
      </button>

      <nav className={open ? "nav open" : "nav"}>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
        <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
        <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
    </header>
  );
}
