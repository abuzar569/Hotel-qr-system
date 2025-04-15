import type { MenuItem, Order, RestaurantSettings } from "./types"

// Mock data for demo purposes
// In a real app, this would be fetched from a database

const menuItemsData: MenuItem[] = [
  {
    id: "item-1",
    name: "Vegetable Curry",
    description: "A delicious mix of seasonal vegetables in a rich curry sauce",
    price: 12.99,
    category: "veg",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "item-2",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with spices and vegetables",
    price: 14.99,
    category: "veg",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "item-3",
    name: "Chicken Biryani",
    description: "Fragrant rice dish with chicken and aromatic spices",
    price: 16.99,
    category: "non-veg",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "item-4",
    name: "Lamb Curry",
    description: "Tender pieces of lamb in a flavorful curry sauce",
    price: 18.99,
    category: "non-veg",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "item-5",
    name: "Papadum",
    description: "Crispy thin flatbread made from lentil flour",
    price: 3.99,
    category: "dry",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "item-6",
    name: "Onion Bhaji",
    description: "Deep-fried onion fritters with spices",
    price: 5.99,
    category: "dry",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "item-7",
    name: "Mango Lassi",
    description: "Refreshing yogurt drink with mango pulp",
    price: 4.99,
    category: "drinks",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "item-8",
    name: "Masala Chai",
    description: "Spiced tea with milk",
    price: 3.49,
    category: "drinks",
    image: "/placeholder.svg?height=300&width=400",
  },
]

const ordersData: Order[] = [
  {
    id: "order-1",
    tableId: "4",
    items: [
      {
        itemId: "item-1",
        name: "Vegetable Curry",
        price: 12.99,
        quantity: 2,
      },
      {
        itemId: "item-7",
        name: "Mango Lassi",
        price: 4.99,
        quantity: 2,
      },
    ],
    status: "delivered",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    total: 35.96,
  },
  {
    id: "order-2",
    tableId: "2",
    items: [
      {
        itemId: "item-3",
        name: "Chicken Biryani",
        price: 16.99,
        quantity: 1,
      },
      {
        itemId: "item-6",
        name: "Onion Bhaji",
        price: 5.99,
        quantity: 1,
      },
    ],
    status: "preparing",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    total: 22.98,
  },
  {
    id: "order-3",
    tableId: "7",
    items: [
      {
        itemId: "item-4",
        name: "Lamb Curry",
        price: 18.99,
        quantity: 1,
      },
      {
        itemId: "item-8",
        name: "Masala Chai",
        price: 3.49,
        quantity: 2,
      },
    ],
    status: "pending",
    timestamp: new Date(Date.now() - 600000).toISOString(),
    total: 25.97,
  },
]

const settingsData: RestaurantSettings = {
  menuTitle: "Spice Garden Restaurant",
  backgroundColor: "#ffffff",
  titleColor: "#4a2c2a",
  fontColor: "#333333",
}

// Simulate API calls with a small delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getMenuItems(): Promise<MenuItem[]> {
  await delay(300)
  return [...menuItemsData]
}

export async function getOrders(): Promise<Order[]> {
  await delay(300)
  return [...ordersData]
}

export async function getRestaurantSettings(): Promise<RestaurantSettings> {
  await delay(300)
  return { ...settingsData }
}
