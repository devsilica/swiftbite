export default function TrustBar() {
  return (
    <section className="py-14 bg-white">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-3 gap-10 text-center">

          {/* Item */}

          <div className="flex flex-col items-center gap-3">

            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-xl">
              ⚡
            </div>

            <p className="font-semibold text-lg">
              Fast Delivery
            </p>

            <p className="text-sm text-gray-500">
              Hot meals delivered quickly to your doorstep.
            </p>

          </div>


          {/* Item */}

          <div className="flex flex-col items-center gap-3">

            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-xl">
              🍔
            </div>

            <p className="font-semibold text-lg">
              Fresh Meals
            </p>

            <p className="text-sm text-gray-500">
              Prepared fresh by experienced chefs every day.
            </p>

          </div>


          {/* Item */}

          <div className="flex flex-col items-center gap-3">

            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-xl">
              ⭐
            </div>

            <p className="font-semibold text-lg">
              Quality Food
            </p>

            <p className="text-sm text-gray-500">
              Carefully crafted meals made with premium ingredients.
            </p>

          </div>

        </div>

      </div>

    </section>
  )
}