import { useState } from 'react'
import EntradaFileComponent from './EntradaFileComponent'

const Resumen = () => {
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
      <EntradaFileComponent datos={datos} onDatosRecibidos={manejarDatos} />

      {/* {datos && <TratarInfo2 data={datos} onTablaRecibida={manejarTabla} />} */}
    </div>
  )
}

export default Resumen
