import { NavLink } from 'react-router-dom'

// Navigation bar shared across all pages
function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/shop">Shop</NavLink>
      <NavLink to="/admin">Admin Portal</NavLink>
    </nav>
  )
}

export default NavBar