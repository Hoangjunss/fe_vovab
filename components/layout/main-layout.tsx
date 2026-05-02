import { Navbar } from './navbar'
export function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100"><Navbar /><main>{children}</main></div>
}