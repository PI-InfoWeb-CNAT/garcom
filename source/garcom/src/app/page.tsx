import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-8">Exemplo de uso do Button do shadcn/ui</h1>
      <div className="flex items-center justify-center gap-4">
        <Button className="w-64" variant="default">
          Default Button
        </Button>
        <Button className="w-64" variant="outline">
           Outline Button
        </Button>
        <Button className="w-64" variant="destructive">
          Destructive Button
        </Button>
      </div>
    </main>
  )
}