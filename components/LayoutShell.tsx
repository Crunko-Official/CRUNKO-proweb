"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <main
        key={pathname}
        className="page-transition min-h-screen md:pl-64"
      >
        {children}
      </main>
    </>
  );
}
