// trackController.ts

import { Request, Response } from "express";
import { TrackService } from "../services/trackService";
import { Track, TrackRead, TrackDelete } from "../../types/track";

export class TrackController {
  // get all tracks
  static async getAllTracks(req: Request, res: Response): Promise<Response> {
    try {
      const results = await TrackService.getAllTracksService();
      return res.status(200).json(results);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error fetching tracks in database" });
    }
  }

  // add a track
  static async addTrack(req: Request, res: Response): Promise<Response> {
    const { title, filepath, author, music_genre, duration } = req.body;
    if (!title || !filepath || !author || !music_genre || !duration) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      const newTrack = await TrackService.createTrackService(
        title,
        filepath,
        author,
        music_genre,
        duration
      );
      return res.status(200).json(newTrack);
    } catch (error) {
      return res.status(500).json({ error: "Error creating track" });
    }
  }

  // update track by id
  static async updateTrackController(req: Request, res: Response) {
    const trackId = parseInt(req.params.id);
    const { tracktitle } = req.body;
    if (!trackId) {
      console.error("Error getting track id");
    }
    try {
      const updatedTrack = await TrackService.updateTrackService(
        trackId,
        tracktitle
      );
      res.status(200).json(updatedTrack);
    } catch (error) {
      res.status(500).json({ error: "Error updating track" });
    }
  }

  // delete track by id
  static async deleteTrackController(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { trackid } = req.params;
    try {
      const deletedTrack = await TrackService.deleteTrackService(
        Number(trackid)
      );
      return res.status(200).json(deletedTrack);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error deleting tracks in database" });
    }
  }
}
