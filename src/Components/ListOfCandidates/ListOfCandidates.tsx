import React, { useEffect, useState } from 'react'
import './ListOfCandidates.css'
import { IFemaleDB, IMaleDB } from '../../interfaces'

//повесить слушатель клика вне окошка на закрытие
//добавить фильтрацию по колонкам: перый разговор, повтор, главный зал...
//можно в виде перебора массива и если поле с таском самое старое то в начало массива
//а если нет,то в конец массива
//а в самом массиве можно сделать среднее дефолтное значение - разделитель
//при наведении на кандидата открывать еще одно окно с доп инф

interface IProps {
  close: (arg: string) => void
  getCurrentWeek: () => void
  presentValue: string
  task: string
  dateOfMeet: string

  action: 'plan' | 'confirm' | 'update' | undefined
}

const ListOfCandidates: React.FC<IProps> = ({
  close,
  getCurrentWeek,
  presentValue,
  task,
  dateOfMeet,
  action,
}) => {
  const [students, setStudents] = useState<Array<IMaleDB | IFemaleDB>>([])

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
    if (presentUser?.plan) {
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
    close('')
  }

  const makeUpdate = async (studentName: string) => {
    const presentUser = await window.api.getOneUserByLFName(presentValue)

    if (presentUser) {
      try {
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
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }
    close('')
  }

  return (
    <div className="listOfCand">
      {action === ('plan' || 'confirm')
        ? students.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makePlan(student.lastFirstName)}
            >
              1{student.lastFirstName}
            </div>
          ))
        : action === 'update' &&
          students.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makeUpdate(student.lastFirstName)}
            >
              2{student.lastFirstName}
            </div>
          ))}
    </div>
  )
}

export default ListOfCandidates
