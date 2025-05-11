import { set } from "mongoose";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const VITE_BASE_DB_URL = import.meta.env.VITE_BASE_DB_URL || 'http://localhost:3000/api/'

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, []);
    
    const fetchUserData = async () => {
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}users/me`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                setError("Error fetching user data");
                setLoading(true);
                return;
            }
            const data = await response.json();
            setUserData(data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(true);
        }
    };
    
    return (
        <UserContext.Provider value={{ userData, error, loading }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}