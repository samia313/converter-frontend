'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from '@/lib/auth-client'

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending && !session) {
      router.replace('/login')
    }
  }, [isPending, session, router])

  async function handleSignOut() {
    await signOut()
    router.replace('/login')
    router.refresh()
  }

  if (isPending || !session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-gray-600">Loading your account...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <Link href="/" className="text-3xl font-bold text-blue-700">
            PDFilio
          </Link>

          <button
            onClick={handleSignOut}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </header>

        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-blue-700 mb-2">
            YOUR ACCOUNT
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {session.user.name || 'User'}!
          </h1>

          <p className="mt-3 text-gray-600">
            You are signed in to your PDFilio account.
          </p>

          <div className="mt-8 rounded-xl bg-slate-50 border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4">
              Account information
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{session.user.name || 'Not provided'}</p>
              </div>

              <div>
                <p className="text-gray-500">Email address</p>
                <p className="font-medium text-gray-900">{session.user.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Explore PDF tools
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
