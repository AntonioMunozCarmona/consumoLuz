import PropTypes from 'prop-types'
import CrearTabla from './CrearTabla'
import CrearTablaResumen from './CrearTablaResumen'
import CrearTablaResumenDia from './CrearTablaResumenDia'

const TratarInfo = (props) => {
  const { data } = props
  //console.log('DATA', data)
  let color
  let misDatos = []
  let miDia = {}
  const result = data.reduce((acc, curr) => {
    const [name, date, hour, ...rest] = curr

    if (rest[13] === 'P1') {
      color = '#ff0000'
    } else if (rest[13] === 'P2') {
      color = '#e568ed'
    } else if (rest[13] === 'P3') {
      color = '#ffff00'
    } else if (rest[13] === 'P4') {
      color = '#003366'
    } else if (rest[13] === 'P5') {
      color = '#1f82ce'
    } else if (rest[13] === 'P6') {
      color = '#04fb04'
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

      misDatos.push(miDia)
      miDia = {}
    }

    return acc
  }, [])
  //console.log('Mis datos:', misDatos)
  return (
    <div>
      <CrearTabla data={misDatos} campo={'Activa'} />
      <CrearTabla data={misDatos} campo={'Reactiva'} />
      <CrearTabla data={misDatos} campo={'Potencia'} />
      <CrearTablaResumenDia data={misDatos} />
      <CrearTablaResumen data={misDatos} />
    </div>
  )
}
TratarInfo.propTypes = {
  data: PropTypes.array,
}

export default TratarInfo
