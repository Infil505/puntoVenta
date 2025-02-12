"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, BarChart2, ShoppingCart, Package, History, ArrowDownUp, PlusCircle, CalculatorIcon } from "lucide-react"

const routes = [
  {
    title: "Reporte de Ventas",
    href: "/sales-report",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    title: "Devoluciones Ventas",
    href: "/sales-returns",
    icon: <ArrowDownUp className="mr-2 h-4 w-4" />,
  },
  {
    title: "Reportes Comparativos",
    href: "/comparative",
    icon: <BarChart2 className="mr-2 h-4 w-4" />,
  },
  {
    title: "Reporte de Compras",
    href: "/purchases",
    icon: <ShoppingCart className="mr-2 h-4 w-4" />,
  },
  {
    title: "Devoluciones Compras",
    href: "/purchase-returns",
    icon: <ArrowDownUp className="mr-2 h-4 w-4" />,
  },
  {
    title: "Reporte de Inventario",
    href: "/inventory",
    icon: <Package className="mr-2 h-4 w-4" />,
  },
  {
    title: "Gestionar Inventario",
    href: "/inventory/manage",
    icon: <PlusCircle className="mr-2 h-4 w-4" />,
  },
  {
    title: "Kardex",
    href: "/kardex",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    title: "Histórico Ajustes",
    href: "/adjustments",
    icon: <History className="mr-2 h-4 w-4" />,
  },
  {
    title: "Facturacion",
    href: "/billing",
    icon: <CalculatorIcon className="mr-2 h-4 w-4" />,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={pathname === route.href ? "secondary" : "ghost"}
          className="w-full justify-start"
          asChild
        >
          <Link href={route.href}>
            {route.icon}
            {route.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

