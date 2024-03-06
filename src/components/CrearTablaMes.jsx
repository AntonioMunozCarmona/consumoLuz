import PropTypes from 'prop-types'
import { colores, precios } from '../utils/constantes'

function crearCaption(campo) {
  let caption = ''
  if (campo === 'Activa') {
    caption = 'Energía Activa'
  } else if (campo === 'Reactiva') {
    caption = 'Energía Reactiva'
  } else if (campo === 'ReactivaFact') {
    caption = 'Penalización Energía Reactiva (€)'
  } else if (campo === 'Potencia') {
    caption = 'Potencia'
  } else if (campo === 'PotenciaFact') {
    caption = 'Exceso de Potencia'
  }

  return caption
}

function formatearNumero(numero) {
  return new Intl.NumberFormat('es-CL').format(numero)
}

const handleClick = (ev, mes, campo) => {
  //   ev.preventDefault()
  //   const openEls = document.querySelectorAll('[data-open]')
  //   const isVisible = 'is-visible'
  //   for (const el of openEls) {
  //     el.addEventListener('click', function () {
  //       const modalId = this.dataset.open
  //       document.getElementById(modalId).classList.add(isVisible)
  //     })
  //   }
  //   // Cerrar haciendo click en el X del modal
  //   const closeEls = document.querySelectorAll('[data-close]')
  //   for (const el of closeEls) {
  //     el.addEventListener('click', function () {
  //       this.parentElement.parentElement.parentElement.classList.remove(isVisible)
  //     })
  //   }
  //   // Hciendo click en cualquier parte fuera del modal
  //   document.addEventListener('click', (e) => {
  //     if (e.target == document.querySelector('.modal.is-visible')) {
  //       document.querySelector('.modal.is-visible').classList.remove(isVisible)
  //     }
  //   })
  //   // Por ultimo presionando la tecla 'Esc'
  //   document.addEventListener('keyup', (e) => {
  //     if (e.key == 'Escape' && document.querySelector('.modal.is-visible')) {
  //       document.querySelector('.modal.is-visible').classList.remove(isVisible)
  //     }
  //   })
  // Ventana modal
  //console.log('EV', ev, 'mes ', mes, 'Campo:', campo)
  ev.preventDefault()
  let modal = document.getElementById(`modal-${campo}`)
  let modalContainer = document.getElementById(`modalContainer-${campo}`)
  let closeModal = document.getElementById('closeModal')
  modal.classList.toggle('hidden')
  modalContainer.classList.remove('hidden')
  modalContainer.classList.remove('opacity-0')

  modalContainer.classList.remove('w-1')
  modalContainer.classList.add('w-1/2')

  modalContainer.classList.toggle('visible')
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden')
  })

  modal.addEventListener('click', () => {
    modal.classList.add('hidden')
  })
  //   // console.log('MOdal', modal)
  //   // // Botón que abre el modal
  //   // let boton = document.getElementById(mes)
  //   // console.log('Boton', boton)
  //   // // Hace referencia al elemento <span> que tiene la X que cierra la ventana
  //   // let span = document.getElementsByClassName('cerrar')[0]
  //   // // Cuando el usuario hace click en el botón, se abre la ventana
  //   // boton.addEventListener('click', function () {
  //   //   modal.style.display = `block`
  //   // })
  //   // // Si el usuario hace click en la x, la ventana se cierra
  //   // span.addEventListener('click', function () {
  //   //   modal.style.display = 'none'
  //   // })
  //   // // Si el usuario hace click fuera de la ventana, se cierra.
  //   // window.addEventListener('click', function (event) {
  //   //   if (event.target == modal) {
  //   //     modal.style.display = 'none'
  //   //   }
  //   // })
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

function redondearDecimales(numero, decimales) {
  let numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}') // Expresion regular para numeros con un cierto numero de decimales o mas
  if (numeroRegexp.test(numero)) {
    // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
    return Number(numero.toFixed(decimales))
  } else {
    return Number(numero.toFixed(decimales)) === 0 ? 0 : numero // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
  }
}

