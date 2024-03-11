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

const FenosaTratarInfo = (props) => {
  const { data } = props
  if (!data) return
  //console.log('DATA', data)

  let misDatos = []

  //console.log('Mis datos:', misDatos)
  // Comprobar que existen todas las fechas
  let fechas = []
  data.map((dato) => fechas.push(dato.date))
  // console.log('Fechas', fechas)
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
  misDatos.push(...data)
  misDatos.sort((a, b) => {
    return convertirFecha(a.date) - convertirFecha(b.date)
  })
  //console.log('Mis datos ', misDatos)

  return (
    <div>
      <CrearTabla data={misDatos} campo={'Activa'} />
      <CrearTabla data={misDatos} campo={'Reactiva'} />

      <CrearTablaResumenDia data={misDatos} campo={'Activa'} />
      <CrearTablaResumenDia data={misDatos} campo={'Reactiva'} />

      <CrearTablaResumen data={misDatos} />
    </div>
  )
}

FenosaTratarInfo.propTypes = {
  data: PropTypes.array,
}

export default FenosaTratarInfo
