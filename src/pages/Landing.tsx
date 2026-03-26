import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/lib/context";
import { runMatching, TOPICS, CAREER_STAGES, AVAILABILITY_OPTIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, X } from "lucide-react";

const INDUSTRIES = [
  "Banking/Finance/FinTech",
  "Computing/IoT/Consumer Tech",
  "Data/Analytics",
  "EdTech",
  "Enterprise Software/SaaS",
  "Healthcare/Nanotechnology/Wearable",
  "Manufacturing",
  "Media/Entertainment/Social",
  "Nonprofit/Philanthropy",
  "Real Estate Tech",
  "Retail/eCommerce",
  "Transportation/Travel/Hospitality",
  "Other",
] as const;

const Landing = () => {
  const navigate = useNavigate();
  const { setSeekerInput, setMatchResults, mentorsList } = useAppState();
  const [topics, setTopics] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [stage, setStage] = useState("");
  const [industry, setIndustry] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const MAX_TOPICS = 4;
  const canSubmit = topics.length > 0 && stage;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTopic = (t: string) => {
    setTopics((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : prev.length < MAX_TOPICS ? [...prev, t] : prev
    );
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    const input = {
      goal,
      topics,
      careerStage: stage,
      industry: industry || undefined,
      availability: availability || undefined,
    };
    setSeekerInput(input);
    setLoading(true);
    setTimeout(() => {
      const results = runMatching(input, mentorsList);
      setMatchResults(results);
      setLoading(false);
      navigate("/results");
    }, 1000);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <div className="bg-nav px-6 pt-10 pb-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-nav-foreground leading-[1.1] mb-4 text-balance">
          Give your career the trajectory it deserves.
        </h1>
        <p className="text-lg max-w-xl mx-auto leading-relaxed text-pretty text-stone-300">
          Find a mentor who has walked your path and can help you lead the way forward.
        </p>
      </div>

      {/* Form card */}
      <div className="px-6 -mt-10 pb-16 flex justify-center">
        <div className="bg-card border border-border rounded-lg shadow-md p-6 w-full max-w-lg space-y-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm font-medium">Finding your mentor…</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Group 1 — What do you need help with */}
              <div className="space-y-4">
                <div ref={dropdownRef}>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Focus Area</label>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="w-full flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[38px]"
                  >
                    <span className={topics.length === 0 ? "text-muted-foreground" : ""}>
                      {topics.length === 0 ? "Select up to 4 topics…" : `${topics.length}/${MAX_TOPICS} selected`}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {topics.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {t}
                          <button type="button" onClick={() => toggleTopic(t)} className="hover:text-primary/70">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {dropdownOpen && (
                    <div className="mt-1 w-full rounded-lg border border-border bg-popover shadow-md max-h-52 overflow-y-auto z-50 relative">
                      {TOPICS.map((t) => {
                        const selected = topics.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleTopic(t)}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                              selected ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-accent"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">What do you need help with?</label>
                  <p className="text-xs text-muted-foreground mb-1.5">Share your goal in your own words</p>
                  <textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="I want to transition from engineering to product management and need help preparing for interviews"
                    rows={3}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              </div>

              {/* Group 2 — Where are you now */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Where are you in your career right now?</label>
                  <div className="relative">
                    <select
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select your stage…</option>
                      {CAREER_STAGES.map((s) => (
                        <option key={s.label} value={s.label}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Your current industry</label>
                  <div className="relative">
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select your industry…</option>
                      {INDUSTRIES.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Group 3 — What works for you */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    How often do you want to connect?
                  </label>
                  <div className="relative">
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select availability…</option>
                      {AVAILABILITY_OPTIONS.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <Button onClick={handleSubmit} disabled={!canSubmit} className="w-full" size="lg">
                Find my mentor
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
