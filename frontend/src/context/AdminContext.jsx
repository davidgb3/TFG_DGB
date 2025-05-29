import { createContext, useContext } from "react";

const VITE_BASE_DB_URL = import.meta.env.VITE_BASE_DB_URL || 'http://localhost:3000/api/';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

    const modifyUserData = async (userId, userData) => {
        const { username, email, role } = userData;
        
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}admin/editProfile/${userId}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, role }),
            });
            if (!response.ok) {
                throw new Error("Error updating user data");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <AdminContext.Provider value={{ modifyUserData }}>
            {children}
        </AdminContext.Provider>
    );

};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
}