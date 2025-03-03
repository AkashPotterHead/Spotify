# Backend Architecture

## Overview
This backend service integrates with the Spotify API to fetch user-specific track data, retrieves advice based on the track name from the Advice Slip API, and stores the results in MongoDB. It follows a modular structure with separate layers for routing, controllers, services, middleware, and database interactions.

## Project Structure
├── src
│   ├── modules
│   │  ├────auth
          ├──authController.ts  # Module that handles auth related services
          ├──authRoutes.ts
          ├──authService.ts
          ├──authTypes.ts
       ├─────tracks  # Module that handles track related services
          ├──trackController.ts 
          ├──trackRoutes.ts
          ├──trackService.ts
          ├──trackModel.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts  # Validates access tokens
│   │   ├── errorHandler.ts    # Centralized error handling
│   ├── utilities
│   │   ├── customError.ts  # Creates custom errors
│   │   ├── dbService.ts    # Singleton service for MongoDB operations
│   │   ├── httpService.ts  # Generic HTTP client wrapper using Axios
│   ├── index.ts           # Main application entry point


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

GET /tracks/top  # Fetches user's top track from Spotify


## Environment Variables
Create a `.env` file with the following values:

SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_AUTH_URL=https://accounts.spotify.com/authorize
SPOTIFY_TOKEN_URL=https://accounts.spotify.com/api/token
REDIRECT_URI=http://localhost:3000/auth/callback
MONGO_URI=mongodb://localhost:27017/your_db_name
PORT=4000
JWT_SECRET=
JWT_EXPIRATION=1h
SPOTIFY_ME_URL=https://api.spotify.com/v1/me
SPOTIFY_TRACK_URL=https://api.spotify.com/v1/me/top/tracks?time_range=long_term
SPOTIFY_TOKEN_SCOPE=user-top-read
REDIRECT_URI=http://localhost:4000/auth/callback
MONGO_URI=


## Running the Project
1. Install dependencies:
   sh
   npm install
   
2. Start the server:
   sh
   npm run start
   
3. The API is now available at `http://localhost:4000`

## Future Improvements
- Implement caching to reduce API calls.
- Define Types for data in service layer.
- Add unit tests for services and controllers.
- Auto Token Regeneration Mechanism by using a separate service

