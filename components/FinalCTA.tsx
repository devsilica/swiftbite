import Link from "next/link"

export default function FinalCTA() {

  return (

    <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-500 text-white">

      <div className="max-w-4xl mx-auto px-6 text-center">

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Ready to order your favorite meal?
        </h2>

        <p className="mt-4 text-orange-100 text-lg">
          Browse our menu and enjoy freshly prepared meals delivered fast to your door.
        </p>

        <Link
          href="/menu"
          className="inline-block mt-10 bg-white text-orange-600 px-10 py-4 rounded-full font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl"
        >
          Browse Menu
        </Link>

      </div>

    </section>

  )

}