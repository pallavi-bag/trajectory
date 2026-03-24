import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import avatarRiya from "@/assets/avatar-riya.jpg";
import avatarMaya from "@/assets/avatar-maya.jpg";
import avatarSara from "@/assets/avatar-sara.jpg";

const SERIF = 'Georgia, "Times New Roman", serif';

const AVATAR_MAP: Record<string, string> = {
  "riya-kapoor": avatarRiya,
  "maya-johnson": avatarMaya,
  "sara-lin": avatarSara,
};

interface DemoMentor {
  id: string;
  name: string;
  seniorityLabel: string;
  industry: string;
  topics: string[];
  score: number;
  reason: string;
  scoreBars: { label: string; points: number; max: number }[];
}

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
          width: 420,
          height: 420,
          top: -120,
          right: -100,
          border: "1px solid rgba(201,184,130,0.12)",
        }}
      />
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 560,
          height: 560,
          top: -190,
          right: -170,
          border: "1px solid rgba(201,184,130,0.06)",
        }}
      />
    </>
  );
}

/* ── Animated score bar ── */
function ScoreBar({
  label,
  points,
  max,
  index,
  animate,
}: {
  label: string;
  points: number;
  max: number;
  index: number;
  animate: boolean;
}) {
  const pct = (points / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground" style={{ minWidth: 120 }}>
        {label}
      </span>
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

/* ── Demo mentor data (mapped from DB ids) ── */
const DEMO_MENTORS: DemoMentor[] = [
  {
    id: "riya-kapoor",
    name: "Riya Kapoor",
    seniorityLabel: "Senior PM · IC3",
    industry: "Fintech",
    topics: ["Career transition", "Interview prep", "FAANG / big tech"],
    score: 100,
    reason: "Matched because: Senior PM in Fintech, offers career transition, moved from IC to Manager at a Series B fintech startup.",
    scoreBars: [
      { label: "Seniority gap", points: 30, max: 30 },
      { label: "Sector alignment", points: 25, max: 25 },
      { label: "Goal alignment", points: 25, max: 25 },
      { label: "Availability", points: 12, max: 12 },
      { label: "Company type", points: 8, max: 8 },
    ],
  },
  {
    id: "maya-johnson",
    name: "Maya Johnson",
    seniorityLabel: "Group PM · IC4",
    industry: "B2B SaaS",
    topics: ["Leadership development", "Stakeholder management", "Roadmap strategy"],
    score: 92,
    reason: "Matched because: Group PM in B2B SaaS, strong in leadership development and stakeholder management across enterprise orgs.",
    scoreBars: [
      { label: "Seniority gap", points: 28, max: 30 },
      { label: "Sector alignment", points: 22, max: 25 },
      { label: "Goal alignment", points: 24, max: 25 },
      { label: "Availability", points: 10, max: 12 },
      { label: "Company type", points: 8, max: 8 },
    ],
  },
  {
    id: "sara-lin",
    name: "Sara Lin",
    seniorityLabel: "PM · IC2",
    industry: "Health Tech",
    topics: ["Interview prep", "Career transition", "Work-life balance"],
    score: 85,
    reason: "Matched because: PM in Health Tech, recently navigated career transition and excels at interview coaching for early-career PMs.",
    scoreBars: [
      { label: "Seniority gap", points: 25, max: 30 },
      { label: "Sector alignment", points: 20, max: 25 },
      { label: "Goal alignment", points: 23, max: 25 },
      { label: "Availability", points: 12, max: 12 },
      { label: "Company type", points: 5, max: 8 },
    ],
  },
];

/* ── Main page ── */
const LandingPage = () => {
  const navigate = useNavigate();

  /* Intersection-based animations */
  const scoreRef = useRef<HTMLDivElement>(null);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [counter, setCounter] = useState(0);
  const [activeMentorIdx, setActiveMentorIdx] = useState(0);

  const activeMentor = DEMO_MENTORS[activeMentorIdx];

  useEffect(() => {
    const el = scoreRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setScoreVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Auto-rotate mentors every 4s */
  useEffect(() => {
    if (!scoreVisible) return;
    const interval = setInterval(() => {
      setActiveMentorIdx((prev) => (prev + 1) % DEMO_MENTORS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [scoreVisible]);

  /* Animate counter when mentor changes */
  useEffect(() => {
    if (!scoreVisible) return;
    const target = activeMentor.score;
    setCounter(0);
    const dur = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setCounter(Math.round(t * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scoreVisible, activeMentorIdx]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
          <span className="inline-block text-xs tracking-wide px-4 py-1.5 rounded-full border border-white/20 mb-8 text-gold font-bold">
            Women in Product · Mentor Matching
          </span>

          {/* H1 */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-nav-foreground leading-tight mb-5"
            style={{ fontFamily: SERIF }}
          >
            Curated Mentor-Matching for the
            <br />
            <em style={{ color: "hsl(var(--gold))" }}>WIP Community</em>
          </h1>

          {/* Subline */}
          <p className="text-nav-foreground/55 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Trajectory ranks the best-matched WIP members who's been exactly where you are.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap justify-center mb-0">
            <button
              onClick={() => scrollTo("seeker-section")}
              className="bg-primary text-primary-foreground font-medium text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Find my mentor →
            </button>
            <button
              onClick={() => scrollTo("mentor-section")}
              className="text-sm font-medium px-6 py-2.5 rounded-full border border-white/20 transition-colors text-primary bg-primary-foreground"
            >
              Become a mentor
            </button>
          </div>

          {/* Proof bar */}
          <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap justify-center gap-8 sm:gap-12">
            {[
              ["Easy", "No sign up needed"],
              ["Personalized", "Algorithmic Matching"],
              ["Seamless", "Connect via WIP DMs"],
            ].map(([big, small]) => (
              <div key={big} className="text-center">
                <p className="text-nav-foreground text-lg font-semibold">{big}</p>
                <p className="text-sm text-primary-foreground">{small}</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: SERIF }}>
            We curate your mentor matches based on trajectory alignment and availability.
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed max-w-lg">
            More <em>signal</em>. Less noise.
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
                "Matched because: Senior PM in Fintech, offers career transition, moved from IC to Manager at a Series B
                fintech startup."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PERSONA CARDS ════════ */}
      <section id="seeker-section" className="py-20 px-6 bg-inherit">
        <div className="max-w-[720px] mx-auto">
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mb-3">Who it's for</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: SERIF }}>
            Are you looking to advance, pivot or lead as a PM?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed max-w-lg">
            Whether you're looking for guidance or ready to give it, Trajectory has a match for you.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card A — Seeker */}
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col">
              <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center mb-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                  <circle cx="11" cy="8" r="2" />
                  <path d="M7 14c0-2 1.8-3 4-3s4 1 4 3" />
                </svg>
              </div>
              <span className="text-[20px] uppercase tracking-widest text-primary font-semibold mb-2">For seekers</span>
              <h3 className="font-semibold text-foreground mb-2 text-sm">Find the mentor who's been where you are</h3>
              <p className="text-muted-foreground mb-6 flex-1 leading-relaxed text-sm">
                Answer three quick questions and get a ranked list of WIP members whose experience aligns with your
                career goals.
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-wip-purple"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </div>
              <span className="text-[20px] uppercase tracking-widest text-wip-purple font-semibold mb-2">
                For mentors
              </span>
              <h3 className="font-semibold text-foreground mb-2 text-sm">
                Share your experience with the next generation
              </h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed bg-violet-100">
                Share your availability and background so Trajectory can match you with mentees who want your expertise.
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
            width: 380,
            height: 380,
            bottom: -160,
            left: -100,
            border: "1px solid rgba(201,184,130,0.10)",
          }}
        />

        <div className="relative z-10 max-w-[600px] mx-auto text-center">
          <p
            className="text-[10px] uppercase tracking-[0.2em] font-semibold mb-6"
            style={{ color: "hsl(var(--gold))" }}
          >
            TEAM KATHERINE JOHNSON · WIP WOMEN'S HISTORY HACKATHON 2026
          </p>
          <blockquote
            className="text-lg sm:text-xl text-nav-foreground italic leading-relaxed mb-4"
            style={{ fontFamily: SERIF }}
          >
            She calculated{" "}
            <span className="not-italic" style={{ color: "hsl(var(--gold))" }}>
              trajectories
            </span>{" "}
            that put humanity on the moon. We define the career paths that put you in the right room."
          </blockquote>
          <p className="text-nav-foreground/35 text-xs">
            &nbsp;Named in honour of Katherine Johnson, NASA mathematician
          </p>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="bg-background border-t border-border py-6 px-6">
        <div className="max-w-[720px] mx-auto flex justify-between items-center flex-wrap gap-2">
          <span className="text-foreground font-semibold" style={{ fontFamily: SERIF }}>
            Trajectory.
          </span>
          <span className="text-xs text-muted-foreground">Built for the WIP Women's History Month Hackathon 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
