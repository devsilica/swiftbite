export default function HowItWorks() {
  return (

    <section className="py-24 bg-[#fafafa]">

      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Title */}

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It Works
        </h2>

        <p className="text-gray-500 mb-16">
          Ordering your favorite meals is simple and fast.
        </p>

        {/* Steps */}

        <div className="grid md:grid-cols-3 gap-10">

          {/* Step 1 */}

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-orange-100 text-2xl mb-4">
              🍽️
            </div>

            <span className="text-sm text-orange-600 font-semibold">
              Step 1
            </span>

            <h3 className="font-semibold text-lg mt-2">
              Browse Meals
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Explore our menu and discover delicious meals prepared fresh daily.
            </p>

          </div>

          {/* Step 2 */}

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-orange-100 text-2xl mb-4">
              🛒
            </div>

            <span className="text-sm text-orange-600 font-semibold">
              Step 2
            </span>

            <h3 className="font-semibold text-lg mt-2">
              Place Order
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Add your favorite meals to cart and place your order in seconds.
            </p>

          </div>

          {/* Step 3 */}

          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-orange-100 text-2xl mb-4">
              🚚
            </div>

            <span className="text-sm text-orange-600 font-semibold">
              Step 3
            </span>

            <h3 className="font-semibold text-lg mt-2">
              Fast Delivery
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              Sit back and enjoy restaurant-quality food delivered quickly.
            </p>

          </div>

        </div>

      </div>

    </section>

  )
}