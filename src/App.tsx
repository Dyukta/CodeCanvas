import { HashRouter, Routes, Route } from 'react-router-dom'
import BuilderPage from './pages/BuilderPage'
import Homepage from './pages/HomePage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </HashRouter>
  )
}