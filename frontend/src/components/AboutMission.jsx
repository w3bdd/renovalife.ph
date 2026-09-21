import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, SectionHead } from "./Reveal";
import { MISSION, VISION, VALUES } from "../lib/content";

const TABS = ["Mission", "Vision", "Core Values"];

const AboutMission = () => {
  const [tab, setTab] = useState("Mission");

  return (
    <section id="about" className="py-24 lg:py-36" data-testid="about-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead
              eyebrow="About RenovaLife"
              title={<>A center built on <span className="italic text-tide">renewal.</span></>}
              sub="RenovaLife was founded on a simple belief: dialysis care should support not only the body's medical needs, but confidence, independence, and hope."
            />
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <div className="flex flex-wrap gap-2 rounded-full border border-line bg-white p-1.5 w-fit" data-testid="about-tabs">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    data-testid={`about-tab-${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                      tab === t ? "text-silk" : "text-stone2 hover:text-tide"
                    }`}
                  >
                    {tab === t && (
                      <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-tide" transition={{ duration: 0.35 }} />
                    )}
                    <span className="relative">{t}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 min-h-[280px] rounded-3xl border border-line bg-white p-8 md:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.35 }}
                  >
                    {tab === "Mission" && (
                      <p className="font-serif text-xl leading-relaxed text-ink md:text-2xl" data-testid="mission-text">“{MISSION}”</p>
                    )}
                    {tab === "Vision" && (
                      <p className="font-serif text-xl leading-relaxed text-ink md:text-2xl" data-testid="vision-text">“{VISION}”</p>
                    )}
                    {tab === "Core Values" && (
                      <div className="grid gap-4 sm:grid-cols-2" data-testid="values-grid">
                        {VALUES.map((v, i) => (
                          <div key={v.title} className="rounded-2xl bg-tint p-5">
                            <p className="flex items-baseline gap-3 font-semibold text-ink">
                              <span className="font-mono text-xs text-sage">{String(i + 1).padStart(2, "0")}</span>
                              {v.title}
                            </p>
                            <p className="mt-1.5 text-sm text-stone2">{v.desc}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
