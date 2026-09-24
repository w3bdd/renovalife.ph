import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CalendarCheck, Loader2, MapPin, Phone, Mail } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { CONTACT, ENQUIRY_TYPES, SHIFTS } from "../lib/content";

// On full-stack deployments (VPS / Emergent) REACT_APP_BACKEND_URL is set and the
// form posts to the FastAPI backend. On static-only hosting (GitHub Pages without a
// backend) it gracefully falls back to a pre-filled email to the center.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  enquiry_type: "Regular Dialysis",
  shift_preference: "Morning",
  preferred_date: "",
  message: "",
};

const inputCls =
  "w-full rounded-xl border border-line bg-silk px-4 py-3 text-sm text-ink outline-none transition-all duration-300 placeholder:text-stone2/50 focus:border-tide focus:ring-2 focus:ring-tide/15";

const AppointmentForm = () => {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);

    if (!API) {
      const subject = encodeURIComponent(`Appointment Request — ${form.name}`);
      const body = encodeURIComponent(
        [
          `Name: ${form.name}`,
          `Phone: ${form.phone}`,
          `Email: ${form.email || "—"}`,
          `Help needed with: ${form.enquiry_type}`,
          `Preferred shift: ${form.shift_preference}`,
          `Preferred date: ${form.preferred_date || "—"}`,
          "",
          form.message || "",
        ].join("\n"),
      );
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
      toast.info("Opening your email app…", {
        description: "This deployment has no online backend, so your request will be sent by email instead.",
      });
      setSending(false);
      return;
    }

    try {
      const payload = { ...form };
      if (!payload.email) delete payload.email;
      if (!payload.preferred_date) delete payload.preferred_date;
      if (!payload.message) delete payload.message;
      const res = await axios.post(`${API}/enquiries`, payload);
      const refId = String(res.data.id || "").slice(-6).toUpperCase();
      toast.success("Request received — thank you.", {
        description: `Reference ${refId}. Our care team will reach out to you shortly.`,
      });
      setForm(EMPTY);
    } catch (err) {
      toast.error("We couldn't send your request.", {
        description: "Please try again, or call us directly at " + CONTACT.phone,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="appointment" className="bg-tint py-24 lg:py-36" data-testid="appointment-section">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-8">
        <div className="flex flex-col justify-center lg:col-span-5">
          <SectionHead
            eyebrow="Begin Your Journey"
            title={<>Need dialysis care? <span className="italic text-tide">Let's talk.</span></>}
            sub="Send us a request and our care team will contact you to discuss treatment, scheduling, PhilHealth coverage, or anything else on your mind."
          />
          <Reveal delay={0.15}>
            <div className="space-y-4" data-testid="appointment-contact-info">
              <p className="flex items-start gap-3 text-sm text-stone2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                {CONTACT.address}
              </p>
              <p className="flex items-center gap-3 text-sm text-stone2">
                <Phone className="h-4 w-4 shrink-0 text-sage" />
                {CONTACT.phone} · {CONTACT.mobile}
              </p>
              <p className="flex items-center gap-3 text-sm text-stone2">
                <Mail className="h-4 w-4 shrink-0 text-sage" />
                {CONTACT.email}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={submit}
            className="rounded-3xl border border-line bg-white p-7 shadow-[0_32px_64px_-40px_rgba(11,30,34,0.3)] md:p-10"
            data-testid="appointment-form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="apt-name" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone2">Full Name *</label>
                <input id="apt-name" required minLength={2} value={form.name} onChange={set("name")} placeholder="Juan Dela Cruz" className={inputCls} data-testid="appointment-name-input" />
              </div>
              <div>
                <label htmlFor="apt-phone" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone2">Phone Number *</label>
                <input id="apt-phone" required minLength={7} value={form.phone} onChange={set("phone")} placeholder="+63 917 000 0000" className={inputCls} data-testid="appointment-phone-input" />
              </div>
              <div>
                <label htmlFor="apt-email" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone2">Email</label>
                <input id="apt-email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} data-testid="appointment-email-input" />
              </div>
              <div>
                <label htmlFor="apt-date" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone2">Preferred Date</label>
                <input id="apt-date" type="date" value={form.preferred_date} onChange={set("preferred_date")} className={inputCls} data-testid="appointment-date-input" />
              </div>
              <div>
                <label htmlFor="apt-type" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone2">I Need Help With</label>
                <select id="apt-type" value={form.enquiry_type} onChange={set("enquiry_type")} className={inputCls} data-testid="appointment-type-select">
                  {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="apt-shift" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone2">Preferred Shift</label>
                <select id="apt-shift" value={form.shift_preference} onChange={set("shift_preference")} className={inputCls} data-testid="appointment-shift-select">
                  {SHIFTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="apt-message" className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-stone2">Message</label>
                <textarea id="apt-message" rows={4} value={form.message} onChange={set("message")} placeholder="Tell us anything that would help us care for you better…" className={`${inputCls} resize-none`} data-testid="appointment-message-input" />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              data-testid="appointment-submit-button"
              className="group mt-8 flex w-full items-center justify-center gap-2.5 rounded-full bg-tide px-8 py-4 text-sm font-semibold text-silk transition-all duration-300 hover:bg-tide-dark hover:shadow-[0_16px_40px_-12px_rgba(14,75,86,0.55)] disabled:opacity-60 sm:w-auto"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
              {sending ? "Sending…" : "Request an Appointment"}
            </button>
            <p className="mt-4 text-xs text-stone2">
              This is a request, not a confirmed booking — our team will confirm your schedule personally.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default AppointmentForm;
