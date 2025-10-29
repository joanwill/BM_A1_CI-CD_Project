
import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('App', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async (url: string, init?: RequestInit) => {
      if (url.toString().includes('/api/tasks') && (!init || init.method === 'GET')) {
        return new Response(JSON.stringify([]), { status: 200 })
      }
      if (url.toString().includes('/api/tasks') && init?.method === 'POST') {
        return new Response(JSON.stringify({ id: 1, title: 'X', done: false }), { status: 201 })
      }
      return new Response(null, { status: 200 })
    }) as any)
  })

  it('renders heading', async () => {
    render(<App />)
    expect(await screen.findByText('Tasks')).toBeInTheDocument()
  })
})
