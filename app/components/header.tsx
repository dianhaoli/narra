"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, User, MapPin, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/interviews", label: "Interviews" },
  { href: "/upload", label: "Upload" },
  { href: "/map", label: "Story Map" },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const closeMenu = () => setMenuOpen(false)

  return (
  <header className="sticky top-0 z-50 w-full border-b border-border bg-[rgba(248,244,238,0.95)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(248,244,238,0.6)] shadow-md shadow-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="hidden sm:block">
              <span 
                className="text-lg font-semibold tracking-tight"
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(to right, #a8dadc, #b8d4b8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Narra
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden flex-1 max-w-md md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search interviews, people, places..."
                className="w-full border-border bg-muted pl-10 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/profile/jane-doe">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-expanded={menuOpen}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <button 
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-small transition-transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #a8dadc, #b8d4b8)',
                color: 'black',
              }}
            >
              <Link href="/upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload interview
              </Link>
            </button>
          </div>
        </div>

        <div className="pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search interviews..." className="w-full border-border bg-muted pl-10" />
          </div>
        </div>
      </div>

      <div className={cn("md:hidden", menuOpen ? "block" : "hidden") }>
  <nav className="space-y-1 border-t border-border bg-background px-4 py-4 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {link.label}
              <span className="text-xs text-muted-foreground/80">Explore</span>
            </Link>
          ))}
          <Button asChild className="w-full" onClick={closeMenu}>
            <Link href="/upload">Upload interview</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header
