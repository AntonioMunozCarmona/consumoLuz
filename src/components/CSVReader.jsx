import React, { useState } from 'react'
import CSVReader from 'react-csv-reader'

const CSVReaderComponent = ({ onDataLoaded }) => {
  const [data, setData] = useState([])

  const handleData = (data) => {
    setData(data)
    onDataLoaded(data)
  }

  return (
    <CSVReader
      onFileLoaded={handleData}
      parserOptions={{ header: true, skipEmptyLines: true }}
    />
  )
}

export default CSVReaderComponent
