export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: "veg" | "non-veg" | "dry" | "drinks"
  image?: string
}

export interface OrderItem {
  itemId: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  tableId: string
  items: OrderItem[]
  status: "pending" | "preparing" | "delivered" | "cancelled"
  timestamp: string
  total: number
}

export interface RestaurantSettings {
  menuTitle: string
  backgroundColor: string
  titleColor: string
  fontColor: string
}
