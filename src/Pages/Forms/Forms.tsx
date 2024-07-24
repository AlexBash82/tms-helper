import React, { useEffect, useState } from 'react'
import './Forms.css'
import { IWeek } from '../../interfaces'
import BlankForm from './Components/BlankForm/BlankForm'

interface IProps {}

interface IFilled {
  name: string
  portner: string
  dateOf: string
  task: number
  mainHall: boolean
}

const Forms: React.FC<IProps> = ({}) => {
  const [allWeeks, setAllWeeks] = useState<IWeek[] | undefined>()
  const [filledForms, setFilledForms] = useState<IFilled[] | undefined>()

  const getPlannedWeek = async () => {
    const weeksFromBD = await window.api.getAllWeeks()
    if (weeksFromBD.success) {
      setAllWeeks(weeksFromBD.data)
    }
  }

  useEffect(() => {
    getPlannedWeek()
  }, [])

  const chooseThisWeek = (week: IWeek) => {
    console.log('week', week)

    //получить все имена и сделать из наих массив объектов - задание, имя и номер задания

    const extractKeysAndValues = (
      oneWeek: IWeek
    ): { [key: string]: { name: string; _id: string } }[] => {
      return Object.entries(oneWeek)
        .filter(
          ([key, value]) =>
            (key.endsWith('MC') || key.endsWith('SC')) && value !== null
        )
        .map(([key, value]) => ({ [key]: value }))
    }

    const arr = extractKeysAndValues(week)

    console.log('arr', arr)
    //пробежаться по массиву и сформировать массив бланков, закинуть его в стейт

    const filledForm = {
      dateOf: week.dateOfMeet,
    }
  }

  const info = {
    name: 'Василий Жабов',
    portner: 'Михаил Светлый',
    dateOf: 'Апрель 02',
    task: 3,
    mainHall: true,
  }

  return (
    <div>
      <div>You have planned these weeks</div>
      {allWeeks !== undefined ? (
        allWeeks.map((week) => (
          <div key={week.dateOfMeet} onClick={() => chooseThisWeek(week)}>
            {week.dateOfMeet}
          </div>
        ))
      ) : (
        <></>
      )}
      <BlankForm {...info} />
    </div>
  )
}

export default Forms
