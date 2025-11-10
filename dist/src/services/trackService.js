// trackService.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class TrackService {
    // create track
    static async createTrackService(title, filepath, author, music_genre, duration) {
        try {
            const createdTrack = await prisma.track.create({
                data: {
                    title: title,
                    filepath: filepath,
                    authorId: author,
                    music_genre: music_genre,
                    duration: duration,
                },
            });
            return createdTrack;
        }
        catch (error) {
            console.error("Error while attempting to update track", error);
        }
    }
    // update track in db
    static async updateTrackService(track_id, track_title) {
        try {
            const updatedTrack = await prisma.track.update({
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
        }
        catch (error) {
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
    static async deleteTrackService(trackId) {
        try {
            const deletedTrack = await prisma.track.delete({
                where: { id: trackId },
                select: {
                    id: true,
                    title: true,
                    created_at: true,
                },
            });
            return deletedTrack;
        }
        catch (error) {
            console.error("Failed to delete user:", error);
            throw error;
        }
    }
}
