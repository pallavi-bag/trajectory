import { useNavigate, useParams } from "react-router-dom";
import { mentors } from "@/lib/data";
import { Button } from "@/components/ui/button";

const Confirmation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mentor = mentors.find((m) => m.id === id);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-52px-48px)] px-6">
      <div className="bg-nav rounded-xl p-10 text-center max-w-md w-full">
        {/* Checkmark */}
        <div className="mx-auto mb-6 w-14 h-14 rounded-full border-2 border-nav-foreground flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-nav-foreground mb-2">
          Message sent to {mentor?.name ?? "your mentor"}
        </h1>
        <p className="text-[hsl(228,15%,62%)] text-sm mb-8">
          She'll receive it in her WIP inbox.
        </p>

        <div className="flex gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Find another match
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Return home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
