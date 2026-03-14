"use client"

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function StatusDropdown({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {

  const router = useRouter()

  async function updateStatus(status: string) {

    await supabase
      .from("orders")
      .update({ order_status: status })
      .eq("id", orderId)

    router.refresh() // THIS FIXES YOUR ISSUE
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={(e) => updateStatus(e.target.value)}
      className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
    >
      <option value="pending">Pending</option>
      <option value="preparing">Preparing</option>
      <option value="ready">Ready</option>
      <option value="on_the_way">On the way</option>
      <option value="delivered">Delivered</option>
    </select>
  )
}