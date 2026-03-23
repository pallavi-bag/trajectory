import { Link } from "react-router-dom";

const CrescentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.5 8A5.5 5.5 0 1 1 5.2 2.8a4.2 4.2 0 1 0 5.9 5.9A5.48 5.48 0 0 1 13.5 8Z"
      fill="#C8A96E"
    />
  </svg>
);

const Navbar = () => {
  return (
    <nav className="h-[52px] bg-nav flex items-center justify-between px-6 shrink-0">
      <Link to="/" className="flex items-center gap-2">
        <CrescentIcon />
        <span className="text-nav-foreground font-semibold text-[15px] tracking-tight">
          NextPhase
        </span>
      </Link>
      <Link
        to="/become-mentor"
        className="text-primary text-sm font-medium hover:text-primary-hover transition-colors"
      >
        Are you a mentor? →
      </Link>
    </nav>
  );
};

export default Navbar;
