export interface AuthContextType {
    userData: any | null;
    isAuthenticated: boolean;
    logout: () => void;
  }