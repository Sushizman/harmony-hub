// Types for your MySQL database entities

export type UserRole = 'viewer' | 'contributor' | 'admin';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Genre {
  id: number;
  name: string;
  color: string;
  views: number;
  rating: number;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  duration: string;
  genre_id: number;
  cover_url: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_by: number;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
