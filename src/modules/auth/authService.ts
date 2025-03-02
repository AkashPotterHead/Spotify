import qs from "qs";
import { httpService } from "../../utilities/httpService";
import { TokenResponse } from './authTypes'

class AuthService {
    getAuthUrl(): string {
        return `${process.env.SPOTIFY_AUTH_URL}?${qs.stringify({
            response_type: "code",
            client_id: process.env.SPOTIFY_CLIENT_ID,
            redirect_uri: process.env.REDIRECT_URI,
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
            }),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        );
    }
}

export const authService = new AuthService();
