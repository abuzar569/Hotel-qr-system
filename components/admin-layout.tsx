"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
  children: React.ReactNode
  onLogout: () => void
}

export function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/admin/dashboard"
                    className="px-4 py-2 hover:bg-muted rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Button variant="ghost" onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/admin/dashboard" className="text-xl font-bold ml-2 md:ml-0">
              Restaurant Admin
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-muted/30">{children}</main>
    </div>
  )
}
