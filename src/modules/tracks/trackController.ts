import { Request, Response } from "express";
import { tracksService } from "./trackService";

class TracksController {
  async getTracks(req: Request, res: Response): Promise<void> {
    try {

      const topTrackResponse: any = await tracksService.getTopTracks(req?.headers?.accessToken as string);
      if (!topTrackResponse?.items || topTrackResponse?.items.length === 0) {
        res.status(404).json({ error: "No top track found for this user." });
        return;
      }

      const topTrack = topTrackResponse.items[0];
      const adviceResponse: any = await tracksService.getAdviceForTrack(topTrack.name);
      const advice = adviceResponse.slips ? adviceResponse.slips[0].advice : "No relevant advice found.";
      const userId = req?.headers?.userId as string
      const savedRecord = await tracksService.saveTrackData(userId, topTrack, advice);
      res.json(savedRecord);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch track details" });
    }
  }
}

export const tracksController = new TracksController();