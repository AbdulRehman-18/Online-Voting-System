export type UserRole = "admin" | "candidate" | "voter";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "upcoming" | "active" | "ended";
  positions: Position[];
}

export interface Position {
  id: string;
  title: string;
  description: string;
  candidates: Candidate[];
}

export interface Candidate {
  id: string;
  userId: string;
  name: string;
  bio: string;
  avatar?: string;
  position: string;
  votes: number;
}

export interface Vote {
  id: string;
  electionId: string;
  positionId: string;
  candidateId: string;
  voterId: string;
  timestamp: Date;
}

export interface Stats {
  totalVoters: number;
  totalCandidates: number;
  activeElections: number;
  completedElections: number;
  participationRate: number;
}