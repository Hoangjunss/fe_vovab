'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="hidden font-bold text-foreground sm:inline">TOEIC Learning</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/">Dashboard</NavLink>
            <NavLink href="/vocab">Vocabulary</NavLink>
            <NavLink href="/tests">Tests</NavLink>
            <NavLink href="/practice">Practice</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            {drawerOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background md:hidden">
          <div className="flex flex-col gap-2 p-4">
            <DrawerLink href="/" onClick={() => setDrawerOpen(false)}>
              Dashboard
            </DrawerLink>
            <DrawerLink href="/vocab" onClick={() => setDrawerOpen(false)}>
              Vocabulary
            </DrawerLink>
            <DrawerLink href="/tests" onClick={() => setDrawerOpen(false)}>
              Tests
            </DrawerLink>
            <DrawerLink href="/practice" onClick={() => setDrawerOpen(false)}>
              Practice
            </DrawerLink>
          </div>
        </div>
      )}
    </>
  )
}

function NavLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
    >
      {children}
    </Link>
  )
}

function DrawerLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: string
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
    >
      {children}
    </Link>
  )
}
