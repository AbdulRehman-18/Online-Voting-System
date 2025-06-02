import { User as DBUser } from '@/models/User';

export type UserRole = "admin" | "candidate" | "voter";

export interface User extends Omit<DBUser, 'password'> {
  role: UserRole;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
  rememberMe?: boolean;
}

export interface RegisterData {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  partyAffiliation?: string;
  electionId?: string;
  voterId?: string;
  address?: string;
  employeeId?: string;
  department?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}