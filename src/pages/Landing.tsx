import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/lib/context";
import { runMatching, TOPICS, CAREER_STAGES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { setSeekerInput, setMatchResults, mentorsList } = useAppState();
  const [topics, setTopics] = useState<string[]>([]);
  const [stage, setStage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    const input = { goal: "", topics, careerStage: stage };
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
      <div className="bg-nav px-6 pt-16 pb-20 text-center">
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
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-muted-foreground text-sm font-medium">Finding your mentor…</p>
            </div>
          ) : (
            <>
              <div ref={dropdownRef}>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Focus Area
                </label>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="w-full flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[38px]"
                >
                  <span className={topics.length === 0 ? "text-muted-foreground" : ""}>
                    {topics.length === 0
                      ? "Select topics…"
                      : `${topics.length} selected`}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Selected pills */}
                {topics.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {topics.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {t}
                        <button
                          type="button"
                          onClick={() => toggleTopic(t)}
                          className="hover:text-primary/70"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Dropdown list */}
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
                            selected
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-accent"
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
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Your Seniority Level
                </label>
                <div className="relative">
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select your stage…</option>
                    {CAREER_STAGES.map((s) => (
                      <option key={s.label} value={s.label}>{s.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full"
                size="lg"
              >
                Find my mentor →
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
