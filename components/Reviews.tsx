export default function Reviews() {

  return (

    <section className="bg-[#fafafa] py-24">

      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}

        <div className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-bold">
            What Customers Say
          </h2>

          <p className="text-gray-500 mt-3">
            Loved by hundreds of happy customers
          </p>

        </div>


        {/* Reviews */}

        <div className="grid md:grid-cols-3 gap-8">

          {/* Review */}

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition">

            <div className="text-orange-500 text-lg mb-3">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-gray-600 text-sm leading-6">
              “The jollof rice is amazing. Delivery was super fast and the
              food arrived hot and fresh.”
            </p>

            <div className="flex items-center gap-3 mt-6">

              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                A
              </div>

              <p className="font-semibold">
                Ada
              </p>

            </div>

          </div>


          {/* Review */}

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition">

            <div className="text-orange-500 text-lg mb-3">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-gray-600 text-sm leading-6">
              “Great food and very smooth ordering experience.
              I will definitely order again.”
            </p>

            <div className="flex items-center gap-3 mt-6">

              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                T
              </div>

              <p className="font-semibold">
                Tunde
              </p>

            </div>

          </div>


          {/* Review */}

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition">

            <div className="text-orange-500 text-lg mb-3">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="text-gray-600 text-sm leading-6">
              “My go-to place for quick meals. The food is always
              delicious and the delivery is reliable.”
            </p>

            <div className="flex items-center gap-3 mt-6">

              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 font-semibold text-orange-600">
                C
              </div>

              <p className="font-semibold">
                Chioma
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  )
}