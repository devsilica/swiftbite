import Link from "next/link"

export default function Navbar() {

  return (

    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-black/5">

      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          Swift<span className="text-orange-600">Bite</span>
        </Link>

        {/* Navigation */}

        <nav className="flex items-center gap-8 text-sm font-medium">

          <Link
            href="/menu"
            className="text-gray-700 hover:text-black transition relative group"
          >
            Menu
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>

          <Link
            href="/track"
            className="text-gray-700 hover:text-black transition relative group"
          >
            Track Order
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-600 transition-all group-hover:w-full"></span>
          </Link>

          {/* Cart Button */}

          <Link
            href="/cart"
            className="bg-orange-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-orange-500 hover:shadow-md transition"
          >
            🛒 Cart
          </Link>

        </nav>

      </div>

    </header>

  )

}