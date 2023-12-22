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
  timeEndOfMeet: string
  makeAMeet: (dateOfMeet: string) => void
  activeDate: string | undefined
}

interface IEmptyWeek extends Pick<IWeek, 'dateOfMeet' | 'startWeekTSt'> {}

const Weeks: React.FC<IProps> = ({
  calendarDateOfMeet,
  timeEndOfMeet,
  makeAMeet,
  activeDate,
}) => {
  const [previousWeeks, setPreviousWeeks] = useState<Array<IWeek> | undefined>()
  const [currentWeek, setCurrentWeek] = useState<
    IWeek | IEmptyWeek | undefined
  >()
  const [currWeekPerf, setCurrWeekPerf] = useState(false)
  const [futureWeeks, setFututureWeeks] = useState<
    Array<IWeek | IEmptyWeek> | undefined
  >()

  useEffect(() => {
    getAllWeeks()
  }, [calendarDateOfMeet])

  const compareDates = () => {
    if (currentWeek) {
      const [year, month, day] = currentWeek.dateOfMeet.split('-').map(Number)
      const [hour, minute] = timeEndOfMeet.split(':').map(Number)
      const dateObject = new Date(year, month - 1, day, hour, minute)
      const curWeekEndOfMeetTSt = dateObject.getTime()
      const currentMoment = Date.now()
      if (curWeekEndOfMeetTSt >= currentMoment) {
        console.log('not yet')
        return curWeekEndOfMeetTSt - currentMoment
      }
      console.log('yeaaah!')
    }
    return 86400000
  }

  useEffect(() => {
    const nextCheck = compareDates()
    console.log('ill be back in ', nextCheck)
    const timerId = setInterval(() => {
      compareDates()
    }, nextCheck)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  const getAllWeeks = async () => {
    const weeksFromBD = await window.api.getAllWeeks()
    console.log('allWeeks', weeksFromBD.data)
    if (weeksFromBD.data) {
      // Функция для получения таймстемпа начала понедельника для конкретной недели
      function getMondayTimestamp(date: Date) {
        const dayOfWeek = date.getDay() // Получаем день недели (0 - воскресенье, 1 - понедельник, и так далее)
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Рассчитываем разницу для получения понедельника
        const monday = new Date(date.setDate(diff)) // Устанавливаем новую дату с учетом разницы
        monday.setHours(0, 0, 0, 0) // Устанавливаем время начала дня
        return monday.getTime() // Возвращаем таймстемп
      }

      // Функция для получения таймстемпов начала понедельников будущих и прошлых 10 недель
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
      // console.log('Текущий момент:', timestamps.currentMoment)
      // console.log('Текущий понедельник:', timestamps.currentMonday)
      // console.log('Прошлые 10 понедельников:', timestamps.pastMondays)
      // console.log('Будущие 10 понедельников:', timestamps.futureMondays)

      const curWeek = weeksFromBD.data.find(
        (week) => week.startWeekTSt === timestamps.currentMonday
      )

      if (curWeek) {
        setCurrentWeek(curWeek)
      } else {
        setCurrentWeek({
          dateOfMeet: 'empty',
          startWeekTSt: timestamps.currentMonday,
        })
      }

      let prevWeeks: Array<IWeek> = []
      let futWeeks: Array<IWeek> = []

      weeksFromBD.data.forEach((week) => {
        if (week.startWeekTSt < timestamps.currentMonday) {
          prevWeeks.push(week)
        }
        if (week.startWeekTSt > timestamps.currentMonday) {
          futWeeks.push(week)
        }
      })

      let futureWeeks: Array<IWeek | IEmptyWeek> = []

      timestamps.futureMondays.forEach((futureMondaysTSt) => {
        const result = futWeeks.find(
          (week) => week.startWeekTSt === futureMondaysTSt
        )
        if (result) {
          futureWeeks.push(result)
        } else {
          futureWeeks.push({
            dateOfMeet: 'empty',
            startWeekTSt: futureMondaysTSt,
          })
        }
      })

      if (prevWeeks.length) {
        setPreviousWeeks(prevWeeks)
      }
      if (futureWeeks.length) {
        setFututureWeeks(futureWeeks)
      }
    }
  }

  return (
    <div className="allWeeks">
      {previousWeeks && (
        <div>
          <div>past</div>
          <div className="weeks">
            {previousWeeks.map((week) => (
              <div
                className={`oneWeek orange ${
                  activeDate === week.dateOfMeet ? 'active' : ''
                }`}
                key={week.startWeekTSt}
                onClick={() => makeAMeet(week.dateOfMeet)}
              >
                {week.dateOfMeet}
              </div>
            ))}
          </div>
        </div>
      )}
      {currentWeek && (
        <div>
          <div>current</div>
          <div className="weeks">
            <div
              className={`oneWeek ${
                currentWeek.dateOfMeet === 'empty' ? 'gray' : ''
              } ${currWeekPerf ? 'orange' : ''}
                 ${activeDate === currentWeek.dateOfMeet ? 'active' : ''}`}
              onClick={() => makeAMeet(currentWeek.dateOfMeet)}
            >
              {currentWeek.dateOfMeet}
            </div>
          </div>
        </div>
      )}
      {futureWeeks && (
        <div>
          <div>future</div>
          <div className="weeks">
            {futureWeeks.map((week) => (
              <div
                className={`oneWeek ${
                  week.dateOfMeet === 'empty' ? 'gray' : ''
                } ${currWeekPerf ? 'orange' : ''}
                   ${activeDate === week.dateOfMeet ? 'active' : ''}`}
                key={week.startWeekTSt}
                onClick={() => makeAMeet(week.dateOfMeet)}
              >
                {week.dateOfMeet}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Weeks
