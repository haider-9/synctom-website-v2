export default function CertificateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[200]">
      <main className="h-full overflow-auto">{children}</main>
    </div>
  );
}
