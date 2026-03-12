import { createContext, useEffect, useState } from "react";
import type { User } from "../types/types";

interface AuthContextType {
    token: string | null;
    user: User | null;
    setToken: (token: string | null) => void;
    setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    user: null,
    setToken: () => { },
    setUser: () => { }
});

export function AuthProvider({ children }: any) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");
        
        if (savedUser && savedUser !== "undefined" && savedUser !== "null") {
            try {
                return JSON.parse(savedUser);
            } catch (error) {
                console.error("AuthContext: Failed to parse user", error);
                return null;
            }
        }
        return null;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const currentToken = localStorage.getItem("token");
            const currentRawUser = localStorage.getItem("user");
            
            setToken(currentToken);
            
            if (currentRawUser && currentRawUser !== "undefined") {
                try {
                    setUser(JSON.parse(currentRawUser));
                } catch (e) {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{ token, user, setToken, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}