import { createAdminClient } from "@/lib/supabaseAdmin"
import { withCache } from "@/lib/data-cache"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createAdminClient()
  const data = await withCache("site_settings", async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("total_crunko_terjual, recycling_rate, community_rank_name")
      .eq("id", 1)
      .single()
    if (error) throw new Error(error.message)
    return data
  }, 60_000)
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
    },
  })
}
