"use client"

import { BarChart, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { DataTable } from "@/components/data-table"
import { SummaryCard } from "@/components/summary-card"

const columns = [
  {
    accessorKey: "id",
    header: "ID Venta",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "customer",
    header: "Cliente",
  },
  {
    accessorKey: "items",
    header: "Artículos",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
]

const data = [
  {
    id: "INV001",
    date: "2024-02-11",
    customer: "Juan Pérez",
    items: 3,
    total: "$150.00",
    status: "Completado",
  },
  // Add more sample data as needed
]

export default function SalesReport() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reporte de Ventas</h1>
        <DateRangePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Ventas Totales"
          value="$15,234.00"
          icon={<DollarSign className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <SummaryCard
          title="Transacciones"
          value="142"
          icon={<ShoppingCart className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <SummaryCard
          title="Promedio por Venta"
          value="$107.28"
          icon={<BarChart className="h-6 w-6" />}
          trend={{ value: 2, isPositive: false }}
        />
        <SummaryCard
          title="Tasa de Conversión"
          value="68%"
          icon={<TrendingUp className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

