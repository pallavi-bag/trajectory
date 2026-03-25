import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppState } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

function stripLevelCode(text: string): string {
  return text.replace(/\s*·\s*(IC\d+|Dir\+)/gi, '').trim();
}

const MentorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { seekerInput, introNote, setIntroNote, seekerName, matchResults, mentorsList } = useAppState();

  const mentor = mentorsList.find((m) => m.id === id);

  useEffect(() => {
    if (!mentor) navigate("/", { replace: true });
  }, [mentor, navigate]);

  if (!mentor) return null;

  const hasResults = matchResults.length > 0;

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      <button
        onClick={() => (hasResults ? navigate("/results") : navigate("/mentee"))}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {hasResults ? "Back to results" : "Back"}
      </button>

      {/* Card 1 — Mentor Profile */}
      <div className="bg-white rounded-2xl border-[0.5px] border-border p-5 mb-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary font-semibold text-sm shrink-0">
            {mentor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-base font-semibold text-foreground">{mentor.name}</p>
            <p className="text-muted-foreground text-xs">
              {stripLevelCode(mentor.title)} · {mentor.industry}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Seniority", value: stripLevelCode(mentor.seniorityLabel) },
            { label: "Industry", value: mentor.industry },
            { label: "Availability", value: mentor.availability },
            { label: "LinkedIn", value: "View profile", isLink: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              {stat.isLink ? (
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-primary hover:text-primary-hover transition-colors inline-flex items-center gap-1"
                >
                  View profile <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p className="text-[13px] font-medium text-foreground">{stat.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Superpower */}
        <div className="bg-tint border-l-4 border-l-primary rounded-r-lg p-3.5 mt-5">
          <p className="text-xs font-semibold text-primary mb-1">⚡ Her superpower</p>
          <p className="text-[13px] text-foreground font-medium">{mentor.superpower}</p>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <p className="text-[13px] text-foreground leading-relaxed">{mentor.bio}</p>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {mentor.topics.map((t) => (
            <span
              key={t}
              className="border-[0.5px] border-[#1D9E75] text-[#0F6E56] rounded-[20px] text-[11px] px-2.5 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card 2 — Connect / Interaction */}
      <div className="bg-white rounded-2xl border-[0.5px] border-border p-5">
        {/* Intro note */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Write an intro note
          </label>
          <textarea
            value={introNote}
            onChange={(e) => setIntroNote(e.target.value)}
            rows={4}
            placeholder="Introduce yourself and share what you're looking for…"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        {/* Preview */}
        <div className="bg-muted/50 rounded-lg p-3.5 mb-4 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground text-[13px] mb-2">Message preview</p>
          <p>
            <span className="font-medium">From:</span> {seekerName}
          </p>
          {seekerInput.careerStage && (
            <p>
              <span className="font-medium">Stage:</span> {seekerInput.careerStage}
            </p>
          )}
          {seekerInput.topics.length > 0 && (
            <p>
              <span className="font-medium">Topics:</span> {seekerInput.topics.join(", ")}
            </p>
          )}
          {seekerInput.goal && (
            <p>
              <span className="font-medium">Goal:</span> {seekerInput.goal}
            </p>
          )}
        </div>

        <Button onClick={() => navigate(`/dm/${mentor.id}`)} className="w-full mt-4" size="lg">
          Connect via WIP DMs
        </Button>
      </div>
    </div>
  );
};

export default MentorProfile;
