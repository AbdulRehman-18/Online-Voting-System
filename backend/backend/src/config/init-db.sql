-- Create database if not exists
CREATE DATABASE IF NOT EXISTS voting_system;
USE voting_system;

-- Users table
CREATE TABLE IF NOT EXISTS Users (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'voter', 'candidate') NOT NULL DEFAULT 'voter',
  avatar VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Elections table
CREATE TABLE IF NOT EXISTS Elections (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  status ENUM('upcoming', 'active', 'completed') NOT NULL DEFAULT 'upcoming',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Election Candidates junction table
CREATE TABLE IF NOT EXISTS ElectionCandidates (
  electionId CHAR(36) NOT NULL,
  userId CHAR(36) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (electionId, userId),
  FOREIGN KEY (electionId) REFERENCES Elections(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Votes table
CREATE TABLE IF NOT EXISTS Votes (
  electionId CHAR(36) NOT NULL,
  userId CHAR(36) NOT NULL,
  candidateId CHAR(36) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (electionId, userId),
  FOREIGN KEY (electionId) REFERENCES Elections(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (candidateId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Insert default admin user
INSERT INTO Users (id, name, email, password, role)
VALUES (
  UUID(),
  'Admin User',
  'admin@votera.com',
  -- Default password: admin123 (hashed)
  'admin123',
  'admin'
)
ON DUPLICATE KEY UPDATE id=id;