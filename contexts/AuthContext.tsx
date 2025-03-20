'use client'

import { User } from "../types/user";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
	user: User | null;
	login: (userData: User) => void; 
	logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode}) { 
	const [user, setUser] = useState<User | null>(null)

	// check if user is logged in 
	useEffect(() => { 
		const storedUser = localStorage.getItem('user')
		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
	}, [])

	// login func 
	const login = (userData: User) => { 
		localStorage.setItem('user', JSON.stringify(userData))
		setUser(userData)
	}

	// logout func 
	const logout = () => { 
		localStorage.removeItem('user')
		localStorage.removeItem('token')
		setUser(null)
	}
	
	// context value 
	const value = {
		user, 
		login,
		logout, 
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

// custom hook 
export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) { 
		throw new Error('useAuth must be used within a AuthProvider')
	}
	return context 
}