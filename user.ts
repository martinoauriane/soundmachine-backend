import type { Track } from "./track";

export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  pseudo?: string;
  email: string;
  authenticationToken?: string | null;
  password: string;
  uploadedTracks?: Track[];
  downloadedTracks?: Track[];
  favoriteTracks?: Track[];
  followers?: User[];
  following?: User[];
}
