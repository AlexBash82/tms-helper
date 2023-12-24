import React, { useState } from 'react'
import './CoupleInput.css'
import ListOfCandidates from '../ListOfCandidates/ListOfCandidates'
import { IFemaleDB, IMaleDB } from '../../interfaces'

interface ICoupleInputProps {
  title: string
  openAndChoose: (arg: string) => void
  openedList: string
  close: (arg: string) => void
  firstInput: string
  firstInputStr: string
  secondInput: string
  secondInputStr: string
  getCurrentWeek: () => void
  dateOfMeet: string
  action: 'plan' | 'confirm' | 'update' | undefined
}

const CoupleInput: React.FC<ICoupleInputProps> = (props) => {
  const {
    title,
    openAndChoose,
    openedList,
    close,
    firstInput,
    firstInputStr,
    secondInput,
    secondInputStr,
    getCurrentWeek,
    dateOfMeet,
    action,
  } = props

  const [inputLFName1, setInputLFName1] = useState('')
  const [inputLFName2, setInputLFName2] = useState('')
  const [foundArrName1, setFoundArrName1] = useState<
    Array<IMaleDB | IFemaleDB>
  >([])
  const [foundArrName2, setFoundArrName2] = useState<
    Array<IMaleDB | IFemaleDB>
  >([])

  const searchByLetter1 = async (inputLatters: string) => {
    if (inputLatters) {
      const students = await window.api.getUsersByLastname(inputLatters)
      if (students.success) {
        setFoundArrName1(students.data)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    } else {
      setFoundArrName1([])
    }
    setInputLFName1(inputLatters)
  }

  const searchByLetter2 = async (inputLatters: string) => {
    if (inputLatters) {
      const students = await window.api.getUsersByLastname(inputLatters)
      if (students.success) {
        setFoundArrName2(students.data)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    } else {
      setFoundArrName2([])
    }
    setInputLFName2(inputLatters)
  }

  return (
    <div className="df">
      <div>{title}</div>
      <div className="">
        {action === 'plan' ? (
          <div
            className="input-box"
            onClick={() => openAndChoose(firstInputStr)}
          >
            {firstInput}
          </div>
        ) : (
          <input
            placeholder="Start print Lastname"
            type="text"
            value={inputLFName1}
            onChange={(e) => searchByLetter1(e.target.value)}
            onFocus={() => openAndChoose(firstInputStr)}
            onBlur={() => openAndChoose('')}
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
            suitsStudents={foundArrName1}
          />
        )}
      </div>
      <div className="">
        {action === 'plan' ? (
          <div
            className="input-box"
            onClick={() => openAndChoose(secondInputStr)}
          >
            {secondInput}
          </div>
        ) : (
          <input
            placeholder="Start print Lastname"
            type="text"
            value={inputLFName2}
            onChange={(e) => searchByLetter2(e.target.value)}
            onFocus={() => openAndChoose(secondInputStr)}
            onBlur={() => openAndChoose('')}
          />
        )}
        {openedList === secondInputStr && (
          <ListOfCandidates
            openAndChoose={openAndChoose}
            presentValue={secondInput}
            task={secondInputStr}
            getCurrentWeek={getCurrentWeek}
            action={action}
            dateOfMeet={dateOfMeet}
            suitsStudents={foundArrName2}
          />
        )}
      </div>
    </div>
  )
}

export default CoupleInput
