// trackType.ts
import { User } from "./user";

export interface Track {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date | null;
  duration: number;
  music_genre: string;
  filepath: string;
  author: User;
  authorId: number;
  downloadedByUsers: { id: number; pseudo: string }[];
  favoritedByUsers: { id: number; pseudo: string }[];
}

export interface TrackRead {
  id: number;
  title: string;
  created_at: Date;
  updated_at?: Date | null;
  duration: number;
  music_genre: string;
  authorId: number;
}

export interface TrackShortRead {
  id: number;
  title: string;
  created_at: Date;
  duration: number;
  music_genre: string;
  authorId: number;
}

export interface TrackDelete {
  id: number;
  title: string;
  created_at: Date;
}
