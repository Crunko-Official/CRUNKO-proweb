"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export default function AdminDashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });
  }, [router, supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <hr className="my-4" />
      <p className="mb-6 text-gray-600">Welcome, {user.email}</p>
      <button
        onClick={handleLogout}
        className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
