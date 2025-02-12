"use client"

import { Package, AlertTriangle, BarChart, RefreshCw } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { SummaryCard } from "@/components/summary-card"


const columns = [
  {
    accessorKey: "id",
    header: "SKU",
  },
  {
    accessorKey: "product",
    header: "Producto",
  },
  {
    accessorKey: "category",
    header: "Categoría",
  },
  {
    accessorKey: "stock",
    header: "Stock Actual",
  },
  {
    accessorKey: "minimum",
    header: "Stock Mínimo",
  },
  {
    accessorKey: "value",
    header: "Valor",
  },
]

const data = [
  {
    id: "SKU001",
    product: "Laptop HP",
    category: "Electrónicos",
    stock: 15,
    minimum: 5,
    value: "$15,000.00",
  },
  // Add more sample data as needed
]

export default function InventoryReport() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reporte de Inventario</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Productos"
          value="1,234"
          icon={<Package className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
        />
        <SummaryCard
          title="Productos Bajo Mínimo"
          value="23"
          icon={<AlertTriangle className="h-6 w-6" />}
          trend={{ value: 2, isPositive: false }}
        />
        <SummaryCard
          title="Valor del Inventario"
          value="$125,678.00"
          icon={<BarChart className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
        />
        <SummaryCard
          title="Rotación"
          value="4.5"
          icon={<RefreshCw className="h-6 w-6" />}
          trend={{ value: 0.2, isPositive: true }}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

