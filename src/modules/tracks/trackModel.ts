import mongoose, { Schema, Document } from "mongoose";

 interface TrackRecord extends Document {
    user_id: string;
    track: { name: string; artist: string };
    advice: string;
    searched_at: Date;
}


const trackSchema = new Schema<TrackRecord>({
    user_id: { type: String, required: true },
    track: { name: { type: String, required: true }, artist: { type: String, required: true } },
    advice: { type: String, required: true },
    searched_at: { type: Date, default: Date.now }
});


export const TrackModel = mongoose.model<TrackRecord>("Track", trackSchema);