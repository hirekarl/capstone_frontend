import { Navigate, Routes, Route } from "react-router-dom"

import AuthContextProvider from "./contexts/AuthContextProvider"

import NavBar from "./components/NavBar"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProjectsPage from "./pages/ProjectsPage"
import ProjectDetailPage from "./pages/ProjectDetailPage"
import Footer from "./components/Footer"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AuthContextProvider>
        <NavBar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route
              path="/projects/:projectId"
              element={<ProjectDetailPage />}
            />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </AuthContextProvider>
    </div>
  )
}

export default App
