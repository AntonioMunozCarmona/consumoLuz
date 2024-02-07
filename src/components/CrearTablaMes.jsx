import PropTypes from 'prop-types'
import { colores } from '../utils/constantes'

function crearCaption(campo) {
  let caption = ''
  if (campo === 'Activa') {
    caption = 'Energia Activa'
  } else if (campo === 'Reactiva') {
    caption = 'Energia Reactiva'
  } else if (campo === 'Potencia') {
    caption = 'Potencia'
  }
  return caption
}

function formatearNumero(numero) {
  return new Intl.NumberFormat('es-CL').format(numero)
}

const handleClick = (ev, mes) => {
  ev.preventDefault()
  console.log('EV', ev, 'mes ', mes)
  // Ventana modal
  var modal = document.getElementById('ventanaModal')

  // Botón que abre el modal
  var boton = document.getElementById(mes)

  // Hace referencia al elemento <span> que tiene la X que cierra la ventana
  var span = document.getElementsByClassName('cerrar')[0]

  // Cuando el usuario hace click en el botón, se abre la ventana
  boton.addEventListener('click', function () {
    modal.style.display = 'block'
  })

  // Si el usuario hace click en la x, la ventana se cierra
  span.addEventListener('click', function () {
    modal.style.display = 'none'
  })

  // Si el usuario hace click fuera de la ventana, se cierra.
  window.addEventListener('click', function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  })
}

function formatearMes(mes) {
  let [anio, m] = mes.split('-')
  if (m === '01') return `Enero ${anio}`
  if (m === '02') return `Febrero ${anio}`
  if (m === '03') return `Marzo ${anio}`
  if (m === '04') return `Abril ${anio}`
  if (m === '05') return `Mayo ${anio}`
  if (m === '06') return `Junio ${anio}`
  if (m === '07') return `Julio ${anio}`
  if (m === '08') return `Agosto ${anio}`
  if (m === '09') return `Septiembre ${anio}`
  if (m === '10') return `Octubre ${anio}`
  if (m === '11') return `Noviembre ${anio}`
  if (m === '12') return `Diciembre ${anio}`
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
const CrearTablaResumenMes = (props) => {
  const { data, campo } = props
  //console.log(data)
  let caption = crearCaption(campo)
  return (
    <>
      <div className="relative flex overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-4/5 mx-auto text-sm text-center rtl:text-right text-gray-700 dark:text-gray-600">
          <caption className="text-2xl m-8 text-center">
            Resumen mensual {caption}
          </caption>

          <thead className="text-l text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="px-1 py-2 border-b dark:border-gray-700">
              <th scope="col">Mes</th>
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
              <th
                scope="col"
                className="text-center text-black  dark:border-gray-700"
              ></th>
            </tr>
          </thead>
          <tbody id="tabla">
            {data.map((fila) => (
              <tr
                key={fila.mes}
                className="px-1 py-1 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-1 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {formatearMes(fila.mes)}
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
                <td className="text-center text-gray-100 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <button
                    id={fila.mes}
                    className="abrirModal rounded bg-gray-600 p-1 hover:bg-gray-400 transition ease-in duration-300"
                    onClick={(e) => handleClick(e, fila.mes)}
                  >
                    Revisar mes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <!-- Ventana modal, por defecto no visiblel --> */}
      <div
        id="ventanaModal"
        className="modal hidden fixed z-1 pt-10 left-0 top-0 w-full h-full overflow-auto bg-black opacity-50 "
      >
        <div className="modal-content relative bg-white m-auto p-5 w-3/5 animate-[animarsuperior_0.5s_ease-in-out]">
          <span className="cerrar text-black float-right text-3xl font-bold hover:text-black hover:decoration-0 cursor-pointer">
            &times;
          </span>
          <h2>Ventana modal</h2>
          <p>Esto es el texto de la ventana</p>
        </div>
      </div>
    </>
  )
}
CrearTablaResumenMes.propTypes = {
  data: PropTypes.array,
  campo: PropTypes.string,
}
export default CrearTablaResumenMes
