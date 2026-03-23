import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
          Find your next mentor
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed text-balance">
          NextPhase connects women in product with experienced mentors who've been where you're headed.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Button asChild size="lg">
            <Link to="/browse">Browse mentors</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/become-mentor">Become a mentor</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
