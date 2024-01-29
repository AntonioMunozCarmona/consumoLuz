import PropTypes from 'prop-types'
import { colores } from '../utils/constantes'

function getWeekDay(date) {
  let days = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
  const [day, month, year] = date.split('/')
  date = new Date(year, month - 1, day)

  return days[date.getDay()]
}

function crearCaption(campo) {
  let caption = ''
  if (campo === 'Activa') {
    caption = 'Energia Activa en el período'
  } else if (campo === 'Reactiva') {
    caption = 'Energia Reactiva en el período'
  } else if (campo === 'Potencia') {
    caption = 'Factor de Potencia en el periodo'
  }
  return caption
}

function round(num, decimales = 2) {
  var signo = num >= 0 ? 1 : -1
  num = num * signo
  if (decimales === 0)
    //con 0 decimales
    return signo * Math.round(num)
  // round(x * 10 ^ decimales)
  num = num.toString().split('e')
  num = Math.round(+(num[0] + 'e' + (num[1] ? +num[1] + decimales : decimales)))
  // x * 10 ^ (-decimales)
  num = num.toString().split('e')
  return signo * (num[0] + 'e' + (num[1] ? +num[1] - decimales : -decimales))
}

function getCellValue(fila, fieldName) {
  switch (fieldName) {
    case 'Activa':
      return fila.Activa
    case 'Reactiva':
      return fila.Reactiva
    case 'Potencia':
      return round(fila.Potencia, 3)
    default:
      return null
  }
}

const CrearTabla = ({ data, campo }) => {
  //const { data, campo } = props
  let caption = crearCaption(campo)

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <caption className="text-2xl m-8 text-center text-blue-500">
            {caption}
          </caption>
          <thead className="text-xs text-white text-center uppercase bg-blue-600 dark:text-white">
            <tr className="px-1 py-3">
              <th scope="col" className="">
                Fecha
              </th>
              <th scope="col" className="">
                00
              </th>
              <th scope="col" className="">
                01
              </th>
              <th scope="col" className="">
                02
              </th>
              <th scope="col" className="">
                03
              </th>
              <th scope="col" className="">
                04
              </th>
              <th scope="col" className="">
                05
              </th>
              <th scope="col" className="">
                06
              </th>
              <th scope="col" className="">
                07
              </th>
              <th scope="col" className="">
                08
              </th>
              <th scope="col" className="">
                09
              </th>
              <th scope="col" className="">
                10
              </th>
              <th scope="col" className="">
                11
              </th>
              <th scope="col" className="">
                12
              </th>
              <th scope="col" className="">
                13
              </th>
              <th scope="col" className="">
                14
              </th>
              <th scope="col" className="">
                15
              </th>
              <th scope="col" className="">
                16
              </th>
              <th scope="col" className="">
                17
              </th>
              <th scope="col" className="">
                18
              </th>
              <th scope="col" className="">
                19
              </th>
              <th scope="col" className="">
                20
              </th>
              <th scope="col" className="">
                21
              </th>
              <th scope="col" className="">
                22
              </th>
              <th scope="col" className="">
                23
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((fila) => (
              <tr
                key={fila.date}
                className=" border-b border-blue-400 text-gray-500 text-center px-1 py-3"
              >
                <th
                  scope="row"
                  className=" bg-blue-500 text-gray-100 font-medium  whitespace-nowrap dark:text-blue-100"
                >
                  {fila.date} - {getWeekDay(fila.date)}
                </th>
                <td className="" style={{ backgroundColor: fila._01.Color }}>
                  {getCellValue(fila._01, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._02.Color }}>
                  {getCellValue(fila._02, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._03.Color }}>
                  {getCellValue(fila._03, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._04.Color }}>
                  {getCellValue(fila._04, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._05.Color }}>
                  {getCellValue(fila._05, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._06.Color }}>
                  {getCellValue(fila._06, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._07.Color }}>
                  {getCellValue(fila._07, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._08.Color }}>
                  {getCellValue(fila._08, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._09.Color }}>
                  {getCellValue(fila._09, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._10.Color }}>
                  {getCellValue(fila._10, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._11.Color }}>
                  {getCellValue(fila._11, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._12.Color }}>
                  {getCellValue(fila._12, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._13.Color }}>
                  {getCellValue(fila._13, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._14.Color }}>
                  {getCellValue(fila._14, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._15.Color }}>
                  {getCellValue(fila._15, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._16.Color }}>
                  {getCellValue(fila._16, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._17.Color }}>
                  {getCellValue(fila._17, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._18.Color }}>
                  {getCellValue(fila._18, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._19.Color }}>
                  {getCellValue(fila._19, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._20.Color }}>
                  {getCellValue(fila._20, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._21.Color }}>
                  {getCellValue(fila._21, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._22.Color }}>
                  {getCellValue(fila._22, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._23.Color }}>
                  {getCellValue(fila._23, campo)}
                </td>
                <td className="" style={{ backgroundColor: fila._00.Color }}>
                  {getCellValue(fila._00, campo)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-evenly text-center">
          <span
            className={`bg-[${colores.P1}] w-1/12 p-1 text-white
          `}
          >
            P1
          </span>
          <span className={`bg-[${colores.P2}] w-1/12 p-1`}>P2</span>
          <span className={`bg-[${colores.P3}] w-1/12 p-1`}>P3</span>
          <span className={`bg-[${colores.P4}] w-1/12 p-1 text-white`}>P4</span>
          <span className={`bg-[${colores.P5}] w-1/12 p-1 `}>P5</span>
          <span className={`bg-[${colores.P6}] w-1/12 p-1 `}>P6</span>
          <span className={`bg-[${colores.ND}] w-1/12 p-1 text-white`}>
            N.D.
          </span>
        </div>
      </div>
    </>
  )
}

CrearTabla.propTypes = {
  data: PropTypes.array,
  campo: PropTypes.string,
}
export default CrearTabla
