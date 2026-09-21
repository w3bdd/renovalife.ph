import { Quote } from "lucide-react";
import { Reveal, SectionHead } from "./Reveal";
import { TESTIMONIALS } from "../lib/content";

const Testimonials = () => (
  <section id="stories" className="bg-sage-light/40 py-24 lg:py-36" data-testid="testimonials-section">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <SectionHead
        eyebrow="Patient Voices"
        title={<>Stories of <span className="italic text-sage">renewed hope.</span></>}
        sub="Sample testimonials shown for this concept website — real patient stories will be shared here with proper consent."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure
              className="flex h-full flex-col justify-between rounded-3xl border border-sage/15 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(46,139,87,0.3)]"
              data-testid={`testimonial-card-${i + 1}`}
            >
              <div>
                <Quote className="h-8 w-8 text-sage/40" strokeWidth={1.5} />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-sage">{t.label}</p>
                <blockquote className="mt-4 font-serif text-xl leading-relaxed text-ink">“{t.quote}”</blockquote>
              </div>
              <figcaption className="mt-8 border-t border-line pt-5">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="mt-0.5 text-xs text-stone2">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
