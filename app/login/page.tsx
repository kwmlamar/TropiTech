import { login } from './actions'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader>
          <CardTitle>Sign in to TropiTech</CardTitle>
          <CardDescription>Enter your email and password to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          {params.message === 'email-confirmed' && (
            <Alert variant="success" className="mb-4">
              <AlertDescription>
                Your email has been confirmed! You can now sign in to your account.
              </AlertDescription>
            </Alert>
          )}
          {params.error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {decodeURIComponent(params.error)}
              </AlertDescription>
            </Alert>
          )}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required placeholder="••••••••" />
            </div>
            <Button type="submit" formAction={login} className="w-full mt-2">Sign in</Button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="mx-3 text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="text-center">
            <Link href="/signup" className="text-sm text-muted-foreground hover:underline">
              Don't have an account? Sign up
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/" className="text-xs text-muted-foreground hover:underline">Return to homepage</Link>
        </CardFooter>
      </Card>
    </div>
  )
}