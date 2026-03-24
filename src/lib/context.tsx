import React, { createContext, useContext, useState, useEffect } from "react";
import type { SeekerInput, MatchResult, Mentor } from "@/lib/data";
import { mentors as hardcodedMentors } from "@/lib/data";
import { fetchMentors } from "@/lib/supabase-mentors";

interface AppState {
  seekerInput: SeekerInput;
  setSeekerInput: (input: SeekerInput) => void;
  matchResults: MatchResult[];
  setMatchResults: (results: MatchResult[]) => void;
  introNote: string;
  setIntroNote: (note: string) => void;
  seekerName: string;
  setSeekerName: (name: string) => void;
  mentorsList: Mentor[];
  setMentorsList: (mentors: Mentor[]) => void;
  mentorsLoading: boolean;
  refreshMentors: () => Promise<void>;
}

const AppContext = createContext<AppState | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seekerInput, setSeekerInput] = useState<SeekerInput>({ goal: "", topics: [], careerStage: "" });
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [introNote, setIntroNote] = useState("");
  const [seekerName, setSeekerName] = useState("WIP Member");
  const [mentorsList, setMentorsList] = useState<Mentor[]>(hardcodedMentors);
  const [mentorsLoading, setMentorsLoading] = useState(true);

  const refreshMentors = async () => {
    setMentorsLoading(true);
    try {
      const dbMentors = await fetchMentors();
      if (dbMentors.length > 0) {
        setMentorsList(dbMentors);
      } else {
        setMentorsList(hardcodedMentors);
      }
    } catch {
      setMentorsList(hardcodedMentors);
    } finally {
      setMentorsLoading(false);
    }
  };

  useEffect(() => {
    refreshMentors();
  }, []);

  return (
    <AppContext.Provider value={{
      seekerInput, setSeekerInput,
      matchResults, setMatchResults,
      introNote, setIntroNote,
      seekerName, setSeekerName,
      mentorsList, setMentorsList,
      mentorsLoading, refreshMentors,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
};
