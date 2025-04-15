"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuManagement } from "@/components/menu-management"
import { OrdersManagement } from "@/components/orders-management"
import { SettingsManagement } from "@/components/settings-management"
import { QrCodeGenerator } from "@/components/qr-code-generator"
import { getMenuItems, getOrders, getRestaurantSettings } from "@/lib/data"
import type { MenuItem, Order, RestaurantSettings } from "@/lib/types"
import { LoadingScreen } from "@/components/loading-screen"
import { motion, AnimatePresence } from "framer-motion"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [settings, setSettings] = useState<RestaurantSettings>({
    menuTitle: "Our Menu",
    backgroundColor: "#ffffff",
    titleColor: "#000000",
    fontColor: "#333333",
  })
  const [activeTab, setActiveTab] = useState("orders")

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("admin-auth")
      if (!token) {
        router.push("/admin/login")
      } else {
        loadData()
      }
    }

    const loadData = async () => {
      try {
        const [menuData, ordersData, settingsData] = await Promise.all([
          getMenuItems(),
          getOrders(),
          getRestaurantSettings(),
        ])

        setMenuItems(menuData)
        setOrders(ordersData)
        setSettings(settingsData)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        // Add a slight delay to make the loading animation visible
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin-auth")
    router.push("/admin/login")
  }

  if (isLoading) {
    return <LoadingScreen message="Loading dashboard..." />
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="p-6">
        <motion.h1
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Restaurant Dashboard
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { title: "Total Menu Items", value: menuItems.length },
            { title: "Pending Orders", value: orders.filter((order) => order.status === "pending").length },
            { title: "Preparing Orders", value: orders.filter((order) => order.status === "preparing").length },
            {
              title: "Today's Revenue",
              value: `$${orders
                .filter((order) => {
                  const today = new Date().toISOString().split("T")[0]
                  const orderDate = order.timestamp.split("T")[0]
                  return orderDate === today
                })
                .reduce((sum, order) => sum + order.total, 0)
                .toFixed(2)}`,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    className="text-3xl font-bold"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 + 0.1 * index }}
                  >
                    {stat.value}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Tabs defaultValue="orders" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="menu">Menu Management</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="qrcodes">QR Codes</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="orders" forceMount hidden={activeTab !== "orders"}>
                  <OrdersManagement orders={orders} setOrders={setOrders} menuItems={menuItems} />
                </TabsContent>

                <TabsContent value="menu" forceMount hidden={activeTab !== "menu"}>
                  <MenuManagement menuItems={menuItems} setMenuItems={setMenuItems} />
                </TabsContent>

                <TabsContent value="settings" forceMount hidden={activeTab !== "settings"}>
                  <SettingsManagement settings={settings} setSettings={setSettings} />
                </TabsContent>

                <TabsContent value="qrcodes" forceMount hidden={activeTab !== "qrcodes"}>
                  <QrCodeGenerator />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </AdminLayout>
  )
}
