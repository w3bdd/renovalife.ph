const PHRASES = [
  "Compassionate Dialysis Care",
  "Angeles City · Pampanga",
  "Ultra-Pure Water Filtration",
  "PhilHealth Accredited",
  "Human-Centered Healing",
  "Renewal · Hope · Quality Care",
];

const Row = () => (
  <div className="flex shrink-0 items-center">
    {PHRASES.map((p) => (
      <span key={p} className="flex items-center">
        <span className="whitespace-nowrap px-8 font-serif text-2xl font-medium italic text-tide/70 md:text-3xl">{p}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-sage" />
      </span>
    ))}
  </div>
);

const Marquee = () => (
  <div className="relative -rotate-1 border-y border-sage/20 bg-sage-light/60 py-5" data-testid="values-marquee">
    <div className="marquee-track flex w-max">
      <Row />
      <Row />
    </div>
  </div>
);

export default Marquee;
