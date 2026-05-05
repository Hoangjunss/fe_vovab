'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { UserPlus } from 'lucide-react'
import Link from 'next/link'
import { GoogleLogin } from '@react-oauth/google'

export default function RegisterPage() {
  const router = useRouter()
  const { register, loginWithGoogle } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }
    setLoading(true)
    try {
      await register(email, password, fullName)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await loginWithGoogle(credentialResponse.credential)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Đăng ký bằng Google thất bại')
    }
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-md px-4 py-16">
        <Card className="clay-card border-white/30 shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
              <UserPlus className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Đăng ký</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div>
                <Input
                  placeholder="Họ và tên"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  className="clay-input w-full"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="clay-input w-full"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="clay-input w-full"
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="clay-input w-full"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full clay-button">
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Hoặc</span>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => console.log('Google login failed')}
  useOneTap={false}
  theme="outline"
  shape="pill"
  text="signup_with"
  size="large"
/>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}