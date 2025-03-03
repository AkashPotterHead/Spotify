import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { CustomError } from "../utilities/customError";

export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction): any => {
    console.error(err.message);

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
};
