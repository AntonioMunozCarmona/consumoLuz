import PropTypes from 'prop-types'
import CrearTabla from './CrearTabla'
import CrearTablaResumen from './CrearTablaResumen'

const TratarInfo = (props) => {
  const { data } = props
  let color
  let misDatos = []
  let miDia = {}
  const result = data.reduce((acc, curr) => {
    const [name, date, hour, ...rest] = curr

    if (rest[13] === 'P1') {
      color = '#ff0000'
    } else if (rest[13] === 'P2') {
      color = '#ff9900'
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
      miDia.hour = hour
    }
    if (hour === '0:00') {
      miDia._00 = hourData
    }
    if (hour === '1:00') {
      miDia._01 = hourData
    }
    if (hour === '2:00') {
      miDia._02 = hourData
    }
    if (hour === '3:00') {
      miDia._03 = hourData
    }
    if (hour === '4:00') {
      miDia._04 = hourData
    }
    if (hour === '5:00') {
      miDia._05 = hourData
    }
    if (hour === '6:00') {
      miDia._06 = hourData
    }
    if (hour === '7:00') {
      miDia._07 = hourData
    }
    if (hour === '8:00') {
      miDia._08 = hourData
    }
    if (hour === '9:00') {
      miDia._09 = hourData
    }
    if (hour === '10:00') {
      miDia._10 = hourData
    }
    if (hour === '11:00') {
      miDia._11 = hourData
    }
    if (hour === '12:00') {
      miDia._12 = hourData
    }
    if (hour === '13:00') {
      miDia._13 = hourData
    }
    if (hour === '14:00') {
      miDia._14 = hourData
    }
    if (hour === '15:00') {
      miDia._15 = hourData
    }
    if (hour === '16:00') {
      miDia._16 = hourData
    }
    if (hour === '17:00') {
      miDia._17 = hourData
    }
    if (hour === '18:00') {
      miDia._18 = hourData
    }
    if (hour === '19:00') {
      miDia._19 = hourData
    }
    if (hour === '20:00') {
      miDia._20 = hourData
    }
    if (hour === '21:00') {
      miDia._21 = hourData
    }
    if (hour === '22:00') {
      miDia._22 = hourData
    }
    if (hour === '23:00') {
      miDia._23 = hourData
      misDatos.push(miDia)
      miDia = {}
    }

    //const dateObj = new Date(date)
    //const dateString = dateObj.toLocaleDateString()
    //const hourString = `${i.toString().padStart(2, '0')}`
    // for (let i = 0; i < 24; i++) {
    //   if (!acc[i]) {
    //     acc[i] = {}
    //   }

    //   acc[i] = {
    //     ...acc[i],
    //     name,
    //     date: dateString,
    //     [hourString]: hourData,
    //   }
    // }

    return acc
  }, [])
  console.log('Mis datos: ', misDatos)
  return (
    <div>
      <CrearTabla data={misDatos} />
      <CrearTablaResumen data={misDatos} />

      {/* <pre>{JSON.stringify(misDatos, null, 2)}</pre> */}
    </div>
  )
}
TratarInfo.propTypes = {
  data: PropTypes.array,
}

export default TratarInfo
