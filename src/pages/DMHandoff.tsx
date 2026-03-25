import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppState } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const DMHandoff = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { seekerInput, introNote, seekerName, mentorsList } = useAppState();

  const mentor = mentorsList.find((m) => m.id === id);

  useEffect(() => {
    if (!mentor) navigate("/", { replace: true });
  }, [mentor, navigate]);

  if (!mentor) return null;

  return (
    <div className="max-w-lg mx-auto py-12 px-6">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h1 className="text-lg font-bold text-foreground mb-4">
          Your message to {mentor.name}
        </h1>

        {/* Context block */}
        <div className="bg-tint border-l-4 border-l-primary rounded-r-lg p-4 mb-4 text-xs text-foreground space-y-1">
          <p className="font-semibold mb-1">Sent via Trajectory · WIP Mentor Match</p>
          <p>
            {seekerName}
            {seekerInput.careerStage ? ` · ${seekerInput.careerStage}` : ""}
          </p>
          {seekerInput.topics.length > 0 && (
            <p>Topics: {seekerInput.topics.join(", ")}</p>
          )}
          {seekerInput.goal && (
            <p>Goal: {seekerInput.goal}</p>
          )}
        </div>

        {/* Note */}
        {introNote && (
          <div className="bg-background rounded-lg p-4 mb-4 text-sm text-foreground leading-relaxed">
            {introNote}
          </div>
        )}

        <p className="text-xs italic text-muted-foreground mb-6">
          In the live WIP platform, this opens directly in your WIP DMs inbox.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate(`/mentor/${mentor.id}`)}
            className="shrink-0"
            size="lg"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Edit note
          </Button>
          <Button
            onClick={() => navigate(`/confirmation/${mentor.id}`)}
            className="flex-1"
            size="lg"
          >
            Send message →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DMHandoff;
