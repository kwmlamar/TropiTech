import { signup } from './actions'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams
  
  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'missing-fields':
        return 'Please fill in all required fields.'
      case 'password-mismatch':
        return 'Passwords do not match.'
      case 'password-too-short':
        return 'Password must be at least 8 characters long.'
      case 'invalid-email':
        return 'Please enter a valid email address.'
      case 'signup-failed':
        return 'Failed to create account. Please try again.'
      case 'configuration-error':
        return 'System configuration error. Please contact support.'
      case 'unexpected-error':
        return 'An unexpected error occurred. Please try again.'
      default:
        return 'An error occurred. Please try again.'
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader>
          <CardTitle>Create your TropiTech account</CardTitle>
          <CardDescription>Enter your details to create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          {params.error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                {getErrorMessage(params.error)}
              </AlertDescription>
            </Alert>
          )}
          {params.message === 'check-email' && (
            <Alert variant="success" className="mb-4">
              <AlertDescription>
                Account created successfully! Please check your email to confirm your account.
              </AlertDescription>
            </Alert>
          )}
          {params.message === 'check-email' && (
            <div className="text-center mb-4">
              <Link href="/login" className="text-sm text-muted-foreground hover:underline">
                Already confirmed? Sign in here
              </Link>
            </div>
          )}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                type="text" 
                autoComplete="given-name" 
                required 
                placeholder="John" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                type="text" 
                autoComplete="family-name" 
                required 
                placeholder="Doe" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                placeholder="you@example.com" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="new-password" 
                required 
                placeholder="••••••••" 
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                autoComplete="new-password" 
                required 
                placeholder="••••••••" 
                minLength={8}
              />
            </div>
            <Button type="submit" formAction={signup} className="w-full mt-2">
              Create Account
            </Button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="mx-3 text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="text-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/" className="text-xs text-muted-foreground hover:underline">
            Return to homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
} 