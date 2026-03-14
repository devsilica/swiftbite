import "./globals.css"
import SiteFooter from "@/components/SiteFooter"
import Navbar from "@/components/Navbar"

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

  openGraph: {
    title: "SwiftBite",
    description: "Order delicious meals instantly",
    images: ["/SB.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="bg-[#fafafa] text-black">

        <Navbar />

        {children}

        <SiteFooter />

      </body>
    </html>
  )
}