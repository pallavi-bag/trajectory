import { useNavigate } from "react-router-dom";
import { useAppState } from "@/lib/context";
import { ArrowLeft } from "lucide-react";
import type { MatchResult } from "@/lib/data";
import { useEffect } from "react";
import avatarRiya from "@/assets/avatar-riya.jpg";
import avatarMaya from "@/assets/avatar-maya.jpg";
import avatarSara from "@/assets/avatar-sara.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";
import avatarAnika from "@/assets/avatar-anika.jpg";

const AVATAR_MAP: Record<string, string> = {
  "riya-kapoor": avatarRiya,
  "maya-johnson": avatarMaya,
  "sara-lin": avatarSara,
  "priya-nair": avatarPriya,
  "anika-patel": avatarAnika,
};

function normalizeScore(raw: number): number {
  return Math.max(40, Math.min(Math.round(raw), 100));
}

function getScoreDots(score: number): Array<"filled" | "partial" | "weak"> {
  if (score >= 90) return ["filled", "filled", "filled", "filled", "filled"];
  if (score >= 80) return ["filled", "filled", "filled", "filled", "partial"];
  if (score >= 70) return ["filled", "filled", "filled", "partial", "weak"];
  if (score >= 60) return ["filled", "filled", "partial", "weak", "weak"];
  if (score >= 50) return ["filled", "partial", "weak", "weak", "weak"];
  return ["partial", "weak", "weak", "weak", "weak"];
}

function stripLevelCode(text: string): string {
  return text.replace(/\s*·\s*(IC\d+|Dir\+)/gi, "").trim();
}

function boldKeywords(text: string, keywords: string[]): React.ReactNode {
  const unique = [...new Set(keywords.filter(Boolean))];
  unique.sort((a, b) => b.length - a.length);
  const escaped = unique.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (escaped.length === 0) return text;
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = unique.some((k) => k.toLowerCase() === part.toLowerCase());
        return isMatch ? (
          <strong key={i} className="text-[#0F6E56] font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
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
  const { mentor, reason, score } = result;
  const isBest = index === 0;
  const displayScore = normalizeScore(score);
  const dots = getScoreDots(displayScore);

  const matchedTopics = mentor.topics.filter((t) => seekerTopics.includes(t));
  const displayTopics = matchedTopics.length > 0 ? matchedTopics.slice(0, 2) : [mentor.topics[0]];

  

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-5 transition-shadow hover:shadow-md ${
        isBest ? "bg-[#f7fdfb] border-[0.5px] border-[#9FE1CB]" : "bg-white border-[0.5px] border-border"
      }`}
    >
      {/* Best match badge */}
      {isBest && (
        <span className="inline-block bg-[#1D9E75] text-white text-[10px] rounded-[4px] px-2 py-0.5 mb-2">
          ★ Best match
        </span>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {AVATAR_MAP[mentor.id] ? (
            <img
              src={AVATAR_MAP[mentor.id]}
              alt={mentor.name}
              loading="lazy"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-tint flex items-center justify-center text-primary font-semibold text-sm shrink-0">
              {mentor.name.split(" ").map((n) => n[0]).join("")}
            </div>
          )}
          <div>
            <p className="font-semibold text-foreground text-sm">{mentor.name}</p>
            <p className="text-muted-foreground text-xs">
              {stripLevelCode(mentor.seniorityLabel)} · {mentor.industry}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className={`font-bold text-[22px] leading-none ${isBest ? "text-[#1D9E75]" : "text-muted-foreground"}`}>
            {displayScore}%
          </span>
          <span className="text-[10px] text-muted-foreground mt-0.5">match</span>
          <div className="flex gap-0.5 mt-1">
            {dots.map((status, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-sm ${
                  status === "filled" ? "bg-[#1D9E75]" : status === "partial" ? "bg-[#9FE1CB]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Topic pills */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {displayTopics.map((t) => (
          <span
            key={t}
            className="border-[0.5px] border-[#1D9E75] text-[#0F6E56] rounded-[20px] text-[11px] px-2.5 py-0.5"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-t border-[0.5px] border-border my-3" />

      {/* Footer row */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.6rem]">
          {boldKeywords(stripLevelCode(reason), [
            stripLevelCode(mentor.seniorityLabel),
            mentor.industry,
            ...matchedTopics,
          ])}
        </p>
        <span className="text-[11px] text-[#1D9E75] hover:underline shrink-0 cursor-pointer">View profile →</span>
      </div>
    </div>
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
        Matches for: <span className="font-medium text-foreground">{seekerInput.topics.join(", ")}</span>
        {" · "}
        <span className="font-medium text-foreground">{seekerInput.careerStage}</span>
        {seekerInput.industry && (
          <>
            {" · "}
            <span className="font-medium text-foreground">{seekerInput.industry}</span>
          </>
        )}
        {seekerInput.availability && (
          <>
            {" · "}
            <span className="font-medium text-foreground">{seekerInput.availability}</span>
          </>
        )}
      </p>

      <div className="space-y-4">
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
