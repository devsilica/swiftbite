import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"
import { formatNaira } from "@/lib/format"

export default async function HomePopularMeals() {

  const { data: meals } = await supabase
    .from("menu_items")
    .select("*")
    .limit(6)

  return (

    <section className="max-w-6xl mx-auto px-6 py-24">

      {/* Section Header */}

      <div className="flex justify-between items-end mb-12">

        <div>

          <h2 className="text-3xl font-bold">
            Popular Meals
          </h2>

          <p className="text-gray-500 mt-2">
            Curated favorites from our kitchen
          </p>

        </div>

        <Link
          href="/menu"
          className="text-orange-600 font-medium hover:underline"
        >
          View Full Menu →
        </Link>

      </div>

      {/* Meals Grid */}

      <div className="grid md:grid-cols-3 gap-8">

        {meals?.map((meal) => (

          <div
            key={meal.id}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group"
          >

            {/* Image */}

            <div className="relative h-52 overflow-hidden">

              <img
                src={meal.image_url}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Price badge */}

              <div className="absolute top-4 right-4 bg-black text-white text-sm px-3 py-1 rounded-full shadow">
                {formatNaira(meal.price_kobo)}
              </div>

            </div>

            {/* Content */}

            <div className="p-5">

              <h3 className="font-semibold text-lg">
                {meal.name}
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                Freshly prepared with premium ingredients.
              </p>

              {/* Button */}

              <Link
                href="/menu"
                className="inline-block mt-5 bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-500 transition"
              >
                Add to Cart
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>

  )

}