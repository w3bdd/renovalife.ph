import { Leaf, MapPin, Phone, Mail, Clock, HeartPulse } from "lucide-react";
import { CONTACT } from "../lib/content";
import { scrollToId } from "../lib/scroll";

const NAV = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Services", href: "#services" },
  { label: "Why RenovaLife", href: "#why" },
  { label: "Our Facility", href: "#facility" },
  { label: "Our Team", href: "#team" },
  { label: "Patient FAQ", href: "#faq" },
];

const Footer = () => (
  <footer className="bg-ink text-silk" data-testid="site-footer">
    <div className="border-y border-silk/10 bg-tide/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 lg:px-8">
        <p className="flex items-center gap-3 text-sm font-medium" data-testid="footer-emergency-banner">
          <HeartPulse className="h-5 w-5 text-sage-light" />
          Urgent concern? Call our care team at <span className="font-semibold text-sage-light">{CONTACT.phone}</span>
        </p>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-silk/60">Mon – Sat · 6 AM – 10 PM</span>
      </div>
    </div>

    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8 lg:py-20">
      <div className="lg:col-span-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-white">
            <Leaf className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span className="leading-none">
            <span className="block font-serif text-2xl font-semibold">RenovaLife</span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.3em] text-silk/50">Dialysis Center</span>
          </span>
        </div>
        <p className="mt-6 max-w-xs font-serif text-lg italic leading-relaxed text-silk/70">
          Renewing Lives. Restoring Hope. Delivering Quality Care.
        </p>
      </div>

      <div className="lg:col-span-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-sage-light">Visit Us</p>
        <ul className="mt-5 space-y-4 text-sm text-silk/70">
          <li className="flex items-start gap-3" data-testid="footer-address"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage-light/70" />{CONTACT.address}</li>
          <li className="flex items-center gap-3" data-testid="footer-phone"><Phone className="h-4 w-4 shrink-0 text-sage-light/70" />{CONTACT.phone} · {CONTACT.mobile}</li>
          <li className="flex items-center gap-3" data-testid="footer-email"><Mail className="h-4 w-4 shrink-0 text-sage-light/70" />{CONTACT.email}</li>
          <li className="flex items-start gap-3" data-testid="footer-hours"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-sage-light/70" />{CONTACT.hours}<br />{CONTACT.sunday}</li>
        </ul>
      </div>

      <div className="lg:col-span-2">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-sage-light">Explore</p>
        <ul className="mt-5 space-y-3">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                onClick={(e) => { e.preventDefault(); scrollToId(n.href); }}
                className="text-sm text-silk/70 transition-colors duration-300 hover:text-sage-light"
                data-testid={`footer-link-${n.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-sage-light">Start Here</p>
        <p className="mt-5 text-sm leading-relaxed text-silk/70">
          Whether you're beginning dialysis or exploring a transfer, the first step is a simple conversation.
        </p>
        <button
          onClick={() => scrollToId("#appointment")}
          data-testid="footer-schedule-button"
          className="mt-6 rounded-full bg-sage px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#25744a]"
        >
          Request an Appointment
        </button>
      </div>
    </div>

    <div className="border-t border-silk/10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 lg:px-8">
        <p className="text-xs text-silk/40">© 2026 RenovaLife Dialysis Center. All rights reserved.</p>
        <p className="max-w-md text-right text-[11px] leading-relaxed text-silk/30" data-testid="footer-disclaimer">
          Fictional concept website for development purposes. Contact details shown are illustrative.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
