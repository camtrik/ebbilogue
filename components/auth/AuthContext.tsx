'use client'

import { User } from 'types/user'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  login: (userData: User, token: string) => void
  logout: () => void
  haveAccess: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

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
  const login = (userData: User, token: string) => {
    localStorage.setItem('token', token)
    Cookies.set('token', token)
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

    // redirect to waiting page
    router.push('/waiting')
  }

  // const haveAccess =
  //   (user?.roles.includes('ROLE_ADMIN') || user?.roles.includes('ROLE_MODERATOR')) ?? false

  const haveAccess = true
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
