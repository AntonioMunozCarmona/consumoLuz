import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const FileInputComponent = ({ onDatosRecibidos }) => {
  const [fileContent, setFileContent] = useState(null)
  const [selectedCup, setSelectedCup] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const fileInputRef = useRef()

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      let lines = reader.result.split('\n').slice(1) // Omitir la primera línea
      lines = lines.filter((line) => line.trim() !== '') // Eliminar líneas vacías
      const options = lines.map((line) => line.replace(/\r/, '').split(';'))
      // Dividir la fecha hora en dos campos
      options.map((array) => {
        const [fecha, tiempo] = array[1].split(' ')
        const [hora] = tiempo.split(':')
        array.splice(1, 1, fecha, hora)
      })

      setFileContent(options)
    }

    reader.readAsText(file)
  }

  const getCupsOptions = () => {
    if (!fileContent) return []
    const cupsSet = new Set()
    //console.log('Filrcontent', fileContent)
    fileContent.forEach((arr) => cupsSet.add(arr[0]))
    return Array.from(cupsSet)
  }

  const handleCupSelect = (event) => {
    setSelectedCup(event.target.value)
    setStartDate(null) // Restablecer la fecha de inicio
    setEndDate(null) // Restablecer la fecha final
  }

  const handleStartDateSelect = (event) => {
    const date = event.target.value
    setStartDate(date)
    console.log(`Fecha de inicio seleccionada: ${date}`)
  }

  const handleEndDateSelect = (event) => {
    const date = event.target.value
    setEndDate(date)
    console.log(`Fecha final seleccionada: ${date}`)
  }

  const getDateRange = () => {
    if (!fileContent || !selectedCup) return [null, null]

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

    return [
      minDate.toISOString().split('T')[0],
      maxDate.toISOString().split('T')[0],
    ]
  }

  useEffect(() => {
    const getFilteredData = () => {
      if (!fileContent || !selectedCup || !startDate || !endDate) return []

      const [startYear, startMonth, startDay] = startDate.split('-')
      const [endYear, endMonth, endDay] = endDate.split('-')

      const startDateObj = new Date(
        Date.UTC(startYear, startMonth - 1, startDay)
      )
      const endDateObj = new Date(Date.UTC(endYear, endMonth - 1, endDay))

      return fileContent.filter((arr) => {
        const [day, month, year] = arr[1].split('/')
        const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0))

        return (
          arr[0] === selectedCup && date >= startDateObj && date <= endDateObj
        )
      })
    }

    if (startDate && endDate) {
      console.log(`Rango de fechas: ${startDate} - ${endDate}`)
      const filteredData = getFilteredData()

      onDatosRecibidos(filteredData)
    }
  }, [startDate, endDate, fileContent, selectedCup])

  const [minDate, maxDate] = getDateRange()

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="fileInput"
      >
        Upload file
      </label>
      <input
        className="block w-full lg:w-3/5 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="fileInput"
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
      ></input>

      {fileContent && (
        <>
          <label
            htmlFor="cups"
            className="block mb-2 text-sm text-gray-700 font-medium"
          >
            Selecciona una CUP
          </label>
          <select
            id="cups"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-4/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleCupSelect}
          >
            {getCupsOptions().map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          {selectedCup && (
            <>
              <label className="m-2">Fecha de inicio:</label>
              <input
                type="date"
                className="inputdata m-2"
                min={minDate}
                max={maxDate}
                value={startDate || maxDate}
                onChange={handleStartDateSelect}
              />
              {startDate && (
                <>
                  <label className="m-2 ml-5">Fecha final:</label>
                  <input
                    type="date"
                    className="inputdata m-2"
                    min={minDate}
                    max={maxDate}
                    value={endDate || maxDate}
                    onChange={handleEndDateSelect}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
FileInputComponent.propTypes = {
  onDatosRecibidos: PropTypes.func,
}

export default FileInputComponent
