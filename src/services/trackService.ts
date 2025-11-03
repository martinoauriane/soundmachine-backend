import { PrismaClient } from "@prisma/client";
import { Track, TrackRead, TrackDelete } from "../track";

const prisma = new PrismaClient();

export class TrackService {
  // update a track
  static async updateTrack(
    track_id: number,
    track_title: string
  ): Promise<TrackRead> {
    try {
      const updatedTrack: TrackRead = await prisma.track.update({
        where: { id: track_id },
        data: { title: track_title },
        select: {
          id: true,
          title: true,
          created_at: true,
          updated_at: true,
          duration: true,
          music_genre: true,
          authorId: true,
        },
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
  static async deleteTrack(trackId: number): Promise<TrackDelete> {
    try {
      const deletedTrack: TrackDelete = await prisma.track.delete({
        where: { id: trackId },
        select: {
          id: true,
          title: true,
          created_at: true,
        },
      });
      return deletedTrack;
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  }
}
