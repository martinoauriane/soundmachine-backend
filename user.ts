import type { Track } from "./track";

export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  pseudo?: string;
  email: string;
  password: string;
  authenticationToken?: string | null;
  uploadTracks?: Track[];
  downloadedTracks?: Track[];
}
