import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const SERIF = 'Georgia, "Times New Roman", serif';

/* ── Star field (55 dots) ── */
function StarField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // inject a shared keyframe once
    if (!document.getElementById("twinkle-kf")) {
      const style = document.createElement("style");
      style.id = "twinkle-kf";
      style.textContent = `@keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.7}}`;
      document.head.appendChild(style);
    }

    for (let i = 0; i < 55; i++) {
      const dot = document.createElement("div");
      dot.style.cssText = `position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;top:${Math.random() * 100}%;left:${Math.random() * 100}%;animation:twinkle ${2 + Math.random() * 3}s ease-in-out infinite;animation-delay:${Math.random() * 4}s;opacity:.15;`;
      el.appendChild(dot);
    }

    return () => {
      while (el.firstChild) el.removeChild(el.firstChild);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />;
}

/* ── Orbit rings ── */
function OrbitRings() {
  return (
    <>
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 420, height: 420, top: -120, right: -100,
          border: "1px solid rgba(201,184,130,0.12)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 560, height: 560, top: -190, right: -170,
          border: "1px solid rgba(201,184,130,0.06)",
        }}
      />
    </>
  );
}

/* ── Animated score bar ── */
function ScoreBar({ label, points, max, index, animate }: { label: string; points: number; max: number; index: number; animate: boolean }) {
  const pct = (points / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground" style={{ minWidth: 120 }}>{label}</span>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
          style={{
            width: animate ? `${pct}%` : "0%",
            transitionDelay: `${index * 160}ms`,
          }}
        />
      </div>
      <span className="text-xs font-semibold text-primary" style={{ minWidth: 28, textAlign: "right" }}>
        {points}
      </span>
    </div>
  );
}

