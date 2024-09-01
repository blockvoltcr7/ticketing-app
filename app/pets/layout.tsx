export default function PetsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold mb-6">Pets Database</h1>
      {children}
    </section>
  )
}