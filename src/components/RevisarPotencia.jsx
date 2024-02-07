import PropTypes from 'prop-types'

const RevisarPotencia = ({ data, name }) => {
  //const { data, name } = props

  console.log('desde revusar', data, 'NAme')
  return (
    <div className="h-1.5">
      <pre></pre>
    </div>
  )
}

RevisarPotencia.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string || '',
}

export default RevisarPotencia
