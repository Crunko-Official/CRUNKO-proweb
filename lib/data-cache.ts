const store = new Map<string, { data: unknown; expiresAt: number }>()

export function getCached<T>(key: string): T | undefined {
  const entry = store.get(key)
  if (!entry) return undefined
  if (Date.now() > entry.expiresAt) {
    store.delete(key)
    return undefined
  }
  return entry.data as T
}

export function setCache<T>(key: string, data: T, ttlMs: number): void {
  store.set(key, { data, expiresAt: Date.now() + ttlMs })
}

export function invalidateCache(key?: string): void {
  if (key) store.delete(key)
  else store.clear()
}

export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs = 60_000,
): Promise<T> {
  const cached = getCached<T>(key)
  if (cached !== undefined) return cached
  const data = await fetcher()
  setCache(key, data, ttlMs)
  return data
}

const clientStore = new Map<string, { data: unknown; expiresAt: number }>()

export async function fetchWithCache<T>(
  url: string,
  ttlMs = 60_000,
): Promise<T> {
  const cached = clientStore.get(url)
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data as T
  }
  const res = await fetch(url)
  if (!res.ok) throw new Error(`fetch ${url} failed: ${res.status}`)
  const data = (await res.json()) as T
  clientStore.set(url, { data, expiresAt: Date.now() + ttlMs })
  return data
}

export function clearClientCache(): void {
  clientStore.clear()
}
