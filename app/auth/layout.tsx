export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[200]">
      <main className="h-full">{children}</main>
    </div>
  );
}
