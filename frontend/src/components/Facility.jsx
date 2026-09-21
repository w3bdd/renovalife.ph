import { Reveal, SectionHead } from "./Reveal";
import { FACILITY } from "../lib/content";

const SPECS = ["Reverse-Osmosis Water System", "Infection-Control Protocols", "Emergency Preparedness", "Fully Accessible Facilities"];

const Facility = () => (
  <section id="facility" className="bg-ink py-24 lg:py-36" data-testid="facility-section">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <SectionHead
        dark
        eyebrow="Inside the Center"
        title={<>A facility designed around <span className="italic text-sage-light">safety & comfort.</span></>}
        sub="Every square meter — from the treatment floor to the water-treatment room — exists to make long treatment hours feel lighter."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FACILITY.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="group relative overflow-hidden rounded-3xl border border-silk/10" data-testid={`facility-card-${f.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
              <img
                src={f.img}
                alt={f.title}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage-light">0{i + 1}</p>
                <h3 className="mt-1.5 font-serif text-xl font-semibold text-silk">{f.title}</h3>
                <p className="mt-1 text-xs text-silk/60">{f.spec}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 flex flex-wrap gap-3" data-testid="facility-specs">
          {SPECS.map((s) => (
            <span key={s} className="rounded-full border border-silk/15 px-5 py-2.5 font-mono text-xs text-silk/70 transition-colors duration-300 hover:border-sage-light/50 hover:text-sage-light">
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

export default Facility;
