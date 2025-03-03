import { httpService } from "../../utilities/httpService";
import { mongoDBService } from '../../utilities/dbService'
import { TrackModel } from './trackModel'
import { CustomError } from "../../utilities/customError";


class TracksService {
    async getTopTracks(accessToken: string) {
        try {
            const url = process.env.SPOTIFY_TRACK_URL as string
            return await httpService.get(url, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
        } catch (error: any) {
            throw new CustomError("Failed to get top track data.", 500);
        }
    }

    async getAdviceForTrack(trackName: string) {
        const sanitizedTrackName = trackName.split(" ")[0].toLowerCase();
        const url = `https://api.adviceslip.com/advice/search/${sanitizedTrackName}`;
        return await httpService.get(url);
    }

    async saveTrackData(userId: string, track: any, advice: string) {

        try {
            const record = {
                user_id: userId,
                track: { name: track.name, artist: track.artists[0].name },
                advice,
                searched_at: new Date(),
            };

            await mongoDBService.insertOne(TrackModel, record);
            return record
        } catch (error: any) {
            throw new CustomError("Failed to save track data.", 500);
        }


    }

}


export const tracksService = new TracksService();