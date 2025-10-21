import { Request, Response } from "express";
import { TrackService } from "../services/track";
export interface Track {
  id: number;
  name: string;
  duration: number;
}

// get all tracks // DONE
export async function get_all_tracks(req: Request, res: Response) {
  try {
    const results = TrackService.getAllTracks();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tracks in database" });
  }
}

// update track // DONE
export async function update_track(req: Request, res: Response) {
  const trackId = req.params.id;
  const { tracktitle } = req.body.trackname; // Assuming the new name is sent in the request body
  const { user_id } = req.body;
  if (!trackId) {
    console.error("Error getting track id");
  }
  if (!user_id) {
    console.error("Error getting track id");
  }
  try {
    const updateResult = TrackService.UpdateTrack(trackId, tracktitle);
  } catch (error) {}
}
