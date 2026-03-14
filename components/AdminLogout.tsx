"use client"

import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function AdminLogout() {

  const router = useRouter()

  async function handleLogout() {

    await supabase.auth.signOut()

    router.push("/admin/login")

  }

  return (
    <button
      onClick={handleLogout}
      className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
    >
      Logout
    </button>
  )
}