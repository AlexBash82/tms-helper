import React, { useEffect, useState } from 'react'
import './SingleInput.css'
import { IAddParams, IStudent } from '../../../../interfaces'
import ListOfCandidates from '../ListOfCandidates/ListOfCandidates'

interface IProps {
  title: string
  openAndChoose: (arg: string) => void
  openedList: string | undefined
  firstInput: { name: string; _id: string; status: string } | null
  fullTask: string
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
    fullTask,
    getCurrentWeek,
    dateOfMeet,
    action,
  } = props

  const [inputValue, setInputValue] = useState('')
  const [foundByLetter, setFoundByLetter] = useState<Array<IStudent>>([])
  const [inputIs, setInputIs] = useState('blur')

  useEffect(() => {
    if (!firstInput) {
      setInputValue('')
    } else if (firstInput.name !== inputValue) {
      setInputValue(firstInput.name)
    }
  }, [firstInput])

  // логика обработки введенных данных, экранирование символов
  const sanitizeInput = (input: string): string => {
    return input.replace(/[^a-zA-Z0-9а-яА-Я]/g, '')
  }

  const searchByLetter = async (inputLetters: string) => {
    // Удаляем все не-буквенно-цифровые символы
    const sanitizedInput = sanitizeInput(inputLetters)

    if (sanitizedInput.length > 0) {
      const students = await window.api.getUsersByLastname(sanitizedInput)

      if (students.success) {
        let filtered = students.data

        // switch (task.slice(0, -9)) {
        //   case 'read':
        //     filtered = students.data.filter(
        //       (student) => student.gender === 'Male'
        //     )
        //     break
        // case 'speech':
        //   filtered = students.data.filter(
        //     (student) => student. === ''
        //   )
        //   break
        // }
        //console.log('filtered', filtered)
        setFoundByLetter(filtered)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    } else {
      setFoundByLetter([])
    }

    setInputValue(sanitizedInput)
  }

  const focusOrBlur = (act: string, name: string) => {
    //console.log('focusOrBlur, act: ', act, ' name: ', name)
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
        <input
          className="inp"
          placeholder="Did not plane"
          type="text"
          value={inputValue}
          readOnly
          onFocus={() => focusOrBlur('focus', fullTask)}
          onBlur={() => focusOrBlur('blur', '')}
        />
      ) : action === 'confirm' ? (
        <input
          className="inp"
          placeholder="Did not plane"
          type="text"
          value={inputValue}
          readOnly
          onFocus={() => focusOrBlur('focus', fullTask)}
          onBlur={() => focusOrBlur('blur', '')}
        />
      ) : (
        <input
          className="inp"
          placeholder="Start print Lastname"
          type="text"
          value={inputValue}
          onChange={(e) => searchByLetter(e.target.value)}
          onFocus={() => focusOrBlur('focus', fullTask)}
          onBlur={() => focusOrBlur('blur', '')}
        />
      )}
      {openedList === fullTask &&
        (action === 'plan' || foundByLetter.length || action === 'confirm') && (
          <ListOfCandidates
            openAndChoose={openAndChoose}
            presentValue={firstInput}
            fullTask={fullTask}
            getCurrentWeek={getCurrentWeek}
            action={action}
            dateOfMeet={dateOfMeet}
            foundByLetter={foundByLetter}
            inputIs={inputIs}
          />
        )}
    </div>
  )
}

export default SingleInput
