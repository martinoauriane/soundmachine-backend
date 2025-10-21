import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TrackService {
  static async updateTrack(track_id: number, track_title: string) {
    try {
      const updatedTrack = await prisma.tracks.update({
        where: { id: track_id },
        data: { title: track_title },
      });

      return updatedTrack;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du track :", error);
      throw new Error("Impossible de mettre à jour le track.");
    }
  }

  static async getAllTracks() {
    const tracks = await prisma.tracks.findMany();
    return tracks;
  }
}
