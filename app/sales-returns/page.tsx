"use client"

import { ArrowDownUp, Package, RefreshCw, TrendingDown } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { DataTable } from "@/components/data-table"
import { SummaryCard } from "@/components/summary-card"

const columns = [
  {
    accessorKey: "id",
    header: "ID Devolución",
  },
  {
    accessorKey: "saleId",
    header: "ID Venta Original",
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
    accessorKey: "reason",
    header: "Motivo",
  },
  {
    accessorKey: "amount",
    header: "Monto",
  },
]

const data = [
  {
    id: "DEV001",
    saleId: "INV001",
    date: "2024-02-11",
    customer: "Juan Pérez",
    reason: "Producto defectuoso",
    amount: "$50.00",
  },
  // Add more sample data as needed
]

export default function SalesReturnsReport() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reporte de Devoluciones de Ventas</h1>
        <DateRangePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Devoluciones"
          value="$1,234.00"
          icon={<ArrowDownUp className="h-6 w-6" />}
          trend={{ value: 3, isPositive: false }}
        />
        <SummaryCard
          title="Cantidad Devoluciones"
          value="15"
          icon={<Package className="h-6 w-6" />}
          trend={{ value: 2, isPositive: false }}
        />
        <SummaryCard
          title="Tasa de Devolución"
          value="2.8%"
          icon={<RefreshCw className="h-6 w-6" />}
          trend={{ value: 0.5, isPositive: true }}
        />
        <SummaryCard
          title="Impacto en Ventas"
          value="-8.1%"
          icon={<TrendingDown className="h-6 w-6" />}
          trend={{ value: 1.2, isPositive: false }}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

