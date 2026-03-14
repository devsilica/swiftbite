"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {

  const [open, setOpen] = useState(false)

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

        {/* Desktop Navigation */}

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

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

          {/* Cart */}

          <Link
            href="/cart"
            className="bg-orange-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-orange-500 hover:shadow-md transition"
          >
            🛒 Cart
          </Link>

        </nav>


        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center"
        >
          <div className="space-y-1">
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
          </div>
        </button>

      </div>


      {/* Mobile Menu */}

      {open && (

        <div className="md:hidden bg-white border-t border-gray-100">

          <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium">

            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-black"
            >
              Menu
            </Link>

            <Link
              href="/track"
              onClick={() => setOpen(false)}
              className="text-gray-700 hover:text-black"
            >
              Track Order
            </Link>

            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="bg-orange-600 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-orange-500 transition"
            >
              🛒 Cart
            </Link>

          </div>

        </div>

      )}

    </header>

  )
}
