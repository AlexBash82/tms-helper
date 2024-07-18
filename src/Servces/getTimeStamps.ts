//dateOfMeet - дата в формате '2024-01-10'
//timeEndOfMeet - время в формате '21:45'
export function getTimeStamps(
  dateOfMeet: string,
  timeEndOfMeet: string
): { timeStampInp: number; timestampNow: number } {
  const [year, month, day] = dateOfMeet.split('-').map(Number)
  const [hour, minute] = timeEndOfMeet.split(':').map(Number)

  const dateObject = new Date(year, month - 1, day, hour, minute)
  // Получаем метку времени даты выбранной в календаре и сейчас
  const timeStampInp = dateObject.getTime()
  const timestampNow = Date.now()

  return { timeStampInp, timestampNow }
}
