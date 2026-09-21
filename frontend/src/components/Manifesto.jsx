import { Reveal, SectionHead } from "./Reveal";
import { MANIFESTO } from "../lib/content";

const Manifesto = () => (
  <section id="manifesto" className="relative bg-ink py-24 lg:py-36" data-testid="manifesto-section">
    <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-12 lg:px-8">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <SectionHead
            dark
            eyebrow="Our Manifesto"
            title={<>Care beyond the <span className="italic text-sage-light">dialysis machine.</span></>}
            sub="Three beliefs shape everything we do at RenovaLife — written down, and lived out every single day."
          />
        </div>
      </div>

      <div className="lg:col-span-8">
        {MANIFESTO.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.08}>
            <div
              className="group grid gap-6 border-t border-silk/10 py-12 transition-colors duration-500 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-10"
              data-testid={`manifesto-chapter-${c.n}`}
            >
              <div className="md:col-span-4">
                <span className="text-outline font-serif text-7xl font-bold leading-none transition-all duration-500 group-hover:[-webkit-text-stroke-color:rgba(216,239,228,0.8)] lg:text-8xl">
                  {c.n}
                </span>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-serif text-2xl font-semibold text-silk md:text-3xl">{c.title}</h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-silk/60">{c.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Manifesto;
