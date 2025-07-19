'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AlertTriangleIcon } from 'lucide-react'

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>
            We encountered an error while processing your request.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Please try again or contact support if the problem persists.
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/login">
              <Button className="w-full">
                Back to Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="w-full">
                Try Signing Up Again
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}