import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, LogOut, Shield, Search } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import GenreCard from "@/components/GenreCard";
import GenreDetail from "@/components/GenreDetail";
import NowPlayingBar from "@/components/NowPlayingBar";
import Header from "@/components/Header";
import ContributorPanel from "@/components/ContributorPanel";
import AdminDashboard from "@/pages/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

import albumCover1 from "@/assets/album-cover-1.jpg";

const initialGenres = [
  { id: 1, name: "Pop", image: undefined, views: 12450, rating: 4 },
  { id: 2, name: "Rock", image: undefined, views: 9340, rating: 4 },
  { id: 3, name: "Jazz", image: undefined, views: 5430, rating: 3 },
  { id: 4, name: "Classical", image: undefined, views: 4210, rating: 4 },
  { id: 5, name: "Country", image: undefined, views: 6780, rating: 3 },
  { id: 6, name: "Reggae", image: undefined, views: 7120, rating: 4 },
  { id: 7, name: "K-Pop", image: undefined, views: 21500, rating: 5 },
  { id: 8, name: "Rap", image: undefined, views: 18920, rating: 5 },
];

const Index = () => {
  const [genres, setGenres] = useState(initialGenres);
  const [selectedGenre, setSelectedGenre] = useState<typeof genres[0] | null>(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState<string>("all");
  const { user, logout, isAdmin, isContributor, isViewer } = useAuth();
  const { toast } = useToast();

  const featuredTrack = {
    title: "Midnight Dreams",
    artist: "Aurora Waves",
    cover: albumCover1,
    duration: "4:32",
  };

  const currentTrack = {
    title: "Midnight Dreams",
    artist: "Aurora Waves",
    cover: albumCover1,
    duration: 272,
  };

  const handleGenreClick = (genre: typeof genres[0]) => {
    // Increase view count for any logged-in user
    if (user) {
      setGenres(prev => 
        prev.map(g => g.id === genre.id ? { ...g, views: g.views + 1 } : g)
      );
      setSelectedGenre({ ...genre, views: genre.views + 1 });
    } else {
      setSelectedGenre(genre);
    }
  };

  const handleRateGenre = (genreId: number, rating: number) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to rate genres.", variant: "destructive" });
      return;
    }
    if (!isViewer && !isAdmin) {
      toast({ title: "Viewers only", description: "Only viewers can rate genres.", variant: "destructive" });
      return;
    }
    setGenres(prev => 
      prev.map(g => g.id === genreId ? { ...g, rating } : g)
    );
    toast({ title: "Rating saved", description: `You rated this genre ${rating} stars.` });
  };

  // Filter genres based on search and dropdown
  const filteredGenres = genres.filter(genre => {
    const matchesSearch = genre.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterGenre === "all" || genre.name === filterGenre;
    return matchesSearch && matchesFilter;
  });

  // Show admin dashboard if admin clicks the button
  if (showAdminDashboard && isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="ml-64">
          <AdminDashboard onBack={() => setShowAdminDashboard(false)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="ml-64 pb-32">
        <Header />
        
        {/* User Bar */}
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between border-b border-border/50">
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <Badge variant="outline" className="capitalize">{user.role}</Badge>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Browse as guest</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Contributor: Show submit button */}
            {isContributor && <ContributorPanel />}
            
            {/* Admin: Show dashboard button */}
            {isAdmin && (
              <Button variant="outline" onClick={() => setShowAdminDashboard(true)} className="gap-2">
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </Button>
            )}
            
            {/* Auth buttons */}
            {user ? (
              <Button variant="ghost" onClick={logout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            ) : (
              <Button asChild variant="default" className="gap-2">
                <Link to="/auth">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 pb-8 space-y-12 mt-8">
          {selectedGenre ? (
            <GenreDetail genre={selectedGenre} onBack={() => setSelectedGenre(null)} />
          ) : (
            <>
              {/* Hero */}
              <HeroSection featuredTrack={featuredTrack} />

              {/* Search & Filter Bar */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search genres..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterGenre} onValueChange={setFilterGenre}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.name}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Music Genres */}
              <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {filteredGenres.map((genre) => (
                    <GenreCard
                      key={genre.id}
                      name={genre.name}
                      image={genre.image}
                      views={genre.views}
                      rating={genre.rating}
                      onClick={() => handleGenreClick(genre)}
                      onRate={(rating) => handleRateGenre(genre.id, rating)}
                      canRate={!!user && (isViewer || isAdmin)}
                    />
                  ))}
                </div>
                {filteredGenres.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No genres found</p>
                )}
              </section>
            </>
          )}
        </div>
      </main>

      <NowPlayingBar currentTrack={currentTrack} />
    </div>
  );
};

export default Index;
