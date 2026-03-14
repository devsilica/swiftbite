"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function TopMeals() {

  const [meals, setMeals] = useState<any[]>([])

  async function loadMeals() {

    const { data } = await supabase
      .from("order_items")
      .select("product_name, quantity")

    if (!data) return

    const counts: Record<string, number> = {}

    data.forEach((item) => {

      if (!counts[item.product_name]) {
        counts[item.product_name] = 0
      }

      counts[item.product_name] += item.quantity

    })

    const sorted = Object.entries(counts)
      .map(([name, total]) => ({
        name,
        total
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)

    setMeals(sorted)

  }

  useEffect(() => {
    loadMeals()
  }, [])

  return (

    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

      <h2 className="text-lg font-semibold mb-4">
        Top Selling Meals
      </h2>

      <div className="space-y-3">

        {meals.map((meal, i) => (

          <div
            key={meal.name}
            className="flex justify-between items-center"
          >

            <p className="font-medium">
              {i + 1}. {meal.name}
            </p>

            <span className="text-gray-500 text-sm">
              {meal.total} orders
            </span>

          </div>

        ))}

      </div>

    </div>

  )
}