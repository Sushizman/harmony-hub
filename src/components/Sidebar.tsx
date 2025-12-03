import { Home, Search, Library, Heart, PlusCircle, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Search" },
    { icon: Library, label: "Library" },
  ];

  const playlists = [
    { name: "Liked Songs", count: 248 },
    { name: "Chill Vibes", count: 34 },
    { name: "Workout Mix", count: 56 },
    { name: "Late Night", count: 42 },
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

      {/* Divider */}
      <div className="my-6 mx-6 h-px bg-border" />

      {/* Playlists */}
      <div className="flex-1 px-3 overflow-y-auto">
        <div className="flex items-center justify-between mb-4 px-3">
          <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Playlists
          </span>
          <Button variant="ghost" size="iconSm" className="text-muted-foreground hover:text-foreground">
            <PlusCircle className="w-4 h-4" />
          </Button>
        </div>

        <ul className="space-y-1">
          <li>
            <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Heart className="w-4 h-4 text-foreground" fill="currentColor" />
              </div>
              Liked Songs
            </Button>
          </li>
          {playlists.slice(1).map((playlist) => (
            <li key={playlist.name}>
              <Button variant="ghost" className="w-full justify-start gap-3 h-10 text-muted-foreground hover:text-foreground">
                <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-xs font-semibold">
                  {playlist.count}
                </div>
                {playlist.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
