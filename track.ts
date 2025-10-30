import { User } from "./user";

export interface Track {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
  duration: number;
  music_genre: string;
  filepath: string;
  author: User;
  authorId: number;
}
