"use server"

import crypto from "crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createAdminClient } from "@/lib/supabaseAdmin"

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex")
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex")
  return `${salt}:${hash}`
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":")
  const verify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex")
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(verify))
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export async function login(username: string, password: string) {
  const supabase = createAdminClient()

  const { data: users, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("username", username)

  if (error || !users?.length) {
    return { error: "Invalid username or password" }
  }

  const user = users[0]
  if (!verifyPassword(password, user.password_hash)) {
    return { error: "Invalid username or password" }
  }

  const token = generateSessionToken()
  await supabase.from("admin_users").update({ session_token: token }).eq("id", user.id)

  const cookieStore = await cookies()
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  redirect("/admin/dashboard")
}

export async function logout() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value

  if (token) {
    const supabase = createAdminClient()
    await supabase
      .from("admin_users")
      .update({ session_token: null })
      .eq("session_token", token)
    cookieStore.delete("admin_session")
  }

  redirect("/admin/login")
}

export async function getSession(): Promise<{ username: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value

  if (!token) return null

  const supabase = createAdminClient()
  const { data: users } = await supabase
    .from("admin_users")
    .select("username")
    .eq("session_token", token)

  if (!users?.length) return null

  return { username: users[0].username }
}
