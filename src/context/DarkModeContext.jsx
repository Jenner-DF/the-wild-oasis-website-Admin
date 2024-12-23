import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setisDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDarkMode"
  );
  const toggleDarkMode = () => setisDarkMode((d) => !d);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Context was used outside of DarkModeProvider");
  return context;
}

//put the provider in the App so the values can be used using the usedarkmode
export { DarkModeProvider, useDarkMode };
