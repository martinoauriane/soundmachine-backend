// trackService.ts
import { PrismaClient } from "@prisma/client";
import { Track, TrackRead, TrackDelete } from "../../types/track";

const prisma = new PrismaClient();

export class TrackService {
  // create track
  static async createTrackService(
    title: string,
    filepath: string,
    author: number,
    music_genre: string,
    duration: number
  ) {
    try {
      const createdTrack: TrackRead = await prisma.track.create({
        data: {
          title: title,
          filepath: filepath,
          authorId: author,
          music_genre: music_genre,
          duration: duration,
        },
      });
      return createdTrack;
    } catch (error) {
      console.error("Error while attempting to update track", error);
    }
  }

  // update track in db
  static async updateTrackService(
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
  static async getAllTracksService() {
    const tracks = await prisma.track.findMany();
    return tracks;
  }

  // delete track
  static async deleteTrackService(trackId: number): Promise<TrackDelete> {
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
