import PropTypes from 'prop-types'
import CrearTabla from './CrearTabla'
import CrearTablaResumen from './CrearTablaResumen'
import CrearTablaResumenDia from './CrearTablaResumenDia'
import { horas, colores } from '../utils/constantes'

function convertirFecha(fechaString) {
  if (!fechaString) return

  let [dia, mes, anio] = fechaString.split('/')

  return new Date(+anio, mes - 1, +dia)
}

const TratarInfo = (props) => {
  const { data } = props
  // console.log('DATA', data)
  let color
  let misDatos = []
  let miDia = {}
  const result = data.reduce((acc, curr) => {
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
            Activa: '0',
            Reactiva: '0',
            Potencia: '0',
            Periodo: 'ND',
            Color: colores.ND,
          }
        }
      })
      misDatos.push(miDia)
      miDia = {}
    }

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
  //console.log('Mis Datos REsumen dia', misDatos)

  return (
    <div>
      <CrearTabla data={misDatos} campo={'Activa'} />
      <CrearTabla data={misDatos} campo={'Reactiva'} />
      <CrearTabla data={misDatos} campo={'Potencia'} />
      <CrearTablaResumenDia data={misDatos} campo={'Activa'} />
      <CrearTablaResumenDia data={misDatos} campo={'Reactiva'} />
      <CrearTablaResumenDia data={misDatos} campo={'Potencia'} />
      <CrearTablaResumen data={misDatos} />
    </div>
  )
}
TratarInfo.propTypes = {
  data: PropTypes.array,
}

export default TratarInfo
