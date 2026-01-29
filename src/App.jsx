
import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Popular from './components/Popular/Popular.jsx'
import ProtectedRoute from './components/ProtectedRoute/index.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/popular" element={<ProtectedRoute><Popular/></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