/* ── Main page ── */
const LandingPage = () => {
  const navigate = useNavigate();

  /* Intersection-based animations */
  const scoreRef = useRef<HTMLDivElement>(null);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const el = scoreRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setScoreVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!scoreVisible) return;
    const target = 100;
    const dur = 1500;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setCounter(Math.round(t * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scoreVisible]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const scoreBars = [
    { label: "Seniority gap", points: 30, max: 30 },
    { label: "Sector alignment", points: 25, max: 25 },
    { label: "Goal alignment", points: 25, max: 25 },
    { label: "Availability", points: 12, max: 12 },
    { label: "Company type", points: 8, max: 8 },
  ];

  return (
    <div className="flex flex-col">
      {/* ════════ HERO ════════ */}
      <section className="relative bg-nav py-24 px-6 overflow-hidden">
        <StarField />
        <OrbitRings />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Eyebrow pill */}
          <span
            className="inline-block text-xs tracking-wide px-4 py-1.5 rounded-full border border-white/20 mb-8"
            style={{ color: "hsl(var(--gold))" }}
          >
            Women in Product · Mentor Matching
          </span>

          {/* H1 */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-nav-foreground leading-tight mb-5"
            style={{ fontFamily: SERIF }}
          >
            Precision-matching for the
            <br />
            <em style={{ color: "hsl(var(--gold))" }}>WIP community</em>
          </h1>

          {/* Subline */}
          <p className="text-nav-foreground/55 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Trajectory surfaces the WIP member who's been exactly where you are, scored across six criteria and ranked by how closely your path aligns.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap justify-center mb-0">
            <button
              onClick={() => navigate("/mentee")}
              className="bg-primary text-primary-foreground font-medium text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Find my mentor →
            </button>
            <button
              onClick={() => scrollTo("mentor-section")}
              className="text-sm font-medium px-6 py-2.5 rounded-full border border-white/20 text-white/65 hover:bg-white/5 transition-colors"
            >
              Become a mentor
            </button>
          </div>

          {/* Proof bar */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap justify-center gap-8 sm:gap-12">
            {[
              ["6", "match criteria scored"],
              ["3", "fields to your first match"],
              ["WIP DMs", "no new tools needed"],
            ].map(([big, small]) => (
              <div key={big} className="text-center">
                <p className="text-nav-foreground text-lg font-semibold">{big}</p>
                <p className="text-nav-foreground/40 text-xs">{small}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TRAJECTORY SCORE ════════ */}
      <section ref={scoreRef} className="bg-background py-20 px-6">
        <div
          className="max-w-[720px] mx-auto transition-all duration-700"
          style={{
            opacity: scoreVisible ? 1 : 0,
            transform: scoreVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">The matching engine</p>
          <h2
            className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
            style={{ fontFamily: SERIF }}
          >
            Not a list. A ranked score for every mentor you see.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed max-w-lg">
            Each mentor is scored out of 100 across five weighted criteria so you instantly see <em>why</em> someone is your best match.
          </p>

          {/* Demo card */}
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            {/* Card header */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tint text-primary flex items-center justify-center text-sm font-bold">
                  RK
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Riya Kapoor</p>
                  <p className="text-xs text-muted-foreground">Senior PM · Fintech · 4–7 yrs</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Trajectory Score</p>
                <p className="text-3xl font-bold text-primary leading-none">{counter}</p>
                <p className="text-[10px] text-muted-foreground">out of 100</p>
              </div>
            </div>

            {/* Score bars */}
            <div className="space-y-3 mb-6">
              {scoreBars.map((b, i) => (
                <ScoreBar key={b.label} {...b} index={i} animate={scoreVisible} />
              ))}
            </div>

            {/* Match reason */}
            <div className="bg-tint border border-primary/15 rounded-xl px-4 py-3">
              <p className="text-xs text-foreground italic leading-relaxed">
                "Matched because: Senior PM in Fintech, offers career transition, moved from IC to Manager at a Series B fintech startup."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PERSONA CARDS ════════ */}
      <section id="seeker-section" className="bg-secondary py-20 px-6">
        <div className="max-w-[720px] mx-auto">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Who it's for</p>
          <h2
            className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
            style={{ fontFamily: SERIF }}
          >
            Two paths. One product.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed max-w-lg">
            Whether you're looking for guidance or ready to give it, Trajectory has a lane for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card A — Seeker */}
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col">
              <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                  <circle cx="11" cy="8" r="2" />
                  <path d="M7 14c0-2 1.8-3 4-3s4 1 4 3" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-primary font-semibold mb-2">For seekers</span>
              <h3 className="text-base font-semibold text-foreground mb-2">Find the mentor who's been where you are</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                Answer three quick questions and get a ranked list of WIP members whose experience aligns with your career goals.
              </p>
              <button
                onClick={() => navigate("/mentee")}
                className="bg-primary text-primary-foreground font-medium text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity self-start"
              >
                Find my mentor →
              </button>
            </div>

            {/* Card B — Mentor */}
            <div id="mentor-section" className="bg-card border border-border rounded-2xl p-6 flex flex-col">
              <div className="w-10 h-10 rounded-full bg-wip-purple-light flex items-center justify-center mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-wip-purple">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-wip-purple font-semibold mb-2">For mentors</span>
              <h3 className="text-base font-semibold text-foreground mb-2">Share your experience with the next generation</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                Set your availability and topics so Trajectory can match you with seekers who need exactly what you know.
              </p>
              <button
                onClick={() => navigate("/become-mentor")}
                className="text-sm font-medium px-5 py-2.5 rounded-lg border border-wip-purple/30 text-wip-purple hover:bg-wip-purple-light transition-colors self-start"
              >
                Set up my profile →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ KATHERINE JOHNSON STRIP ════════ */}
      <section className="relative bg-nav py-16 px-6 overflow-hidden">
        {/* Orbit ring */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: 380, height: 380, bottom: -160, left: -100,
            border: "1px solid rgba(201,184,130,0.10)",
          }}
        />

        <div className="relative z-10 max-w-[600px] mx-auto text-center">
          <p
            className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-6"
            style={{ color: "hsl(var(--gold))" }}
          >
            Team Katherine Johnson · WIP Women's History Hackathon 2025
          </p>
          <blockquote
            className="text-lg sm:text-xl text-nav-foreground italic leading-relaxed mb-4"
            style={{ fontFamily: SERIF }}
          >
            "She calculated{" "}
            <span className="not-italic" style={{ color: "hsl(var(--gold))" }}>
              trajectories
            </span>{" "}
            that others said were impossible. We built a tool to chart yours."
          </blockquote>
          <p className="text-nav-foreground/35 text-xs">
            — Named in honour of Katherine Johnson, NASA mathematician
          </p>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="bg-background border-t border-border py-6 px-6">
        <div className="max-w-[720px] mx-auto flex justify-between items-center flex-wrap gap-2">
          <span className="text-foreground font-semibold" style={{ fontFamily: SERIF }}>
            Trajectory.
          </span>
          <span className="text-xs text-muted-foreground">
            Built for the WIP Women's History Month Hackathon 2025
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
