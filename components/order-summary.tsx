"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { MenuItem, OrderItem } from "@/lib/types"
import { ArrowLeft, Loader2, Minus, Plus, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface OrderSummaryProps {
  orderItems: OrderItem[]
  menuItems: MenuItem[]
  tableId: string
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onPlaceOrder: () => void
  onBack: () => void
  isLoading?: boolean
}

export function OrderSummary({
  orderItems,
  menuItems,
  tableId,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onBack,
  isLoading = false,
}: OrderSummaryProps) {
  const getItemDetails = (itemId: string) => {
    return menuItems.find((item) => item.id === itemId)
  }

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2" disabled={isLoading}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle>Your Order - Table #{tableId}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        {orderItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Your order is empty</div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {orderItems.map((item) => {
                const itemDetails = getItemDetails(item.itemId)

                return (
                  <motion.div
                    key={item.itemId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center justify-between py-3 border-b">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        {itemDetails && <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.itemId, item.quantity - 1)}
                          disabled={isLoading}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <motion.span
                          key={item.quantity}
                          initial={{ scale: 1.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-8 text-center"
                        >
                          {item.quantity}
                        </motion.span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onUpdateQuantity(item.itemId, item.quantity + 1)}
                          disabled={isLoading}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveItem(item.itemId)}
                          className="text-destructive"
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="w-24 text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            <motion.div
              className="flex justify-between pt-4 font-bold text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span>Total</span>
              <motion.span key={totalAmount} initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                ${totalAmount.toFixed(2)}
              </motion.span>
            </motion.div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg" onClick={onPlaceOrder} disabled={orderItems.length === 0 || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
