import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, ShieldCheck, Award, BedDouble } from "lucide-react";
import VitalFlow from "./VitalFlow";
import { scrollToId } from "../lib/scroll";
import { IMAGES } from "../lib/content";

const EASE = [0.215, 0.61, 0.355, 1];

const MaskLine = ({ children, delay = 0 }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const FloatCard = ({ icon: Icon, text, className, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: EASE }}
    className={`absolute z-10 ${className}`}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
      className="flex items-center gap-2.5 rounded-2xl border border-line bg-white/85 px-4 py-3 shadow-[0_12px_32px_-16px_rgba(11,30,34,0.3)] backdrop-blur-md"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-light text-sage">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="text-xs font-semibold text-ink">{text}</span>
    </motion.div>
  </motion.div>
);

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-28 lg:min-h-screen lg:pt-32" data-testid="hero-section">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <VitalFlow />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-28">
        <motion.div style={{ opacity: fade }} className="flex flex-col justify-center lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-cerulean"
            data-testid="hero-eyebrow"
          >
            <span className="h-px w-10 bg-cerulean" />
            Angeles City · Pampanga
          </motion.p>

          <h1 className="font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-6xl" data-testid="hero-heading">
            <MaskLine delay={0.15}>Renewing Lives.</MaskLine>
            <MaskLine delay={0.3}>
              <span className="italic text-tide">Restoring Hope.</span>
            </MaskLine>
            <MaskLine delay={0.45}>
              Delivering <span className="italic text-sage">Quality Care.</span>
            </MaskLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
            className="mt-7 max-w-xl text-base leading-relaxed text-stone2 md:text-lg"
            data-testid="hero-subtext"
          >
            Compassionate dialysis care designed around your health, dignity, comfort, and
            quality of life — because every treatment is an opportunity for renewal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToId("#appointment")}
              data-testid="hero-schedule-button"
              className="group flex items-center gap-2.5 rounded-full bg-tide px-7 py-4 text-sm font-semibold text-silk transition-all duration-300 hover:bg-tide-dark hover:shadow-[0_16px_40px_-12px_rgba(14,75,86,0.55)]"
            >
              Talk to Our Care Team
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToId("#services")}
              data-testid="hero-explore-button"
              className="rounded-full border border-tide/25 px-7 py-4 text-sm font-semibold text-tide transition-all duration-300 hover:border-tide hover:bg-ice"
            >
              Explore Our Services
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.15 }}
            className="mt-14 flex flex-wrap gap-x-8 gap-y-3"
            data-testid="hero-trust-markers"
          >
            {["PhilHealth Benefit Support", "DOH-Compliant Protocols", "Patient-First Care Team"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-xs font-medium text-stone2">
                <ShieldCheck className="h-4 w-4 text-sage" strokeWidth={2} />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            className="relative"
          >
            <div className="overflow-hidden rounded-t-[10rem] rounded-b-[2rem] border border-line shadow-[0_40px_80px_-40px_rgba(11,30,34,0.45)]">
              <motion.img
                style={{ y: imgY, scale: 1.15 }}
                src={IMAGES.hero}
                alt="Compassionate care at RenovaLife Dialysis Center"
                className="h-[420px] w-full object-cover lg:h-[560px]"
                data-testid="hero-image"
              />
            </div>
            <FloatCard icon={Award} text="PhilHealth Accredited" className="-left-4 top-16 lg:-left-10" delay={1.2} />
            <FloatCard icon={BedDouble} text="15–20 Treatment Stations" className="-right-3 bottom-24 lg:-right-6" delay={1.45} />
            <FloatCard icon={ShieldCheck} text="Infection-Safe Protocols" className="left-6 -bottom-5" delay={1.7} />
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={() => scrollToId("#manifesto")}
        data-testid="hero-scroll-hint"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-stone2 lg:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </motion.button>
    </section>
  );
};

export default Hero;
