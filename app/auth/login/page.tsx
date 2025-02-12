"use client"

import { useState } from "react"
import Image from "next/image"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider" // Asegúrate de que la ruta sea correcta

// Usuarios de prueba
const users = [
  {
    email: "admin@sistema.com",
    password: "admin123",
    role: "admin",
    name: "Administrador",
  },
  {
    email: "inventario@sistema.com",
    password: "inventario123",
    role: "inventory",
    name: "Gestor de Inventario",
  },
  {
    email: "supervisor@sistema.com",
    password: "supervisor123",
    role: "supervisor",
    name: "Supervisor",
  },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = users.find((u) => u.email === email && u.password === password)
      
      if (user) {
        // Usamos el login del contexto en lugar de manipular localStorage directamente
        await login({
          email: user.email,
          role: user.role,
          name: user.name,
        })
        
        toast({
          title: "Inicio de sesión exitoso",
          description: `Bienvenido, ${user.name}`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Error de inicio de sesión",
          description: "Credenciales incorrectas. Por favor intente nuevamente.",
        })
      }
    } catch (error) {
      console.error("Error during login:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ocurrió un error durante el inicio de sesión.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Columna del formulario */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-[350px] space-y-6 p-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Ingrese sus credenciales para acceder al sistema
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                placeholder="correo@ejemplo.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
          <div className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
            <details className="group [&_summary]:cursor-pointer">
              <summary className="text-center underline">
                Credenciales de Prueba
              </summary>
              <div className="mt-4 space-y-2 border-t pt-4">
                <p>
                  <strong>Administrador:</strong>
                  <br />
                  admin@sistema.com / admin123
                </p>
                <p>
                  <strong>Gestor de Inventario:</strong>
                  <br />
                  inventario@sistema.com / inventario123
                </p>
                <p>
                  <strong>Supervisor:</strong>
                  <br />
                  supervisor@sistema.com / supervisor123
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}