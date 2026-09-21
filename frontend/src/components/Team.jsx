import { Reveal, SectionHead } from "./Reveal";
import { LEADERS, TEAM } from "../lib/content";

const Team = () => (
  <section id="team" className="py-24 lg:py-36" data-testid="team-section">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <SectionHead
        eyebrow="Our People"
        title={<>Led by physicians. <span className="italic text-tide">Powered by compassion.</span></>}
        sub="A team of qualified renal-care professionals — guided by the philosophy: Patient First · Quality Always · Hope Every Day."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {LEADERS.map((l, i) => (
          <Reveal key={l.name} delay={i * 0.08}>
            <div
              className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-8 transition-all duration-300 hover:border-tide/40 hover:shadow-[0_24px_48px_-24px_rgba(14,75,86,0.25)] md:p-10"
              data-testid={`leader-card-${i + 1}`}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-tide font-serif text-2xl font-semibold text-silk transition-colors duration-300 group-hover:bg-sage">
                  {l.initials}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone2/70">Leadership 0{i + 1}</span>
              </div>
              <div className="mt-8">
                <h3 className="font-serif text-2xl font-semibold text-ink">{l.name}</h3>
                <p className="mt-1 font-mono text-xs text-cerulean">{l.creds}</p>
                <p className="mt-1 text-sm text-stone2">{l.role}</p>
              </div>
              <p className="mt-6 border-l-2 border-sage pl-4 font-serif text-lg italic leading-relaxed text-ink/80">
                “{l.quote}”
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        {TEAM.map((t, i) => (
          <Reveal key={t.name} delay={0.1 + i * 0.08}>
            <div className="group overflow-hidden rounded-3xl border border-line bg-white" data-testid={`team-card-${i + 1}`}>
              <div className="overflow-hidden">
                <img
                  src={t.img}
                  alt={t.name}
                  className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-ink">{t.name}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-stone2">{t.role}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Team;
