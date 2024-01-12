import PropTypes from 'prop-types'

function formatearNumero(numero) {
  return new Intl.NumberFormat('es-CL').format(numero)
}

function getWeekDay(date) {
  let days = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
  const [day, month, year] = date.split('/')
  date = new Date(year, month - 1, day)

  return days[date.getDay()]
}

const CrearTablaResumenDia = (props) => {
  const { data } = props

  let resumen = []
  let acc = {}
  const arrayResumen = data.map((obj) => {
    acc = {
      date: obj.date,
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
    }

    for (let i = 0; i <= 23; i++) {
      const periodo = obj[`_${i.toString().padStart(2, '0')}`].Periodo
      const activa = parseInt(obj[`_${i.toString().padStart(2, '0')}`].Activa)
      const reactiva = parseInt(
        obj[`_${i.toString().padStart(2, '0')}`].Reactiva
      )
      //const potencia = obj[`_${i.toString().padStart(2, '0')}`].Potencia

      if (periodo === 'P1') {
        acc[`Activa-1`] += activa
        acc[`Reactiva-1`] += reactiva
        acc[`Potencia-1`] = Math.max(acc[`Potencia-1`], parseFloat(activa))
      }

      if (periodo === 'P2') {
        acc[`Activa-2`] += activa
        acc[`Reactiva-2`] += reactiva
        acc[`Potencia-2`] = Math.max(acc[`Potencia-2`], parseFloat(activa))
      }

      if (periodo === 'P3') {
        acc[`Activa-3`] += activa
        acc[`Reactiva-3`] += reactiva
        acc[`Potencia-3`] = Math.max(acc[`Potencia-3`], parseFloat(activa))
      }

      if (periodo === 'P4') {
        acc[`Activa-4`] += activa
        acc[`Reactiva-4`] += reactiva
        acc[`Potencia-4`] = Math.max(acc[`Potencia-4`], parseFloat(activa))
      }

      if (periodo === 'P5') {
        acc[`Activa-5`] += activa
        acc[`Reactiva-5`] += reactiva
        acc[`Potencia-5`] = Math.max(acc[`Potencia-5`], parseFloat(activa))
      }

      if (periodo === 'P6') {
        acc[`Activa-6`] += activa
        acc[`Reactiva-6`] += reactiva
        acc[`Potencia-6`] = Math.max(acc[`Potencia-6`], parseFloat(activa))
      }
    }

    resumen.push(acc)
    return acc
  })
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="text-2xl m-8 text-center">Resumen diario</caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-1 py-3">
                Fecha
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#ff0000] text-center text-white"
              >
                A-1
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#ff9900] text-center text-black"
              >
                A-2
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#ffff00] text-center text-black"
              >
                A-3
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#003366]  text-center text-white"
              >
                A-4
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#1f82ce] text-center text-white"
              >
                A-5
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#04fb04] text-center text-black"
              >
                A-6
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#ff0000] text-center text-white"
              >
                R-1
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#ff9900] text-center text-black"
              >
                R-2
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#ffff00] text-center text-black"
              >
                R-3
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#003366]  text-center text-white"
              >
                R-4
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#1f82ce] text-center text-white"
              >
                R-5
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#04fb04] text-center text-black"
              >
                R-6
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#ff0000] text-center text-white"
              >
                P-1
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#ff9900] text-center text-black"
              >
                P-2
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#ffff00] text-center text-black"
              >
                P-3
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#003366]  text-center text-white"
              >
                P-4
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#1f82ce] text-center text-white"
              >
                P-5
              </th>
              <th
                scope="col"
                className="px-1 py-3 bg-[#04fb04] text-center text-black"
              >
                P-6
              </th>
            </tr>
          </thead>
          <tbody>
            {resumen.map((fila) => (
              <tr
                key={fila.date}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-1 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {fila.date} - {getWeekDay(fila.date)}
                </th>
                <td className="px-1 py-3 bg-[#ff0000] text-center text-white">
                  {formatearNumero(fila['Activa-1'])}
                </td>
                <td className="px-1 py-3 bg-[#ff9900] text-center text-black">
                  {formatearNumero(fila['Activa-2'])}
                </td>
                <td className="px-1 py-3 bg-[#ffff00] text-center text-black">
                  {formatearNumero(fila['Activa-3'])}
                </td>
                <td className="px-1 py-3 bg-[#003366]  text-center text-white">
                  {formatearNumero(fila['Activa-4'])}
                </td>
                <td className="px-1 py-3 bg-[#1f82ce] text-center text-white">
                  {formatearNumero(fila['Activa-5'])}
                </td>
                <td className="px-1 py-3 bg-[#04fb04] text-center text-black">
                  {formatearNumero(fila['Activa-6'])}
                </td>
                <td className="px-1 py-3 bg-[#ff0000] text-center text-white">
                  {formatearNumero(fila['Reactiva-1'])}
                </td>
                <td className="px-1 py-3 bg-[#ff9900] text-center text-black">
                  {formatearNumero(fila['Reactiva-2'])}
                </td>
                <td className="px-1 py-3 bg-[#ffff00] text-center text-black">
                  {formatearNumero(fila['Reactiva-3'])}
                </td>
                <td className="px-1 py-3 bg-[#003366]  text-center text-white">
                  {formatearNumero(fila['Reactiva-4'])}
                </td>
                <td className="px-1 py-3 bg-[#1f82ce] text-center text-white">
                  {formatearNumero(fila['Reactiva-5'])}
                </td>
                <td className="px-1 py-3 bg-[#04fb04] text-center text-black">
                  {formatearNumero(fila['Reactiva-6'])}
                </td>
                <td className="px-1 py-3 bg-[#ff0000] text-center text-white">
                  {fila['Potencia-1']}
                </td>
                <td className="px-1 py-3 bg-[#ff9900] text-center text-black">
                  {fila['Potencia-2']}
                </td>
                <td className="px-1 py-3 bg-[#ffff00] text-center text-black">
                  {fila['Potencia-3']}
                </td>
                <td className="px-1 py-3 bg-[#003366]  text-center text-white">
                  {fila['Potencia-4']}
                </td>
                <td className="px-1 py-3 bg-[#1f82ce] text-center text-white">
                  {fila['Potencia-5']}
                </td>
                <td className="px-1 py-3 bg-[#04fb04] text-center text-black">
                  {fila['Potencia-6']}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

CrearTablaResumenDia.propTypes = {
  data: PropTypes.array,
}
export default CrearTablaResumenDia
