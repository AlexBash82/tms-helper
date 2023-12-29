import React, { useEffect, useRef, useState } from 'react'
import './ListOfCandidates.css'
import { IFemaleDB, IMaleDB } from '../../interfaces'

//повесить слушатель клика вне окошка на закрытие
//добавить фильтрацию по колонкам: перый разговор, повтор, главный зал...
//можно в виде перебора массива и если поле с таском самое старое то в начало массива
//а если нет,то в конец массива
//а в самом массиве можно сделать среднее дефолтное значение - разделитель
//при наведении на кандидата открывать еще одно окно с доп инф

interface IProps {
  openAndChoose: (arg: string) => void
  getCurrentWeek: () => void
  presentValue: string
  task: string
  dateOfMeet: string
  suitsStudents: Array<IMaleDB | IFemaleDB>
  inputIs: string
  action: 'plan' | 'confirm' | 'update' | undefined
}

const ListOfCandidates: React.FC<IProps> = ({
  openAndChoose,
  getCurrentWeek,
  presentValue,
  task,
  dateOfMeet,
  action,
  suitsStudents,
  inputIs,
}) => {
  const [students, setStudents] = useState<Array<IMaleDB | IFemaleDB>>([])
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        inputIs === 'blur'
      ) {
        console.log('out and blur')
        openAndChoose('')
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [inputIs])

  const addSearchParams = () => {
    if (task.includes('read') || task.includes('speech')) {
      return { gender: 'Male' }
    }
    return {}
  }

  const getUsersLatest = async () => {
    try {
      const addParam = addSearchParams()
      const users = await window.api.getUsersByLatest(addParam)
      setStudents(users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    getUsersLatest()
  }, [])

  const makePlan = async (studentName: string) => {
    const presentUser = await window.api.getOneUserByLFName(presentValue)
    if (presentUser.data?.plan) {
      try {
        const updatePresent = {
          studentName: presentValue,
          keyName: 'plan',
          newValue: false,
        }
        const presentResult = await window.api.updateOneUser(updatePresent)

        console.log('presentResult', presentResult)
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }
    if (presentValue !== studentName) {
      try {
        const updateUser = {
          studentName: studentName,
          keyName: 'plan',
          newValue: true,
        }
        const resultUser = await window.api.updateOneUser(updateUser)
        //console.log('resultUser', resultUser)

        if (resultUser.success) {
          const updateWeek = {
            dateOfMeet,
            keyName: task,
            newValue: studentName,
          }
          const resultWeek = await window.api.updateOneWeek(updateWeek)
          //console.log('resultWeek', resultWeek)
          if (resultWeek.success) {
            getCurrentWeek()
          }
        }
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }
    openAndChoose('')
  }

  const makeUpdate = async (studentName: string) => {
    const student = await window.api.getOneUserByLFName(studentName)
    console.log('update. user', studentName)
    if (student.success) {
      try {
        const updateWeek = {
          dateOfMeet,
          keyName: task,
          newValue: studentName,
        }
        const resultWeek = await window.api.updateOneWeek(updateWeek)
        console.log('resultWeek', resultWeek)
        if (resultWeek.success) {
          getCurrentWeek()
        }
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }
    openAndChoose('')
  }

  return (
    <div ref={listRef} className="listOfCand">
      <div>{action}</div>
      {action === 'plan'
        ? students.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makePlan(student.lastFirstName)}
            >
              1{student.lastFirstName}
            </div>
          ))
        : action === 'confirm'
        ? suitsStudents.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makePlan(student.lastFirstName)}
            >
              2{student.lastFirstName}
            </div>
          ))
        : action === 'update' &&
          suitsStudents.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makeUpdate(student.lastFirstName)}
            >
              5{student.lastFirstName}
            </div>
          ))}
    </div>
  )
}

export default ListOfCandidates
