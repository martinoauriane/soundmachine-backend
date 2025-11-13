// trackController.ts

import { Request, Response } from "express";
import { TrackService } from "../services/trackService";
import { TrackShortRead, TrackRead, TrackDelete } from "../../types/track";

export class TrackController {
  // add a track
  static async addTrack(req: Request, res: Response): Promise<Response> {
    const { title, filepath, author, music_genre, duration } = req.body;
    if (!title || !filepath || !author || !music_genre || !duration) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const durationLength = Number(duration);
    const authorID = Number(author);
    try {
      const newTrack: TrackShortRead | undefined =
        await TrackService.createTrackService(
          title,
          filepath,
          authorID,
          music_genre,
          durationLength
        );
      return res.status(201).json(newTrack);
    } catch (error) {
      return res.status(500).json({ error: "Error creating track" });
    }
  }

  // get tracks
  // pagination only gets 10, 20, 50 tracks at time.
  // (lazy loading) => data is charged progressively.
  static async getSomeTracksController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const page = Number(req.query.page) || 1;
      const items = Number(req.query.items) || 20;
      const { paginatedTracks, currentPage, totalPages } =
        await TrackService.getSomeTracks(page, items);
      return res.status(200).json({
        tracks: paginatedTracks,
        currentPage: currentPage,
        totalPages: totalPages,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error fetching tracks in database" });
    }
  }

  // update track by id
  static async updateTrackController(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { trackTitle } = req.body;
    const trackID = Number(req.params.id);
    if (!trackID || Number.isNaN(trackID))
      return res.status(400).json("Track ID error");
    try {
      const updatedTrack: TrackRead = await TrackService.updateTrackService(
        trackID,
        trackTitle
      );
      return res.status(200).json(updatedTrack);
    } catch (error) {
      return res.status(500).json({ error: "Error updating track" });
    }
  }

  // delete track by id
  static async deleteTrackController(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { trackID } = req.params;
    if (!trackID || Number.isNaN(Number(trackID)))
      return res.status(400).json("Track ID error");
    try {
      const deletedTrack: TrackDelete = await TrackService.deleteTrackService(
        Number(trackID)
      );
      return res.status(200).json(deletedTrack);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error deleting tracks in database" });
    }
  }
}
