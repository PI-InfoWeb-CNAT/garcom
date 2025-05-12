'use client'

import { useEffect, useState } from 'react'

type Item = {
  id: number
  name: string
  description: string
}

export default function Home() {
  const [itens, setItens] = useState<Item[]>([])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [editing, setEditing] = useState<Item | null>(null)

  const fetchItens = () => {
    fetch("http://localhost:8000/api/itens")
      .then(res => res.json())
      .then(data => setItens(data))
  }

  useEffect(() => {
    fetchItens()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const url = editing
      ? `http://localhost:8000/api/itens/${editing.id}`
      : "http://localhost:8000/api/itens"
    const method = editing ? "PUT" : "POST"

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    })

    setName("")
    setDescription("")
    setEditing(null)
    fetchItens()
  }

  const handleEdit = (item: Item) => {
    setName(item.name)
    setDescription(item.description)
    setEditing(item)
  }

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:8000/api/itens/${id}`, {
      method: "DELETE"
    })
    fetchItens()
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CRUD de Itens</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="border w-full p-2 rounded"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="border w-full p-2 rounded"
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          {editing ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <ul className="space-y-2">
        {itens.map(item => (
          <li
            key={item.id}
            className="border p-3 rounded flex justify-between itens-center"
          >
            <div>
              <strong>{item.name}</strong> — {item.description}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
