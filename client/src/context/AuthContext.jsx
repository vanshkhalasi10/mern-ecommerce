import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/me", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error){
      if(error.response?.status !== 401){
          console.error("Auth check failed:",error)
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error("Logout failed");
    } finally {
      setUser(null);  
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);