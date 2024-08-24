import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    const particles = particlesRef.current.querySelectorAll(".particle");
    particles.forEach((particle) => {
      const size = Math.random() * 5 + 1 + "px";
      const duration = Math.random() * 10 + 5 + "s";
      const delay = Math.random() * 0.2 + "s";
      const posX = Math.random() * 100 + "vw";
      const posY = Math.random() * 100 + "vh";

      particle.style.width = size;
      particle.style.height = size;
      particle.style.left = posX;
      particle.style.top = posY;
      particle.style.animationDuration = duration;
      particle.style.animationDelay = delay;
    });
  }, []);

  const particlesArray = Array.from({ length: 60 });

  return (
    <div ref={particlesRef} className="particles-container">
      {particlesArray.map((_, index) => (
        <div key={index} className="particle"></div>
      ))}
    </div>
  );
};

export default ParticlesBackground;
