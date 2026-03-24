import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-[60px] bg-nav flex items-center justify-between px-6 shrink-0">
      <Link to="/" className="flex items-center gap-2 pt-1 text-2xl" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
        <Rocket className="text-gold" size={22} />
        <span className="font-semibold text-nav-foreground tracking-tight text-2xl">Trajectory.</span>
      </Link>
      <Link to="/become-mentor" className="text-primary text-sm font-medium hover:text-primary-hover transition-colors">
        Are you a mentor? →
      </Link>
    </nav>
  );
};

export default Navbar;
