// API Configuration
export const API_BASE_URL = 'http://localhost:3001/api';

// Authentication endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
};

// Election endpoints
export const ELECTION_ENDPOINTS = {
  LIST: `${API_BASE_URL}/elections`,
  CREATE: `${API_BASE_URL}/elections`,
  VOTE: (id: string) => `${API_BASE_URL}/elections/${id}/vote`,
  RESULTS: (id: string) => `${API_BASE_URL}/elections/${id}/results`,
};

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
  CANDIDATES: `${API_BASE_URL}/users/candidates`,
  ALL_USERS: `${API_BASE_URL}/users`,
};