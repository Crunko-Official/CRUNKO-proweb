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
        <p className="text-sm font-medium text-brand-dark/60">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="card-surface rounded-2xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-brand-dark">Admin Dashboard</h1>
        <hr className="my-4 border-brand-line" />
        <p className="mb-6 break-words text-brand-dark/60">
          Welcome, {user.email}
        </p>
        <button
          onClick={handleLogout}
          className="interactive-lift rounded-xl bg-brand-green px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-green-dark"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
