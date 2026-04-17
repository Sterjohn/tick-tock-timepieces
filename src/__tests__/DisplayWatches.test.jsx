import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Shop from '../pages/Shop'

const mockWatches = [
  { id: 1, name: 'Classic Chronograph', description: 'A timeless watch.', brand: 'Rolex', origin: 'Switzerland', price: 8999.99 },
  { id: 2, name: 'Sport Diver', description: 'Water-resistant watch.', brand: 'Omega', origin: 'Switzerland', price: 5499.99 }
]

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockWatches),
      ok: true,
      status: 200
    })
  )
})

describe('Display Watches', () => {
  it('displays watches on page load', async () => {
    render(<MemoryRouter><Shop /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('Classic Chronograph')).toBeInTheDocument()
      expect(screen.getByText('Sport Diver')).toBeInTheDocument()
    })
  })

  it('displays watch brand and price', async () => {
    render(<MemoryRouter><Shop /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getAllByText(/Rolex/i).length).toBeGreaterThan(0)
      expect(screen.getByText('$8999.99')).toBeInTheDocument()
    })
  })
})