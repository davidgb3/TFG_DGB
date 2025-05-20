import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const VITE_BASE_DB_URL = import.meta.env.VITE_BASE_DB_URL || 'http://localhost:3000/api/'

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Inicialmente true
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}auth/check-auth`, {
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setUser(data);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            setError(error.message);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Modificar el useEffect para evitar ciclos infinitos
    useEffect(() => {
        checkAuth();
    }, [user]); // Remover user de las dependencias
    
    const login = async (username, password) => {
        try {
            setLoading(true);
            const response = await fetch(`${VITE_BASE_DB_URL}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if(!response.ok){
                setError(data.message || "Invalid credentials");
                setIsAuthenticated(false);
                setUser(null);
                return;
            }

            // Asegurarnos de que data.user existe
            if (!data.user) {
                throw new Error('No user data received');
            }

            console.log('User data received:', data.user); // Para debug
            setUser(data.user);
            setIsAuthenticated(true);
            setError(null);

        } catch (error) {
            console.error('Login error:', error); // Para debug
            setError(error.message);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const resgister = async (username, email, password) => {
        try {
            const response = await fetch(`${VITE_BASE_DB_URL}auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, email, password }),
            });
            if(!response.ok) {
                const data = await response.json();
                setError(data.message || "Registration failed");
                return;
            }
            const data = await response.json();
            return data.message;
        } catch (error) {
            console.error('Register error:', error); // Para debug
            setError(error.message);
        }
    }

    const logout = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${VITE_BASE_DB_URL}auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                setUser(null);
                setIsAuthenticated(false);
            } else {
                throw new Error("Logout failed");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return(
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            error, 
            isAuthenticated, 
            login,
            logout,
            resgister,
            checkAuth // Exponemos checkAuth por si necesitamos refrescar el estado
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error("UseAuth must be used within an AuthProvider")
    }
    return context
};

