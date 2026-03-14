"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { formatNaira } from "@/lib/format"

type ChartRow = {
  date: string
  revenue: number
}

export default function SalesChart() {

  const [data, setData] = useState<ChartRow[]>([])

  async function loadSales() {

    const { data: orders } = await supabase
      .from("orders")
      .select("created_at,total_kobo")

    if (!orders) return

    const days: Record<string, number> = {}

    orders.forEach((order) => {

      const date = new Date(order.created_at)
        .toISOString()
        .split("T")[0]

      if (!days[date]) days[date] = 0

      days[date] += order.total_kobo

    })

    const chartData = Object.entries(days)
      .map(([date, total]) => ({
        date,
        revenue: total
      }))
      .slice(-7)

    setData(chartData)
  }

  useEffect(() => {
    loadSales()
  }, [])

  return (

    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Revenue (Last 7 Days)
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="date" />

          <YAxis
            tickFormatter={(v) => formatNaira(Number(v))}
          />

          <Tooltip
            formatter={(value) => formatNaira(Number(value))}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#f97316"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )
}