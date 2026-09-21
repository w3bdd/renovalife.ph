import { ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Reveal, SectionHead } from "./Reveal";
import { FAQS } from "../lib/content";
import { scrollToId } from "../lib/scroll";

const Faq = () => (
  <section id="faq" className="py-24 lg:py-36" data-testid="faq-section">
    <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-8">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionHead
            eyebrow="Patient Resources"
            title={<>Questions, answered with <span className="italic text-tide">care.</span></>}
            sub="Understanding dialysis is part of the journey. Here are the questions we hear most often from patients and families."
          />
          <Reveal delay={0.15}>
            <div className="rounded-3xl bg-tide p-8 text-silk" data-testid="faq-help-card">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sage-light">New to dialysis?</p>
              <h3 className="mt-3 font-serif text-2xl font-semibold">Let's walk through it together.</h3>
              <p className="mt-3 text-sm leading-relaxed text-silk/70">
                Our care team offers free orientation for new patients and families — no commitment needed.
              </p>
              <button
                onClick={() => scrollToId("#appointment")}
                data-testid="faq-talk-button"
                className="group mt-6 flex items-center gap-2 rounded-full bg-silk px-6 py-3 text-sm font-semibold text-tide transition-colors duration-300 hover:bg-sage-light"
              >
                Talk to Our Care Team
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="lg:col-span-7">
        <Reveal>
          <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-line" data-testid={`faq-accordion-item-${i + 1}`}>
                <AccordionTrigger className="py-6 text-left font-serif text-lg font-semibold text-ink hover:text-tide hover:no-underline md:text-xl">
                  <span className="mr-4 font-mono text-xs font-normal text-cerulean">0{i + 1}</span>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-10 text-sm leading-relaxed text-stone2 md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Faq;
