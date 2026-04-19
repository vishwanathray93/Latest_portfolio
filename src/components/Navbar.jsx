import { useEffect, useState } from "react";

const NAV_LINKS = [
  "Home",
  "About",
  "Skills",
  "Experience",
  "Education",
  "Projects",
  "Achievements",
  "Interests",
  "Contact",
];

export default function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item) => {
    setActive(item);
    setMenuOpen(false);
    document
      .getElementById(item.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="logo-wrap">
          <button
            className="logo-button"
            onClick={() => handleNavClick("Home")}
            aria-label="Go to home"
          >
            VR
          </button>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((item) => (
            <button
              key={item}
              className={`nav-link ${active === item ? "active" : ""}`}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}