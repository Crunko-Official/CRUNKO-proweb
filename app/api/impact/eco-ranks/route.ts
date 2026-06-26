import { createAdminClient } from "@/lib/supabaseAdmin"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("eco_ranks")
    .select("*")
    .order("min_threshold", { ascending: true })
  if (error) return NextResponse.json([], { status: 500 })
  return NextResponse.json(data ?? [])
}
