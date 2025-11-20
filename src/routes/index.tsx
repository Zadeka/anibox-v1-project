import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: homeAnimePage,
})

function homeAnimePage() {
  return (
    <div className="p-6">
      <h1>Pencarian Anime 🔎</h1>
      <p className="text-muted-foreground">Endpoint: /v4/anime?q=...</p>
    </div>
  )
}
