import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"

import { useLocalStorage } from "../hooks/useLocalStorage"

import { AuthContext, type AuthContextType } from "../contexts/AuthContext"

const NavBar = () => {
  const { isAuthenticated, logout } = useContext<AuthContextType>(AuthContext)
  const [userData] = useLocalStorage()

  const handleLogout = () => {
    if (logout) {
      logout()
    }
  }

  const authContent = !isAuthenticated ? (
    <>
      <li className="nav-item">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          Register
        </NavLink>
      </li>
    </>
  ) : (
    <>
      {userData && (
        <li className="nav-item text-muted">
          <em>
            Welcome, <strong>{userData.user.username}</strong>
          </em>
        </li>
      )}
      <li className="nav-item">
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }>
          My Projects
        </NavLink>
      </li>
      <li className="nav-item">
        <button
          type="button"
          className="btn btn-sm btn-primary"
          onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  )

  return (
    <nav className="sticky-top navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          Pro-Tasker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="#navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-lg-center gap-lg-3 gap-1">
            {authContent}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
