import React, { useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useThemeStore, applyTheme } from "@/context/theme-store";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={theme === "light" ? "bg-secondary" : ""}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "bg-secondary" : ""}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Dark mode</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("system")}
        className={theme === "system" ? "bg-secondary" : ""}
      >
        <Monitor className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">System mode</span>
      </Button>
    </div>
  );
}