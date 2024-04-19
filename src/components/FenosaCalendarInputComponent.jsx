import { useState, useEffect, useRef } from 'react'
import readXlsxFile from 'read-excel-file'
import PropTypes from 'prop-types'
import { horas, colores, allowedExtensions } from '../utils/constantes'
import { endesaCalendario, endesaFiestas } from '../utils/endesaCalendario'

function convertirFecha(fechaString) {
  if (!fechaString) return

  let [dia, mes, anio] = fechaString.split('/')

  return new Date(+anio, mes - 1, +dia)
}

function getWeekDay(date) {
  let days = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
  const [day, month, year] = date.split('/')
  date = new Date(year, month - 1, day)

  return days[date.getDay()]
}

function buscarP(fechaString, hora) {
  //console.log('La fecha buascada', fechaString)
  let diasem = getWeekDay(fechaString)
  let buscar = endesaFiestas.some((fiesta) => fiesta === fechaString)
  if (buscar) {
    // Si es festivo de las electricas
    return 'P6'
  } else if (diasem === 'S' || diasem === 'D') {
    return 'P6'
  } else {
    let [dia, mes, anio] = fechaString.split('/')
    //  console.log('La  buascada', endesaCalendario[+mes - 1][+hora])
    return Object.getOwnPropertyDescriptor(endesaCalendario[+mes - 1][0], +hora)
      .value
  }
}

