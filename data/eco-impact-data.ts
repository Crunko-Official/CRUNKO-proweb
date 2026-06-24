export interface EcoImpactData {
  totalCrunkoTerjual: number
  totalKemasanRecyclable: number
  aggregateLevel: string
}

const ecoLevels = [
  { min: 0, label: "Eco Starter" },
  { min: 5, label: "Eco Supporter" },
  { min: 15, label: "Eco Champion" },
  { min: 30, label: "Eco Guardian" },
] as const

export function getEcoLevel(count: number): string {
  let level: string = ecoLevels[0].label
  for (const tier of ecoLevels) {
    if (count >= tier.min) level = tier.label
  }
  return level
}

export function getEcoImpactData(): EcoImpactData {
  const total = 125_000
  return {
    totalCrunkoTerjual: total,
    totalKemasanRecyclable: Math.round(total * 0.95),
    aggregateLevel: getEcoLevel(total),
  }
}
