'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, BookOpen, Target, Zap, LayoutDashboard, Swords, LogIn, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">L24</span>
            </div>
            <span className="font-extrabold text-lg hidden sm:inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">LEARN24H VOCAB</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/" icon={<LayoutDashboard className="h-4 w-4" />}>Dashboard</NavLink>
            <NavLink href="/vocab" icon={<BookOpen className="h-4 w-4" />}>Từ vựng</NavLink>
            <NavLink href="/tests" icon={<Target className="h-4 w-4" />}>Luyện đề</NavLink>
            <NavLink href="/practice" icon={<Zap className="h-4 w-4" />}>Luyện tập</NavLink>
            <NavLink href="/arena" icon={<Swords className="h-4 w-4" />}>Đấu trường</NavLink>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1 text-foreground/70 hover:text-primary"><LogIn className="h-4 w-4" /> Đăng nhập</Button>
            <Button size="sm" className="bg-primary text-white hover:bg-primary/90 shadow-md"><UserPlus className="h-4 w-4 mr-1" /> Đăng ký</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setDrawerOpen(!drawerOpen)}>
            {drawerOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>
      {drawerOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-2 p-4">
            <DrawerLink href="/" onClick={() => setDrawerOpen(false)}>Dashboard</DrawerLink>
            <DrawerLink href="/vocab" onClick={() => setDrawerOpen(false)}>Từ vựng</DrawerLink>
            <DrawerLink href="/tests" onClick={() => setDrawerOpen(false)}>Luyện đề</DrawerLink>
            <DrawerLink href="/practice" onClick={() => setDrawerOpen(false)}>Luyện tập</DrawerLink>
            <DrawerLink href="/arena" onClick={() => setDrawerOpen(false)}>Đấu trường</DrawerLink>
            <div className="border-t border-border my-2 pt-2 flex flex-col gap-2">
              <DrawerLink href="/login" onClick={() => setDrawerOpen(false)}>Đăng nhập</DrawerLink>
              <DrawerLink href="/register" onClick={() => setDrawerOpen(false)}>Đăng ký</DrawerLink>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return <Link href={href} className="group flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all rounded-lg hover:bg-secondary">{icon}{children}</Link>
}
function DrawerLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return <Link href={href} onClick={onClick} className="block px-4 py-3 rounded-lg text-base font-medium text-foreground hover:bg-secondary transition-all">{children}</Link>
}