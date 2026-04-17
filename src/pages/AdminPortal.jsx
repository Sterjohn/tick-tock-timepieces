import { useState, useId } from 'react'
import NavBar from '../components/NavBar'
import useFetch from '../hooks/useFetch'

// Admin portal — add new watches (POST) and edit prices (PATCH)
function AdminPortal() {
  const { data: watches, setData: setWatches } = useFetch('http://localhost:6001/watches')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [origin, setOrigin] = useState('')
  const [price, setPrice] = useState('')

  // useId generates unique IDs for accessible label/input pairs
  const nameId = useId()
  const descId = useId()
  const brandId = useId()
  const originId = useId()
  const priceId = useId()

  // POST — submit a new watch to the backend
  function handleSubmit(e) {
    e.preventDefault()
    const newWatch = { name, description, brand, origin, price: parseFloat(price) }
    fetch('http://localhost:6001/watches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWatch)
    })
      .then(r => r.json())
      .then(data => {
        setWatches(prev => [...prev, data])
        setName('')
        setDescription('')
        setBrand('')
        setOrigin('')
        setPrice('')
      })
  }

  // PATCH — update the price of an existing watch
  function handlePriceUpdate(id, newPrice) {
    fetch(`http://localhost:6001/watches/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: parseFloat(newPrice) })
    })
      .then(r => r.json())
      .then(updated => {
        setWatches(prev => prev.map(w => w.id === updated.id ? updated : w))
      })
  }

  return (
    <>
      <NavBar />
      <div className="admin-page">
        <div className="admin-form">
          <h2>Add New Watch</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor={nameId}>Watch Name</label>
            <input id={nameId} type="text" placeholder="Type here" value={name} onChange={e => setName(e.target.value)} required />
            <label htmlFor={descId}>Description</label>
            <input id={descId} type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
            <label htmlFor={brandId}>Brand</label>
            <input id={brandId} type="text" placeholder="Brand" value={brand} onChange={e => setBrand(e.target.value)} required />
            <label htmlFor={originId}>Origin</label>
            <input id={originId} type="text" placeholder="Country of origin" value={origin} onChange={e => setOrigin(e.target.value)} required />
            <label htmlFor={priceId}>Price</label>
            <input id={priceId} type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
            <button type="submit">Submit</button>
          </form>
        </div>

        {/* List all watches with editable price fields */}
        <div className="watch-list">
          <h2>Edit Watch Prices</h2>
          {watches && watches.map(watch => (
            <WatchPriceEditor key={watch.id} watch={watch} onUpdate={handlePriceUpdate} />
          ))}
        </div>
      </div>
    </>
  )
}

// Sub-component for editing an individual watch's price
function WatchPriceEditor({ watch, onUpdate }) {
  const [newPrice, setNewPrice] = useState(watch.price)

  return (
    <div className="watch-list-item">
      <span><strong>{watch.name}</strong> — {watch.brand}</span>
      <div>
        <input
          type="number"
          value={newPrice}
          onChange={e => setNewPrice(e.target.value)}
        />
        <button onClick={() => onUpdate(watch.id, newPrice)}>Update</button>
      </div>
    </div>
  )
}

export default AdminPortal