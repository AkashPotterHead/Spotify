import { Request, Response,NextFunction } from "express";
import { tracksService } from "./trackService";
import { CustomError } from "../../utilities/customError";

class TracksController {
  async getTracks(req: Request, res: Response,next: NextFunction): Promise<void> {
    try {

      const topTrackResponse: any = await tracksService.getTopTracks(req?.headers?.accessToken as string);
      if (!topTrackResponse?.items || topTrackResponse?.items.length === 0) {
       throw new CustomError("No track found for user.", 404);
      }

      const topTrack = topTrackResponse.items[0];
      const adviceResponse: any = await tracksService.getAdviceForTrack(topTrack.name);
      const advice = adviceResponse.slips ? adviceResponse.slips[0].advice : "No relevant advice found.";
      const userId = req?.headers?.userId as string
      const savedRecord = await tracksService.saveTrackData(userId, topTrack, advice);
      res.json(savedRecord);
    } catch (error) {
      next(error);//Link the error to the global error handling middleware
    }
  }
}

export const tracksController = new TracksController();