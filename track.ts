import { User } from "./user";

export interface Track {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
  duration: Date;
  music_genre: string;
  author: User;
  authorId: number;
  filepath: string;
}
