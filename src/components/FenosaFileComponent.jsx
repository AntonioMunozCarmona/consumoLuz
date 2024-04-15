import { useState, useEffect, useRef } from 'react'
import readXlsxFile from 'read-excel-file'
import PropTypes from 'prop-types'
import { horas, colores, allowedExtensions } from '../utils/constantes'
import CrearTablaResumenMes from './CrearTablaMes'
import { empresas } from '../utils/listCups'
import { endesaCalendario, endesaFiestas } from '../utils/endesaCalendario'

function convertirFecha(fechaString) {
  if (!fechaString) return

  let [dia, mes, anio] = fechaString.split('/')

  return new Date(+anio, mes - 1, +dia)
}

function buscarP(fechaString, hora) {
  let f = convertirFecha(fechaString).getDay()
  //console.log('La fecha buascada', fechaString, 'Dia sema', f)
  if (f === 0 || f === 6) return 'P6' // Si el día de la semana es domingo o sabado es P6
  let buscar = endesaFiestas.some((fiesta) => fiesta === fechaString)
  if (buscar) {
    return 'P6'
  } else {
    let [dia, mes, anio] = fechaString.split('/')
    //  console.log('La  buascada', endesaCalendario[+mes - 1][+hora])

    return Object.getOwnPropertyDescriptor(endesaCalendario[+mes - 1][0], +hora)
      .value
  }
}

function redondear(num) {
  let trunco = Math.trunc(num)
  let resto = num - trunco
  if (resto > 0.1) return trunco + 1
  return trunco
}

