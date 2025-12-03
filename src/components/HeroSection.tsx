import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  featuredTrack: {
    title: string;
    artist: string;
    cover: string;
    duration: string;
    plays: string;
  };
  onPlay?: () => void;
}

const HeroSection = ({ featuredTrack, onPlay }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden rounded-3xl gradient-hero">
      {/* Background blur */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={featuredTrack.cover}
          alt=""
          className="w-full h-full object-cover blur-3xl opacity-30 scale-110"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
        {/* Album Art */}
        <div className="relative group">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={featuredTrack.cover}
              alt={featuredTrack.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-primary/20 blur-2xl animate-pulse-glow" />
        </div>

        {/* Track Info */}
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary mb-4">
            FEATURED
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 animate-slide-up">
            {featuredTrack.title}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {featuredTrack.artist}
          </p>

          <div className="flex items-center justify-center md:justify-start gap-6 mb-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {featuredTrack.duration}
            </span>
            <span>{featuredTrack.plays} plays</span>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="glow" size="xl" onClick={onPlay} className="group">
              <Play className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" />
              Play Now
            </Button>
            <Button variant="outline" size="xl">
              Add to Library
            </Button>
          </div>
        </div>
      </div>

      {/* Waveform decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-center gap-1 opacity-30 pointer-events-none px-12 pb-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="w-1 bg-primary rounded-full animate-waveform"
            style={{
              height: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${0.8 + Math.random() * 0.4}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
