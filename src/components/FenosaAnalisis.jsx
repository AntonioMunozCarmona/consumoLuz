import { useState } from 'react'
//import FileInputComponent from './FileInputComponent.jsx'
//import TratarInfo from './TratarInfo.jsx'

function FenosaAnalisis() {
  const [datos, setDatos] = useState([])

  const manejarDatos = (nuevosDatos) => {
    setDatos(nuevosDatos)
  }

  return (
    <>
      {/* <FileInputComponent onDatosRecibidos={manejarDatos} />
      <TratarInfo data={datos} /> */}
    </>
  )
}

export default FenosaAnalisis
