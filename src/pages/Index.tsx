import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, LogOut, Shield } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import GenreCard from "@/components/GenreCard";
import GenreDetail from "@/components/GenreDetail";
import NowPlayingBar from "@/components/NowPlayingBar";
import Header from "@/components/Header";
import ContributorPanel from "@/components/ContributorPanel";
import AdminDashboard from "@/pages/AdminDashboard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

import albumCover1 from "@/assets/album-cover-1.jpg";

const Index = () => {
  const [selectedGenre, setSelectedGenre] = useState<typeof genres[0] | null>(null);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const { user, logout, isAdmin, isContributor } = useAuth();

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

  const genres = [
    { id: 1, name: "Pop", image: undefined, views: 12450, rating: 4 },
    { id: 2, name: "Hip-Hop", image: undefined, views: 18920, rating: 5 },
    { id: 3, name: "Rock", image: undefined, views: 9340, rating: 4 },
    { id: 4, name: "Electronic", image: undefined, views: 15670, rating: 5 },
    { id: 5, name: "R&B", image: undefined, views: 8120, rating: 4 },
    { id: 6, name: "Jazz", image: undefined, views: 5430, rating: 3 },
    { id: 7, name: "Classical", image: undefined, views: 4210, rating: 4 },
    { id: 8, name: "Country", image: undefined, views: 6780, rating: 3 },
  ];

  const handleGenreClick = (genre: typeof genres[0]) => {
    setSelectedGenre({ ...genre, views: genre.views + 1 });
  };

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

              {/* Music Genres */}
              <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {genres.map((genre) => (
                    <GenreCard
                      key={genre.id}
                      name={genre.name}
                      image={genre.image}
                      views={genre.views}
                      rating={genre.rating}
                      onClick={() => handleGenreClick(genre)}
                    />
                  ))}
                </div>
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
