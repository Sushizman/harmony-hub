import { useState } from 'react';
import { ArrowLeft, Check, X, Clock, Music, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PendingSong {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre: string;
  submittedBy: string;
  submittedAt: string;
}

// Mock data - replace with API call
const mockPendingSongs: PendingSong[] = [
  { id: 1, title: 'Summer Vibes', artist: 'DJ Cool', duration: '3:24', genre: 'Electronic', submittedBy: 'user@example.com', submittedAt: '2024-01-15' },
  { id: 2, title: 'Midnight Jazz', artist: 'Jazz Quartet', duration: '5:12', genre: 'Jazz', submittedBy: 'contributor@example.com', submittedAt: '2024-01-14' },
  { id: 3, title: 'Rock Anthem', artist: 'The Rockers', duration: '4:01', genre: 'Rock', submittedBy: 'music@example.com', submittedAt: '2024-01-13' },
];

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [pendingSongs, setPendingSongs] = useState<PendingSong[]>(mockPendingSongs);
  const { toast } = useToast();

  const handleApprove = async (id: number) => {
    // await songsApi.updateStatus(id, 'approved');
    setPendingSongs(prev => prev.filter(song => song.id !== id));
    toast({ title: 'Song approved', description: 'The song is now visible to users.' });
  };

  const handleReject = async (id: number) => {
    // await songsApi.updateStatus(id, 'rejected');
    setPendingSongs(prev => prev.filter(song => song.id !== id));
    toast({ title: 'Song rejected', description: 'The contributor will be notified.' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Review and approve music submissions</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingSongs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rejected Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Pending Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingSongs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No pending submissions</p>
          ) : (
            <div className="space-y-4">
              {pendingSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                      <Music className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{song.title}</h3>
                      <p className="text-sm text-muted-foreground">{song.artist} • {song.duration}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{song.genre}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {song.submittedBy}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-500 hover:text-green-600 hover:bg-green-500/10"
                      onClick={() => handleApprove(song.id)}
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                      onClick={() => handleReject(song.id)}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
