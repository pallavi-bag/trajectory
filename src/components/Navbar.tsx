import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-[60px] bg-nav flex items-center justify-between px-6 shrink-0">
      <Link to="/" className="flex items-center" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
        <span className="text-xl font-semibold text-nav-foreground tracking-tight">Trajectory.</span>
      </Link>
      <Link to="/become-mentor" className="text-primary text-sm font-medium hover:text-primary-hover transition-colors">
        Are you a mentor? →
      </Link>
    </nav>
  );
};

export default Navbar;
