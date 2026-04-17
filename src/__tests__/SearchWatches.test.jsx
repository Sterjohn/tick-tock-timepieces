import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Shop from '../pages/Shop'

const mockWatches = [
  { id: 1, name: 'Classic Chronograph', description: 'A timeless watch.', brand: 'Rolex', origin: 'Switzerland', price: 8999.99 },
  { id: 2, name: 'Sport Diver', description: 'Water-resistant watch.', brand: 'Omega', origin: 'Switzerland', price: 5499.99 },
  { id: 3, name: 'Urban Minimalist', description: 'Slim profile watch.', brand: 'Nomos', origin: 'Germany', price: 1899.99 }
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

describe('Search Watches', () => {
  it('filters watches when search input changes', async () => {
    render(<MemoryRouter><Shop /></MemoryRouter>)

    await waitFor(() => {
      expect(screen.getByText('Classic Chronograph')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Classic' } })

    await waitFor(() => {
      expect(screen.getByText('Classic Chronograph')).toBeInTheDocument()
      expect(screen.queryByText('Sport Diver')).not.toBeInTheDocument()
      expect(screen.queryByText('Urban Minimalist')).not.toBeInTheDocument()
    })
  })

  it('shows all watches when search is cleared', async () => {
    render(<MemoryRouter><Shop /></MemoryRouter>)

    await waitFor(() => {
      expect(screen.getByText('Classic Chronograph')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'Classic' } })
    fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: '' } })

    await waitFor(() => {
      expect(screen.getByText('Classic Chronograph')).toBeInTheDocument()
      expect(screen.getByText('Sport Diver')).toBeInTheDocument()
      expect(screen.getByText('Urban Minimalist')).toBeInTheDocument()
    })
  })

  it('filters watches by brand checkbox', async () => {
    render(<MemoryRouter><Shop /></MemoryRouter>)

    await waitFor(() => {
      expect(screen.getByText('Classic Chronograph')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByLabelText('Rolex'))

    await waitFor(() => {
      expect(screen.getByText('Classic Chronograph')).toBeInTheDocument()
      expect(screen.queryByText('Sport Diver')).not.toBeInTheDocument()
      expect(screen.queryByText('Urban Minimalist')).not.toBeInTheDocument()
    })
  })
})