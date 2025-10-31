import type { Track, TrackRead } from "./track";

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
  authenticationToken?: string | null;
  password: string;
  uploadedTracks?: Track[];
  downloadedTracks?: Track[];
  favoriteTracks?: Track[];
  followers?: User[];
  following?: User[];
}

export interface UserCreate {
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
  password: string;
}

export interface UserRead {
  id: number;
  firstname: string;
  lastname: string;
  pseudo: string;
  uploadedTracks: TrackRead[];
  downloadedTracks: TrackRead[];
  favoriteTracks: TrackRead[];
  followers: {
    id: number;
    firstname: string;
    lastname: string;
    pseudo: string;
  }[];
  following: {
    id: number;
    firstname: string;
    lastname: string;
    pseudo: string;
  }[];
}

export interface UserUpdate {
  firstname: string;
  lastname: string;
  pseudo: string;
  password: string;
}
