import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import { Navigate, Routes, Route } from "react-router-dom"

import AuthContextProvider from "./contexts/AuthContextProvider"

import NavBar from "./components/NavBar"
import ProjectsPage from "./pages/ProjectsPage"
import ProjectDetailPage from "./pages/ProjectDetailPage"
import LoginPage from "./pages/LoginPage"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailPage />}
            />
          </Routes>
          <Footer />
        </AuthContextProvider>
      </div>
    </div>
  )
}

export default App
