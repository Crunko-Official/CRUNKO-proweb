"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getSession, logout } from "@/app/actions/admin"
import {
  getSiteSettings,
  updateSiteSettings,
  getEcoRanks,
  createEcoRank,
  updateEcoRank,
  deleteEcoRank,
} from "@/app/actions/impact"
import type { EcoRank, SiteSettings } from "@/app/actions/impact"
import { getEcoLevel } from "@/data/eco-impact-data"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [ranks, setRanks] = useState<EcoRank[]>([])

  const [totalInput, setTotalInput] = useState("")
  const [rateInput, setRateInput] = useState("")
  const [rankOverride, setRankOverride] = useState("")

  const [editRankId, setEditRankId] = useState<number | null>(null)
  const [editThreshold, setEditThreshold] = useState("")
  const [editLabel, setEditLabel] = useState("")

  const [newThreshold, setNewThreshold] = useState("")
  const [newLabel, setNewLabel] = useState("")

  const [saving, setSaving] = useState(false)
  const [savingRank, setSavingRank] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push("/admin/login")
      } else {
        setUsername(session.username)
      }
      setLoading(false)
    })
  }, [router])

  const loadData = useCallback(async () => {
    try {
      const [s, r] = await Promise.all([getSiteSettings(), getEcoRanks()])
      setSettings(s)
      setRanks(r)
      setTotalInput(s.total_crunko_terjual.toString())
      setRateInput(s.recycling_rate.toString())
      setRankOverride(s.community_rank_name ?? "")
    } catch {
      setMessage({ type: "error", text: "Gagal memuat data." })
    }
  }, [])

  useEffect(() => {
    if (username) loadData()
  }, [username, loadData])

  async function handleLogout() {
    await logout()
  }

  async function handleSaveSettings() {
    const total = parseInt(totalInput, 10)
    const rate = parseFloat(rateInput)
    if (isNaN(total) || total < 0) {
      setMessage({ type: "error", text: "Total CRUNKO tidak valid." })
      return
    }
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setMessage({ type: "error", text: "Persentase harus 0–100." })
      return
    }
    setSaving(true)
    try {
      await updateSiteSettings({
        total_crunko_terjual: total,
        recycling_rate: rate,
        community_rank_name: rankOverride.trim() || null,
      })
      setMessage({ type: "success", text: "Pengaturan tersimpan." })
      await loadData()
    } catch {
      setMessage({ type: "error", text: "Gagal menyimpan." })
    } finally {
      setSaving(false)
    }
  }

  async function handleAddRank() {
    const threshold = parseInt(newThreshold, 10)
    const label = newLabel.trim()
    if (isNaN(threshold) || threshold < 0 || !label) {
      setMessage({ type: "error", text: "Threshold dan label harus diisi." })
      return
    }
    setSavingRank(true)
    try {
      await createEcoRank({ min_threshold: threshold, label })
      setMessage({ type: "success", text: "Rank baru ditambahkan." })
      setNewThreshold("")
      setNewLabel("")
      await loadData()
    } catch {
      setMessage({ type: "error", text: "Gagal menambah rank." })
    } finally {
      setSavingRank(false)
    }
  }

  async function handleUpdateRank(id: number) {
    const threshold = parseInt(editThreshold, 10)
    const label = editLabel.trim()
    if (isNaN(threshold) || threshold < 0 || !label) {
      setMessage({ type: "error", text: "Data rank tidak valid." })
      return
    }
    setSavingRank(true)
    try {
      await updateEcoRank(id, { min_threshold: threshold, label })
      setMessage({ type: "success", text: "Rank diperbarui." })
      setEditRankId(null)
      await loadData()
    } catch {
      setMessage({ type: "error", text: "Gagal memperbarui rank." })
    } finally {
      setSavingRank(false)
    }
  }

  async function handleDeleteRank(id: number) {
    if (!confirm("Hapus rank ini?")) return
    try {
      await deleteEcoRank(id)
      setMessage({ type: "success", text: "Rank dihapus." })
      await loadData()
    } catch {
      setMessage({ type: "error", text: "Gagal menghapus rank." })
    }
  }

  function startEdit(rank: EcoRank) {
    setEditRankId(rank.id!)
    setEditThreshold(rank.min_threshold.toString())
    setEditLabel(rank.label)
  }

  const previewTotal = parseInt(totalInput, 10) || 0
  const previewRate = parseFloat(rateInput) || 0
  const previewRecyclable = Math.round(previewTotal * (previewRate / 100))
  const previewRank =
    rankOverride.trim() || (ranks.length ? getEcoLevel(previewTotal, ranks) : "—")

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-medium text-brand-dark/60">Loading...</p>
      </div>
    )
  }

  if (!username) return null

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
      <div className="card-surface rounded-2xl p-6 md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-brand-dark/60">{username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="interactive-lift self-start rounded-xl border border-brand-line bg-white px-4 py-2 text-sm font-semibold text-brand-dark/70 hover:bg-brand-beige/50"
          >
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "bg-brand-green-light text-brand-green-dark"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
          <button
            onClick={() => setMessage(null)}
            className="ml-3 font-bold opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      <section className="card-surface rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-brand-dark">
          &#9881;&#65039; Impact Data Settings
        </h2>
        <hr className="my-4 border-brand-line" />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-brand-dark/70">
              Total CRUNKO Terjual
            </label>
            <input
              type="number"
              min={0}
              value={totalInput}
              onChange={(e) => setTotalInput(e.target.value)}
              className="mt-1 w-full rounded-xl border border-brand-line bg-white/85 px-4 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-dark/70">
              Recycling Rate (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={rateInput}
              onChange={(e) => setRateInput(e.target.value)}
              className="mt-1 w-full rounded-xl border border-brand-line bg-white/85 px-4 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-brand-dark/70">
              Community Rank Name{" "}
              <span className="text-brand-dark/40">(opsional — kosongkan untuk otomatis)</span>
            </label>
            <input
              type="text"
              value={rankOverride}
              onChange={(e) => setRankOverride(e.target.value)}
              placeholder="Misal: Eco Guardian"
              className="mt-1 w-full rounded-xl border border-brand-line bg-white/85 px-4 py-2.5 text-sm text-brand-dark outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
            />
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-brand-beige/50 p-4 text-sm text-brand-dark/70">
          <p>
            <strong>Preview:</strong>{" "}
            {previewTotal.toLocaleString("id-ID")} CRUNKO terjual →{" "}
            <strong>{previewRecyclable.toLocaleString("id-ID")}</strong>{" "}
            kemasan recyclable |{" "}
            <strong>Rank:</strong> {previewRank}
          </p>
        </div>

        <button
          onClick={handleSaveSettings}
          disabled={saving}
          className="interactive-lift mt-5 rounded-xl bg-brand-green px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-50"
        >
          {saving ? "Menyimpan..." : "Save Settings"}
        </button>
      </section>

      <section className="card-surface rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-brand-dark">
          &#127942; Eco Ranks Management
        </h2>
        <hr className="my-4 border-brand-line" />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-brand-line text-xs font-semibold uppercase tracking-widest text-brand-dark/50">
                <th className="pb-2 pr-4">#</th>
                <th className="pb-2 pr-4">Threshold (min)</th>
                <th className="pb-2 pr-4">Label</th>
                <th className="pb-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ranks.map((rank, idx) => (
                <tr
                  key={rank.id}
                  className="border-b border-brand-line/50 last:border-0"
                >
                  {editRankId === rank.id ? (
                    <>
                      <td className="py-2 pr-4 text-brand-dark/50">
                        {idx + 1}
                      </td>
                      <td className="py-2 pr-4">
                        <input
                          type="number"
                          min={0}
                          value={editThreshold}
                          onChange={(e) => setEditThreshold(e.target.value)}
                          className="w-24 rounded-lg border border-brand-line bg-white/85 px-2 py-1 text-sm text-brand-dark outline-none focus:border-brand-green"
                        />
                      </td>
                      <td className="py-2 pr-4">
                        <input
                          type="text"
                          value={editLabel}
                          onChange={(e) => setEditLabel(e.target.value)}
                          className="w-full rounded-lg border border-brand-line bg-white/85 px-2 py-1 text-sm text-brand-dark outline-none focus:border-brand-green"
                        />
                      </td>
                      <td className="py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleUpdateRank(rank.id!)}
                            disabled={savingRank}
                            className="rounded-lg bg-brand-green px-3 py-1 text-xs font-semibold text-white hover:bg-brand-green-dark disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditRankId(null)}
                            className="rounded-lg border border-brand-line px-3 py-1 text-xs font-medium text-brand-dark/60 hover:bg-brand-beige/50"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 pr-4 text-brand-dark/50">
                        {idx + 1}
                      </td>
                      <td className="py-2 pr-4 font-mono text-brand-dark">
                        {rank.min_threshold}
                      </td>
                      <td className="py-2 pr-4 font-medium text-brand-dark">
                        {rank.label}
                      </td>
                      <td className="py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => startEdit(rank)}
                            className="rounded-lg border border-brand-line px-3 py-1 text-xs font-medium text-brand-dark/60 hover:bg-brand-beige/50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteRank(rank.id!)}
                            className="rounded-lg border border-red-200 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                          >
                            Del
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {ranks.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-brand-dark/40">
                    Belum ada rank. Tambahkan rank baru di bawah.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <hr className="my-5 border-brand-line" />
        <h3 className="text-sm font-semibold text-brand-dark">Add New Rank</h3>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div>
            <label className="block text-xs text-brand-dark/50">Threshold</label>
            <input
              type="number"
              min={0}
              value={newThreshold}
              onChange={(e) => setNewThreshold(e.target.value)}
              placeholder="0"
              className="mt-1 w-full rounded-xl border border-brand-line bg-white/85 px-4 py-2 text-sm text-brand-dark outline-none focus:border-brand-green sm:w-28"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-brand-dark/50">Label</label>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Eco Starter"
              className="mt-1 w-full rounded-xl border border-brand-line bg-white/85 px-4 py-2 text-sm text-brand-dark outline-none focus:border-brand-green"
            />
          </div>
          <button
            onClick={handleAddRank}
            disabled={savingRank}
            className="interactive-lift rounded-xl bg-brand-green px-6 py-2 text-sm font-semibold text-white hover:bg-brand-green-dark disabled:opacity-50"
          >
            {savingRank ? "..." : "Add Rank"}
          </button>
        </div>
      </section>
    </div>
  )
}
