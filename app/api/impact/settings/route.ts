import { createAdminClient } from "@/lib/supabaseAdmin"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("site_settings")
    .select("total_crunko_terjual, recycling_rate, community_rank_name")
    .eq("id", 1)
    .single()
  if (error) return NextResponse.json(null, { status: 500 })
  return NextResponse.json(data)
}
