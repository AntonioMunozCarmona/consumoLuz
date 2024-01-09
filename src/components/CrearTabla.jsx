import PropTypes from 'prop-types'

function getWeekDay(date) {
  let days = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
  const [day, month, year] = date.split('/')
  date = new Date(year, month - 1, day)

  return days[date.getDay()]
}

const CrearTabla = (props) => {
  const { data } = props
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
          <caption className="text-2xl m-8 tex text-blue-500">
            Energia Activa en el período
          </caption>
          <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
            <tr>
              <th scope="col" className="px-2 py-3">
                Fecha
              </th>
              <th scope="col" className="px-2 py-3">
                00
              </th>
              <th scope="col" className="px-2 py-3">
                01
              </th>
              <th scope="col" className="px-2 py-3">
                02
              </th>
              <th scope="col" className="px-2 py-3">
                03
              </th>
              <th scope="col" className="px-2 py-3">
                04
              </th>
              <th scope="col" className="px-2 py-3">
                05
              </th>
              <th scope="col" className="px-2 py-3">
                06
              </th>
              <th scope="col" className="px-2 py-3">
                07
              </th>
              <th scope="col" className="px-2 py-3">
                08
              </th>
              <th scope="col" className="px-2 py-3">
                09
              </th>
              <th scope="col" className="px-2 py-3">
                10
              </th>
              <th scope="col" className="px-2 py-3">
                11
              </th>
              <th scope="col" className="px-2 py-3">
                12
              </th>
              <th scope="col" className="px-2 py-3">
                13
              </th>
              <th scope="col" className="px-2 py-3">
                14
              </th>
              <th scope="col" className="px-2 py-3">
                15
              </th>
              <th scope="col" className="px-2 py-3">
                16
              </th>
              <th scope="col" className="px-2 py-3">
                17
              </th>
              <th scope="col" className="px-2 py-3">
                18
              </th>
              <th scope="col" className="px-2 py-3">
                19
              </th>
              <th scope="col" className="px-2 py-3">
                20
              </th>
              <th scope="col" className="px-2 py-3">
                21
              </th>
              <th scope="col" className="px-2 py-3">
                22
              </th>
              <th scope="col" className="px-2 py-3">
                23
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((fila) => (
              <tr
                key={fila.date}
                className=" border-b border-blue-400 text-gray-500"
              >
                <th
                  scope="row"
                  className="px-2 py-4 bg-blue-500 text-gray-100 font-medium  whitespace-nowrap dark:text-blue-100"
                >
                  {fila.date} - {getWeekDay(fila.date)}
                </th>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._00.Color }}
                >
                  {fila._00.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._01.Color }}
                >
                  {fila._01.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._02.Color }}
                >
                  {fila._02.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._03.Color }}
                >
                  {fila._03.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._04.Color }}
                >
                  {fila._04.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._05.Color }}
                >
                  {fila._05.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._06.Color }}
                >
                  {fila._06.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._07.Color }}
                >
                  {fila._07.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._08.Color }}
                >
                  {fila._08.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._09.Color }}
                >
                  {fila._09.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._10.Color }}
                >
                  {fila._10.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._11.Color }}
                >
                  {fila._11.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._12.Color }}
                >
                  {fila._12.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._13.Color }}
                >
                  {fila._13.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._14.Color }}
                >
                  {fila._14.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._15.Color }}
                >
                  {fila._15.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._16.Color }}
                >
                  {fila._16.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._17.Color }}
                >
                  {fila._17.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._18.Color }}
                >
                  {fila._18.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._19.Color }}
                >
                  {fila._19.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._20.Color }}
                >
                  {fila._20.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._21.Color }}
                >
                  {fila._21.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._22.Color }}
                >
                  {fila._22.Activa}
                </td>
                <td
                  className="px-2 py-4"
                  style={{ backgroundColor: fila._23.Color }}
                >
                  {fila._23.Activa}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-evenly text-center">
          <span className="bg-[#ff0000] w-1/12 p-1 text-white">P1</span>
          <span className="bg-[#ff9900] w-1/12 p-1">P2</span>
          <span className="bg-[#ffff00] w-1/12 p-1">P3</span>
          <span className="bg-[#003366] w-1/12 p-1 text-white">P4</span>
          <span className="bg-[#1f82ce] w-1/12 p-1 text-white">P5</span>
          <span className="bg-[#04fb04] w-1/12 p-1">P6</span>
        </div>
      </div>
    </>
  )
}

CrearTabla.propTypes = {
  data: PropTypes.array,
}
export default CrearTabla
