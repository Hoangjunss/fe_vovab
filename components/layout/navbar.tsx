'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Menu, X, BookOpen, Target, Zap, LayoutDashboard, Swords, LogIn, UserPlus, LogOut, User, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navbar() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false)
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const handleLogout = () => { logout(); router.push('/'); setDrawerOpen(false) }
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <span className="font-extrabold text-lg hidden sm:inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Vocab</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/" icon={<LayoutDashboard className="h-4 w-4" />}>Dashboard</NavLink>
            <NavLink href="/vocab" icon={<BookOpen className="h-4 w-4" />}>Từ vựng</NavLink>
            <NavLink href="/tests" icon={<Target className="h-4 w-4" />}>Luyện đề</NavLink>
            <NavLink href="/practice" icon={<Zap className="h-4 w-4" />}>Luyện tập</NavLink>
            <NavLink href="/arena" icon={<Swords className="h-4 w-4" />}>Đấu trường</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary">{getInitials(user.fullName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel><div className="flex flex-col space-y-1"><p className="text-sm font-medium">{user.fullName}</p><p className="text-xs text-muted-foreground">{user.email}</p></div></DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile')}><User className="mr-2 h-4 w-4" />Hồ sơ</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}><Settings className="mr-2 h-4 w-4" />Cài đặt</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600"><LogOut className="mr-2 h-4 w-4" />Đăng xuất</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => router.push('/login')} className="gap-1 hover:scale-105 transition">Đăng nhập</Button>
                <Button size="sm" onClick={() => router.push('/register')} className="bg-primary text-white hover:bg-primary/90 shadow-md hover:scale-105 transition">Đăng ký</Button>
              </>
            )}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden transition-all hover:scale-110" onClick={() => setDrawerOpen(!drawerOpen)}>
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 top-16 z-40 transition-all duration-300 md:hidden ${drawerOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
        <div className={`absolute inset-x-0 top-0 bg-white/95 backdrop-blur-md shadow-xl border-t border-border/50 transition-all duration-300 transform ${drawerOpen ? 'translate-y-0' : '-translate-y-full'} max-h-[80vh] overflow-y-auto`}>
          <div className="flex flex-col gap-2 p-4">
            <DrawerLink href="/" onClick={() => setDrawerOpen(false)} icon={<LayoutDashboard className="h-5 w-5" />}>Dashboard</DrawerLink>
            <DrawerLink href="/vocab" onClick={() => setDrawerOpen(false)} icon={<BookOpen className="h-5 w-5" />}>Từ vựng</DrawerLink>
            <DrawerLink href="/tests" onClick={() => setDrawerOpen(false)} icon={<Target className="h-5 w-5" />}>Luyện đề</DrawerLink>
            <DrawerLink href="/practice" onClick={() => setDrawerOpen(false)} icon={<Zap className="h-5 w-5" />}>Luyện tập</DrawerLink>
            <DrawerLink href="/arena" onClick={() => setDrawerOpen(false)} icon={<Swords className="h-5 w-5" />}>Đấu trường</DrawerLink>
            <div className="border-t border-border my-2 pt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-foreground/70">{user.email}</div>
                  <DrawerLink href="#" onClick={handleLogout} icon={<LogOut className="h-5 w-5" />}>Đăng xuất</DrawerLink>
                </>
              ) : (
                <>
                  <DrawerLink href="/login" onClick={() => setDrawerOpen(false)} icon={<LogIn className="h-5 w-5" />}>Đăng nhập</DrawerLink>
                  <DrawerLink href="/register" onClick={() => setDrawerOpen(false)} icon={<UserPlus className="h-5 w-5" />}>Đăng ký</DrawerLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return <Link href={href} className="group flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 rounded-full hover:bg-primary/10 active:scale-95">{icon}{children}</Link>
}

function DrawerLink({ href, onClick, children, icon }: { href: string; onClick: () => void; children: React.ReactNode; icon?: React.ReactNode }) {
  return <Link href={href} onClick={onClick} className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95">{icon && <span className="text-primary/70">{icon}</span>}{children}</Link>
}