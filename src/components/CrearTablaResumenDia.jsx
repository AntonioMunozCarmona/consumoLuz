import PropTypes from 'prop-types'

const CrearTablaResumenDia = (props) => {
  const { data } = props
  console.log('Esta es la data: ', data)
  const resumen = data.map((obj) => {
    const resumenObj = {
      fecha: obj.date,
      'Activa-1': parseInt(obj._00.Activa),
      'Activa-2': parseInt(obj._01.Activa),
      'Activa-3': parseInt(obj._02.Activa),
      'Activa-4': parseInt(obj._03.Activa),
      'Activa-5': parseInt(obj._04.Activa),
      'Activa-6': parseInt(obj._05.Activa),
      'Reactiva-1': parseInt(obj._00.Reactiva),
      'Reactiva-2': parseInt(obj._01.Reactiva),
      'Reactiva-3': parseInt(obj._02.Reactiva),
      'Reactiva-4': parseInt(obj._03.Reactiva),
      'Reactiva-5': parseInt(obj._04.Reactiva),
      'Reactiva-6': parseInt(obj._05.Reactiva),
      'Potencia-1': parseFloat(obj._00.Potencia),
      'Potencia-2': parseFloat(obj._01.Potencia),
      'Potencia-3': parseFloat(obj._02.Potencia),
      'Potencia-4': parseFloat(obj._03.Potencia),
      'Potencia-5': parseFloat(obj._04.Potencia),
      'Potencia-6': parseFloat(obj._05.Potencia),
      'Per-1': obj._00.Periodo === 'P1' ? 1 : 0,
      'Per-2': obj._01.Periodo === 'P1' ? 1 : 0,
      'Per-3': obj._02.Periodo === 'P1' ? 1 : 0,
      'Per-4': obj._03.Periodo === 'P1' ? 1 : 0,
      'Per-5': obj._04.Periodo === 'P1' ? 1 : 0,
      'Per-6': obj._05.Periodo === 'P1' ? 1 : 0,
    }

    console.log(resumenObj)
    return resumenObj
  })
}

CrearTablaResumenDia.propTypes = {
  data: PropTypes.array,
}
export default CrearTablaResumenDia
