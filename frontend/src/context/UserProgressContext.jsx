import { createContext, useContext, useState, useEffect } from "react";

const UserProgressContext = createContext();

export function UserProgressProvider({ children }) {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem("electionguide_xp");
    return saved ? parseInt(saved, 10) : 0;
  });

  const level = Math.floor(xp / 100) + 1;
  const currentLevelXp = xp % 100;

  useEffect(() => {
    localStorage.setItem("electionguide_xp", xp);
  }, [xp]);

  function addXp(amount) {
    setXp((prev) => prev + amount);
  }

  return (
    <UserProgressContext.Provider value={{ xp, level, currentLevelXp, addXp }}>
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  return useContext(UserProgressContext);
}
