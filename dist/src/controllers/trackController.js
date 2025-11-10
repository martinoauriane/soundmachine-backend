// trackController.ts
import { TrackService } from "../services/trackService";
export class TrackController {
    // get all tracks
    static async getAllTracks(req, res) {
        try {
            const results = await TrackService.getAllTracksService();
            return res.status(200).json(results);
        }
        catch (error) {
            return res
                .status(500)
                .json({ error: "Error fetching tracks in database" });
        }
    }
    // add a track
    static async addTrack(req, res) {
        const { title, filepath, author, music_genre, duration } = req.body;
        if (!title || !filepath || !author || !music_genre || !duration) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        try {
            const newTrack = await TrackService.createTrackService(title, filepath, author, music_genre, duration);
            return res.status(200).json(newTrack);
        }
        catch (error) {
            return res.status(500).json({ error: "Error creating track" });
        }
    }
    // update track by id
    static async updateTrackController(req, res) {
        const trackId = parseInt(req.params.id);
        const { tracktitle } = req.body;
        if (!trackId) {
            console.error("Error getting track id");
        }
        try {
            const updatedTrack = await TrackService.updateTrackService(trackId, tracktitle);
            res.status(200).json(updatedTrack);
        }
        catch (error) {
            res.status(500).json({ error: "Error updating track" });
        }
    }
    // delete track by id
    static async deleteTrackController(req, res) {
        const { trackid } = req.params;
        try {
            const deletedTrack = await TrackService.deleteTrackService(Number(trackid));
            return res.status(200).json(deletedTrack);
        }
        catch (error) {
            return res
                .status(500)
                .json({ error: "Error deleting tracks in database" });
        }
    }
}
