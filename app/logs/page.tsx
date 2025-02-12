"use client"

import { useState } from "react"
import { Clock, User, AlertCircle, Search, Filter } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { SummaryCard } from "@/components/summary-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const columns = [
  {
    accessorKey: "timestamp",
    header: "Fecha y Hora",
  },
  {
    accessorKey: "user",
    header: "Usuario",
  },
  {
    accessorKey: "action",
    header: "Acción",
  },
  {
    accessorKey: "module",
    header: "Módulo",
  },
  {
    accessorKey: "details",
    header: "Detalles",
  },
  {
    accessorKey: "ip",
    header: "Dirección IP",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <div
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            status === "success"
              ? "bg-green-100 text-green-800"
              : status === "warning"
                ? "bg-yellow-100 text-yellow-800"
                : status === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {status === "success"
            ? "Éxito"
            : status === "warning"
              ? "Advertencia"
              : status === "error"
                ? "Error"
                : "Info"}
        </div>
      )
    },
  },
]

const data = [
  {
    timestamp: "2024-02-11 15:30:22",
    user: "admin@sistema.com",
    action: "Inicio de sesión",
    module: "Autenticación",
    details: "Acceso exitoso al sistema",
    ip: "192.168.1.100",
    status: "success",
  },
  {
    timestamp: "2024-02-11 15:35:45",
    user: "admin@sistema.com",
    action: "Agregar producto",
    module: "Inventario",
    details: "Nuevo producto: Laptop HP - SKU: LP001",
    ip: "192.168.1.100",
    status: "success",
  },
  {
    timestamp: "2024-02-11 15:40:12",
    user: "vendedor@sistema.com",
    action: "Devolución",
    module: "Devoluciones",
    details: "Devolución #DEV001 registrada",
    ip: "192.168.1.101",
    status: "warning",
  },
  {
    timestamp: "2024-02-11 15:45:30",
    user: "admin@sistema.com",
    action: "Eliminar producto",
    module: "Inventario",
    details: "Error al eliminar producto SKU: LP002",
    ip: "192.168.1.100",
    status: "error",
  },
  {
    timestamp: "2024-02-11 15:50:18",
    user: "vendedor@sistema.com",
    action: "Consulta reporte",
    module: "Reportes",
    details: "Generación de reporte de ventas",
    ip: "192.168.1.101",
    status: "success",
  },
]

export default function LoggingPage() {
  const [timeRange, setTimeRange] = useState("today")
  const [logType, setLogType] = useState("all")

  // Calcular métricas
  const successCount = data.filter((log) => log.status === "success").length
  const warningCount = data.filter((log) => log.status === "warning").length
  const errorCount = data.filter((log) => log.status === "error").length
  const totalLogs = data.length

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Registro de Actividades</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total de Registros"
          value={totalLogs}
          icon={<Clock className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
        />
        <SummaryCard
          title="Usuarios Activos"
          value="8"
          icon={<User className="h-6 w-6" />}
          trend={{ value: 2, isPositive: true }}
        />
        <SummaryCard
          title="Advertencias"
          value={warningCount}
          icon={<AlertCircle className="h-6 w-6" />}
          trend={{ value: 1, isPositive: false }}
        />
        <SummaryCard
          title="Errores"
          value={errorCount}
          icon={<AlertCircle className="h-6 w-6" />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-4">
            <div className="w-full md:w-72">
              <Input
                placeholder="Buscar en los registros..."
                className="w-full"
                prefix={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Rango de tiempo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="yesterday">Ayer</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={logType} onValueChange={setLogType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tipo de registro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="success">Éxito</SelectItem>
                <SelectItem value="warning">Advertencias</SelectItem>
                <SelectItem value="error">Errores</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">Exportar</Button>
          </div>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}