function getCellValue(fila, fieldName, indice) {
  let cosPhi = 0
  let reactiva = 0
  let precio = 0
  switch (fieldName) {
    case 'Activa':
      return fila[`Activa-${indice}`]
    case 'Reactiva':
      return fila[`Reactiva-${indice}`]
    case 'ReactivaFact':
      cosPhi = Math.cos(
        Math.atan(fila[`Reactiva-${indice}`] / fila[`Activa-${indice}`])
      )
      reactiva = Math.max(
        fila[`Reactiva-${indice}`] - fila[`Activa-${indice}`] * 0.33,
        0
      ) // Reactiva - 33% de Activa o 0 si es negativo
      if (cosPhi < 0.8) {
        precio = precios.menor0_8
      } else if (cosPhi >= 0.8 && cosPhi < 0.95) {
        precio = precios.menor0_8
      }
      return redondearDecimales(reactiva * precio, 2)
    case 'Potencia':
      return fila[`Potencia-${indice}`]
    case 'PotenciaFact':
      return fila[`Potencia-${indice}`]
    default:
      return null
  }
}
const CrearTablaResumenMes = (props) => {
  const { data, data2, campo } = props
  if (!data || !data2 || !campo) return
  //console.log('Data:', data)
  //console.log('Data 2 :', data2)
  let caption = crearCaption(campo)
  return (
    <>
      <div className="relative w-11/12 flex overflow-x-auto shadow-md sm:rounded-lg">
        <table className="mx-auto w-full text-sm text-center rtl:text-right text-gray-700 dark:text-gray-600 select-all">
          <caption className="text-2xl m-8 text-center">
            Resumen mensual {caption}
          </caption>

          <thead className="text-l text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="px-1 py-2 border-b dark:border-gray-700">
              <th className="min-w-8 w-2" scope="col">
                Mes
              </th>
              <th
                scope="col"
                className="text-center text-white min-w-6"
                style={{ backgroundColor: colores.P1 }}
              >
                P1
              </th>
              <th
                scope="col"
                className="px-1 py-2 text-center text-black min-w-6"
                style={{ backgroundColor: colores.P2 }}
              >
                P2
              </th>
              <th
                scope="col"
                className="text-center text-black min-w-6"
                style={{ backgroundColor: colores.P3 }}
              >
                P3
              </th>
              <th
                scope="col"
                className="text-center text-white min-w-6"
                style={{ backgroundColor: colores.P4 }}
              >
                P4
              </th>
              <th
                scope="col"
                className="text-center text-white min-w-6"
                style={{ backgroundColor: colores.P5 }}
              >
                P5
              </th>
              <th
                scope="col"
                className="text-center text-black min-w-6"
                style={{ backgroundColor: colores.P6 }}
              >
                P6
              </th>
              <th
                scope="col"
                className="text-center text-black  dark:border-gray-700 min-w-8 print:hidden"
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
                <td className="text-center text-white odd:bg-opacity-50 print:hidden">
                  <button
                    id={fila.mes}
                    className="open-modal rounded bg-gray-400 p-0.5 hover:bg-gray-700 transition ease-in duration-300"
                    onClick={(e) => handleClick(e, fila.mes, campo)}
                  >
                    Revisar mes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Ventana modal, por defecto no visiblel -->  */}
      <div
        id={`modal-${campo}`}
        className="modal-container absolute overflow-y-auto top-0 left-0 hidden flex justify-center items-center h-full w-full z-10 min-h-max bg-[rgba(79,79,79,.7)]"
      >
        <div
          id={`modalContainer-${campo}`}
          className="modal-content relative p-2.5 rounded-md bg-white text-center z-100 w-1 flex flex-row opacity-0 transition-all animate-jump-in animate-ease-linear animate-duration-3000"
        >
          <header className="modal-header text-lg w-full h-6 absolute">
            <button
              type="button"
              id="closeModal"
              className="text-gray-400 bg-transparent hover:bg-gray-200 absolute right-0 top-0 mr-4 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 m-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </header>
          <section className="modal-section mt-6">
            <h2>Resumen de </h2>
            <p>Esto será el resumen mensual del cliente</p>
            <p>Energía Activa por Periodo</p>
            <p>Penalización Energía Reactiva por Periodo</p>
            <p>Penalización Exceso de potencia por Periodo</p>
          </section>
          <footer className="modal-footer"></footer>
        </div>
      </div>
    </>
  )
}
// https://www.youtube.com/watch?v=DKK7i7NzizA
CrearTablaResumenMes.propTypes = {
  data: PropTypes.array,
  data2: PropTypes.array,
  campo: PropTypes.string,
}
export default CrearTablaResumenMes
