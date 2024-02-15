import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { horas, colores } from '../utils/constantes'
import CrearTablaResumenMes from './CrearTablaMes'
import { empresas } from '../utils/listCups'

function convertirFecha(fechaString) {
  if (!fechaString) return

  let [dia, mes, anio] = fechaString.split('/')

  return new Date(+anio, mes - 1, +dia)
}

const EntradaFileComponent = ({ datos, onDatosRecibidos }) => {
  const [fileContent, setFileContent] = useState(null)
  const [selectedCup, setSelectedCup] = useState(null)
  const [cliente, setCliente] = useState(null)
  const [datosFiltrados, setDatosFiltrados] = useState(null)
  const [tratatedInfo, setTratatedInfo] = useState(null)
  const [tablaTotal, setTablaTotal] = useState(null)
  const [resumenMesTablaTotal, setResumenMesTablaTotal] = useState(null)
  const [isTermined, setIsTermined] = useState(false)
  const [excesoPot, setExcesoPot] = useState(null)

  const fileInputRef = useRef()

  const handleFileUpload = (event) => {
    setFileContent(null)
    setSelectedCup(null)
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      let lines = reader.result.split('\n').slice(1) // Omitir la primera línea
      lines = lines.filter((line) => line.trim() !== '') // Eliminar líneas vacías
      const options = lines.map((line) => line.replace(/\r/, '').split(';'))
      // Dividir la fecha hora en dos campos
      options.map((array) => {
        let [fecha, tiempo] = array[1].split(' ')
        const [hora] = tiempo.split(':')
        if (hora === '00') {
          // Hace que la hora 00 sea del dia anterior
          let date = fecha.split('/')
          let dia = new Date(date[2], date[1] - 1, date[0], 0, 0, 0, 0)
          dia = new Date(dia.getTime() - 24 * 60 * 60 * 1000)
          let d = dia.getDate()
          let m = dia.getMonth() + 1

          if (d < 10) {
            d = '0' + d
          }
          if (m < 10) {
            m = '0' + m
          }
          fecha = d + '/' + m + '/' + dia.getFullYear()
          //console.log('FEcha', fecha)
        }
        array.splice(1, 1, fecha, hora)
      })

      setFileContent(options)
    }

    reader.readAsText(file)
  }

  const handleClick = (e) => {
    setSelectedCup(e.target.value)
    //console.log('value', e.target.value)
    console.log('Cleinte', cliente)
    //console.log('CUP Seleccionada', selectedCup)
  }

  const getCupsOptions = () => {
    if (!fileContent) return []
    const cupsSet = new Set()
    //console.log('Filrcontent', fileContent)
    fileContent.forEach((arr) => cupsSet.add(arr[0]))
    return Array.from(cupsSet)
  }
  useEffect(() => {
    const encuentraEmpresa = (cup) => {
      if (!fileContent || !selectedCup) return []
      const empresaBuscada = empresas.find((empresa) => empresa.cup === cup)
      return empresaBuscada !== undefined
        ? empresaBuscada
        : {
            identificador: 'CUP NO ENCONTRADA',
          }
    }
    setCliente(encuentraEmpresa(selectedCup))
  }, [fileContent, selectedCup])

  useEffect(() => {
    const filtrarCup = () => {
      if (!fileContent || !selectedCup) return []
      //console.log('En filtrar FileContent', fileContent)
      //console.log('En filtrar selectedCyp', selectedCup)
      return fileContent.filter((arr) => arr[0] === selectedCup)
    }
    const filteredData = filtrarCup()
    //console.log('datosFiltradosCup', filteredData)
    setDatosFiltrados(filteredData)
  }, [fileContent, selectedCup])

  useEffect(() => {
    const tratarInfo = () => {
      if (!datosFiltrados || !selectedCup) return []
      let color
      let misDatos = []
      let miDia = {}
      datosFiltrados.reduce((acc, curr) => {
        const [name, date, hour, ...rest] = curr

        if (rest[13] === 'P1') {
          color = colores.P1
        } else if (rest[13] === 'P2') {
          color = colores.P2
        } else if (rest[13] === 'P3') {
          color = colores.P3
        } else if (rest[13] === 'P4') {
          color = colores.P4
        } else if (rest[13] === 'P5') {
          color = colores.P5
        } else if (rest[13] === 'P6') {
          color = colores.P6
        }

        const hourData = {
          Activa: rest[0],
          Reactiva: rest[4],
          Potencia: rest[12],
          Periodo: rest[13],
          Color: color,
        }
        if (!miDia.name || name !== miDia.name) {
          miDia.name = name
          miDia.date = date
        }

        if (hour === '01') {
          miDia._01 = hourData
        }
        if (hour === '02') {
          miDia._02 = hourData
        }
        if (hour === '03') {
          miDia._03 = hourData
        }
        if (hour === '04') {
          miDia._04 = hourData
        }
        if (hour === '05') {
          miDia._05 = hourData
        }
        if (hour === '06') {
          miDia._06 = hourData
        }
        if (hour === '07') {
          miDia._07 = hourData
        }
        if (hour === '08') {
          miDia._08 = hourData
        }
        if (hour === '09') {
          miDia._09 = hourData
        }
        if (hour === '10') {
          miDia._10 = hourData
        }
        if (hour === '11') {
          miDia._11 = hourData
        }
        if (hour === '12') {
          miDia._12 = hourData
        }
        if (hour === '13') {
          miDia._13 = hourData
        }
        if (hour === '14') {
          miDia._14 = hourData
        }
        if (hour === '15') {
          miDia._15 = hourData
        }
        if (hour === '16') {
          miDia._16 = hourData
        }
        if (hour === '17') {
          miDia._17 = hourData
        }
        if (hour === '18') {
          miDia._18 = hourData
        }
        if (hour === '19') {
          miDia._19 = hourData
        }
        if (hour === '20') {
          miDia._20 = hourData
        }
        if (hour === '21') {
          miDia._21 = hourData
        }
        if (hour === '22') {
          miDia._22 = hourData
        }
        if (hour === '23') {
          miDia._23 = hourData
        }
        if (hour === '00') {
          miDia._00 = hourData
          // Comprobar que existen todos los campos
          horas.forEach((hora) => {
            if (!miDia.hasOwnProperty(hora)) {
              miDia[hora] = {
                Activa: 0,
                Reactiva: 0,
                Potencia: 0,
                Periodo: 'ND',
                Color: colores.ND,
              }
            }
          })
          misDatos.push(miDia)

          miDia = {}
        }

        //console.log('Mis datos', misDatos)
        //setTratatedInfo(misDatos)
        return acc
      }, [])
      //console.log('Mis datos:', misDatos)
      // Comprobar que existen todas las fechas
      let fechas = []
      misDatos.map((dato) => fechas.push(dato.date))
      //console.log('Fechas', fechas)
      let f_anterior, f_posterior, f_falta
      let faltas = []
      fechas.map((fecha, i) => {
        if (i === 1) {
          const [day, month, year] = fecha.split('/')
          f_anterior = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))
          f_anterior = f_anterior / (1000 * 60 * 60 * 24)
        } else {
          const [day1, month1, year1] = fecha.split('/')
          f_posterior = new Date(Date.UTC(year1, month1 - 1, day1, 0, 0, 0, 0))
          f_posterior = f_posterior / (1000 * 60 * 60 * 24)
          let dif = f_posterior - f_anterior
          if (dif > 1) {
            for (let h = dif; h > 1; h--) {
              f_falta = new Date(Date.UTC(year1, month1 - 1, day1 - h + 2))
              f_falta = new Date(f_falta.getTime() - 24 * 60 * 60 * 1000)
              let d = f_falta.getDate()
              let m = f_falta.getMonth() + 1

              if (d < 10) {
                d = '0' + d
              }
              if (m < 10) {
                m = '0' + m
              }
              fecha = d + '/' + m + '/' + f_falta.getFullYear()
              faltas.push(fecha) // Guarda las fechas que faltan en el array de misDatos
            }
          }
          f_anterior = f_posterior
        }
      })
      // Inserto un objeto con la fecha que falta
      faltas.map((falta) => {
        const obj = {
          name: misDatos[0].name,
          date: falta,
          _01: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _02: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _03: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _04: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _05: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _06: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _07: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _08: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _09: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _10: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _11: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _12: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _13: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _14: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _15: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _16: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _17: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _18: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _19: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _20: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _21: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _22: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _23: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
          _00: {
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          },
        }
        misDatos.push(obj)
      })
      misDatos.sort((a, b) => {
        return convertirFecha(a.date) - convertirFecha(b.date)
      })
      //console.log(misDatos)
      return misDatos
    }

    let tratados = tratarInfo()
    setTratatedInfo(tratados)
    //console.log('TratatedInfo', tratados)
  }, [datosFiltrados, selectedCup])

  useEffect(() => {
    let resumen = []
    let acc = {}
    const tablaTotal = () => {
      if (!tratatedInfo) return []
      const arrayResumen = tratatedInfo.map((obj) => {
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
          const activa = parseInt(
            obj[`_${i.toString().padStart(2, '0')}`].Activa
          )
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
        // console.log('acc', acc)

        resumen.push(acc)
        return acc
      })
      return arrayResumen
    }
    let pp = tablaTotal()
    //console.log('Datos por dia: Result', pp)

    setTablaTotal(pp)
  }, [datosFiltrados, selectedCup, tratatedInfo])

  useEffect(() => {
    const resumenMesTablaTotal = () => {
      if (!tablaTotal || !tratatedInfo) return []

      function buscar_item_por_mes(mes) {
        return resumenMes.find(function (item) {
          return item.mes === mes
        })
      }

      let mes = ''
      let anio = ''
      let actual = ''
      let i = ''
      let resumenMes = []
      let acc = {}
      //console.log('tablaTotal', tablaTotal)
      tablaTotal.map((dia) => {
        actual = convertirFecha(dia.date)
        anio = actual.getFullYear()
        mes = actual.getMonth() + 1
        i = anio + '-' + mes.toString().padStart(2, '0')

        let encontrado = buscar_item_por_mes(i)
        //console.log('Encontrado', encontrado)
        if (!encontrado) {
          // Si no se encuentra se graba el objeto acc que hemos creado y se empieza uno nuevo
          if (acc.mes !== undefined) {
            acc = {}
          }

          // Crea un nuevo objeto con los datos del día
          acc.mes = i
          acc['Activa-1'] = dia['Activa-1']
          acc['Activa-2'] = dia['Activa-2']
          acc['Activa-3'] = dia['Activa-3']
          acc['Activa-4'] = dia['Activa-4']
          acc['Activa-5'] = dia['Activa-5']
          acc['Activa-6'] = dia['Activa-6']
          acc['Reactiva-1'] = dia['Reactiva-1']
          acc['Reactiva-2'] = dia['Reactiva-2']
          acc['Reactiva-3'] = dia['Reactiva-3']
          acc['Reactiva-4'] = dia['Reactiva-4']
          acc['Reactiva-5'] = dia['Reactiva-5']
          acc['Reactiva-6'] = dia['Reactiva-6']
          acc['Potencia-1'] = dia['Potencia-1']
          acc['Potencia-2'] = dia['Potencia-2']
          acc['Potencia-3'] = dia['Potencia-3']
          acc['Potencia-4'] = dia['Potencia-4']
          acc['Potencia-5'] = dia['Potencia-5']
          acc['Potencia-6'] = dia['Potencia-6']

          resumenMes.push(acc)
        } else {
          encontrado['Activa-1'] += dia['Activa-1']
          encontrado['Activa-2'] += dia['Activa-2']
          encontrado['Activa-3'] += dia['Activa-3']
          encontrado['Activa-4'] += dia['Activa-4']
          encontrado['Activa-5'] += dia['Activa-5']
          encontrado['Activa-6'] += dia['Activa-6']
          encontrado['Reactiva-1'] += dia['Reactiva-1']
          encontrado['Reactiva-2'] += dia['Reactiva-2']
          encontrado['Reactiva-3'] += dia['Reactiva-3']
          encontrado['Reactiva-4'] += dia['Reactiva-4']
          encontrado['Reactiva-5'] += dia['Reactiva-5']
          encontrado['Reactiva-6'] += dia['Reactiva-6']
          encontrado['Potencia-1'] = Math.max(
            encontrado[`Potencia-1`],
            dia['Potencia-1']
          )
          encontrado['Potencia-2'] = Math.max(
            encontrado['Potencia-2'],
            dia['Potencia-2']
          )
          encontrado['Potencia-3'] = Math.max(
            encontrado['Potencia-3'],
            dia['Potencia-3']
          )
          encontrado['Potencia-4'] = Math.max(
            encontrado['Potencia-4'],
            dia['Potencia-4']
          )
          encontrado['Potencia-5'] = Math.max(
            encontrado['Potencia-5'],
            dia['Potencia-5']
          )
          encontrado['Potencia-6'] = Math.max(
            encontrado['Potencia-6'],
            dia['Potencia-6']
          )
        }

        //console.log('resumenmes', resumenMes)
      })

      return resumenMes
    }
    let s = resumenMesTablaTotal()
    //console.log('S', s)
    setResumenMesTablaTotal(s)
  }, [tablaTotal, tratatedInfo])

  useEffect(() => {
    const isTermined = () => {
      if (!resumenMesTablaTotal) return false
      return true
    }
    let s = isTermined()
    setIsTermined(s)
  }, [resumenMesTablaTotal])

  useEffect(() => {
    //console.log('La tabla Inicial', resumenMesTablaTotal)

    const isExceded = () => {
      if (!resumenMesTablaTotal) return false

      let excesos = []
      let copiaMes = {}
      resumenMesTablaTotal.map((mes) => {
        copiaMes = { ...mes }

        copiaMes['Potencia-1'] > cliente.condiciones.P1
          ? copiaMes['Potencia-1']
          : (copiaMes['Potencia-1'] = '')
        copiaMes['Potencia-2'] > cliente.condiciones.P2
          ? copiaMes['Potencia-2']
          : (copiaMes['Potencia-2'] = '')
        copiaMes['Potencia-3'] > cliente.condiciones.P3
          ? copiaMes['Potencia-3']
          : (copiaMes['Potencia-3'] = '')
        copiaMes['Potencia-4'] > cliente.condiciones.P4
          ? copiaMes['Potencia-4']
          : (copiaMes['Potencia-4'] = '')
        copiaMes['Potencia-5'] > cliente.condiciones.P5
          ? copiaMes['Potencia-5']
          : (copiaMes['Potencia-5'] = '')
        copiaMes['Potencia-6'] > cliente.condiciones.P6
          ? copiaMes['Potencia-6']
          : (copiaMes['Potencia-6'] = '')
        excesos.push(copiaMes)
      })
      return excesos
    }
    let s = isExceded()
    // console.log('LOS EXCESOS', s)
    // console.log('La tabla', resumenMesTablaTotal)
    setExcesoPot(s)
  }, [resumenMesTablaTotal])

  return (
    <div>
      <div className="print:hidden">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="fileInput"
        ></label>
        <input
          className="block w-11/12 lg:w-3/5 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="fileInput"
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
        ></input>
      </div>

      <div className="print:hidden">
        {fileContent &&
          getCupsOptions().map((cup) => (
            <button
              onClick={handleClick}
              key={cup}
              value={cup}
              className="w-4/5 md:w-1/3 bg-green-300 hover:bg-green-600 rounded-md mx-10 my-2 focus:ring focus:ring-violet-300 focus:bg-green-100 [&:not(:focus)]:opacity-50"
            >
              {cup}
            </button>
          ))}
      </div>
      <>
        {}

        {selectedCup && datosFiltrados && <></>}
        {tratatedInfo && <></>}
        {tablaTotal && (
          <>
            <h2 className="text-center font-bold text-lg w-100">
              Información del cliente
            </h2>
            <article className="flex flex-row gap-2 justify-between mx-3">
              <div className="facturacion flex flex-col w-6/10 text-sm">
                <p>Titular: {cliente.titular}</p>
                <p>NIF: {cliente.cif}</p>
                <p>Dirección: {cliente.calle}</p>
                <p>Provincia: {cliente.provincia}</p>
              </div>
              <div className="w-4/10">
                <p>
                  Identificador:{' '}
                  <span className="font-bold">{cliente.identificador}</span>
                </p>
                <p>
                  CUPS: <span className="font-bold">{cliente.cup}</span>
                </p>
                <p>Tarifa: {cliente.tarifa}</p>
                <div>
                  Condiciones: <br />
                  <span className="font-bold text-sm">
                    P1: {cliente.condiciones?.P1}
                  </span>
                  {' - '}
                  <span className="font-bold text-sm">
                    P2: {cliente.condiciones?.P2}
                  </span>
                  {' - '}
                  <span className="font-bold text-sm">
                    P3: {cliente.condiciones?.P3}
                  </span>
                  {' - '}
                  <span className="font-bold text-sm">
                    P4: {cliente.condiciones?.P4}
                  </span>
                  {' - '}
                  <span className="font-bold text-sm">
                    P5: {cliente.condiciones?.P5}
                  </span>
                  {' - '}
                  <span className="font-bold text-sm">
                    P6: {cliente.condiciones?.P6}
                  </span>
                </div>
              </div>
            </article>
          </>
        )}
      </>
      {resumenMesTablaTotal && isTermined && (
        <div>
          <div className="activa flex fle-row justify-center">
            <CrearTablaResumenMes
              data={resumenMesTablaTotal}
              campo={'Activa'}
            />
          </div>
          <div className="reactiva flex fle-row justify-around gap-20">
            <CrearTablaResumenMes
              data={resumenMesTablaTotal}
              campo={'Reactiva'}
            />
            <CrearTablaResumenMes
              data={resumenMesTablaTotal}
              campo={'ReactivaFact'}
            />
          </div>
          <div className="potencia flex flex-row justify-around gap-20">
            <CrearTablaResumenMes
              data={resumenMesTablaTotal}
              campo={'Potencia'}
            />
            <CrearTablaResumenMes data={excesoPot} campo={'PotenciaFact'} />
          </div>
        </div>
      )}
    </div>
  )
}

EntradaFileComponent.propTypes = {
  datos: PropTypes.array,
  onDatosRecibidos: PropTypes.func,
}

export default EntradaFileComponent
