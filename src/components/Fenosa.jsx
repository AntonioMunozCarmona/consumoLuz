import { useState } from 'react'
import FenosaFileComponent from './FenosaFileComponent'

const Fenosa = () => {
  const [datos, setDatos] = useState([])
  const [tabla, setTabla] = useState([])

  const manejarDatos = (nuevosDatos) => {
    setDatos(nuevosDatos)
  }
  const manejarTabla = (nuevaTabla) => {
    setTabla(nuevaTabla)
  }

  return (
    <div>
      <FenosaFileComponent datos={datos} onDatosRecibidos={manejarDatos} />

      {/* {datos && <TratarInfo2 data={datos} onTablaRecibida={manejarTabla} />} */}
    </div>
  )
}

export default Fenosa
