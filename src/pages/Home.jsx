import NavBar from '../components/NavBar'

// Landing page for the store
function Home() {
  return (
    <>
      <NavBar />
      <div className="hero">
        <h1>Tick Tock Timepieces</h1>
        <p>The go-to store for premium watches from around the world.</p>
      </div>
    </>
  )
}

export default Home