"use server"

import { createAdminClient } from "@/lib/supabaseAdmin"

export interface EcoRank {
  id: number
  min_threshold: number
  label: string
}

export interface SiteSettings {
  total_crunko_terjual: number
  recycling_rate: number
  community_rank_name: string | null
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("site_settings")
    .select("total_crunko_terjual, recycling_rate, community_rank_name")
    .eq("id", 1)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateSiteSettings(settings: {
  total_crunko_terjual?: number
  recycling_rate?: number
  community_rank_name?: string | null
}): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from("site_settings")
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq("id", 1)
  if (error) throw new Error(error.message)
}

export async function getEcoRanks(): Promise<EcoRank[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("eco_ranks")
    .select("*")
    .order("min_threshold", { ascending: true })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createEcoRank(rank: {
  min_threshold: number
  label: string
}): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase.from("eco_ranks").insert(rank)
  if (error) throw new Error(error.message)
}

export async function updateEcoRank(
  id: number,
  rank: { min_threshold?: number; label?: string },
): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from("eco_ranks")
    .update({ ...rank, updated_at: new Date().toISOString() })
    .eq("id", id)
  if (error) throw new Error(error.message)
}

export async function deleteEcoRank(id: number): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase.from("eco_ranks").delete().eq("id", id)
  if (error) throw new Error(error.message)
}
