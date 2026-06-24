export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-surface min-h-screen text-brand-dark">{children}</div>;
}
