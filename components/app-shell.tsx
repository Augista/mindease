"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, BookHeart, Brain, Home, Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/journal",
      label: "Journal",
      icon: BookHeart,
      active: pathname === "/journal",
    },
    {
      href: "/mindfulness",
      label: "Mindfulness",
      icon: Brain,
      active: pathname === "/mindfulness",
    },
    {
      href: "/insights",
      label: "Insights",
      icon: BarChart3,
      active: pathname === "/insights",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-60 sm:w-80">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center gap-2 px-2">
                <Brain className="h-6 w-6 text-primary" />
                <h1 className="text-lg font-semibold">MindEase</h1>
              </div>
              <nav className="flex flex-col gap-2 px-2">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                      route.active ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">MindEase</h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {/* Desktop Layout */}
      <div className="flex flex-1 flex-col md:grid md:grid-cols-[220px_1fr]">
        <aside className="hidden border-r bg-background md:flex md:flex-col">
          <div className="flex h-14 items-center gap-2 border-b px-4">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold">MindEase</h1>
          </div>
          <nav className="flex flex-col gap-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  route.active ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="ml-2">Toggle Theme</span>
            </Button>
          </div>
        </aside>
        <main className="flex flex-1 flex-col">
          <div className="flex-1 p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
