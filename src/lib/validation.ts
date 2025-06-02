import { RegisterData } from '@/lib/types';

export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    return 'Password must contain at least one special character (!@#$%^&*)';
  }
  
  return null;
};

export const validateRegistration = (data: RegisterData): string | null => {
  if (!data.fullName || data.fullName.length < 2) {
    return 'Full name is required and must be at least 2 characters';
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Please enter a valid email address';
  }
  
  if (!data.username || data.username.length < 3) {
    return 'Username must be at least 3 characters';
  }
  
  const passwordError = validatePassword(data.password);
  if (passwordError) return passwordError;
  
  switch (data.role) {
    case 'candidate':
      if (!data.partyAffiliation) return 'Party affiliation is required';
      if (!data.electionId) return 'Election ID is required';
      break;
      
    case 'voter':
      if (!data.voterId) return 'Voter ID is required';
      if (!data.address) return 'Address is required';
      break;
      
    case 'admin':
      if (!data.employeeId) return 'Employee ID is required';
      if (!data.department) return 'Department is required';
      break;
  }
  
  return null;
};