const FenosaCalendarInputComponent = ({ datos, onDatosRecibidos }) => {
  const [fileContent, setFileContent] = useState(null)
  const [file1Content, setFile1Content] = useState(null)
  const [selectedCup, setSelectedCup] = useState(null)
  const [datosFiltrados, setDatosFiltrados] = useState(null)
  const [tratatedInfo, setTratatedInfo] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const fileInputRef = useRef()
  const file1InputRef = useRef()
  //# MARK: handleFileUpload
  const handleFileUpload = (event) => {
    setFileContent(null)
    setSelectedCup(null)
    const file = event.target.files[0]
    if (!allowedExtensions.exec(file.name)) {
      alert(
        'Por favor, utilice solamente archivos con extensión .xlsx/ o .csv/'
      )
      setFileContent(undefined)
      return false
    } else if (file.name.split('.')[1] === 'csv') {
      // FICHERO CSV
      // console.log('Estoy en else')

      const reader = new FileReader()

      reader.onloadend = () => {
        //       Este fichero tiene CUPS	Fecha	Hora	Consumo_KWh	Metodo_obtencion

        let lines = reader.result.split('\n').slice(1) // Omitir la primera línea
        lines = lines.filter((line) => line.trim() !== '') // Eliminar líneas vacías
        const options = lines.map((line) => line.replace(/\r/, '').split(';'))

        setFileContent(options)
        //console.log('Options', options)
        //console.log('file 0', fileContent)
      }

      reader.readAsText(file)
    } else if (file.name.split('.')[1] === 'xlsx') {
      //console.log('Estoy en el infierno')
      const reader = new FileReader()
      reader.onload = async function (e) {
        //console.log(e.target.result)
        // https://www.npmjs.com/package/read-excel-file
        let lines = await readXlsxFile(e.target.result)
        lines = lines.slice(1) // Omitir la primera línea
        //console.log('Row Excle', lines)

        setFileContent(lines)
      }
      reader.readAsArrayBuffer(file)
    }
  }
  //# MARK: handleFile1Upload
  const handleFile1Upload = (event) => {
    setFile1Content(null)
    setSelectedCup(null)
    const file = event.target.files[0]
    if (!allowedExtensions.exec(file.name)) {
      alert(
        'Por favor, utilice solamente archivos con extensión .xlsx/ o .csv/'
      )
      setFile1Content(undefined)
      return false
    } else if (file.name.split('.')[1] === 'csv') {
      //# MARK: CSV
      const reader = new FileReader()

      reader.onloadend = () => {
        //       Este fichero tiene CUPS	Fecha	Hora	Consumo_KWh	Metodo_obtencion

        let lines = reader.result.split('\n').slice(1) // Omitir la primera línea
        lines = lines.filter((line) => line.trim() !== '') // Eliminar líneas vacías
        const options = lines.map((line) => line.replace(/\r/, '').split(';'))

        setFile1Content(options)
        //console.log('file 1', file1Content)
      }

      reader.readAsText(file)
    } else if (file.name.split('.')[1] === 'xlsx') {
      //console.log('Estoy en el infierno')
      const reader = new FileReader()
      reader.onload = async function (e) {
        console.log(e.target.result)
        // https://www.npmjs.com/package/read-excel-file
        let lines = await readXlsxFile(e.target.result)
        lines = lines.slice(1) // Omitir la primera línea
        //console.log('Row Excle', lines)

        setFile1Content(lines)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleClick = (e) => {
    //console.log('LArgo 1: ', fileContent.length)
    //console.log('LArgo 2: ', file1Content.length)
    //console.log('Cup 1: ', file1Content[0][0])

    setSelectedCup(e.target.value)
    //console.log('value', e.target.value)
    //console.log('CUP Seleccionada', selectedCup)
  }

  const getCupsOptions = () => {
    if (!fileContent) return []
    const cupsSet = new Set()
    //console.log('Filrcontent', fileContent)
    fileContent.forEach((arr) => cupsSet.add(arr[0]))
    return Array.from(cupsSet)
  }

  const handleStartDateSelect = (event) => {
    const date = event.target.value
    setStartDate(date)
    //console.log(`Fecha de inicio seleccionada: ${date}`)
  }

  const handleEndDateSelect = (event) => {
    const date = event.target.value
    setEndDate(date)
    //console.log(`Fecha final seleccionada: ${date}`)
  }

  const getDateRange = () => {
    if (!fileContent || !selectedCup || file1Content) return [null, null]

    const dates = fileContent
      .filter((arr) => {
        const [day, month, year] = arr[1].split('/')
        const date = new Date(year, month - 1, day)
        return !isNaN(date.getTime()) && arr[0] === selectedCup // Comprobar si la fecha es válida
      })
      .map((arr) => {
        const [day, month, year] = arr[1].split('/')
        return new Date(year, month - 1, day)
      })

    const minDate = new Date(Math.min.apply(null, dates))
    const maxDate = new Date(Math.max.apply(null, dates))
    maxDate.setDate(maxDate.getDate() + 1)
    console.log('MIn', minDate, 'max', maxDate)
    return [
      minDate.toISOString().split('T')[0],
      maxDate.toISOString().split('T')[0],
    ]
  }

  useEffect(() => {
    const filtrarCup = () => {
      if (!fileContent || !selectedCup) return []
      //console.log('En filtrar FileContent', fileContent)
      //console.log('En filtrar selectedCyp', selectedCup)
      return fileContent.filter((arr) => arr[0] === selectedCup)
    }
    const filteredData = filtrarCup()
    //console.log('datosFiltradosCup', filteredData)
    // Quitamos los duplicados del array
    let set = new Set(filteredData.map(JSON.stringify))
    let arrSinDuplicaciones = Array.from(set).map(JSON.parse)
    //console.log('Sin Duplicaciones', arrSinDuplicaciones)

    setDatosFiltrados(arrSinDuplicaciones)
  }, [fileContent, selectedCup])
  //# MARK: GENERAR ARRAY DIA
  useEffect(() => {
    // Generar un array de objetos de esta forma:
    //   {
    //     "name": "ES0022000009115834NR1P",
    //     "date": "01/01/2023",
    //     "_01": {
    //         "Activa": "0,069",
    //         "Reactiva": "0,184",
    //         "Periodo": "P6",
    //         "Color": "#6ab04c"
    //     },
    //     "_02": {
    //         "Activa": "0,127",
    //         "Reactiva": "0,230",
    //         "Periodo": "P6",
    //         "Color": "#6ab04c"
    //     },
    //     "_03": {
    //         "Activa": "0,046",
    //         "Reactiva": "0,208",
    //         "Periodo": "P6",
    //         "Color": "#6ab04c"
    //     },
    //     "_04": {
    //         "Activa": "0,152",
    //         "Reactiva": "0,239",
    //         "Periodo": "P6",
    //         "Color": "#6ab04c"
    //     },
    //     "_05": {
    //         "Activa": "0,121",
    //         "Reactiva": "0,225",
    //         "Periodo": "P6",
    //         "Color": "#6ab04c"
    //     },
    //     "_06": {
    //         "Activa": "0,144",
    //         "Reactiva": "0,236",
    //         "Periodo": "P6",
    //         "Color": "#6ab04c"
    //     },
    //     "_07": {
    //         "Activa": "0,067",
    //         "Reactiva": "0,136",
    //         "Periodo": "P6",
    //         "Color": "#6ab04c"
    //     },
    //     "_08": {
    //         "Activa": "0,121",
    //         "Reactiva": "0,151",
    //         "Periodo": "P6",
    //         "Color": "#6ab04c"
    //     },
    //     "_09": {
    //         "Activa": "0,115",
    //         "Reactiva": "0,151",
    //         "Periodo": "P2",
    //         "Color": "#FF66CC"
    //     },
    //     "_10": {
    //         "Activa": "0,171",
    //         "Reactiva": "0,189",
    //         "Periodo": "P1",
    //         "Color": "#FF0000"
    //     },
    //     "_11": {
    //         "Activa": "0,137",
    //         "Reactiva": "0,205",
    //         "Periodo": "P1",
    //         "Color": "#FF0000"
    //     },
    //     "_12": {
    //         "Activa": "0,115",
    //         "Reactiva": "0,147",
    //         "Periodo": "P1",
    //         "Color": "#FF0000"
    //     },
    //     "_13": {
    //         "Activa": "0,115",
    //         "Reactiva": "0,145",
    //         "Periodo": "P1",
    //         "Color": "#FF0000"
    //     },
    //     "_14": {
    //         "Activa": "0,138",
    //         "Reactiva": "0,162",
    //         "Periodo": "P1",
    //         "Color": "#FF0000"
    //     },
    //     "_15": {
    //         "Activa": "0,168",
    //         "Reactiva": "0,182",
    //         "Periodo": "P2",
    //         "Color": "#FF66CC"
    //     },
    //     "_16": {
    //         "Activa": "0,066",
    //         "Reactiva": "0,114",
    //         "Periodo": "P2",
    //         "Color": "#FF66CC"
    //     },
    //     "_17": {
    //         "Activa": "0,211",
    //         "Reactiva": "0,211",
    //         "Periodo": "P2",
    //         "Color": "#FF66CC"
    //     },
    //     "_18": {
    //         "Activa": "0,078",
    //         "Reactiva": "0,162",
    //         "Periodo": "P2",
    //         "Color": "#FF66CC"
    //     },
    //     "_19": {
    //         "Activa": "0,171",
    //         "Reactiva": "0,190",
    //         "Periodo": "P1",
    //         "Color": "#FF0000"
    //     },
    //     "_20": {
    //         "Activa": "0,054",
    //         "Reactiva": "0,172",
    //         "Periodo": "P1",
    //         "Color": "#FF0000"
    //     },
    //     "_21": {
    //         "Activa": "0,118",
    //         "Reactiva": "0,221",
    //         "Periodo": "P1",
    //         "Color": "#FF0000"
    //     },
    //     "_22": {
    //         "Activa": "0,090",
    //         "Reactiva": "0,200",
    //         "Periodo": "P1",
    //         "Color": "#FF0000"
    //     },
    //     "_23": {
    //         "Activa": "0,155",
    //         "Reactiva": "0,243",
    //         "Periodo": "P2",
    //         "Color": "#FF66CC"
    //     },
    //     "_00": {
    //         "Activa": "0,109",
    //         "Reactiva": "0,251",
    //         "Periodo": "P2",
    //         "Color": "#FF66CC"
    //     }
    // }
    const tratarInfo = () => {
      if (!datosFiltrados || !selectedCup || !file1Content || !fileContent)
        return []
      let color
      let misDatos = []
      let miDia = {}
      let periodo = ''
      console.log('Datos filtrados', datosFiltrados)

      datosFiltrados.reduce((acc, curr, i) => {
        const [name, fecha, hour, activa, ...rest] = curr
        //console.log('fato', curr)

        periodo = buscarP(fecha, hour)

        if (periodo === 'P1') {
          color = colores.P1
        } else if (periodo === 'P2') {
          color = colores.P2
        } else if (periodo === 'P3') {
          color = colores.P3
        } else if (periodo === 'P4') {
          color = colores.P4
        } else if (periodo === 'P5') {
          color = colores.P5
        } else if (periodo === 'P6') {
          color = colores.P6
        }

        const hourData = {
          Activa: activa,
          Reactiva: file1Content[i][3],
          Periodo: periodo,
          Color: color,
        }

        // if (name !== miDia?.name) {

        //   miDia.name = name
        //   miDia.date = fecha
        // }

        if (hour === '1') {
          miDia = {}
          miDia.name = name
          miDia.date = fecha
          miDia._01 = hourData
        }
        if (hour === '2') {
          miDia._02 = hourData
        }
        if (hour === '3') {
          miDia._03 = hourData
        }
        if (hour === '4') {
          miDia._04 = hourData
        }
        if (hour === '5') {
          miDia._05 = hourData
        }
        if (hour === '6') {
          miDia._06 = hourData
        }
        if (hour === '7') {
          miDia._07 = hourData
        }
        if (hour === '8') {
          miDia._08 = hourData
        }
        if (hour === '9') {
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
        if (hour === '24') {
          miDia._00 = hourData
          // Comprobar que existen todos los campos
          horas.forEach((hora) => {
            if (!miDia.hasOwnProperty(hora)) {
              miDia[hora] = {
                Activa: 0,
                Reactiva: 0,
                Periodo: 'ND',
                Color: colores.ND,
              }
            }
          })

          //        console.log('Voy a guardar Mi dia',           miDia.date,' ',  miDia,' Longitud misDatos',         misDatos.length)
          misDatos.push(miDia)
        }

        //return acc
      }, [])
      //console.log('Mis datos1', misDatos)
      setTratatedInfo(misDatos)
      //console.log('Mis datos2:', misDatos)
      //Comprobar que existen todas las fechas
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

            Periodo: 'ND',
            Color: colores.ND,
          },
          _02: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _03: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _04: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _05: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _06: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _07: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _08: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _09: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _10: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _11: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _12: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _13: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _14: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _15: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _16: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _17: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _18: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _19: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _20: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _21: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _22: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _23: {
            Activa: '0',
            Reactiva: '0',

            Periodo: 'ND',
            Color: colores.ND,
          },
          _00: {
            Activa: '0',
            Reactiva: '0',

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
  }, [datosFiltrados, file1Content, fileContent, selectedCup])

  useEffect(() => {
    const getFilteredData = () => {
      if (!selectedCup || !startDate || !endDate || !tratatedInfo) return []

      const [startYear, startMonth, startDay] = startDate.split('-')
      const [endYear, endMonth, endDay] = endDate.split('-')

      const startDateObj = new Date(
        Date.UTC(startYear, startMonth - 1, startDay)
      )
      const endDateObj = new Date(Date.UTC(endYear, endMonth - 1, endDay))

      return tratatedInfo.filter((obj) => {
        const [day, month, year] = obj.date.split('/')
        const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))

        return (
          obj.name === selectedCup && date >= startDateObj && date <= endDateObj
        )
      })
    }

    if (startDate && endDate) {
      const filteredData = getFilteredData()
      console.log('Filtrados por fecha', filteredData)
      onDatosRecibidos(filteredData)
    }
  }, [
    startDate,
    endDate,
    fileContent,
    selectedCup,
    onDatosRecibidos,
    tratatedInfo,
  ])

  const [minDate, maxDate] = getDateRange()

  return (
    <div className="m-4 print:-scale-60">
      <div className="print:hidden">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
          htmlFor="fileInput"
        >
          Archivo E. Activa
          <input
            className="block w-11/12 lg:w-3/5 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="fileInput"
            type="file"
            accept=".csv, .xlsx"
            ref={fileInputRef}
            onChange={handleFileUpload}
          ></input>
        </label>
      </div>
      <div className="print:hidden">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-700"
          htmlFor="fileInput"
        >
          Archivo E. Reactiva
          <input
            className="block w-11/12 lg:w-3/5 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="fileInput1"
            type="file"
            accept=".csv, .xlsx"
            ref={file1InputRef}
            onChange={handleFile1Upload}
          ></input>
        </label>
      </div>
      <div className="print:hidden">
        {fileContent &&
          file1Content &&
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
        {selectedCup && datosFiltrados && (
          <div className="flex flex-col  sm:flex-row print:hidden">
            <label className="m-2">
              Fecha de inicio:
              <input
                type="date"
                className="inputdata m-2"
                min={minDate}
                max={maxDate}
                value={startDate || maxDate}
                onChange={handleStartDateSelect}
              />
            </label>
            {startDate && (
              <>
                <label className="m-2 ml-5">
                  Fecha final:
                  <input
                    type="date"
                    className="inputdata m-2"
                    min={minDate}
                    max={maxDate}
                    value={endDate || startDate}
                    onChange={handleEndDateSelect}
                  />
                </label>
              </>
            )}
            {tratatedInfo && <></>}
          </div>
        )}
      </div>
    </div>
  )
}

FenosaCalendarInputComponent.propTypes = {
  datos: PropTypes.func,
  onDatosRecibidos: PropTypes.func,
}

export default FenosaCalendarInputComponent
