"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Utensils } from "lucide-react"
import type { MenuItem } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface MenuItemCardProps {
  item: MenuItem
  onAddToOrder: (item: MenuItem, quantity: number) => void
}

export function MenuItemCard({ item, onAddToOrder }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const handleAddToOrder = () => {
    setIsAdding(true)

    // Animate the add to cart action
    setTimeout(() => {
      onAddToOrder(item, quantity)
      setQuantity(1)
      setIsAdding(false)
    }, 300)
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          {item.image ? (
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-muted">
              <Utensils className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Badge variant={item.category === "veg" ? "success" : "destructive"}>
              {item.category === "veg" ? "Veg" : item.category === "non-veg" ? "Non-Veg" : item.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 flex-grow">
          <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
          <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
              <Minus className="h-4 w-4" />
            </Button>
            <motion.span
              key={quantity}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-8 text-center"
            >
              {quantity}
            </motion.span>
            <Button variant="outline" size="icon" onClick={incrementQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <motion.div whileTap={{ scale: 0.9 }}>
            <Button onClick={handleAddToOrder} disabled={isAdding} className={isAdding ? "animate-pulse" : ""}>
              {isAdding ? "Adding..." : "Add to Order"}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
