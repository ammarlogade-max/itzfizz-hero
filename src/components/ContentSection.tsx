"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CARDS = [
  { pct: "58%", label: "Increase in pick-up point usage",    desc: "More customers choosing convenient collection points."      },
  { pct: "23%", label: "Drop in support phone calls",         desc: "Self-service tracking reduces inbound support volume."      },
  { pct: "27%", label: "Faster first-attempt deliveries",     desc: "Smarter routing leads to fewer missed deliveries."          },
  { pct: "40%", label: "Reduction in last-mile costs",        desc: "Streamlined workflows cut overhead significantly."          },
];

export default function ContentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      // Heading reveal
      gsap.fromTo(
        ".content-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".content-heading", start: "top 88%" },
        }
      );

      // Cards — fromTo ensures end state (opacity:1) is always explicit.
      // gsap.from() sets opacity:0 on mount immediately; if ScrollTrigger
      // misfires the cards stay invisible. fromTo() guarantees the final
      // state so they always end up visible.
      gsap.fromTo(
        ".card",
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cards-container", start: "top 80%" },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-28 px-6 overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Subtle grid texture */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,255,255,0.03) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div className="content-heading mb-16 md:mb-20">
          <p className="mb-3 text-xs uppercase tracking-[0.45em] text-gray-500">
            Results that matter
          </p>
          <h2 className="font-black uppercase leading-[0.92] text-white"
            style={{ fontSize: "clamp(3.2rem, 8vw, 7rem)", letterSpacing: "0.03em" }}>
            Impact<br />
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)", color: "transparent" }}>
              Metrics
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((c, i) => (
            <div
              key={i}
              className="card group flex flex-col justify-between rounded-2xl p-8 md:p-10 cursor-default transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.04)",
                border    : "1px solid rgba(255,255,255,0.07)",
                minHeight : "260px",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background  = "rgba(255,255,255,0.08)";
                el.style.borderColor = "rgba(255,255,255,0.15)";
                el.style.transform   = "translateY(-4px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background  = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.transform   = "translateY(0)";
              }}
            >
              <p className="font-black tabular-nums text-white leading-none"
                style={{ fontSize: "clamp(3rem, 5.5vw, 4.5rem)" }}>
                {c.pct}
              </p>

              <div className="mt-auto pt-6">
                <div className="mb-3 h-px w-8 transition-all duration-500 group-hover:w-12"
                  style={{ background: "rgba(255,255,255,0.25)" }} />
                <p className="text-white font-semibold text-sm leading-snug mb-2">{c.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.15)" }}>
          Based on average client outcomes · 2023–2024
        </p>

      </div>
    </section>
  );
}