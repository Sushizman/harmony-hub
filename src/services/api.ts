import { ApiResponse, Genre, Song, User, UserRole } from '@/types/api';

// ⚠️ CHANGE THIS to your actual server URL
const API_BASE_URL = 'https://yourserver.com/api';

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });
    return await response.json();
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
}

// ============ AUTH ============
export const authApi = {
  login: (email: string, password: string) =>
    fetchApi<{ user: User; token: string }>('/auth/login.php', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string, role: UserRole = 'viewer') =>
    fetchApi<{ user: User }>('/auth/register.php', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    }),

  logout: () => fetchApi('/auth/logout.php', { method: 'POST' }),
};

// ============ GENRES ============
export const genresApi = {
  getAll: () => fetchApi<Genre[]>('/genres/list.php'),

  getById: (id: number) => fetchApi<Genre>(`/genres/get.php?id=${id}`),

  incrementViews: (id: number) =>
    fetchApi(`/genres/view.php?id=${id}`, { method: 'POST' }),
};

// ============ SONGS ============
export const songsApi = {
  getByGenre: (genreId: number) =>
    fetchApi<Song[]>(`/songs/list.php?genre_id=${genreId}`),

  // Contributor: Submit a new song
  submit: (song: Omit<Song, 'id' | 'status' | 'created_at'>) =>
    fetchApi<Song>('/songs/submit.php', {
      method: 'POST',
      body: JSON.stringify(song),
    }),

  // Admin: Get pending songs
  getPending: () => fetchApi<Song[]>('/songs/pending.php'),

  // Admin: Approve/reject song
  updateStatus: (id: number, status: 'approved' | 'rejected') =>
    fetchApi(`/songs/status.php`, {
      method: 'POST',
      body: JSON.stringify({ id, status }),
    }),
};

// ============ USERS (Admin only) ============
export const usersApi = {
  getAll: () => fetchApi<User[]>('/users/list.php'),
  
  updateRole: (userId: number, role: UserRole) =>
    fetchApi('/users/role.php', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, role }),
    }),
};
