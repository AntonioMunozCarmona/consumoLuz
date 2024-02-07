import { Routes, Route } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Analisis from './components/Analisis.jsx'
import Resumen from './components/Resumen.jsx'

const Home = () => <h1>Home</h1>
const Team = () => <h1>Team</h1>
const Empresa = () => <h1>Empresa</h1>
// const Projects = () => <h1>Projects</h1>
// const Analisis = () => <h1>Análisis</h1>

function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/resumen" element={<Resumen />} />

        <Route path="/analisis" element={<Analisis />} />
      </Routes>
    </>
  )
}

export default App