const FenosaFileComponent = ({ datos, onDatosRecibidos }) => {
  const [fileContent, setFileContent] = useState(null)
  const [file1Content, setFile1Content] = useState(null)
  const [selectedCup, setSelectedCup] = useState(null)
  const [cliente, setCliente] = useState(null)
  const [datosFiltrados, setDatosFiltrados] = useState(null)
  const [tratatedInfo, setTratatedInfo] = useState(null)
  const [tablaTotal, setTablaTotal] = useState(null)
  const [resumenMesTablaTotal, setResumenMesTablaTotal] = useState(null)
  const [isTermined, setIsTermined] = useState(false)
  const [excesoPot, setExcesoPot] = useState(null)

  const fileInputRef = useRef()
  const file1InputRef = useRef()
  // help
  const handleFileUpload = (event) => {
    setFileContent(null)
    setSelectedCup(null)
    const file = event.target.files[0]
    // console.log('File', file, file.name)
    //https://programacion.net/articulo/validar_la_extension_de_un_fichero_con_javascript_1799

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
        // Dividir la fecha hora en dos campos
        //   options.map((array) => {
        //     let [fecha, tiempo] = array[1].split(' ')
        //     const [hora] = tiempo.split(':')
        //     if (hora === '00') {
        //       // Hace que la hora 00 sea del dia anterior
        //       let date = fecha.split('/')
        //       let dia = new Date(date[2], date[1] - 1, date[0], 0, 0, 0, 0)
        //       dia = new Date(dia.getTime() - 24 * 60 * 60 * 1000)
        //       let d = dia.getDate()
        //       let m = dia.getMonth() + 1

        //       if (d < 10) {
        //         d = '0' + d
        //       }
        //       if (m < 10) {
        //         m = '0' + m
        //       }
        //       fecha = d + '/' + m + '/' + dia.getFullYear()
        //       //console.log('FEcha', fecha)
        //     }
        //     array.splice(1, 1, fecha, hora)
        //   })

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
      // FICHERO CSV
      const reader = new FileReader()

      reader.onloadend = () => {
        //       Este fichero tiene CUPS	Fecha	Hora	Consumo_KWh	Metodo_obtencion

        let lines = reader.result.split('\n').slice(1) // Omitir la primera línea
        lines = lines.filter((line) => line.trim() !== '') // Eliminar líneas vacías
        const options = lines.map((line) => line.replace(/\r/, '').split(';'))
        // Dividir la fecha hora en dos campos
        //   options.map((array) => {
        //     let [fecha, tiempo] = array[1].split(' ')
        //     const [hora] = tiempo.split(':')
        //     if (hora === '00') {
        //       // Hace que la hora 00 sea del dia anterior
        //       let date = fecha.split('/')
        //       let dia = new Date(date[2], date[1] - 1, date[0], 0, 0, 0, 0)
        //       dia = new Date(dia.getTime() - 24 * 60 * 60 * 1000)
        //       let d = dia.getDate()
        //       let m = dia.getMonth() + 1

        //       if (d < 10) {
        //         d = '0' + d
        //       }
        //       if (m < 10) {
        //         m = '0' + m
        //       }
        //       fecha = d + '/' + m + '/' + dia.getFullYear()
        //       //console.log('FEcha', fecha)
        //     }
        //     array.splice(1, 1, fecha, hora)
        //   })

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
    //console.log('Cleinte', cliente)
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
      if (!datosFiltrados || !selectedCup || !file1Content) return []
      let color
      let misDatos = []
      let miDia = {}
      let periodo = ''
      //console.log('Datos filtrados', datosFiltrados)

      datosFiltrados.reduce((acc, curr, i) => {
        const [name, fecha, hour, activa, ...rest] = curr
        //console.log('fato', curr)

        periodo = buscarP(fecha, hour)
        //console.log('Fecha: ', fecha, periodo)
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

        if (!miDia.name || name !== miDia.name) {
          miDia.name = name
          miDia.date = fecha
        }

        if (hour === '1') {
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
          misDatos.push(miDia)

          miDia = {}
        }

        //console.log('Mis datos1', misDatos)
        // setTratatedInfo(misDatos)
        return acc
      }, [])
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

    // let tratados = tratarInfo()
    // setTratatedInfo(tratados)
  }, [datosFiltrados, file1Content, fileContent, selectedCup])

  useEffect(() => {
    let resumen = []
    let acc = {}
    const tablaTotal = () => {
      if (!tratatedInfo) return []
      //console.log('Tratated info', tratatedInfo)
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
        //  console.log('El obj', obj)

        for (let i = 0; i <= 23; i++) {
          const periodo = obj[`_${i.toString().padStart(2, '0')}`].Periodo
          let activa = obj[`_${i.toString().padStart(2, '0')}`].Activa
          let reactiva = obj[`_${i.toString().padStart(2, '0')}`].Reactiva
          //const activa = activaC.split(',').join('.')
          //const reactiva = reactivaC.split(',').join('.')
          //activa = +activa.replace(',', '.')
          //reactiva = +reactiva.replace(',', '.')
          //const activa = Number(activaC.split(',').join('.'))
          //const reactiva = Number(reactivaC.split(',').join('.'))
          // console.log(
          //   'Periodo ',
          //   periodo,
          //   'Activa ',
          //   activa,
          //   typeof activa,
          //   'Reactiva: ',
          //   reactiva
          // )
          //const potencia = obj[`_${i.toString().padStart(2, '0')}`].Potencia

          if (periodo === 'P1') {
            //console.log('Es P1', activa)
            acc[`Activa-1`] += +activa.replace(',', '.')
            acc[`Reactiva-1`] += +reactiva.replace(',', '.')
            acc[`Potencia-1`] = Math.max(
              acc[`Potencia-1`],
              activa.replace(',', '.')
            )
          }

          if (periodo === 'P2') {
            acc[`Activa-2`] += +activa.replace(',', '.')
            acc[`Reactiva-2`] += +reactiva.replace(',', '.')
            acc[`Potencia-2`] = Math.max(
              acc[`Potencia-2`],
              activa.replace(',', '.')
            )
          }

          if (periodo === 'P3') {
            //vigia.push(+activa.replace(',', '.'))
            acc[`Activa-3`] += +activa.replace(',', '.')
            acc[`Reactiva-3`] += +reactiva.replace(',', '.')
            acc[`Potencia-3`] = Math.max(
              acc[`Potencia-3`],
              activa.replace(',', '.')
            )
          }

          if (periodo === 'P4') {
            acc[`Activa-4`] += +activa.replace(',', '.')
            acc[`Reactiva-4`] += +reactiva.replace(',', '.')
            acc[`Potencia-4`] = Math.max(
              acc[`Potencia-4`],
              activa.replace(',', '.')
            )
          }

          if (periodo === 'P5') {
            acc[`Activa-5`] += +activa.replace(',', '.')
            acc[`Reactiva-5`] += +reactiva.replace(',', '.')
            acc[`Potencia-5`] = Math.max(
              acc[`Potencia-5`],
              activa.replace(',', '.')
            )
          }

          if (periodo === 'P6') {
            acc[`Activa-6`] += +activa.replace(',', '.')
            acc[`Reactiva-6`] += +reactiva.replace(',', '.')
            acc[`Potencia-6`] = Math.max(
              acc[`Potencia-6`],
              activa.replace(',', '.')
            )
          }
        }
        //console.log('Datos ', acc.date, '  ', vigia)
        //console.log('acc', acc)

        resumen.push(acc)
        return acc
      })
      return arrayResumen
    }
    let pp = tablaTotal()
    //console.log('Datos por dia: tabla total', pp)
    //Genera un array con objetos por día, con el resumen por día de activa-1, activa-2...activa-6, reactiva-1, reactiva-2,...,reactiva-6... potencia-1-6
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

      function redondear(num, decimales = 3) {
        var signo = num >= 0 ? 1 : -1
        num = num * signo
        if (decimales === 0)
          //con 0 decimales
          return signo * Math.round(num)
        // round(x * 10 ^ decimales)
        num = num.toString().split('e')
        num = Math.round(
          +(num[0] + 'e' + (num[1] ? +num[1] + decimales : decimales))
        )
        // x * 10 ^ (-decimales)
        num = num.toString().split('e')
        return (
          signo * (num[0] + 'e' + (num[1] ? +num[1] - decimales : -decimales))
        )
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
        //  console.log('Dia', dia)
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
          encontrado['Activa-1'] += +dia['Activa-1']
          encontrado['Activa-2'] += +dia['Activa-2']
          encontrado['Activa-3'] += +dia['Activa-3']
          encontrado['Activa-4'] += +dia['Activa-4']
          encontrado['Activa-5'] += +dia['Activa-5']
          encontrado['Activa-6'] += +dia['Activa-6']
          encontrado['Reactiva-1'] += +dia['Reactiva-1']
          encontrado['Reactiva-2'] += +dia['Reactiva-2']
          encontrado['Reactiva-3'] += +dia['Reactiva-3']
          encontrado['Reactiva-4'] += +dia['Reactiva-4']
          encontrado['Reactiva-5'] += +dia['Reactiva-5']
          encontrado['Reactiva-6'] += +dia['Reactiva-6']
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

        //  console.log('resumenmes', resumenMes)
      })
      //console.log('Resumen Mes', resumenMes)
      return resumenMes
    }
    let s = resumenMesTablaTotal()
    //console.log('Resumen meS', s)
    setResumenMesTablaTotal(s)
    s.forEach((mes) => {
      //console.log('Mes44', mes)
      mes['Activa-1'] = redondear(mes['Activa-1'])
      mes['Activa-2'] = redondear(mes['Activa-2'])
      mes['Activa-3'] = redondear(mes['Activa-3'])
      mes['Activa-4'] = redondear(mes['Activa-4'])
      mes['Activa-5'] = redondear(mes['Activa-5'])
      mes['Activa-6'] = redondear(mes['Activa-6'])
      mes['Reactiva-1'] = redondear(mes['Reactiva-1'])
      mes['Reactiva-2'] = redondear(mes['Reactiva-2'])
      mes['Reactiva-3'] = redondear(mes['Reactiva-3'])
      mes['Reactiva-4'] = redondear(mes['Reactiva-4'])
      mes['Reactiva-5'] = redondear(mes['Reactiva-5'])
      mes['Reactiva-6'] = redondear(mes['Reactiva-6'])
      //console.log('M3s 33', mes)
    })
  }, [tablaTotal, tratatedInfo])

  useEffect(() => {
    const isTermined = () => {
      if (!resumenMesTablaTotal) return false
      return true
    }
    let d = isTermined()
    setIsTermined(d)
  }, [resumenMesTablaTotal, cliente])

  useEffect(() => {
    //console.log('La tabla Inicial', resumenMesTablaTotal)

    const isExceded = () => {
      if (!resumenMesTablaTotal || !cliente) return false

      let excesos = []
      let copiaMes = {}
      resumenMesTablaTotal.map((mes) => {
        copiaMes = { ...mes }

        copiaMes['Potencia-1'] > cliente.condiciones?.P1
          ? copiaMes['Potencia-1']
          : (copiaMes['Potencia-1'] = '')
        copiaMes['Potencia-2'] > cliente.condiciones?.P2
          ? copiaMes['Potencia-2']
          : (copiaMes['Potencia-2'] = '')
        copiaMes['Potencia-3'] > cliente.condiciones?.P3
          ? copiaMes['Potencia-3']
          : (copiaMes['Potencia-3'] = '')
        copiaMes['Potencia-4'] > cliente.condiciones?.P4
          ? copiaMes['Potencia-4']
          : (copiaMes['Potencia-4'] = '')
        copiaMes['Potencia-5'] > cliente.condiciones?.P5
          ? copiaMes['Potencia-5']
          : (copiaMes['Potencia-5'] = '')
        copiaMes['Potencia-6'] > cliente.condiciones?.P6
          ? copiaMes['Potencia-6']
          : (copiaMes['Potencia-6'] = '')
        excesos.push(copiaMes)
      })
      return excesos
    }
    let s = isExceded()
    //console.log('LOS EXCESOS', s)
    //console.log('La tabla', resumenMesTablaTotal)
    setExcesoPot(s)
  }, [resumenMesTablaTotal, cliente])

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
            id="fileInput"
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
      </div>
      <>
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
          <div className="activa flex flex-row justify-center">
            <CrearTablaResumenMes
              data={resumenMesTablaTotal}
              data2={tablaTotal}
              campo={'Activa'}
            />
          </div>
          <div className="reactiva flex flex-row justify-around gap-10">
            <CrearTablaResumenMes
              data={resumenMesTablaTotal}
              data2={tablaTotal}
              campo={'Reactiva'}
            />
            <CrearTablaResumenMes
              data={resumenMesTablaTotal}
              data2={tablaTotal}
              campo={'ReactivaFact'}
            />
          </div>
          <div className="potencia flex flex-row justify-around gap-20">
            <CrearTablaResumenMes
              data={resumenMesTablaTotal}
              data2={tablaTotal}
              campo={'Potencia'}
            />
            <CrearTablaResumenMes
              data={excesoPot}
              data2={tablaTotal}
              campo={'PotenciaFact'}
            />
          </div>
        </div>
      )}
    </div>
  )
}
FenosaFileComponent.propTypes = {
  datos: PropTypes.array,
  onDatosRecibidos: PropTypes.func,
}

export default FenosaFileComponent
