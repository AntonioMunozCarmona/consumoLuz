import PropTypes from 'prop-types'
import { colores } from '../utils/constantes'

function formatearNumero(numero) {
  return new Intl.NumberFormat('es-CL').format(numero)
}
function getWeekDay(date) {
  let days = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
  const [day, month, year] = date.split('/')
  date = new Date(year, month - 1, day)

  return days[date.getDay()]
}

function getCellValue(fila, fieldName, indice) {
  switch (fieldName) {
    case 'Activa':
      return fila[`Activa-${indice}`]
    case 'Reactiva':
      return fila[`Reactiva-${indice}`]
    case 'Potencia':
      return fila[`Potencia-${indice}`]
    default:
      return null
  }
}

function crearCaption(campo) {
  let caption = ''
  if (campo === 'Activa') {
    caption = 'Energia Activa en el período'
  } else if (campo === 'Reactiva') {
    caption = 'Energia Reactiva en el período'
  } else if (campo === 'Potencia') {
    caption = 'Potencia en el periodo'
  }
  return caption
}

const CrearTablaResumenDia = (props) => {
  const { data, campo } = props
  let caption = crearCaption(campo)
  //console.log('caption', caption)
  //console.log('En resumen dia', data)
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
      const activaC = obj[`_${i.toString().padStart(2, '0')}`].Activa
      const reactivaC = obj[`_${i.toString().padStart(2, '0')}`].Reactiva
      //const potencia = obj[`_${i.toString().padStart(2, '0')}`].Potencia

      const activa = parseFloat(activaC.replace(',', '.'))
      const reactiva = parseFloat(reactivaC.replace(',', '.'))

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
    //console.log('Acc', acc)
    return acc
  })
  return (
    <>
      <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-2/5 mx-auto text-sm text-center rtl:text-right text-gray-700 dark:text-gray-600 select-all">
          <caption className="text-2xl m-8 text-center">
            Resumen diario {caption}
          </caption>

          <thead className="text-l text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="px-1 py-2 border-b dark:border-gray-700">
              <th scope="col">Fecha</th>
              <th
                scope="col"
                className="text-center text-white"
                style={{ backgroundColor: colores.P1 }}
              >
                P1
              </th>
              <th
                scope="col"
                className="px-1 py-2 text-center text-black"
                style={{ backgroundColor: colores.P2 }}
              >
                P2
              </th>
              <th
                scope="col"
                className="text-center text-black"
                style={{ backgroundColor: colores.P3 }}
              >
                P3
              </th>
              <th
                scope="col"
                className="text-center text-white"
                style={{ backgroundColor: colores.P4 }}
              >
                P4
              </th>
              <th
                scope="col"
                className="text-center text-white"
                style={{ backgroundColor: colores.P5 }}
              >
                P5
              </th>
              <th
                scope="col"
                className="text-center text-black"
                style={{ backgroundColor: colores.P6 }}
              >
                P6
              </th>
            </tr>
          </thead>
          <tbody id="tabla">
            {resumen.map((fila) => (
              <tr
                key={fila.date}
                className="px-1 py-1 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {fila.date} - {getWeekDay(fila.date)}
                </th>
                <td
                  className="text-center text-white odd:bg-opacity-50"
                  style={{ backgroundColor: colores.P1 }}
                >
                  {formatearNumero(getCellValue(fila, campo, 1))}
                </td>
                <td
                  className="text-center text-black"
                  style={{ backgroundColor: colores.P2 }}
                >
                  {formatearNumero(getCellValue(fila, campo, 2))}
                </td>
                <td
                  className="text-center text-black"
                  style={{ backgroundColor: colores.P3 }}
                >
                  {formatearNumero(getCellValue(fila, campo, 3))}
                </td>
                <td
                  className="text-center text-white"
                  style={{ backgroundColor: colores.P4 }}
                >
                  {formatearNumero(getCellValue(fila, campo, 4))}
                </td>
                <td
                  className="text-center text-white"
                  style={{ backgroundColor: colores.P5 }}
                >
                  {formatearNumero(getCellValue(fila, campo, 5))}
                </td>
                <td
                  className="text-center text-black"
                  style={{ backgroundColor: colores.P6 }}
                >
                  {formatearNumero(getCellValue(fila, campo, 6))}
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
  campo: PropTypes.string,
}
export default CrearTablaResumenDia
