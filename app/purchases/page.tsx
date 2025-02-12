"use client"

import { ShoppingCart, Package, Wallet, TrendingUp } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { DataTable } from "@/components/data-table"
import { SummaryCard } from "@/components/summary-card"

const columns = [
  {
    accessorKey: "id",
    header: "ID Compra",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "supplier",
    header: "Proveedor",
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
    id: "PO001",
    date: "2024-02-11",
    supplier: "Distribuidora XYZ",
    items: 25,
    total: "$2,500.00",
    status: "Recibido",
  },
  // Add more sample data as needed
]

export default function PurchasesReport() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reporte de Compras</h1>
        <DateRangePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Compras Totales"
          value="$25,678.00"
          icon={<ShoppingCart className="h-6 w-6" />}
          trend={{ value: 15, isPositive: true }}
        />
        <SummaryCard
          title="Artículos Comprados"
          value="1,234"
          icon={<Package className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <SummaryCard
          title="Costo Promedio"
          value="$20.81"
          icon={<Wallet className="h-6 w-6" />}
          trend={{ value: 3, isPositive: false }}
        />
        <SummaryCard
          title="Eficiencia de Compras"
          value="94%"
          icon={<TrendingUp className="h-6 w-6" />}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

