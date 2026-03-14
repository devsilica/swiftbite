"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function AdminLogin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function login(e: React.FormEvent) {

    e.preventDefault()

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Invalid login")
      setLoading(false)
      return
    }

    router.push("/admin/orders")

  }

  return (

    <main className="min-h-screen flex items-center justify-center bg-[#fafafa]">

      <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200 w-[400px]">

        <h1 className="text-2xl font-bold mb-6">
          Admin Login
        </h1>

        <form onSubmit={login} className="space-y-4">

          <input
            type="email"
            placeholder="Admin email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

        </form>

      </div>

    </main>
  )
}