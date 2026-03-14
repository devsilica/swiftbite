import { supabase } from "./supabaseClient"

export async function requireAdmin() {

  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    window.location.href = "/admin/login"
  }

}