import React, { useEffect, useState } from 'react'
import './Weeks.css'
import { IWeek } from '../../interfaces'

//три отрезка: прошлые недели, текущая и будущие
//если есть прошлые не подтв недели, то отображать их (пропуски - пустые квадраты) красная рамка
//если есть будущие недели, то отображать их (пропуски - пустые квадраты) зеленая/серая рамки
//сравнивать дату встречи в текущей недели с таймстемпом текущего времени для перевода
//     в подтверждение выступлений
//в центре квадрат с текущей неделей, для наглядности количества запланированных недель
//при нажатии на неделю отправлять эту неделю на редактирование и подсвечивать...

interface IProps {
  calendarDateOfMeet?: string
}

const Weeks: React.FC<IProps> = ({ calendarDateOfMeet }) => {
  const [allWeeks, setAllWeeks] = useState<Array<IWeek> | undefined>()
  useEffect(() => {
    getAllWeeks()
  }, [])

  const getAllWeeks = async () => {
    const weeksFromBD = await window.api.getAllWeeks()
    if (weeksFromBD.data) {
      // Функция для получения таймстемпа начала понедельника для конкретной недели
      function getMondayTimestamp(date: Date) {
        const dayOfWeek = date.getDay() // Получаем день недели (0 - воскресенье, 1 - понедельник, и так далее)
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Рассчитываем разницу для получения понедельника
        const monday = new Date(date.setDate(diff)) // Устанавливаем новую дату с учетом разницы
        monday.setHours(0, 0, 0, 0) // Устанавливаем время начала дня
        return monday.getTime() // Возвращаем таймстемп
      }

      // Функция для получения таймстемпов начала понедельников будущих  и прошлых 10 недель
      function getMondayTimestamps() {
        const now = new Date()
        const currentMonday = getMondayTimestamp(now)

        const pastMondays = Array.from({ length: 10 }, (_, index) => {
          const date = new Date(currentMonday)
          date.setDate(date.getDate() - 7 * (index + 1)) // Вычитаем 7 дней для каждой предыдущей недели
          return getMondayTimestamp(date)
        })

        const futureMondays = Array.from({ length: 10 }, (_, index) => {
          const date = new Date(currentMonday)
          date.setDate(date.getDate() + 7 * (index + 1))
          return getMondayTimestamp(date)
        })

        const currentMoment = Date.now()

        return {
          currentMoment,
          currentMonday,
          pastMondays,
          futureMondays,
        }
      }

      const timestamps = getMondayTimestamps()
      console.log('Текущий момент:', timestamps.currentMoment)
      console.log('Текущий понедельник:', timestamps.currentMonday)
      console.log('Прошлые 10 понедельников:', timestamps.pastMondays)
      console.log('Будущие 10 понедельников:', timestamps.futureMondays)

      setAllWeeks(weeksFromBD.data)
      console.log('allWeeks', weeksFromBD.data)
    }
  }

  return (
    <div>
      {allWeeks && (
        <div>
          <div>I have found in DB</div>
          {allWeeks.map((week) => (
            <div key={week.dateOfMeet}>{week.dateOfMeet}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Weeks
