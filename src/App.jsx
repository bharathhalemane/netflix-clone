
import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Popular from './components/Popular/Popular.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute/index.jsx'
import SearchPage from './components/SearchPage/SearchPage.jsx'
import Account from './components/Account/Account.jsx'
import AuthContext from './context/AuthContext/AuthContext.jsx'
import MoviesDetails from './components/MoviesDetails/MoviesDetails.jsx'
import {useState } from "react"
function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = (userData) => {
        setUsername(userData.username)
    setPassword(userData.password)
    localStorage.setItem("userData", JSON.stringify(userData))
  }
  
  return (
    <AuthContext.Provider value={{ username, password, login }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/popular" element={<ProtectedRoute><Popular /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute><MoviesDetails /></ProtectedRoute>} />
          <Route path="/not-found" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
