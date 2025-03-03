import { httpService } from "../../utilities/httpService";
import {mongoDBService} from '../../utilities/dbService'
import { TrackModel } from './trackModel'


class TracksService {
    async getTopTracks(accessToken:string) {
        const url = process.env.SPOTIFY_TRACK_URL as string
        return await httpService.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
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
           console.log("Error occured while inserting track data into DB")
        }


    }

}


export const tracksService = new TracksService();