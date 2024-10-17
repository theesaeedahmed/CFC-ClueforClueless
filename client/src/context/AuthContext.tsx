import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import axios from 'axios';

// Define the shape of your user data
interface UserData {
  // Add properties based on your backend response
  id: string;
  name: string;
  email: string;
  // Add other properties as needed
}

// Define the shape of your context value
interface AuthContextType {
  userData: UserData | null;
  isAuthenticated: boolean;
  logout: () => void;
  setIsAuthenticated: (value:boolean)=>void;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  userData: null,
  isAuthenticated: true,
  logout: () => {},
  setIsAuthenticated: ()=>{}

});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {


  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
 
  const getUserData = async () => {
    onAuthStateChanged(auth, async (user: User | null) => {
      const uuid = localStorage.getItem('userId');
      if (user && uuid) {
        try {
          const response = await axios.get<UserData>(`https://your-backend-api.com/users/${uuid}`);
          setUserData(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user data from backend", error);
        }
      } else {
        setUserData(null);
        setIsAuthenticated(false);
        localStorage.removeItem('userId');
      }
    });
  }

  useEffect(() => {
    // Firebase Auth state listener
    getUserData();
  }, []);

  const logout = () => {
    auth.signOut();
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserData(null);
  };

  const value: AuthContextType = {
    userData,
    isAuthenticated,
    logout,
    setIsAuthenticated  
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};