import "./globals.css"
import SiteFooter from "@/components/SiteFooter"
import Navbar from "@/components/Navbar"
import Script from "next/script";

export const metadata = {
  title: "SwiftBite",
  description: "Fast food delivery powered by SwiftBite",

  icons: {
    icon: [
      { url: "/SB.png", sizes: "32x32", type: "image/png" },
      { url: "/SB.png", sizes: "192x192", type: "image/png" },
      { url: "/SB.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "/SB.png",
    apple: "/SB.png",
  },
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="bg-[#fafafa] text-black">

        {/* 🔥 ADD THIS LINE */}
        <Script src="/markly.js" strategy="afterInteractive" />

        <Navbar />

        {children}

        <SiteFooter />

      </body>
    </html>
  )
}
