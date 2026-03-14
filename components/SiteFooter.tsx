import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-white mt-24">

      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-12">

        {/* Brand */}

        <div>

          <h3 className="text-2xl font-bold text-orange-500 mb-4">
            SwiftBite
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed">
            Fresh meals delivered fast. Enjoy restaurant-quality food
            from the comfort of your home.
          </p>

          {/* Social */}

          <div className="flex gap-4 mt-6">

            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-orange-600 transition cursor-pointer">
              📘
            </div>

            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-orange-600 transition cursor-pointer">
              📸
            </div>

            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-orange-600 transition cursor-pointer">
              🐦
            </div>

          </div>

        </div>


        {/* Quick Links */}

        <div>

          <h4 className="font-semibold mb-5 text-white text-lg">
            Quick Links
          </h4>

          <ul className="space-y-3 text-gray-400 text-sm">

            <li>
              <Link href="/" className="hover:text-orange-500 transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/menu" className="hover:text-orange-500 transition">
                Menu
              </Link>
            </li>

            <li>
              <Link href="/track" className="hover:text-orange-500 transition">
                Track Order
              </Link>
            </li>

          </ul>

        </div>


        {/* Company */}

        <div>

          <h4 className="font-semibold mb-5 text-white text-lg">
            Company
          </h4>

          <ul className="space-y-3 text-gray-400 text-sm">

            <li className="hover:text-orange-500 cursor-pointer transition">
              About Us
            </li>

            <li className="hover:text-orange-500 cursor-pointer transition">
              Careers
            </li>

            <li className="hover:text-orange-500 cursor-pointer transition">
              Privacy Policy
            </li>

          </ul>

        </div>


        {/* Contact */}

        <div>

          <h4 className="font-semibold mb-5 text-white text-lg">
            Contact
          </h4>

          <ul className="space-y-3 text-gray-400 text-sm">

            <li>📍 Ife, Nigeria</li>

            <li>📞 +234 704 295 3337</li>

            <li>✉ support@swiftbite.com</li>

          </ul>

        </div>

      </div>


      {/* Bottom */}

      <div className="border-t border-gray-800">

        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">

          <p>
            © {new Date().getFullYear()} SwiftBite. All rights reserved.
          </p>

          <p className="mt-2 md:mt-0 text-center md:text-right">
            Built for fast and delicious food delivery.
          </p>

        </div>

      </div>

    </footer>
  )
}