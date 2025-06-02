# Voting System Backend

This is the backend server for the Voting System application built with Node.js, Express, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Database Setup**
   - Create a MySQL database named 'voting_system'
   - Update the database configuration in `.env` file if needed

3. **Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the variables as needed:
     - `PORT`: Server port (default: 5000)
     - `DB_NAME`: Database name
     - `DB_USER`: Database username
     - `DB_PASSWORD`: Database password
     - `DB_HOST`: Database host
     - `JWT_SECRET`: Secret key for JWT tokens
     - `FRONTEND_URL`: URL of the frontend application

4. **Start the Server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Elections
- `GET /api/elections` - Get all elections
- `POST /api/elections` - Create new election (Admin only)
- `POST /api/elections/:electionId/vote` - Cast vote
- `GET /api/elections/:electionId/results` - Get election results (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/candidates` - Get candidate list

## Database Schema

### Users
- id (UUID)
- name (String)
- email (String, unique)
- password (String, hashed)
- role (Enum: 'admin', 'voter', 'candidate')
- avatar (String, optional)

### Elections
- id (UUID)
- title (String)
- description (Text)
- startDate (Date)
- endDate (Date)
- status (Enum: 'upcoming', 'active', 'completed')

### Votes
- electionId (UUID)
- userId (UUID)
- candidateId (UUID)

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- Input validation
- CORS protection