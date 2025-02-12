"use client"

import { Package, ArrowUpDown, TrendingUp, History } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { DataTable } from "@/components/data-table"
import { SummaryCard } from "@/components/summary-card"

const columns = [
  {
    accessorKey: "date",
    header: "Fecha",
  },
  {
    accessorKey: "type",
    header: "Tipo",
  },
  {
    accessorKey: "document",
    header: "Documento",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  {
    accessorKey: "unitCost",
    header: "Costo Unitario",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "balance",
    header: "Saldo",
  },
]

const data = [
  {
    date: "2024-02-11",
    type: "Entrada",
    document: "OC-001",
    quantity: 100,
    unitCost: "$10.00",
    total: "$1,000.00",
    balance: 100,
  },
  // Add more sample data as needed
]

export default function KardexReport() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Kardex</h1>
        <DateRangePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Movimientos"
          value="156"
          icon={<History className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <SummaryCard
          title="Stock Actual"
          value="1,234"
          icon={<Package className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
        <SummaryCard
          title="Entradas/Salidas"
          value="1.2"
          icon={<ArrowUpDown className="h-6 w-6" />}
          trend={{ value: 0.1, isPositive: true }}
        />
        <SummaryCard
          title="Valor Promedio"
          value="$45.67"
          icon={<TrendingUp className="h-6 w-6" />}
          trend={{ value: 2.3, isPositive: true }}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

