
import './App.css'

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Popular from './components/Popular/Popular.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute/index.jsx'
import SearchPage from './components/SearchPage/SearchPage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/popular" element={<ProtectedRoute><Popular/></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><SearchPage/></ProtectedRoute>} />
        <Route path="/not-found" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/not-found"/>} />
      </Routes>
    </Router>
  )
}

export default App
