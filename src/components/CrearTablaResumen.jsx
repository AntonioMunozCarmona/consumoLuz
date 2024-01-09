import PropTypes from 'prop-types'

function formatearNumero(numero) {
  return new Intl.NumberFormat('es-CL').format(numero)
}

const CrearTablaResumen = (props) => {
  const { data } = props

  const resumen = data.reduce(
    (acc, obj) => {
      console.log('Esta es la data: ', obj, ' las propiedades')
      console.log('Estas son las propiedades: ', Object.keys(obj))
      for (let i = 0; i <= 23; i++) {
        const periodo = obj[`_${i.toString().padStart(2, '0')}`].Periodo
        const activa = parseInt(obj[`_${i.toString().padStart(2, '0')}`].Activa)
        const reactiva = parseInt(
          obj[`_${i.toString().padStart(2, '0')}`].Reactiva
        )
        const potencia = obj[`_${i.toString().padStart(2, '0')}`].Potencia

        if (periodo === 'P1') {
          acc[`Activa-1`] += activa
          acc[`Reactiva-1`] += reactiva
          acc[`Potencia-1`] = Math.max(acc[`Potencia-1`], parseFloat(potencia))
          acc['Horas-1'] += 1
        }

        if (periodo === 'P2') {
          acc[`Activa-2`] += activa
          acc[`Reactiva-2`] += reactiva
          acc[`Potencia-2`] = Math.max(acc[`Potencia-2`], parseFloat(potencia))
          acc['Horas-2'] += 1
        }

        if (periodo === 'P3') {
          acc[`Activa-3`] += activa
          acc[`Reactiva-3`] += reactiva
          acc[`Potencia-3`] = Math.max(acc[`Potencia-3`], parseFloat(potencia))
          acc['Horas-3'] += 1
        }

        if (periodo === 'P4') {
          acc[`Activa-4`] += activa
          acc[`Reactiva-4`] += reactiva
          acc[`Potencia-4`] = Math.max(acc[`Potencia-4`], parseFloat(potencia))
          acc['Horas-4'] += 1
        }

        if (periodo === 'P5') {
          acc[`Activa-5`] += activa
          acc[`Reactiva-5`] += reactiva
          acc[`Potencia-5`] = Math.max(acc[`Potencia-5`], parseFloat(potencia))
          acc['Horas-5'] += 1
        }

        if (periodo === 'P6') {
          acc[`Activa-6`] += activa
          acc[`Reactiva-6`] += reactiva
          acc[`Potencia-6`] = Math.max(acc[`Potencia-6`], parseFloat(potencia))
          acc['Horas-6'] += 1
        }
      }
      console.log('avv', acc)
      return acc
    },
    {
      'Activa-1': 0,
      'Activa-2': 0,
      'Activa-3': 0,
      'Activa-4': 0,
      'Activa-5': 0,
      'Activa-6': 0,
      'Reactiva-1': 0,
      'Reactiva-2': 0,
      'Reactiva-3': 0,
      'Reactiva-4': 0,
      'Reactiva-5': 0,
      'Reactiva-6': 0,
      'Potencia-1': 0,
      'Potencia-2': 0,
      'Potencia-3': 0,
      'Potencia-4': 0,
      'Potencia-5': 0,
      'Potencia-6': 0,
      'Horas-1': 0,
      'Horas-2': 0,
      'Horas-3': 0,
      'Horas-4': 0,
      'Horas-5': 0,
      'Horas-6': 0,
    }
  )
  {
    console.log('Object', Object.entries(resumen))
  }
  return (
    <>
      {/* {Object.entries(resumen).map(([valor, cantidad]) => (
        <p key={valor}>{`Valor: ${valor}, Cantidad: ${cantidad}`}</p>
      ))} */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="text-2xl m-8">
            Resumen del Intervalo de fechas por período
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Concepto
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-[#ff0000] text-center text-white"
              >
                P1
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-[#ff9900] text-center text-black"
              >
                P2
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-[#ffff00] text-center text-black"
              >
                P3
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-[#003366]  text-center text-white"
              >
                P4
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-[#1f82ce] text-center text-white"
              >
                P5
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-[#04fb04] text-center text-black"
              >
                P6
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Activa
              </th>
              <td className="px-6 py-4 bg-[#ff0000] text-center text-white">
                {formatearNumero(resumen['Activa-1'])}
              </td>
              <td className="px-6 py-4 bg-[#ff9900] text-center text-black">
                {formatearNumero(resumen['Activa-2'])}
              </td>
              <td className="px-6 py-4 bg-[#ffff00] text-center text-black">
                {formatearNumero(resumen['Activa-3'])}
              </td>
              <td className="px-6 py-4 bg-[#003366]  text-center text-white">
                {formatearNumero(resumen['Activa-4'])}
              </td>
              <td className="px-6 py-4 bg-[#1f82ce] text-center text-white">
                {formatearNumero(resumen['Activa-5'])}
              </td>
              <td className="px-6 py-4 bg-[#04fb04] text-center text-black">
                {formatearNumero(resumen['Activa-6'])}
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Reactiva
              </th>
              <td className="px-6 py-4 bg-[#ff0000] text-center text-white">
                {formatearNumero(resumen['Reactiva-1'])}
              </td>
              <td className="px-6 py-4 bg-[#ff9900] text-center text-black">
                {formatearNumero(resumen['Reactiva-2'])}
              </td>
              <td className="px-6 py-4 bg-[#ffff00] text-center text-black">
                {formatearNumero(resumen['Reactiva-3'])}
              </td>
              <td className="px-6 py-4 bg-[#003366]  text-center text-white">
                {formatearNumero(resumen['Reactiva-4'])}
              </td>
              <td className="px-6 py-4 bg-[#1f82ce] text-center text-white">
                {formatearNumero(resumen['Reactiva-5'])}
              </td>
              <td className="px-6 py-4 bg-[#04fb04] text-center text-black">
                {formatearNumero(resumen['Reactiva-6'])}
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Potencia
              </th>
              <td className="px-6 py-4 bg-[#ff0000] text-center text-white">
                {resumen['Potencia-1']}
              </td>
              <td className="px-6 py-4 bg-[#ff9900] text-center text-black">
                {resumen['Potencia-2']}
              </td>
              <td className="px-6 py-4 bg-[#ffff00] text-center text-black">
                {resumen['Potencia-3']}
              </td>
              <td className="px-6 py-4 bg-[#003366]  text-center text-white">
                {resumen['Potencia-4']}
              </td>
              <td className="px-6 py-4 bg-[#1f82ce] text-center text-white">
                {resumen['Potencia-5']}
              </td>
              <td className="px-6 py-4 bg-[#04fb04] text-center text-black">
                {resumen['Potencia-6']}
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Horas
              </th>
              <td className="px-6 py-4 bg-[#ff0000] text-center text-white">
                {formatearNumero(resumen['Horas-1'])}
              </td>
              <td className="px-6 py-4 bg-[#ff9900] text-center text-black">
                {formatearNumero(resumen['Horas-2'])}
              </td>
              <td className="px-6 py-4 bg-[#ffff00] text-center text-black">
                {formatearNumero(resumen['Horas-3'])}
              </td>
              <td className="px-6 py-4 bg-[#003366]  text-center text-white">
                {formatearNumero(resumen['Horas-4'])}
              </td>
              <td className="px-6 py-4 bg-[#1f82ce] text-center text-white">
                {formatearNumero(resumen['Horas-5'])}
              </td>
              <td className="px-6 py-4 bg-[#04fb04] text-center text-black">
                {formatearNumero(resumen['Horas-6'])}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

CrearTablaResumen.propTypes = {
  data: PropTypes.array,
}
export default CrearTablaResumen
