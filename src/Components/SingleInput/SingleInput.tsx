import React, { useState } from 'react'
import './SingleInput.css'
import { IFemaleDB, IMaleDB } from '../../interfaces'
import ListOfCandidates from '../ListOfCandidates/ListOfCandidates'

interface IProps {
  title: string
  openAndChoose: (arg: string) => void
  openedList: string
  firstInput: string
  firstInputStr: string
  getCurrentWeek: () => void
  dateOfMeet: string
  action: 'plan' | 'confirm' | 'update' | undefined
}

const SingleInput: React.FC<IProps> = (props) => {
  const {
    title,
    openAndChoose,
    openedList,
    firstInput,
    firstInputStr,
    getCurrentWeek,
    dateOfMeet,
    action,
  } = props

  const [inputValue, setInputValue] = useState('')
  const [foundByLetter, setFoundByLetter] = useState<
    Array<IMaleDB | IFemaleDB>
  >([])
  const [inputIs, setInputIs] = useState('blur')

  const searchByLetter = async (inputLatters: string) => {
    if (inputLatters) {
      const students = await window.api.getUsersByLastname(inputLatters)
      if (students.success) {
        setFoundByLetter(students.data)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    }
    setInputValue(inputLatters)
  }

  const focusOrBlur = (act: string, name: string) => {
    if (act === 'focus') {
      setInputIs(act)
      openAndChoose(name)
    }
    if (act === 'blur') {
      setInputIs(act)
    }
  }

  return (
    <div className="inpDiv">
      <div className="inpTitle">{title}</div>
      {action === 'plan' ? (
        <div className="" onClick={() => openAndChoose('readPointStMC')}>
          {firstInput}
        </div>
      ) : (
        <input
          className="inp"
          placeholder="Start print Lastname"
          type="text"
          value={inputValue}
          onChange={(e) => searchByLetter(e.target.value)}
          onFocus={() => focusOrBlur('focus', firstInputStr)}
          onBlur={() => focusOrBlur('blur', '')}
        />
      )}
      {openedList === firstInputStr && (
        <ListOfCandidates
          openAndChoose={openAndChoose}
          presentValue={firstInput}
          task={firstInputStr}
          getCurrentWeek={getCurrentWeek}
          action={action}
          dateOfMeet={dateOfMeet}
          suitsStudents={foundByLetter}
          inputIs={inputIs}
        />
      )}
    </div>
  )
}

export default SingleInput
