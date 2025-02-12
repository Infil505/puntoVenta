import type { Metadata } from "next"
import type React from "react" // Import React

export const metadata: Metadata = {
  title: "Módulo de Reportes",
  description: "Sistema de reportes y análisis",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

