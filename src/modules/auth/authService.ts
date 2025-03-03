import qs from "qs";
import { httpService } from "../../utilities/httpService";
import jwt from 'jsonwebtoken';
import { TokenResponse } from './authTypes'

class AuthService {
    getAuthUrl(): string {
        return `${process.env.SPOTIFY_AUTH_URL}?${qs.stringify({
            response_type: "code",
            client_id: process.env.SPOTIFY_CLIENT_ID,
            redirect_uri: process.env.REDIRECT_URI,
            scope:process.env.SPOTIFY_TOKEN_SCOPE
        })}`;
    }

    async exchangeCodeForToken(code: string): Promise<TokenResponse> {
        return httpService.post<TokenResponse>(
            process.env.SPOTIFY_TOKEN_URL as string,
            qs.stringify({
                grant_type: "authorization_code",
                code,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
                redirect_uri: process.env.REDIRECT_URI,
                scope:process.env.SPOTIFY_TOKEN_SCOPE
            }),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );
    }

    generateJwtToken(accessToken: string, refreshToken: string): string {
        return jwt.sign(
            { accessToken, refreshToken },  // Payload
            process.env.JWT_SECRET as string,                     // Secret key
            { expiresIn: process.env.JWT_EXPIRATION }        // Set expiry (same as access token)
        );
    };
}
//
export const authService = new AuthService();
