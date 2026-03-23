import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOPICS, AVAILABILITY_OPTIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MAX_TOPICS = 4;

const MentorPreferences = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");
  const [maxMentees, setMaxMentees] = useState("");

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topic)) return prev.filter((t) => t !== topic);
      if (prev.length >= MAX_TOPICS) return prev;
      return [...prev, topic];
    });
  };

  const handleSave = () => {
    toast({
      title: "✓ You're now listed as a NextPhase mentor.",
    });
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-6">
      <button
        onClick={() => navigate("/mentee")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </button>

      <h1 className="text-xl font-bold text-foreground mb-2">Mentor preferences</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Set up your mentoring profile for the WIP community.
      </p>

      {/* Info callout */}
      <div className="bg-tint border-l-4 border-l-primary rounded-r-lg p-4 mb-8 text-sm text-foreground">
        Your WIP profile auto-populates — no re-entry needed.
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-medium text-foreground">Open to mentoring</span>
        <button
          onClick={() => setOpen(!open)}
          className={`w-11 h-6 rounded-full transition-colors relative ${
            open ? "bg-primary" : "bg-border"
          }`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${
              open ? "translate-x-[22px]" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="space-y-6">
          {/* Topic chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">Topics</label>
              <span className="text-xs text-muted-foreground">
                {selectedTopics.length}/{MAX_TOPICS} selected
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => {
                const selected = selectedTopics.includes(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                      selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-border"
                    } ${
                      !selected && selectedTopics.length >= MAX_TOPICS
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={!selected && selectedTopics.length >= MAX_TOPICS}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Availability
            </label>
            <div className="relative">
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full appearance-none rounded-lg border border-border bg-card px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select…</option>
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Max mentees */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Max mentees
            </label>
            <div className="relative">
              <select
                value={maxMentees}
                onChange={(e) => setMaxMentees(e.target.value)}
                className="w-full appearance-none rounded-lg border border-border bg-card px-3 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select…</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="No limit">No limit</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full" size="lg">
            Save preferences
          </Button>
        </div>
      )}
    </div>
  );
};

export default MentorPreferences;
