import { useState, useEffect } from 'react'

// Custom hook to fetch data from a given URL
function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setData(d)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [url])

  return { data, setData, loading }
}

export default useFetch