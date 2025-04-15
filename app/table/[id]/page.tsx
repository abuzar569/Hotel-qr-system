"use client"

import { MenuDisplay } from "@/components/menu-display"
import { getMenuItems, getRestaurantSettings } from "@/lib/data"
import { motion } from "framer-motion"

export default async function TableMenuPage({ params }: { params: { id: string } }) {
  const tableId = params.id
  const menuItems = await getMenuItems()
  const settings = await getRestaurantSettings()

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: settings.backgroundColor || "white",
        color: settings.fontColor || "black",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.header
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: settings.titleColor || "inherit" }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            {settings.menuTitle || "Our Menu"}
          </motion.h1>
          <motion.p className="text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            Table #{tableId}
          </motion.p>
        </motion.header>

        <MenuDisplay menuItems={menuItems} tableId={tableId} settings={settings} />
      </div>
    </div>
  )
}
