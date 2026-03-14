import Link from "next/link"

export default function Hero() {

  return (

    <section className="bg-[#fafafa] py-28">

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Text */}

        <div>

          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-sm font-medium">
            SwiftBite Specials
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6 leading-tight tracking-tight">
            Good food,
            <span className="text-orange-600"> delivered fast.</span>
          </h1>

          <p className="text-gray-600 mt-6 max-w-lg text-lg leading-relaxed">
            Order freshly prepared meals, satisfying swallows, and chilled drinks all arranged for a premium food-ordering experience.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/menu"
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              Browse Menu
            </Link>

            <Link
              href="/cart"
              className="border border-gray-300 hover:border-black px-8 py-4 rounded-full font-medium transition hover:bg-black hover:text-white"
            >
              View Cart
            </Link>

          </div>

        </div>


        {/* Image */}

        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
            className="rounded-3xl shadow-2xl w-full h-[460px] object-cover"
          />

          {/* Floating badge */}

          <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg px-4 py-3">

            <p className="text-sm font-semibold">
              ⭐ 4.9 Rating
            </p>

            <p className="text-xs text-gray-500">
              Loved by 500+ customers
            </p>

          </div>

        </div>

      </div>

    </section>

  )

}