import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
const VITE_BASE_DB_URL = import.meta.env.VITE_BASE_DB_URL || 'http://localhost:3000/api/'

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetchUserData(); 
        getUserList();  
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

    const editUserData = async (userId, userData) => {
        const { username, email, password } = userData;
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}auth/editProfile/${userId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
            if (!response.ok) {
                setError("Error updating user data");
                return;
            }
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(true);
        }
    };

    const notifyUser = async (userId) => {
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}users/${userId}/sendEmail`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                setError("Error sending email");
                return;
            }
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(true);
        }
    };

    const getUserList = async () => {
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}users/getUsers`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                setError("Error fetching user list");
                return;
            }
            const data = await response.json();
            setUserList(data);
        } catch (error) {
            setError(error.message);
        }
    };
    
    return (
        <UserContext.Provider value={{ userData, error, loading, editUserData, notifyUser, userList, getUserList }}>
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