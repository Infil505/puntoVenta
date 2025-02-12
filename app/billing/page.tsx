"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Minus, Plus, Trash2, Search, Printer } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Tipos
interface Product {
    id: string
    name: string
    price: number
    stock: number
}

interface CartItem extends Product {
    quantity: number
    subtotal: number
}

// Productos de ejemplo - Reemplazar con tu propia data
const sampleProducts: Product[] = [
    { id: "1", name: "Producto 1", price: 10.99, stock: 50 },
    { id: "2", name: "Producto 2", price: 15.99, stock: 30 },
    { id: "3", name: "Producto 3", price: 5.99, stock: 100 },
    { id: "4", name: "Producto 4", price: 20.99, stock: 25 },
]

// Componente de Impresión
const PrintInvoice = ({
    cartItems,
    total,
    tax,
    grandTotal,
    invoiceNumber,
    date,
}: {
    cartItems: CartItem[]
    total: number
    tax: number
    grandTotal: number
    invoiceNumber: string
    date: string
}) => {
    return (
        <div className="p-8 bg-white hidden print:block">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">FACTURA</h1>
                <p className="text-gray-600">Mi Empresa S.A.</p>
                <p className="text-gray-600">Dirección de la Empresa</p>
                <p className="text-gray-600">Tel: (123) 456-7890</p>
            </div>

            <div className="flex justify-between mb-6">
                <div>
                    <p><strong>Factura #:</strong> {invoiceNumber}</p>
                    <p><strong>Fecha:</strong> {date}</p>
                </div>
                <div>
                    <p><strong>Cliente:</strong> Consumidor Final</p>
                    <p><strong>RUC/CI:</strong> 9999999999</p>
                </div>
            </div>

            <table className="w-full mb-6">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="text-left py-2">Descripción</th>
                        <th className="text-right py-2">Cant.</th>
                        <th className="text-right py-2">Precio</th>
                        <th className="text-right py-2">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200">
                            <td className="py-2">{item.name}</td>
                            <td className="text-right py-2">{item.quantity}</td>
                            <td className="text-right py-2">${item.price.toFixed(2)}</td>
                            <td className="text-right py-2">${item.subtotal.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col items-end mb-6">
                <div className="w-64">
                    <div className="flex justify-between py-1">
                        <span>Subtotal:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>IVA (12%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 font-bold border-t border-gray-300">
                        <span>Total:</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-600 mt-8">
                <p>¡Gracias por su compra!</p>
                <p>Este documento es un comprobante válido de su transacción</p>
            </div>
        </div>
    )
}

// Componente Principal
export default function BillingPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [selectedProduct, setSelectedProduct] = useState<string>("")
    const [quantity, setQuantity] = useState<number>(1)
    const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState<string>("0001")
    const { toast } = useToast()

    const filteredProducts = sampleProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0)
    const tax = total * 0.12 // 12% IVA
    const grandTotal = total + tax

    const handleAddToCart = () => {
        const product = sampleProducts.find((p) => p.id === selectedProduct)
        if (!product) return

        if (quantity > product.stock) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "La cantidad excede el stock disponible",
            })
            return
        }

        const existingItem = cartItems.find((item) => item.id === product.id)

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity
            if (newQuantity > product.stock) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "La cantidad total excede el stock disponible",
                })
                return
            }

            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: newQuantity,
                            subtotal: product.price * newQuantity,
                        }
                        : item
                )
            )
        } else {
            setCartItems([
                ...cartItems,
                {
                    ...product,
                    quantity,
                    subtotal: product.price * quantity,
                },
            ])
        }

        setSelectedProduct("")
        setQuantity(1)
        toast({
            title: "Producto agregado",
            description: "El producto se agregó al carrito correctamente",
        })
    }

    const updateQuantity = (itemId: string, newQuantity: number) => {
        const product = sampleProducts.find((p) => p.id === itemId)
        if (!product || newQuantity > product.stock) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "La cantidad excede el stock disponible",
            })
            return
        }

        if (newQuantity < 1) {
            removeFromCart(itemId)
            return
        }

        setCartItems(
            cartItems.map((item) =>
                item.id === itemId
                    ? {
                        ...item,
                        quantity: newQuantity,
                        subtotal: product.price * newQuantity,
                    }
                    : item
            )
        )
    }

    const removeFromCart = (itemId: string) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId))
        toast({
            title: "Producto eliminado",
            description: "El producto se eliminó del carrito",
        })
    }

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "El carrito está vacío",
            })
            return
        }

        const nextInvoiceNumber = (parseInt(currentInvoiceNumber) + 1)
            .toString()
            .padStart(4, "0")
        setCurrentInvoiceNumber(nextInvoiceNumber)

        toast({
            title: "Factura generada",
            description: `Total facturado: $${grandTotal.toFixed(2)}`,
        })
    }

    const handlePrint = () => {
        if (cartItems.length === 0) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "No hay items para imprimir",
            })
            return
        }
        window.print()
    }

    return (
        <>
            <div className="container mx-auto p-6 print:hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Panel de productos */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Productos</CardTitle>
                            <CardDescription>Seleccione los productos para la venta</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Búsqueda */}
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Buscar productos..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                            </div>

                            {/* Selector de producto y cantidad */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Producto</Label>
                                    <Select
                                        value={selectedProduct}
                                        onValueChange={setSelectedProduct}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar producto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {filteredProducts.map((product) => (
                                                <SelectItem key={product.id} value={product.id}>
                                                    {product.name} - ${product.price}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Cantidad</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        />
                                        <Button onClick={handleAddToCart}>Agregar</Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Panel de facturación */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Facturación</CardTitle>
                            <CardDescription>Detalle de la venta actual</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Tabla de productos */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Producto</TableHead>
                                            <TableHead className="text-right">Cantidad</TableHead>
                                            <TableHead className="text-right">Precio</TableHead>
                                            <TableHead className="text-right">Subtotal</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span>{item.quantity}</span>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    ${item.price.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    ${item.subtotal.toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Resumen */}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>IVA (12%):</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>${grandTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex gap-2">
                                <Button
                                    className="flex-1"
                                    onClick={handleCheckout}
                                    disabled={cartItems.length === 0}
                                >
                                    Generar Factura
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handlePrint}
                                    disabled={cartItems.length === 0}
                                >
                                    <Printer className="h-4 w-4 mr-2" />
                                    Imprimir
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Componente de impresión */}
            <PrintInvoice
                cartItems={cartItems}
                total={total}
                tax={tax}
                grandTotal={grandTotal}
                invoiceNumber={currentInvoiceNumber}
                date={new Date().toLocaleDateString()}
            />
        </>
    )
}