'use client'

import { User } from '../types/user'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  haveAccess: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // check if user is logged in
  useEffect(() => {
    const cookieUser = Cookies.get('user')
    if (cookieUser) {
      try {
        setUser(JSON.parse(cookieUser))
      } catch (e) {
        console.error('Failed to parse user cookie:', e)
      }
    }

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
        if (!cookieUser) {
          Cookies.set('user', storedUser)
        }
      } catch (e) {
        console.error('Failed to parse user cookie:', e)
      }
    }
  }, [])

  // login func
  const login = (userData: User) => {
    const userStr = JSON.stringify(userData)
    localStorage.setItem('user', userStr)
    Cookies.set('user', userStr)
    setUser(userData)
  }

  // logout func
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    Cookies.remove('user')
    Cookies.remove('token')
    setUser(null)
  }

  const haveAccess = (user?.roles.includes('ROLE_ADMIN') || user?.roles.includes('ROLE_MODERATOR')) ?? false
  // context value
  const value = {
    user,
    login,
    logout,
    haveAccess,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// custom hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}
