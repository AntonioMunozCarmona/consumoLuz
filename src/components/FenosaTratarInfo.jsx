import PropTypes from 'prop-types'
import CrearTabla from './CrearTabla'
import CrearTablaResumen from './CrearTablaResumen'
import CrearTablaResumenDia from './CrearTablaResumenDia'

const FenosaTratarInfo = (props) => {
  const { data } = props
  if (!data) return
  //console.log('DATA', data)

  const misDatos = data
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
