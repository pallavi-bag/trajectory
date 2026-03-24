import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "@/lib/context";
import { runMatching, TOPICS, CAREER_STAGES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const { setSeekerInput, setMatchResults, mentorsList } = useAppState();
  const [goal, setGoal] = useState("");
  const [topic, setTopic] = useState("");
  const [stage, setStage] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = goal.trim() && topic && stage;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const input = { goal, topic, careerStage: stage };
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
          Every woman deserves a trajectory to the moon.
        </h1>
        <p className="text-[hsl(248,20%,58%)] text-lg max-w-xl mx-auto leading-relaxed text-pretty">
          Connect with an experienced PM who's been where you are — and knows what's next.
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
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  What do you need help with?
                </label>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={2}
                  placeholder="e.g. I want to transition from engineering to product…"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Focus Area
                </label>
                <div className="relative">
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a topic…</option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Current Level
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
