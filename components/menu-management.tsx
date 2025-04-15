"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { MenuItem } from "@/lib/types"
import { Edit, Loader2, Plus, Trash } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"

interface MenuManagementProps {
  menuItems: MenuItem[]
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>
}

export function MenuManagement({ menuItems, setMenuItems }: MenuManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "veg",
    image: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "veg",
      image: "",
    })
  }

  const handleAddItem = async () => {
    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: formData.name || "New Item",
      description: formData.description || "",
      price: formData.price || 0,
      category: formData.category || "veg",
      image: formData.image || "",
    }

    setMenuItems((prev) => [...prev, newItem])
    resetForm()
    setIsSubmitting(false)
    setIsAddDialogOpen(false)
  }

  const handleEditItem = (item: MenuItem) => {
    setCurrentItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateItem = async () => {
    if (!currentItem) return

    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === currentItem.id
          ? {
              ...item,
              name: formData.name || item.name,
              description: formData.description || item.description,
              price: formData.price !== undefined ? formData.price : item.price,
              category: formData.category || item.category,
              image: formData.image !== undefined ? formData.image : item.image,
            }
          : item,
      ),
    )

    resetForm()
    setCurrentItem(null)
    setIsSubmitting(false)
    setIsEditDialogOpen(false)
  }

  const handleDeleteItem = async (id: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>Manage your restaurant menu items</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>Create a new item for your restaurant menu</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Chicken Curry"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Delicious chicken curry with spices"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={handleSelectChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg">Vegetarian</SelectItem>
                    <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                    <SelectItem value="dry">Dry Items</SelectItem>
                    <SelectItem value="drinks">Drinks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleAddItem} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Item"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="h-40 w-full" />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Skeleton className="h-5 w-1/2" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <div className="flex justify-between items-center mt-4">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : menuItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-muted-foreground"
            >
              No menu items found. Add your first item!
            </motion.div>
          ) : (
            <motion.div
              key="menu-items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence initial={false}>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: index * 0.05 },
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="overflow-hidden h-full">
                      {item.image && (
                        <div className="h-40 bg-center bg-cover" style={{ backgroundImage: `url(${item.image})` }} />
                      )}

                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{item.name}</h3>
                          <div className="text-sm font-medium">${item.price.toFixed(2)}</div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.description}</p>

                        <div className="flex justify-between items-center mt-4">
                          <div className="text-xs px-2 py-1 rounded-full bg-muted">
                            {item.category === "veg"
                              ? "Vegetarian"
                              : item.category === "non-veg"
                                ? "Non-Vegetarian"
                                : item.category === "dry"
                                  ? "Dry Items"
                                  : "Drinks"}
                          </div>

                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditItem(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>Update the details of this menu item</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Item Name</Label>
              <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price ($)</Label>
              <Input
                id="edit-price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={handleSelectChange}>
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                  <SelectItem value="dry">Dry Items</SelectItem>
                  <SelectItem value="drinks">Drinks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input id="edit-image" name="image" value={formData.image} onChange={handleInputChange} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleUpdateItem} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Item"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
