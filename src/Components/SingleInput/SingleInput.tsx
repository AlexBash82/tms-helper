import React, { useEffect, useState } from 'react'
import './SingleInput.css'
import { IStudent } from '../../interfaces'
import ListOfCandidates from '../ListOfCandidates/ListOfCandidates'

interface IProps {
  title: string
  openAndChoose: (arg: string) => void
  openedList: string | undefined
  firstInput: { name: string; _id: string } | null
  task: string
  getCurrentWeek: () => void
  dateOfMeet: string
  action: 'plan' | 'confirm' | 'update' | undefined
}

interface IAddParams {
  isRead?: boolean
  isSpeech?: boolean
  isSecondClassOnly?: boolean
  isPortnerOnly?: boolean
  isNotBibleStudy?: boolean
  isChairman?: boolean
  isFirstSpeech?: boolean
  isExplainSpeech?: boolean
  isGems?: boolean
  isSecondChairm?: boolean
  isLiveAndServ?: boolean
  isStudyBibleIn?: boolean
  isStudyBibleInReader?: boolean
  isEndPrayer?: boolean
}

const SingleInput: React.FC<IProps> = (props) => {
  const {
    title,
    openAndChoose,
    openedList,
    firstInput,
    task,
    getCurrentWeek,
    dateOfMeet,
    action,
  } = props

  const [inputValue, setInputValue] = useState('')
  const [latestStudents, setLatestStudents] = useState<Array<IStudent>>([])
  const [foundByLetter, setFoundByLetter] = useState<Array<IStudent>>([])
  const [inputIs, setInputIs] = useState('blur')

  useEffect(() => {
    if (!firstInput) {
      setInputValue('')
    } else if (firstInput.name !== inputValue) {
      setInputValue(firstInput.name)
    }
  }, [firstInput])

  //в зависимости от содержания строки task - формируется объект для поиска полей студента по базе с дополнительными фильтрами
  const addSearchParams = () => {
    const addParams: IAddParams = {}

    if (task.includes('readPoint')) addParams.isRead = true
    if (task.includes('speechPoint')) addParams.isSpeech = true
    if (task.includes('makePoint')) addParams.isNotBibleStudy = false
    if (task.includes('MC')) addParams.isSecondClassOnly = false
    if (task.includes('St')) addParams.isPortnerOnly = false
    if (task.includes('chairmanPoint')) addParams.isChairman = true
    if (task.includes('firstSpeechPoint')) addParams.isFirstSpeech = true
    if (task.includes('explainSpPoint')) addParams.isExplainSpeech = true
    if (task.includes('gemsPoint')) addParams.isGems = true
    if (task.includes('secondChairmPoint')) addParams.isSecondChairm = true
    if (task.includes('liveAndServPoint')) addParams.isLiveAndServ = true
    if (task.includes('lessonOnePoint')) addParams.isLiveAndServ = true
    if (task.includes('lessonTwoPoint')) addParams.isLiveAndServ = true
    if (task.includes('studyBibleInPoint')) addParams.isStudyBibleIn = true
    if (task.includes('studyBibleInReaderPoint'))
      addParams.isStudyBibleInReader = true
    if (task.includes('endPrayerPoint')) addParams.isEndPrayer = true

    //console.log('search params: ', addParams)
    //console.log('task: ', task)
    return addParams
  }

  // функция для получения списка студентов из базы и обновления им стейта.
  // Вызывается только если action === 'plan'
  const getLatestStudent = async () => {
    try {
      //формируем параметры для фильтрации студентов по task
      const addParam = addSearchParams()
      const users = await window.api.getUsersByLatest(addParam)
      console.log('users', users)
      setLatestStudents(users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    if (action === 'plan') {
      getLatestStudent()
    }
  }, [])

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

        switch (task.slice(0, -9)) {
          case 'read':
            filtered = students.data.filter(
              (student) => student.gender === 'Male'
            )
            break
          // case 'speech':
          //   filtered = students.data.filter(
          //     (student) => student. === ''
          //   )
          //   break
        }
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
          value={firstInput?.name}
          readOnly
          onFocus={() => focusOrBlur('focus', task)}
          onBlur={() => focusOrBlur('blur', '')}
        />
      ) : action === 'confirm' ? (
        <input
          className="inp"
          placeholder="Did not plane"
          type="text"
          value={inputValue}
          readOnly
          onFocus={() => focusOrBlur('focus', task)}
          onBlur={() => focusOrBlur('blur', '')}
        />
      ) : (
        <input
          className="inp"
          placeholder="Start print Lastname"
          type="text"
          value={inputValue}
          onChange={(e) => searchByLetter(e.target.value)}
          onFocus={() => focusOrBlur('focus', task)}
          onBlur={() => focusOrBlur('blur', '')}
        />
      )}
      {openedList === task &&
        (latestStudents.length ||
          foundByLetter.length ||
          action === 'confirm') && (
          <ListOfCandidates
            openAndChoose={openAndChoose}
            presentValue={firstInput}
            task={task}
            getCurrentWeek={getCurrentWeek}
            action={action}
            dateOfMeet={dateOfMeet}
            foundByLetter={foundByLetter}
            latestStudents={latestStudents}
            inputIs={inputIs}
          />
        )}
    </div>
  )
}

export default SingleInput
