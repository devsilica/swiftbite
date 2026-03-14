"use client"

import { useEffect } from "react"
import { requireAdmin } from "@/lib/adminAuth"
import AdminOrdersRealtime from "@/components/AdminOrdersRealtime"
import AdminLogout from "@/components/AdminLogout"

export default function OrdersPage() {

  useEffect(()=>{
    requireAdmin()
  },[])

  return (

    <main className="min-h-screen bg-[#fafafa] py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h1 className="text-3xl font-bold">
              SwiftBite Admin
            </h1>

            <p className="text-gray-500 mt-1">
              Manage incoming restaurant orders
            </p>

          </div>
 <AdminLogout />
        </div>

        <AdminOrdersRealtime />

      </div>

    </main>

  )
}