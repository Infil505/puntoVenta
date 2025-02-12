"use client"

import { BarChart2, TrendingUp, ArrowUpDown, PieChart } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { DataTable } from "@/components/data-table"
import { SummaryCard } from "@/components/summary-card"

const columns = [
  {
    accessorKey: "category",
    header: "Categoría",
  },
  {
    accessorKey: "currentPeriod",
    header: "Periodo Actual",
  },
  {
    accessorKey: "previousPeriod",
    header: "Periodo Anterior",
  },
  {
    accessorKey: "variation",
    header: "Variación",
  },
  {
    accessorKey: "trend",
    header: "Tendencia",
  },
]

const data = [
  {
    category: "Electrónicos",
    currentPeriod: "$12,500.00",
    previousPeriod: "$10,000.00",
    variation: "+25%",
    trend: "↑",
  },
  // Add more sample data as needed
]

export default function ComparativeReport() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reporte Comparativo</h1>
        <DateRangePicker />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Crecimiento en Ventas"
          value="+15.4%"
          icon={<TrendingUp className="h-6 w-6" />}
          trend={{ value: 15.4, isPositive: true }}
        />
        <SummaryCard
          title="Variación de Inventario"
          value="+8.2%"
          icon={<ArrowUpDown className="h-6 w-6" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <SummaryCard
          title="Rendimiento por Categoría"
          value="+12.7%"
          icon={<PieChart className="h-6 w-6" />}
          trend={{ value: 12.7, isPositive: true }}
        />
        <SummaryCard
          title="Tendencia General"
          value="Positiva"
          icon={<BarChart2 className="h-6 w-6" />}
          trend={{ value: 10, isPositive: true }}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

