import { createAdminClient } from "@/lib/supabaseAdmin"
import { withCache } from "@/lib/data-cache"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createAdminClient()
  const data = await withCache("eco_ranks", async () => {
    const { data, error } = await supabase
      .from("eco_ranks")
      .select("*")
      .order("min_threshold", { ascending: true })
    if (error) throw new Error(error.message)
    return data ?? []
  }, 60_000)
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
    },
  })
}
