"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function TrackPage() {

  const [code, setCode] = useState("")
  const router = useRouter()

  function handleTrack(e: React.FormEvent) {
    e.preventDefault()

    if (!code.trim()) return

    router.push(`/track/${code.trim()}`)
  }

  return (

    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-10 max-w-md w-full text-center">

        {/* Icon */}

        <div className="text-4xl mb-4">
          📦
        </div>

        {/* Title */}

        <h1 className="text-3xl font-bold mb-3">
          Track Your Order
        </h1>

        <p className="text-gray-500 mb-8">
          Enter your order code to check the delivery status.
        </p>

        {/* Form */}

        <form onSubmit={handleTrack} className="space-y-4">

          <input
            type="text"
            placeholder="e.g. SB-a02dcaf3"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 text-center font-medium"
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-500 transition"
          >
            Track Order
          </button>

        </form>

        {/* Helper text */}

        <p className="text-xs text-gray-400 mt-6">
          Your order code was sent to you after checkout.
        </p>

      </div>

    </main>

  )

}