import { Home, Search, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Search" },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-24 w-64 bg-card/50 backdrop-blur-sm border-r border-border/50 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-primary">
            <Music2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">Harmony</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Button
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start gap-4 h-12 ${
                  item.active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
