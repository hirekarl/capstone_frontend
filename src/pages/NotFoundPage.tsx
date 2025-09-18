import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="container-fluid mt-3 text-center">
      <h1>Uh-oh!</h1>
      <p>The resource you requested couldn't be found.</p>
      <p>
        Why don't you go back to <Link to="/projects">projects</Link>?
      </p>
    </div>
  )
}
