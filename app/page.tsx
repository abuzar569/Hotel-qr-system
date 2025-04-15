"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ArrowRight, QrCode } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <motion.header
        className="bg-primary py-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-primary-foreground">Restaurant QR Menu System</h1>
        </div>
      </motion.header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="mb-8 p-6 bg-muted rounded-lg inline-block"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
          >
            <QrCode size={120} className="mx-auto text-primary" />
          </motion.div>

          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Scan. Order. Enjoy.
          </motion.h2>

          <motion.p
            className="text-xl mb-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            A seamless QR code-based ordering system for your restaurant. Customers scan, order, and you deliver - all
            without waiting staff intervention.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg">
                <Link href="/admin/login">
                  Admin Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" size="lg">
                <Link href="/table/demo">
                  View Demo Menu
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => signIn("google")} size="lg" variant="default">
                Sign in with Google
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <motion.footer
        className="py-6 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Restaurant QR Menu System
        </div>
      </motion.footer>
    </div>
  )
}
