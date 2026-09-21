import { useEffect, useState } from "react";
import { Leaf, Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToId } from "../lib/scroll";

const LINKS = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "Facility", href: "#facility" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(href);
  };

  return (
    <>
      <header
        data-testid="site-navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-silk/85 shadow-[0_1px_0_0_#E2E8E8] backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" onClick={(e) => go(e, "#top")} className="flex items-center gap-3" data-testid="nav-brand-link">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-tide text-silk">
              <Leaf className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="leading-none">
              <span className="block font-serif text-xl font-semibold tracking-tight text-ink">RenovaLife</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.3em] text-stone2">Dialysis Center</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" data-testid="nav-desktop-menu">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-ink/70 transition-colors duration-300 hover:text-tide"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <span className="hidden items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 font-mono text-[11px] text-stone2 xl:flex" data-testid="nav-hours-badge">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sage" />
              Open Today · 6 AM – 10 PM
            </span>
            <button
              onClick={(e) => go(e, "#appointment")}
              data-testid="nav-schedule-button"
              className="group flex items-center gap-2 rounded-full bg-tide px-5 py-2.5 text-sm font-semibold text-silk transition-all duration-300 hover:bg-tide-dark hover:shadow-[0_8px_24px_-8px_rgba(14,75,86,0.6)]"
            >
              Schedule a Visit
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <button
            className="rounded-full border border-line p-2.5 text-ink lg:hidden"
            onClick={() => setOpen(true)}
            data-testid="nav-mobile-open-button"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 py-6" data-testid="nav-mobile-menu">
          <div className="flex items-center justify-between">
            <span className="font-serif text-xl font-semibold text-silk">RenovaLife</span>
            <button onClick={() => setOpen(false)} className="rounded-full border border-silk/20 p-2.5 text-silk" data-testid="nav-mobile-close-button" aria-label="Close menu">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-6">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="font-serif text-4xl font-medium text-silk transition-colors hover:text-sage-light"
              >
                <span className="mr-4 font-mono text-sm text-sage-light/60">0{i + 1}</span>
                {l.label}
              </a>
            ))}
            <button
              onClick={(e) => go(e, "#appointment")}
              className="mt-8 w-fit rounded-full bg-sage px-8 py-4 font-semibold text-white"
              data-testid="nav-mobile-schedule-button"
            >
              Schedule a Visit
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
