// Displays a single watch's details on the shop page
function WatchCard({ watch }) {
  return (
    <div className="watch-card">
      <h3>{watch.name}</h3>
      <p>{watch.description}</p>
      <p><strong>Brand:</strong> {watch.brand}</p>
      <p><strong>Origin:</strong> {watch.origin}</p>
      <p className="price">${watch.price.toFixed(2)}</p>
    </div>
  )
}

export default WatchCard