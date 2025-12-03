import { Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Trang chủ - Thư viện</h1>} />
    </Routes>
  )
}

export default App