import { Link } from "react-router-dom";
import logo from "@/assets/nextphase-logo.png";

const Navbar = () => {
  return (
    <nav className="h-[52px] bg-nav flex items-center justify-between px-6 shrink-0">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="NextPhase" className="h-10 sm:h-11" />
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
