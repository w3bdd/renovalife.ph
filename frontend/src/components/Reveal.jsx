import { motion } from "framer-motion";

const EASE = [0.215, 0.61, 0.355, 1];

export const Reveal = ({ children, delay = 0, className = "", ...props }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    {...props}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children, dark = false }) => (
  <p className={`font-mono text-xs font-semibold uppercase tracking-[0.25em] ${dark ? "text-sage-light" : "text-cerulean"}`}>
    {children}
  </p>
);

export const SectionHead = ({ eyebrow, title, sub, dark = false, align = "left" }) => (
  <Reveal className={`mb-14 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
    <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
    <h2 className={`mt-4 font-serif text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl ${dark ? "text-silk" : "text-ink"}`}>
      {title}
    </h2>
    {sub && <p className={`mt-5 text-base leading-relaxed md:text-lg ${dark ? "text-sage-light/70" : "text-stone2"}`}>{sub}</p>}
  </Reveal>
);
