import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BuilderPage from './pages/BuilderPage'
import Homepage from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </BrowserRouter>
  )
}