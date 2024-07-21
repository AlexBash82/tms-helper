import React, { useEffect, useState } from 'react'
import './Forms.css'
import { IWeek } from '../../interfaces'
import BlankForm from './Components/BlankForm/BlankForm'

interface IProps {}

const Forms: React.FC<IProps> = ({}) => {
  const [allWeeks, setAllWeeks] = useState<IWeek[] | undefined>()

  const getPlannedWeek = async () => {
    const weeksFromBD = await window.api.getAllWeeks()
    if (weeksFromBD.success) {
      setAllWeeks(weeksFromBD.data)
    }
  }

  useEffect(() => {
    getPlannedWeek()
  }, [])

  return (
    <div>
      <div>You have planned these weeks</div>
      {allWeeks !== undefined ? (
        allWeeks.map((week) => (
          <div key={week.dateOfMeet}>{week.dateOfMeet}</div>
        ))
      ) : (
        <></>
      )}
      <BlankForm />
    </div>
  )
}

export default Forms
