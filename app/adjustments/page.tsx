"use client"

import { History, AlertCircle, TrendingDown, FileCheck } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { DataTable } from "@/components/data-table"
import { SummaryCard } from "@/components/summary-card"

const columns = [
  {
    accessorKey: "id",
    header: "ID Ajuste",
  },
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "product",
    header: "Producto",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  {
    accessorKey: "reason",
    header: "Motivo",
  },
  {
    accessorKey: "user",
    header: "Usuario",
  },
]

const data = [
  {
    id: "ADJ001",
    date: "2024-02-11",
    type: "Merma",
    product: "Laptop HP",
    quantity: -1,
    reason: "Daño en almacén",
    user: "Juan Pérez",
  },
  // Add more sample data as needed
]

export default function AdjustmentsReport() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Histórico de Ajustes</h1>
        <DateRangePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Ajustes"
          value="45"
          icon={<History className="h-6 w-6" />}
          trend={{ value: 5, isPositive: false }}
        />
        <SummaryCard
          title="Ajustes Críticos"
          value="8"
          icon={<AlertCircle className="h-6 w-6" />}
          trend={{ value: 2, isPositive: false }}
        />
        <SummaryCard
          title="Impacto en Inventario"
          value="-2.3%"
          icon={<TrendingDown className="h-6 w-6" />}
          trend={{ value: 0.5, isPositive: true }}
        />
        <SummaryCard
          title="Ajustes Aprobados"
          value="95%"
          icon={<FileCheck className="h-6 w-6" />}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

