"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile =
      typeof window !== "undefined" && window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Baseline: always visible
      gsap.set(".hero-letter", { opacity: 1, y: 0 });
      gsap.set(".stat", { opacity: 1, y: 0 });

      // 1. HEADLINE — letters stagger up on load
      gsap.from(".hero-letter", {
        y: 50,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      });

      // 2. STATS — one by one after headline settles (no opacity tween)
      gsap.from(".stat", {
        y: 24,
        stagger: 0.15,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out",
      });

      // 3. CAR — rises in from below on load
      gsap.from(carRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        duration: 1.2,
        delay: 0.3,
        ease: "expo.out",
      });

      // 4. SCROLL — car drives off to the right
      gsap.to(carRef.current, {
        x: "85vw",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: isMobile ? "80% top" : "bottom top",
          scrub: isMobile ? 1 : 1.5,
        },
      });

      // No scroll-based fades for .hero-letter or .stat
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[180vh] md:h-[220vh] text-white overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #111 0%, #000 70%)",
      }}
    >
      {/* Tinted glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(0, 255, 200, 0.16) 0%, transparent 55%)," +
            "radial-gradient(circle at 10% 80%, rgba(0, 140, 255, 0.18) 0%, transparent 55%)," +
            "radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 55%)",
          mixBlendMode: "screen",
        }}
      />

      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center gap-0">
        {/* HEADLINE */}
        <h1
          className="relative z-10 text-center font-black uppercase select-none overflow-hidden"
          style={{ lineHeight: 1 }}
        >
          {/* Mobile: two lines "WELCOME" + "ITZFIZZ" */}
          <span className="inline-block md:hidden">
            {"WELCOME".split("").map((char, i) => (
              <span
                key={`m-top-${i}`}
                className="hero-letter inline-block"
                style={{
                  fontSize: "clamp(1.8rem, 7vw, 3rem)",
                  letterSpacing: char === " " ? "0.3em" : "0.18em",
                  color: "#ffffff",
                  willChange: "transform",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>

          <br className="block md:hidden" />

          <span className="inline-block md:hidden mt-1">
            {"ITZFIZZ".split("").map((char, i) => (
              <span
                key={`m-bottom-${i}`}
                className="hero-letter inline-block"
                style={{
                  fontSize: "clamp(1.8rem, 7vw, 3rem)",
                  letterSpacing: char === " " ? "0.3em" : "0.18em",
                  color: "#ffffff",
                  willChange: "transform",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>

          {/* Desktop / tablet: single-line lockup */}
          <span className="hidden md:inline-block">
            {"WELCOME  ITZFIZZ".split("").map((char, i) => (
              <span
                key={`d-${i}`}
                className="hero-letter inline-block"
                style={{
                  fontSize: "clamp(1.8rem, 5.5vw, 6.5rem)",
                  letterSpacing: char === " " ? "0.35em" : "0.2em",
                  color: "#ffffff",
                  willChange: "transform",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        {/* DIVIDER */}
        <div
          className="relative z-10 mt-6 md:mt-8 mb-6 md:mb-8"
          style={{
            width: "clamp(160px, 35vw, 420px)",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />

        {/* STATS */}
        <div className="relative z-10 flex flex-wrap justify-center gap-x-10 md:gap-x-12 gap-y-6 px-4 md:px-6">
          {[
            { pct: "58%", label: "Increase in pick‑up point usage" },
            { pct: "23%", label: "Drop in support phone calls" },
            { pct: "27%", label: "Faster first‑attempt deliveries" },
            { pct: "40%", label: "Reduction in last‑mile costs" },
          ].map((s, i) => (
            <div
              key={i}
              className="stat text-center"
              style={{ minWidth: "120px" }}
            >
              <p
                className="font-black tabular-nums leading-none text-white"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 3rem)" }}
              >
                {s.pct}
              </p>
              <p
                className="mt-1 text-gray-400"
                style={{
                  fontSize: "clamp(0.65rem, 1.1vw, 0.8rem)",
                  maxWidth: "130px",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Under-car highlight */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "min(80vw, 720px)",
            height: "120px",
            background:
              "radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 60%, #000000 100%)",
            opacity: 0.85,
          }}
        />

        {/* CAR */}
        <img
          ref={carRef}
          src="/car.png"
          alt="Car"
          className="car absolute bottom-0"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(260px, 60vw, 720px)",
            willChange: "transform",
            objectFit: "contain",
          }}
        />
      </div>
    </section>
  );
}
