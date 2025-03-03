import { Request, Response } from "express";
import { authService } from "../auth/authService";

export const login = async (req: Request, res: Response) => {
  const authUrl = authService.getAuthUrl();
  res.redirect(authUrl);
};

export const callback = async (req: Request, res: Response): Promise<void> => {//Promise<void> because res.json() returns data to the client directly. This function does not return anything!
  const code = req.query.code as string;
  if (!code) {
    res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    const { access_token, refresh_token } = await authService.exchangeCodeForToken(code);
    const jwt_token = await authService.generateJwtToken(access_token, refresh_token)//Create a JWT token from receieved tokens
    console.log(`Spotify access token: ${access_token}, \n generated JWT token: ${jwt_token}`)
    res.json({ jwt_token });
  } catch (error) {
    console.error("Error fetching access token:", error);
    res.status(500).json({ error: "Failed to get access token" });
  }
};