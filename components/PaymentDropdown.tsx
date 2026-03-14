"use client"

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function PaymentDropdown({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: string
}) {

  const router = useRouter()

  async function updatePayment(status: string) {

    await supabase
      .from("orders")
      .update({ payment_status: status })
      .eq("id", orderId)

    router.refresh()
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={(e) => updatePayment(e.target.value)}
      className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
    >
      <option value="unpaid">Unpaid</option>
      <option value="paid">Paid</option>
    </select>
  )
}