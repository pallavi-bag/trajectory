import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StarField from "./StarField";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden relative">
      <StarField count={50} />
      <Navbar />
      <main className="flex-1 flex flex-col relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
