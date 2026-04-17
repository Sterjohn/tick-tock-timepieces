import { useState, useRef } from 'react'
import NavBar from '../components/NavBar'
import WatchCard from '../components/WatchCard'
import useFetch from '../hooks/useFetch'

// Shop page — displays all watches with search and brand filter
function Shop() {
  const { data: watches, loading } = useFetch('http://localhost:6001/watches')
  const [search, setSearch] = useState('')
  const [selectedBrands, setSelectedBrands] = useState([])
  // useRef to persist reference to the search input without causing re-renders
  const searchRef = useRef(null)

  // Get unique brands from watch data for the filter sidebar
  const brands = watches ? [...new Set(watches.map(w => w.brand))] : []

  // Toggle a brand on/off in the filter list
  function handleBrandToggle(brand) {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  // Filter watches by search query and selected brands
  const filteredWatches = watches
    ? watches.filter(w => {
        const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase())
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(w.brand)
        return matchesSearch && matchesBrand
      })
    : []

  return (
    <>
      <NavBar />
      <div className="shop-layout">
        <div className="sidebar">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {brands.map(brand => (
            <label key={brand}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
        <div className="watch-grid">
          {loading ? (
            <p>Loading...</p>
          ) : (
            filteredWatches.map(watch => (
              <WatchCard key={watch.id} watch={watch} />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Shop