export interface EcoRank {
  id?: number
  min_threshold: number
  label: string
}

export interface EcoImpactData {
  totalCrunkoTerjual: number
  totalKemasanRecyclable: number
  aggregateLevel: string
  communityRankName: string | null
  ecoRanks: EcoRank[]
}

export function getEcoLevel(count: number, ecoRanks: EcoRank[]): string {
  if (!ecoRanks.length) return "—"
  let level = ecoRanks[0].label
  for (const tier of ecoRanks) {
    if (count >= tier.min_threshold) level = tier.label
  }
  return level
}
