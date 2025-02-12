"use client"

import { Mountain } from "lucide-react"
import Link from "next/link"
import { MainNav } from "./components/main-nav"
import { UserNav } from "./components/user-nav"
import { useAuth } from "./components/auth-provider"
import type React from "react" // Added import for React

export default function ReportsDashboard({ children }: { children?: React.ReactNode }) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-sm">
          <div className="p-4">
            <Link href="/dashboard" className="flex items-center gap-2 mb-8">
              <Mountain className="h-6 w-6" />
              <span className="font-bold text-xl">POS System</span>
            </Link>
            <MainNav />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="border-b bg-white dark:bg-gray-800">
            <div className="flex h-16 items-center px-4 justify-end">
              <UserNav />
            </div>
          </div>
          {children || (
            <div className="p-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Bienvenido, {user.name}</h1>
                <p className="text-gray-600 dark:text-gray-300">Seleccione una opción del menú para comenzar.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

