'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '@/lib/api'

interface User {
  id: string
  email: string
  fullName: string
  avatarUrl?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: (idToken: string) => Promise<void>
  register: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    if (storedToken) {
      setToken(storedToken)
      authApi
        .getMe()
        .then(res => setUser(res.data))
        .catch(() => logout())
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await authApi.login(email, password)
    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
    setToken(res.data.accessToken)
    const userRes = await authApi.getMe()
    setUser(userRes.data)
  }

const loginWithGoogle = async (idToken: string) => {
  // Gọi API thật từ backend
  const res = await authApi.googleLogin(idToken);
  localStorage.setItem('accessToken', res.data.accessToken);
  localStorage.setItem('refreshToken', res.data.refreshToken);
  setToken(res.data.accessToken);
  const userRes = await authApi.getMe();
  setUser(userRes.data);
};

  const register = async (email: string, password: string, fullName: string) => {
    await authApi.register(email, password, fullName)
    await login(email, password)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, loginWithGoogle, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}