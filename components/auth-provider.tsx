"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  email: string
  role: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (user: User) => Promise<void>
  logout: () => Promise<void>
  isAuthorized: (allowedRoles?: string[]) => boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  isAuthorized: () => false,
  isLoading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Rutas protegidas y roles permitidos
  const protectedRoutes: Record<string, string[]> = {
    "/": ["admin", "inventory", "supervisor"],
    "/sales-report": ["admin", "supervisor"],
    "/sales-returns": ["admin", "supervisor"],
    "/comparative": ["admin", "supervisor"],
    "/purchases": ["admin", "supervisor"],
    "/purchase-returns": ["admin", "supervisor"],
    "/inventory": ["admin", "inventory", "supervisor"],
    "/inventory/manage": ["admin", "inventory", "supervisor"],
    "/kardex": ["admin", "inventory", "supervisor"],
    "/adjustments": ["admin", "supervisor"],
    "/logs": ["admin", "supervisor"],
  }

  // Inicialización del estado de usuario
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Manejo de rutas protegidas
  useEffect(() => {
    if (isLoading) return

    const handleRouteProtection = async () => {
      if (pathname === "/auth/login") {
        if (user) {
          await router.push("/")
        }
        return
      }

      if (!user) {
        await router.push("/auth/login")
        return
      }

      const route = Object.keys(protectedRoutes).find((route) =>
        pathname.startsWith(route)
      )

      if (route) {
        const allowedRoles = protectedRoutes[route]
        if (!allowedRoles.includes(user.role)) {
          await router.push("/")
        }
      }
    }

    handleRouteProtection()
  }, [pathname, user, router, isLoading])

  const login = async (userData: User) => {
    try {
      setIsLoading(true)
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      await router.push("/")
    } catch (error) {
      console.error("Error during login:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)
      localStorage.removeItem("user")
      setUser(null)
      await router.push("/auth/login")
    } catch (error) {
      console.error("Error during logout:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const isAuthorized = (allowedRoles?: string[]) => {
    if (!user) return false
    if (!allowedRoles) return true
    return allowedRoles.includes(user.role)
  }

  if (isLoading) {
    return <div>Loading...</div> // Puedes reemplazar esto con tu componente de loading
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthorized, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)