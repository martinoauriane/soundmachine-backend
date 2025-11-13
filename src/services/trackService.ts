// trackService.ts
import { PrismaClient } from "@prisma/client";
import { TrackShortRead, TrackRead, TrackDelete } from "../../types/track";

const prisma = new PrismaClient();
// query builder ORM (Object Relationnal Mapping) based on the models and attributes of the Prisma schema.

export class TrackService {
  // create track
  static async createTrackService(
    title: string,
    filepath: string,
    author: number,
    music_genre: string,
    duration: number
  ): Promise<TrackShortRead> {
    // if prisma.track.create fails, the error will be logged in the catch(error)
    try {
      const createdTrack: TrackShortRead = await prisma.track.create({
        data: {
          title: title,
          filepath: filepath,
          authorId: author,
          music_genre: music_genre,
          duration: duration,
        },
        select: {
          id: true,
          title: true,
          created_at: true,
          duration: true,
          music_genre: true,
          authorId: true,
        },
      });
      return createdTrack;
    } catch (error) {
      throw new Error(`Error attempting to create track`);
    }
  }

  // update track in db
  static async updateTrackService(
    track_id: number,
    track_title: string
  ): Promise<TrackRead> {
    try {
      // prisma.update returns null if no track was found
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
      if (updatedTrack == null)
        throw new Error(`Failed to update track ${track_title}`);
      return updatedTrack;
    } catch (error) {
      throw new Error(`Error while uploading track ${track_title}`);
    }
  }

  // retrieve tracks
  static async getSomeTracks(page: number, items: number) {
    // findMany returns an empty [] is no tracks are found
    try {
      const paginatedTracks: TrackRead[] = await prisma.track.findMany({
        skip: (page - 1) * items, // SQL OFFSET
        take: items, // how many tracks we want (<=> SQL LIMIT)
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

      const totalTracks: number = await prisma.track.count({});
      const totalPages: number = Math.ceil(totalTracks / items);
      return {
        paginatedTracks,
        currentPage: page,
        totalPages: totalPages,
      };
    } catch (error) {
      console.error("Failed to retrieve all tracks from db", error);
      throw error;
    }
  }

  // delete track
  static async deleteTrackService(trackId: number): Promise<TrackDelete> {
    // if no track is found Prisma sends a P2025 ("Record to delete does not exist.") error.
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
