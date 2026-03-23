import React, { createContext, useContext, useState } from "react";
import type { SeekerInput, MatchResult } from "@/lib/data";

interface AppState {
  seekerInput: SeekerInput;
  setSeekerInput: (input: SeekerInput) => void;
  matchResults: MatchResult[];
  setMatchResults: (results: MatchResult[]) => void;
  introNote: string;
  setIntroNote: (note: string) => void;
  seekerName: string;
  setSeekerName: (name: string) => void;
}

const AppContext = createContext<AppState | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [seekerInput, setSeekerInput] = useState<SeekerInput>({ goal: "", topic: "", careerStage: "" });
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [introNote, setIntroNote] = useState("");
  const [seekerName, setSeekerName] = useState("WIP Member");

  return (
    <AppContext.Provider value={{
      seekerInput, setSeekerInput,
      matchResults, setMatchResults,
      introNote, setIntroNote,
      seekerName, setSeekerName,
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
