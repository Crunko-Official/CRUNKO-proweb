"use client"

import { useState } from "react"
import { login } from "@/app/actions/admin"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await login(username, password)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="card-surface w-full max-w-sm rounded-2xl p-8">
        <h1 className="mb-6 text-center text-2xl font-bold text-brand-dark">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-brand-line bg-white/85 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
              placeholder="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-brand-line bg-white/85 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="interactive-lift w-full rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}
