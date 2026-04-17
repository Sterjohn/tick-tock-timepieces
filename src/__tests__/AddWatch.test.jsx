import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import AdminPortal from '../pages/AdminPortal'

const mockWatches = [
  { id: 1, name: 'Classic Chronograph', description: 'A timeless watch.', brand: 'Rolex', origin: 'Switzerland', price: 8999.99 }
]

const newWatch = {
  id: 2,
  name: 'Test Watch',
  description: 'A test watch.',
  brand: 'TestBrand',
  origin: 'Japan',
  price: 999.99
}

beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (options && options.method === 'POST') {
      return Promise.resolve({
        json: () => Promise.resolve(newWatch),
        ok: true,
        status: 201
      })
    }
    return Promise.resolve({
      json: () => Promise.resolve(mockWatches),
      ok: true,
      status: 200
    })
  })
})

describe('Add Watch', () => {
  it('renders the add watch form', async () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)
    await waitFor(() => {
      expect(screen.getByText('Add New Watch')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
    })
  })

  it('adds a new watch on form submission', async () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText('Type here'), { target: { value: newWatch.name } })
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: newWatch.description } })
    fireEvent.change(screen.getByPlaceholderText('Brand'), { target: { value: newWatch.brand } })
    fireEvent.change(screen.getByPlaceholderText('Country of origin'), { target: { value: newWatch.origin } })
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: newWatch.price } })
    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(screen.getByText('Test Watch')).toBeInTheDocument()
    })
  })

  it('calls POST when form is submitted', async () => {
    render(<MemoryRouter><AdminPortal /></MemoryRouter>)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByPlaceholderText('Type here'), { target: { value: newWatch.name } })
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: newWatch.description } })
    fireEvent.change(screen.getByPlaceholderText('Brand'), { target: { value: newWatch.brand } })
    fireEvent.change(screen.getByPlaceholderText('Country of origin'), { target: { value: newWatch.origin } })
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: newWatch.price } })
    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:6001/watches',
        expect.objectContaining({ method: 'POST' })
      )
    })
  })
})