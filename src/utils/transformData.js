const transformData = (data) => {
  // Crear un objeto para almacenar los datos transformados
  const transformedData = {}

  // Iterar sobre cada array en los datos de entrada
  data.forEach((arr) => {
    // Extraer los elementos relevantes
    const cup = arr[0]
    const fecha = arr[1]
    const hora = arr[2]
    const values = [arr[3], arr[7], arr[15], arr[16]]

    // Crear una clave única para cada combinación de CUP y fecha
    const key = `${cup}-${fecha}`

    // Si la clave no existe en los datos transformados, añadirla
    if (!transformedData[key]) {
      transformedData[key] = {
        cup,
        fecha,
        horas: {},
      }
    }

    // Añadir los valores a la hora correspondiente
    transformedData[key].horas[hora] = values
  })

  // Convertir los datos transformados a un array
  return Object.values(transformedData)
}

// Uso de la función
const data = [
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '0:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '1:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '2:00',
    '1',
    '16',
    '0',
    '16',
    '2',
    '16',
    '0',
    '16',
    '0',
    '16',
    '0',
    '16',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '3:00',
    '2',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.70710678118655',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '4:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '5:00',
    '1',
    '0',
    '0',
    '0',
    '1',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.70710678118655',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '6:00',
    '2',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.70710678118655',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '7:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '8:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '9:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '10:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '11:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '12:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '13:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '14:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '15:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '16:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '17:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '18:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '19:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '20:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '21:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '22:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '05/09/2023',
    '23:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '0:00',
    '2',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.70710678118655',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '1:00',
    '1',
    '0',
    '0',
    '0',
    '1',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.70710678118655',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '2:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '3:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '4:00',
    '2',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.70710678118655',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '5:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '6:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '7:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '8:00',
    '2',
    '0',
    '0',
    '0',
    '1',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.89442719099992',
    'P6\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '9:00',
    '0',
    '0',
    '0',
    '0',
    '1',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '10:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '11:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '12:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '13:00',
    '12',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '14:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '15:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '16:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '17:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '18:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P4\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '19:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '20:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '21:00',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '1',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '22:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P3\r',
  ],
  [
    'ES0031105265581001ZC',
    '06/09/2023',
    '23:00',
    '1',
    '0',
    '0',
    '0',
    '2',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0.44721359549996',
    'P4\r',
  ],
]
const transformedData = transformData(data)
console.log(transformedData)
