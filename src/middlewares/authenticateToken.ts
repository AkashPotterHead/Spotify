import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { httpService } from "../utilities/httpService";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateToken = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Decode the JWT to extract the Spotify access token
        const decoded = jwt.verify(token, JWT_SECRET) as { accessToken: string };
        const spotifyAccessToken = decoded.accessToken;

        // Make request to Spotify API with the extracted token
        const userData:any =  await httpService.get(process.env.SPOTIFY_ME_URL as string, {
            headers: { Authorization: `Bearer ${spotifyAccessToken}` }
        });

        // Store the Spotify access token in request for future use
        req.headers.accessToken = spotifyAccessToken;
        req.headers.userId = userData?.id
        next();
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }
};
