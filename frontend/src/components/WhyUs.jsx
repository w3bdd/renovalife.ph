import { Reveal, SectionHead } from "./Reveal";
import { WHY, IMAGES } from "../lib/content";

const WhyUs = () => (
  <section id="why" className="bg-tint py-24 lg:py-36" data-testid="why-section">
    <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-12 lg:px-8">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionHead
            eyebrow="Why RenovaLife"
            title={<>You are <span className="italic text-sage">cared for</span> here.</>}
            sub="Dialysis becomes a significant part of life. We built a center that honors that — before, during, and after every treatment."
          />
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-3xl border border-line shadow-[0_32px_64px_-32px_rgba(11,30,34,0.35)]">
              <img
                src={IMAGES.lounge}
                alt="RenovaLife modern facility interior"
                className="h-72 w-full object-cover transition-transform duration-700 hover:scale-105"
                data-testid="why-image"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="lg:col-span-7">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.06}>
            <div
              className="group flex gap-6 border-t border-line py-8 transition-all duration-300 hover:pl-4 md:gap-10"
              data-testid={`why-item-${i + 1}`}
            >
              <span className="font-mono text-sm font-semibold text-cerulean">0{i + 1}</span>
              <div>
                <h3 className="font-serif text-xl font-semibold text-ink transition-colors duration-300 group-hover:text-tide md:text-2xl">
                  {w.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone2 md:text-base">{w.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;
