import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './modules/auth/authRoutes';

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use('/auth', authRouter); // Mount API routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
