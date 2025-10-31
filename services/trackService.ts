import { PrismaClient } from "@prisma/client";
import { Track } from "../track";

const prisma = new PrismaClient();

// methods in TrackService
export class TrackService {
  // update a track
  static async updateTrack(
    track_id: number,
    track_title: string
  ): Promise<Track> {
    try {
      const updatedTrack: Track = await prisma.tracks.update({
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
    const tracks = await prisma.track.findMany();
    return tracks;
  }

  // delete user
  static async deleteTrack(trackId: number): Promise<Track> {
    try {
      const deletedTrack: Track = await prisma.track.delete({
        where: { id: trackId },
      });
      return deletedTrack;
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  }
}
