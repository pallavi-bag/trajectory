import { useNavigate } from "react-router-dom";
import { useAppState } from "@/lib/context";
import { ArrowLeft } from "lucide-react";
import type { MatchResult } from "@/lib/data";
import { useEffect } from "react";

function getAlignmentLabel(score: number): { label: string; className: string } {
  if (score >= 80) return { label: "High alignment", className: "text-primary" };
  if (score >= 60) return { label: "Good alignment", className: "text-amber-600" };
  return { label: "Moderate alignment", className: "text-muted-foreground" };
}

function normalizeScore(raw: number): number {
  return Math.max(40, Math.min(Math.round(raw), 100));
}

const MentorCard = ({
  result,
  index,
  seekerTopics,
  onClick,
}: {
  result: MatchResult;
  index: number;
  seekerTopics: string[];
  onClick: () => void;
}) => {
  const { mentor, reason, isPartialMatch, score } = result;
  const isBest = index === 0;
  const displayScore = normalizeScore(score);
  const alignment = getAlignmentLabel(displayScore);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-[box-shadow] ${
        isBest ? "border-l-[3px] border-l-primary" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary font-semibold text-sm shrink-0">
            {mentor.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">{mentor.name}</p>
            <p className="text-muted-foreground text-xs">{mentor.seniorityLabel}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {isBest && (
            <span className="text-xs font-medium text-primary bg-tint px-2 py-0.5 rounded-full">
              Best match
            </span>
          )}
          {isPartialMatch && (
            <span className="text-xs font-medium text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border">
              Partial match
            </span>
          )}
          <div className="flex flex-col items-end border border-border rounded-lg px-3 py-2 bg-background/50">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Trajectory Score</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-primary font-bold text-lg leading-none">{displayScore}</span>
              <span className="text-muted-foreground text-xs">/100</span>
            </div>
            <span className={`text-[10px] ${alignment.className}`}>{alignment.label}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs bg-background border border-border text-foreground px-2 py-0.5 rounded-full">
          {mentor.industry}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {mentor.topics.map((t) => {
          const isMatchedTopic = seekerTopics.includes(t);
          return (
            <span
              key={t}
              className={`text-xs px-2 py-0.5 rounded-full border ${
                isMatchedTopic
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {t}
            </span>
          );
        })}
      </div>

      <p className="text-xs italic text-muted-foreground leading-relaxed">{reason}</p>
    </button>
  );
};

const Results = () => {
  const navigate = useNavigate();
  const { seekerInput, matchResults } = useAppState();

  useEffect(() => {
    if (!seekerInput.topics.length && !matchResults.length) {
      navigate("/mentee", { replace: true });
    }
  }, [matchResults, seekerInput, navigate]);

  if (!matchResults.length) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-6 text-center">
        <div className="w-12 h-12 rounded-full bg-tint flex items-center justify-center mx-auto mb-4">
          <span className="text-primary text-xl">✦</span>
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">No exact matches yet</h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6 leading-relaxed">
          Try broadening your search — change your topic or career stage to surface more mentors.
        </p>
        <button
           onClick={() => navigate("/mentee")}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          Edit my search
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-6">
      <button
        onClick={() => navigate("/mentee")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <p className="text-sm text-muted-foreground mb-6">
        Matches for:{" "}
        <span className="font-medium text-foreground">{seekerInput.topics.join(", ")}</span> ·{" "}
        <span className="font-medium text-foreground">{seekerInput.careerStage}</span>
      </p>

      <div className="space-y-3">
        {matchResults.map((result, i) => (
          <MentorCard
            key={result.mentor.id}
            result={result}
            index={i}
            seekerTopics={seekerInput.topics}
            onClick={() => navigate(`/mentor/${result.mentor.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Results;
