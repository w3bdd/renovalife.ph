import { useEffect, useRef } from "react";

const VitalFlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.0035;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w * 0.68;
      const cy = h * 0.45;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        const base = Math.min(w, h) * (0.16 + i * 0.075);
        for (let a = 0; a <= Math.PI * 2 + 0.06; a += 0.04) {
          const r =
            base +
            Math.sin(a * 3 + t * 2 + i * 1.3) * base * 0.09 +
            Math.cos(a * 5 - t * 1.5 + i) * base * 0.05;
          const rot = t * 0.25 * (i % 2 === 0 ? 1 : -1);
          const x = cx + Math.cos(a + rot) * r;
          const y = cy + Math.sin(a + rot) * r;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = i % 2 === 0 ? "rgba(14,75,86,0.22)" : "rgba(46,139,87,0.25)";
        ctx.lineWidth = 1.1 * dpr;
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="h-full w-full" aria-hidden="true" />;
};

export default VitalFlow;
