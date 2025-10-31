import { Request, Response } from "express";
import { TrackService } from "../services/trackService";

export class TrackController {
  // update track
  static async updateTrack(req: Request, res: Response) {
    const trackId = parseInt(req.params.id);
    const { tracktitle } = req.body.trackname; // Assuming the new name is sent in the request body
    const { user_id } = req.body;
    if (!trackId) {
      console.error("Error getting track id");
    }
    if (!user_id) {
      console.error("Error getting track id");
    }
    try {
      const updatedTrack = TrackService.updateTrack(trackId, tracktitle);
      res.status(200).json(updatedTrack);
    } catch (error) {
      res.status(500).json({ error: "Error updating track" });
    }
  }

  // add a track
  static async addTrack(req: Request, res: Response) {}

  // get all tracks
  static async getAllTracks(req: Request, res: Response) {
    try {
      const results = TrackService.getAllTracks();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: "Error fetching tracks in database" });
    }
  }

  // delete track by id
  static async deleteTrack(req: Request, res: Response) {
    const { trackId } = req.body;
    try {
      const deletedTrack = TrackService.deleteTrack(trackId);
      res.status(200).json(deletedTrack);
    } catch (error) {
      res.status(500).json({ error: "Error deleting tracks in database" });
    }
  }
}
