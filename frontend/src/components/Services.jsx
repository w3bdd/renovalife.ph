import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { SERVICES } from "../lib/content";

const SPANS = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-6",
  "md:col-span-6",
];

const Services = () => (
  <section id="services" className="py-24 lg:py-36" data-testid="services-section">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <SectionHead
        eyebrow="Comprehensive Renal Care"
        title={<>Five ways we care for <span className="italic text-tide">the whole person.</span></>}
        sub="Not a long list of procedures — a complete circle of clinical, emotional, and practical support around your dialysis journey."
      />

      <div className="grid gap-5 md:grid-cols-12">
        {SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06} className={SPANS[i]}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className={`group flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-7 transition-colors duration-300 hover:border-tide/40 hover:shadow-[0_24px_48px_-24px_rgba(14,75,86,0.25)] md:p-8 ${
                i === 0 ? "bg-gradient-to-br from-white to-ice" : ""
              }`}
              data-testid={`service-card-${s.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tint text-tide transition-colors duration-300 group-hover:bg-tide group-hover:text-silk">
                    <s.icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-xs text-stone2/70">{s.n}</span>
                </div>
                <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-cerulean">{s.tag}</p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone2">{s.desc}</p>
              </div>
              {s.points && (
                <ul className="mt-6 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-ink/80">
                      <Check className="h-4 w-4 shrink-0 text-sage" strokeWidth={2.5} />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-tide opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Included in your care plan
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
