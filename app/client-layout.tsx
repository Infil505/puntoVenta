"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import ReportsDashboard from "../reports-dashboard"

interface ClientLayoutProps {
    children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname()

    const publicRoutes = ['/auth/login', '/']

    const isPublicRoute = publicRoutes.includes(pathname)

    if (isPublicRoute) {
        return <>{children}</>
    }

    return <ReportsDashboard>{children}</ReportsDashboard>
}