import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl font-light">{title}</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="relative"
          >
            <BellIcon className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
              3
            </span>
          </Button>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <UserNav />
        </div>
      </div>
    </header>
  );
}