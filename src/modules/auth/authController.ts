import { NextFunction, Request, Response } from "express";
import { authService } from "../auth/authService";
import { CustomError } from "../../utilities/customError";

export const login = async (req: Request, res: Response) => {
  const authUrl = authService.getAuthUrl();
  res.redirect(authUrl);
};

export const callback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {//Promise<void> because res.json() returns data to the client directly. This function does not return anything!
  try {
    const code = req.query.code as string;
    if (!code) {
      throw new CustomError("Authorization code is missing", 500);
    }

    const { access_token, refresh_token } = await authService.exchangeCodeForToken(code);
    const jwt_token = await authService.generateJwtToken(access_token, refresh_token)//Create a JWT token from receieved tokens
    console.log(`Spotify access token: ${access_token}, \n generated JWT token: ${jwt_token}`)
    res.json({ jwt_token });
  } catch (error) {
    next(error)
  }
};