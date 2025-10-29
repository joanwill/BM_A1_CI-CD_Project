
import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

type Task = { id: number; title: string; done: boolean }

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    const res = await fetch(`${API}/api/tasks`)
    setTasks(await res.json())
    setLoading(false)
  }

  async function add() {
    if (!title.trim()) return
    await fetch(`${API}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    setTitle('')
    load()
  }

  async function done(id: number) {
    await fetch(`${API}/api/tasks/${id}/done`, { method: 'POST' })
    load()
  }

  async function del(id: number) {
    await fetch(`${API}/api/tasks/${id}`, { method: 'DELETE' })
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', fontFamily: 'system-ui' }}>
      <h1>Tasks</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task"/>
        <button onClick={add}>Add</button>
      </div>
      {loading ? <p>Loading…</p> : (
        <ul>
          {tasks.map(t => (
            <li key={t.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</span>
              {!t.done && <button onClick={() => done(t.id)}>Done</button>}
              <button onClick={() => del(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
