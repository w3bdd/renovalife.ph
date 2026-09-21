import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Manifesto from "./components/Manifesto";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import AboutMission from "./components/AboutMission";
import Facility from "./components/Facility";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import AppointmentForm from "./components/AppointmentForm";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="bg-silk font-sans text-ink antialiased">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Manifesto />
        <Services />
        <WhyUs />
        <AboutMission />
        <Facility />
        <Team />
        <Testimonials />
        <Faq />
        <AppointmentForm />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
