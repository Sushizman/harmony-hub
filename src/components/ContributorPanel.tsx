import { useState } from 'react';
import { Plus, Music, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const genres = [
  { id: 1, name: 'Pop' },
  { id: 2, name: 'Hip-Hop' },
  { id: 3, name: 'Rock' },
  { id: 4, name: 'Electronic' },
  { id: 5, name: 'R&B' },
  { id: 6, name: 'Jazz' },
  { id: 7, name: 'Classical' },
  { id: 8, name: 'Country' },
];

const ContributorPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');
  const [genreId, setGenreId] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    // This would call your PHP API
    // For now, simulating the submission
    try {
      // await songsApi.submit({ title, artist, duration, genre_id: parseInt(genreId), cover_url: coverUrl, submitted_by: user.id });
      
      toast({
        title: 'Song submitted!',
        description: 'Your submission is pending admin approval.',
      });
      
      setIsOpen(false);
      setTitle('');
      setArtist('');
      setDuration('');
      setGenreId('');
      setCoverUrl('');
    } catch {
      toast({
        title: 'Submission failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Submit Music
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="w-5 h-5" />
            Submit New Song
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Song Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="artist" className="flex items-center gap-1">
              <User className="w-3 h-3" /> Artist
            </Label>
            <Input
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Artist name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> Duration
            </Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="3:45"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="genre">Genre</Label>
            <Select value={genreId} onValueChange={setGenreId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image URL (optional)</Label>
            <Input
              id="cover"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit for Review'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContributorPanel;
