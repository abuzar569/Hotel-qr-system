"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MenuItem, Order } from "@/lib/types"
import { formatDistanceToNow } from "@/lib/utils"
import { OrderItemSkeleton } from "@/components/order-item-skeleton"
import { motion, AnimatePresence } from "framer-motion"

interface OrdersManagementProps {
  orders: Order[]
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
  menuItems: MenuItem[]
}

export function OrdersManagement({ orders, setOrders, menuItems }: OrdersManagementProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleStatusChange = (orderId: string, newStatus: "pending" | "preparing" | "delivered" | "cancelled") => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const getItemName = (itemId: string) => {
    const item = menuItems.find((item) => item.id === itemId)
    return item ? item.name : "Unknown Item"
  }

  const filteredOrders = statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter)

  // Sort orders by timestamp (newest first)
  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Manage customer orders</CardDescription>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <OrderItemSkeleton key={index} />
              ))}
            </motion.div>
          ) : sortedOrders.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-muted-foreground"
            >
              No orders found
            </motion.div>
          ) : (
            <motion.div
              key="orders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <AnimatePresence initial={false}>
                {sortedOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1 },
                    }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                  >
                    <Card className="overflow-hidden">
                      <motion.div
                        className={`h-2 ${
                          order.status === "pending"
                            ? "bg-yellow-500"
                            : order.status === "preparing"
                              ? "bg-blue-500"
                              : order.status === "delivered"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                        layoutId={`status-bar-${order.id}`}
                      />

                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                          <div>
                            <h3 className="font-semibold">Order #{order.id.slice(-6)}</h3>
                            <p className="text-sm text-muted-foreground">
                              Table #{order.tableId} • {formatDistanceToNow(new Date(order.timestamp))} ago
                            </p>
                          </div>

                          <div className="mt-2 sm:mt-0 flex items-center">
                            <div className="text-sm font-medium mr-4">${order.total.toFixed(2)}</div>

                            <Select
                              value={order.status}
                              onValueChange={(value) =>
                                handleStatusChange(
                                  order.id,
                                  value as "pending" | "preparing" | "delivered" | "cancelled",
                                )
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="preparing">Preparing</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-1 mb-4">
                          {order.items.slice(0, 2).map((item) => (
                            <div key={item.itemId} className="flex justify-between text-sm">
                              <span>
                                {item.quantity} × {item.name}
                              </span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}

                          {order.items.length > 2 && (
                            <div className="text-sm text-muted-foreground">+{order.items.length - 2} more items</div>
                          )}
                        </div>

                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder && (
                <>
                  Order #{selectedOrder.id.slice(-6)} • Table #{selectedOrder.tableId}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <h4 className="text-sm font-medium mb-2">Order Items</h4>
                <div className="space-y-2">
                  <AnimatePresence>
                    {selectedOrder.items.map((item, index) => (
                      <motion.div
                        key={item.itemId}
                        className="flex justify-between"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: index * 0.1 },
                        }}
                      >
                        <div>
                          <span className="font-medium">{item.quantity} ×</span> {item.name}
                        </div>
                        <div>${(item.price * item.quantity).toFixed(2)}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <motion.div
                className="pt-2 border-t"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex justify-between font-bold">
                  <div>Total</div>
                  <div>${selectedOrder.total.toFixed(2)}</div>
                </div>
              </motion.div>

              <motion.div
                className="pt-2 border-t text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p>
                  <span className="font-medium">Order Time:</span> {new Date(selectedOrder.timestamp).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {selectedOrder.status}
                </p>
              </motion.div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
