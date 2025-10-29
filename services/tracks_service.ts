import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// methods in TrackService
export class TrackService {
  // update a track
  static async updateTrack(track_id: number, track_title: string) {
    try {
      const updatedTrack = await prisma.tracks.update({
        where: { id: track_id },
        data: { title: track_title },
      });
      return updatedTrack;
    } catch (error) {
      console.error("Error while attempting to update track", error);
      throw new Error("Impossible to upload track");
    }
  }
  // retrieve all tracks
  static async getAllTracks() {
    const tracks = await prisma.tracks.findMany();
    return tracks;
  }
}
