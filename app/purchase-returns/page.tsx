"use client"

import { ArrowDownUp, Package, RefreshCw, AlertTriangle } from "lucide-react"
import { DateRangePicker } from "@/components/date-range-picker"
import { DataTable } from "@/components/data-table"
import { SummaryCard } from "@/components/summary-card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const columns = [
  {
    accessorKey: "id",
    header: "ID Devolución",
  },
  {
    accessorKey: "purchaseId",
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
    accessorKey: "product",
    header: "Producto",
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
  },
  {
    accessorKey: "amount",
    header: "Monto",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
]

const data = [
  {
    id: "DEV001",
    purchaseId: "PO001",
    date: "2024-02-11",
    supplier: "Distribuidora XYZ",
    product: "Laptop HP",
    quantity: 2,
    amount: "$2,400.00",
    status: "Procesado",
  },
  {
    id: "DEV002",
    purchaseId: "PO003",
    date: "2024-02-10",
    supplier: "Tech Solutions Inc",
    product: "Monitor Dell",
    quantity: 1,
    amount: "$350.00",
    status: "Pendiente",
  },
  {
    id: "DEV003",
    purchaseId: "PO002",
    date: "2024-02-09",
    supplier: "Office Supplies SA",
    product: "Impresora Epson",
    quantity: 3,
    amount: "$1,200.00",
    status: "Aprobado",
  },
]

export default function PurchaseReturnsReport() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reporte de Devoluciones de Compras</h1>
        <div className="flex gap-4">
          <DateRangePicker />
          <Dialog>
            <DialogTrigger asChild>
              <Button>Nueva Devolución</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Registrar Devolución de Compra</DialogTitle>
                <DialogDescription>
                  Complete los detalles de la devolución. Todos los campos marcados con * son obligatorios.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="purchaseId">ID Compra Original *</Label>
                    <Input id="purchaseId" placeholder="Ej: PO001" />
                  </div>
                  <div>
                    <Label htmlFor="supplier">Proveedor *</Label>
                    <Input id="supplier" placeholder="Nombre del proveedor" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="product">Producto *</Label>
                    <Input id="product" placeholder="Nombre del producto" />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Cantidad *</Label>
                    <Input type="number" id="quantity" placeholder="0" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Monto *</Label>
                    <Input type="number" id="amount" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="status">Estado *</Label>
                    <Select>
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="approved">Aprobado</SelectItem>
                        <SelectItem value="processed">Procesado</SelectItem>
                        <SelectItem value="rejected">Rechazado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="reason">Motivo de la Devolución *</Label>
                  <Input id="reason" placeholder="Describa el motivo de la devolución" />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancelar</Button>
                <Button>Registrar Devolución</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Devoluciones"
          value="$3,950.00"
          icon={<ArrowDownUp className="h-6 w-6" />}
          trend={{ value: 12, isPositive: false }}
        />
        <SummaryCard
          title="Cantidad Devuelta"
          value="6 unidades"
          icon={<Package className="h-6 w-6" />}
          trend={{ value: 8, isPositive: false }}
        />
        <SummaryCard
          title="Tasa de Devolución"
          value="2.4%"
          icon={<RefreshCw className="h-6 w-6" />}
          trend={{ value: 0.5, isPositive: true }}
        />
        <SummaryCard
          title="Devoluciones Pendientes"
          value="3"
          icon={<AlertTriangle className="h-6 w-6" />}
          trend={{ value: 1, isPositive: false }}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

