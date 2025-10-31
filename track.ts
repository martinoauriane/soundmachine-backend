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
  downloadedByUsers: User[];
  favoritedByUsers: User[];
}

export interface TrackRead {
  id: number;
  title: string;
  created_at: Date;
  updated_at?: Date | null;
  duration: number;
  music_genre: string;
  filepath: string;
  authorId: number;
}
