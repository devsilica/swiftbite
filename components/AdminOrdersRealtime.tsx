"use client"

import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabaseClient"
import { formatNaira } from "@/lib/format"
import Link from "next/link"
import PaymentDropdown from "@/components/PaymentDropdown"
import StatusDropdown from "@/components/StatusDropdown"
import SalesChart from "@/components/SalesChart"
import TopMeals from "@/components/TopMeals"

export default function AdminOrdersRealtime() {

  const [orders, setOrders] = useState<any[]>([])
  const [newOrderId, setNewOrderId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const audioRef = useRef<HTMLAudioElement | null>(null)

  async function loadOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })

    setOrders(data || [])
  }


  const filteredOrders = orders.filter((order) => {

    const term = search.toLowerCase()

    return (
      order.customer_name?.toLowerCase().includes(term) ||
      order.phone?.includes(term) ||
      order.id?.toLowerCase().includes(term)
    )
  })

  useEffect(() => {

    audioRef.current = new Audio("/new-order.mp3")

    loadOrders()

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        (payload) => {

          if (payload.eventType === "INSERT") {

            const newOrder = payload.new

            if (audioRef.current) {
              audioRef.current.currentTime = 0
              audioRef.current.play().catch(() => {})
            }

            setNewOrderId(newOrder.id)

            window.open(
              `/admin/orders/${newOrder.id}/print`,
              "_blank"
            )

            setTimeout(() => {
              setNewOrderId(null)
            }, 5000)

          }

          loadOrders()

        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }

  }, [])

  const totalOrders = orders.length

  const revenue = orders.reduce(
    (sum, order) => sum + order.total_kobo,
    0
  )

  const pending = orders.filter(
    (o) => o.order_status === "pending"
  ).length

  return (
    <>

      {/* SEARCH */}

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search order, phone, or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
        />

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <p className="text-2xl font-semibold mt-2">
            {totalOrders}
          </p>

        </div>


        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <p className="text-2xl font-semibold mt-2">
            {formatNaira(revenue)}
          </p>

        </div>


        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

          <p className="text-sm text-gray-500">
            Pending Orders
          </p>

          <p className="text-2xl font-semibold mt-2">
            {pending}
          </p>

        </div>

      </div>

      <div className="mt-10">
  <SalesChart />
</div>

<div className="mt-10 grid md:grid-cols-2 gap-6">

  <SalesChart />

  <TopMeals />

</div>
      {/* TABLE */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 text-left">

            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Address</th>
              <th className="p-4">Total</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Print</th>
            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order.id}
                className={`border-t transition
                ${order.id === newOrderId
                  ? "bg-green-100 animate-pulse"
                  : "hover:bg-gray-50"}
                `}
              >

                <td className="p-4 font-medium text-orange-600">

                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="hover:underline"
                  >
                    {`SB-${order.id.slice(0,8)}`}
                  </Link>

                </td>

                <td className="p-4">
                  {order.customer_name}
                </td>

                <td className="p-4">
                  {order.phone}
                </td>

                <td className="p-4">
                  {order.address}
                </td>

                <td className="p-4 font-medium">
                  {formatNaira(order.total_kobo)}
                </td>

                <td className="p-4">
                  <PaymentDropdown
                    orderId={order.id}
                    currentStatus={order.payment_status}
                  />
                </td>

                <td className="p-4">
                  <StatusDropdown
                    orderId={order.id}
                    currentStatus={order.order_status}
                  />
                </td>

                <td className="p-4">
                  <a
                    href={`/admin/orders/${order.id}/print`}
                    target="_blank"
                    className="text-sm bg-black text-white px-3 py-1 rounded-lg hover:opacity-80"
                  >
                    Print
                  </a>
                </td>

              </tr>

            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-gray-400">
                  No orders found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </>
  )
}