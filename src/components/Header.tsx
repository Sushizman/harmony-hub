import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const handleLogout = () => {
    // Logout functionality placeholder
    console.log("Logout clicked");
  };

  return (
    <header className="flex items-center justify-end p-4">
      <Button
        variant="ghost"
        className="gap-2 text-muted-foreground hover:text-foreground"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4" />
        Logout
      </Button>
    </header>
  );
};

export default Header;
