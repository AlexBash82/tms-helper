import React, { useEffect, useState } from 'react'
import './ListOfCandidates.css'
import { IFemaleDB, IMaleDB } from '../../interfaces'

//нужно передать сюда дату недели!!! для обновления поля недели при выборе юзера
//повесить слушатель клика вне окошка на закрытие
//добавить фильтрацию по колонкам: перый разговор, повтор, главный зал...
//можно в виде перебора массива и если поле с таском самое старое то в начало массива
//а если нет,то в конец массива
//а в самом массиве можно сделать среднее дефолтное значение - разделитель

interface IProps {
  close: (arg: string) => void
  setChoose: (arg: string) => void
  presentValue: string
  task: string
  //dateOfMeet: string

  action: 'plan' | 'confirm' | 'update' | undefined
}

const ListOfCandidates: React.FC<IProps> = ({
  close,
  presentValue,
  task,
  setChoose,
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
        const updateNew = {
          studentName: studentName,
          keyName: 'plan',
          newValue: true,
        }
        const result = await window.api.updateOneUser(updateNew)
        //при внесении поля план-тру, нужно также сохранять это поле в неделе, чтобы при закрытии
        //страницы учащийся не выпадал из списка навсегда как запланированный
        //например: updateOneField в неделе

        console.log('result', result)
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }
    //в итоге нужно от этого setChoose избавиться, а данные пусть аддИнфо.. читает из обновления недели плана
    setChoose(studentName)
    close('')
  }

  return (
    <div className="listOfCand">
      {students.map(
        (student) =>
          action === ('plan' || 'confirm') && (
            <div
              key={student.lastFirstName}
              onClick={() => makePlan(student.lastFirstName)}
            >
              {student.lastFirstName}
            </div>
          )
      )}
    </div>
  )
}

export default ListOfCandidates
