import { useState } from 'react'
import FenosaCalendarInputComponent from './FenosaCalendarInputComponent'
//import FileInputComponent from './FileInputComponent.jsx'
import FenosaTratarInfo from './FenosaTratarInfo.jsx'

function FenosaAnalisis() {
  const [datos, setDatos] = useState([])

  const manejarDatos = (nuevosDatos) => {
    setDatos(nuevosDatos)
  }

  return (
    <>
      <FenosaCalendarInputComponent
        data={datos}
        onDatosRecibidos={manejarDatos}
      />
      <FenosaTratarInfo data={datos} />
    </>
  )
}

export default FenosaAnalisis
