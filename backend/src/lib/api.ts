import { AUTH_ENDPOINTS, ELECTION_ENDPOINTS, USER_ENDPOINTS } from './config';

// Fixed: Explicitly define return type as Record<string, string>
const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth services
  auth: {
    login: async (email: string, password: string, role: string) => {
      const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      if (!response.ok) throw new Error('Login failed');
      return response.json();
    },

    register: async (userData: any) => {
      const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Registration failed');
      return response.json();
    }
  },

  // Election services
  elections: {
    getAll: async () => {
      const response = await fetch(ELECTION_ENDPOINTS.LIST, {
        headers: getAuthHeader()  // Now compatible with HeadersInit
      });
      if (!response.ok) throw new Error('Failed to fetch elections');
      return response.json();
    },

    create: async (electionData: any) => {
      // Fixed: Spread compatible Record types
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      };

      const response = await fetch(ELECTION_ENDPOINTS.CREATE, {
        method: 'POST',
        headers,
        body: JSON.stringify(electionData)
      });
      if (!response.ok) throw new Error('Failed to create election');
      return response.json();
    },

    vote: async (electionId: string, candidateId: string) => {
      // Fixed: Consistent header type
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      };

      const response = await fetch(ELECTION_ENDPOINTS.VOTE(electionId), {
        method: 'POST',
        headers,
        body: JSON.stringify({ candidateId })
      });
      if (!response.ok) throw new Error('Failed to cast vote');
      return response.json();
    },

    getResults: async (electionId: string) => {
      const response = await fetch(ELECTION_ENDPOINTS.RESULTS(electionId), {
        headers: getAuthHeader()
      });
      if (!response.ok) throw new Error('Failed to fetch results');
      return response.json();
    }
  },

  // User services
  users: {
    getProfile: async () => {
      const response = await fetch(USER_ENDPOINTS.PROFILE, {
        headers: getAuthHeader()
      });
      if (!response.ok) throw new Error('Failed to fetch profile');
      return response.json();
    },

    updateProfile: async (profileData: any) => {
      // Fixed: Type-safe header composition
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      };

      const response = await fetch(USER_ENDPOINTS.UPDATE_PROFILE, {
        method: 'PUT',
        headers,
        body: JSON.stringify(profileData)
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    },

    getCandidates: async () => {
      const response = await fetch(USER_ENDPOINTS.CANDIDATES, {
        headers: getAuthHeader()
      });
      if (!response.ok) throw new Error('Failed to fetch candidates');
      return response.json();
    },

    getAllUsers: async () => {
      const response = await fetch(USER_ENDPOINTS.ALL_USERS, {
        headers: getAuthHeader()
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    }
  }
};