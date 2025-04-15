"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuItemCard } from "@/components/menu-item-card"
import { OrderSummary } from "@/components/order-summary"
import type { MenuItem, Order, OrderItem, RestaurantSettings } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MenuItemSkeleton } from "@/components/menu-item-skeleton"
import { motion, AnimatePresence } from "framer-motion"

interface MenuDisplayProps {
  menuItems: MenuItem[]
  tableId: string
  settings: RestaurantSettings
}

export function MenuDisplay({ menuItems, tableId, settings }: MenuDisplayProps) {
  const { toast } = useToast()
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("veg")

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const categories = [
    { id: "veg", name: "Vegetarian" },
    { id: "non-veg", name: "Non-Vegetarian" },
    { id: "dry", name: "Dry Items" },
    { id: "drinks", name: "Drinks" },
  ]

  const addToOrder = (item: MenuItem, quantity: number) => {
    if (quantity <= 0) return

    setOrderItems((prev) => {
      const existingItem = prev.find((i) => i.itemId === item.id)

      if (existingItem) {
        return prev.map((i) => (i.itemId === item.id ? { ...i, quantity: i.quantity + quantity } : i))
      } else {
        return [
          ...prev,
          {
            itemId: item.id,
            name: item.name,
            price: item.price,
            quantity,
          },
        ]
      }
    })

    toast({
      title: "Added to order",
      description: `${quantity} × ${item.name}`,
    })
  }

  const removeFromOrder = (itemId: string) => {
    setOrderItems((prev) => prev.filter((item) => item.itemId !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(itemId)
      return
    }

    setOrderItems((prev) => prev.map((item) => (item.itemId === itemId ? { ...item, quantity } : item)))
  }

  const placeOrder = async () => {
    if (orderItems.length === 0) {
      toast({
        title: "Cannot place order",
        description: "Your order is empty",
        variant: "destructive",
      })
      return
    }

    const order: Order = {
      id: `order-${Date.now()}`,
      tableId,
      items: orderItems,
      status: "pending",
      timestamp: new Date().toISOString(),
      total: orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }

    try {
      // Simulate loading
      setIsLoading(true)

      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Placing order:", order)

      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.id.slice(-6)} has been sent to the kitchen.`,
      })

      // Reset cart
      setOrderItems([])
      setShowCart(false)
    } catch (error) {
      toast({
        title: "Failed to place order",
        description: "Please try again or call for assistance",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[60vh]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <MenuItemSkeleton key={index} />
              ))}
            </div>
          </motion.div>
        ) : !showCart ? (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Tabs defaultValue="veg" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="w-full justify-start mb-6 overflow-x-auto flex-nowrap">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="px-4 py-2">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <AnimatePresence mode="wait">
                {categories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {menuItems
                        .filter((item) => item.category === category.id)
                        .map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: { delay: index * 0.1 },
                            }}
                          >
                            <MenuItemCard item={item} onAddToOrder={addToOrder} />
                          </motion.div>
                        ))}
                    </motion.div>

                    {menuItems.filter((item) => item.category === category.id).length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No items available in this category
                      </motion.div>
                    )}
                  </TabsContent>
                ))}
              </AnimatePresence>
            </Tabs>

            {orderItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed bottom-6 right-6"
              >
                <Button
                  size="lg"
                  onClick={() => setShowCart(true)}
                  className="shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  View Order ({totalItems})
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <OrderSummary
              orderItems={orderItems}
              menuItems={menuItems}
              tableId={tableId}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromOrder}
              onPlaceOrder={placeOrder}
              onBack={() => setShowCart(false)}
              isLoading={isLoading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
