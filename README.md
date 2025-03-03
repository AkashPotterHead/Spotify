# Backend Architecture

## Overview
This backend service integrates with the Spotify API to fetch user-specific track data, retrieves advice based on the track name from the Advice Slip API, and stores the results in MongoDB. It follows a modular structure with separate layers for routing, controllers, services, middleware, and database interactions.

## Project Structure

backend/
│── src/
│   ├── controllers/        # Handles HTTP requests and responses
│   ├── services/           # Business logic implementation
│   ├── middleware/         # Middleware for authentication and validation
│   ├── database/           # MongoDB connection and queries
│   ├── routes/             # API route definitions
│   ├── models/             # Mongoose schemas for MongoDB
│   ├── utils/              # Utility functions and helpers
│   ├── app.ts              # Express app configuration
│   ├── server.ts           # Server entry point
│── .env                    # Environment variables
│── package.json            # Dependencies and scripts
│── README.md               # Documentation


## Core Components

### 1. Authentication Module
Handles Spotify authentication using OAuth 2.0:
- Login Route: Redirects users to Spotify's authentication page.
- Callback Route: Exchanges authorization code for an access token.
- Middleware: Validates the access token.

### 2. Tracks Module
- Fetches a user’s top track from Spotify based on their user ID.
- Retrieves relevant advice based on the track name from the Advice Slip API.
- Stores the retrieved data in MongoDB.

### 3. Database Module
- Uses Mongoose to manage MongoDB connections and queries.
- Provides a generic database service for interacting with collections.

### 4. HTTP Service
- A wrapper around `axios` for making HTTP requests to external APIs.
- Provides generic methods: `get`, `post`, `put`, `delete`.

### 5. Error Handling
- Centralized error handling middleware.
- API failures (e.g., invalid user ID, rate limits) return appropriate status codes and messages.

## API Endpoints

### Authentication

GET /auth/login       # Redirects to Spotify login
GET /auth/callback    # Handles Spotify callback and retrieves access token


### Tracks

GET /tracks/:user_id  # Fetches user's top track from Spotify


## Environment Variables
Create a `.env` file with the following values:

SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_AUTH_URL=https://accounts.spotify.com/authorize
SPOTIFY_TOKEN_URL=https://accounts.spotify.com/api/token
REDIRECT_URI=http://localhost:3000/auth/callback
MONGO_URI=mongodb://localhost:27017/your_db_name


## Running the Project
1. Install dependencies:
   sh
   npm install
   
2. Start the server:
   sh
   npm start
   
3. The API is now available at `http://localhost:3000`

## Future Improvements
- Implement caching to reduce API calls.
- Enhance security with JWT authentication.
- Add unit tests for services and controllers.

