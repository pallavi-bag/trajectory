import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/lib/context";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Results from "./pages/Results";
import MentorProfile from "./pages/MentorProfile";
import DMHandoff from "./pages/DMHandoff";
import Confirmation from "./pages/Confirmation";
import MentorPreferences from "./pages/MentorPreferences";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/mentee" element={<Landing />} />
              <Route path="/results" element={<Results />} />
              <Route path="/mentor/:id" element={<MentorProfile />} />
              <Route path="/dm/:id" element={<DMHandoff />} />
              <Route path="/confirmation/:id" element={<Confirmation />} />
              <Route path="/become-mentor" element={<MentorPreferences />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
