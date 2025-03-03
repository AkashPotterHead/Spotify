import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './modules/auth/authRoutes';
import trackRouter from './modules/tracks/trackRoutes';
import { mongoDBService } from './utilities/dbService'
import {authenticateToken} from './middlewares/authenticateToken'
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json()); // Middleware to parse JSON
mongoDBService.connect();
//console.log(`Database: ${mongoDBService.getDatabase()}`)
app.use('/auth', authRouter); // Mount API route
app.use('/track',authenticateToken,trackRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
