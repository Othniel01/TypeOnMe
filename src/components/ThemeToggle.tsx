import { useThemeStore } from "@/store/useThemeStore";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center text-xs gap-2 cursor-pointer w-full"
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-4" /> Light Mode
        </>
      ) : (
        <>
          <Moon className="w-4" /> Dark Mode
        </>
      )}
    </button>
  );
}
