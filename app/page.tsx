import Link from "next/link";

import Hero from "@/components/Hero"
import TrustBar from "@/components/TrustBar"
import HomePopularMeals from "@/components/HomePopularMeals"
import HowItWorks from "@/components/HowItWorks"
import Reviews from "@/components/Reviews"
import FinalCTA from "@/components/FinalCTA"
import SiteFooter from "@/components/SiteFooter"

import TopMeals from "@/components/TopMeals"
export default function HomePage() {

  return (

    <main className="min-h-screen bg-[#fafafa] text-black">

      <Hero />

      <TrustBar />

      <HomePopularMeals />

      <HowItWorks />

      <Reviews />

      <FinalCTA />

      

    </main>

  )

}