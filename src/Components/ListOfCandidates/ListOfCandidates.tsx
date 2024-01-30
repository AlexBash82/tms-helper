import React, { useEffect, useRef, useState } from 'react'
import './ListOfCandidates.css'
import { IStudent } from '../../interfaces'

//повесить слушатель клика вне окошка на закрытие
//добавить фильтрацию по колонкам: перый разговор, повтор, главный зал...
//можно в виде перебора массива и если поле с таском самое старое то в начало массива
//а если нет,то в конец массива
//а в самом массиве можно сделать среднее дефолтное значение - разделитель
//при наведении на кандидата открывать еще одно окно с доп инф

interface IProps {
  openAndChoose: (arg: string) => void
  getCurrentWeek: () => void
  presentValue: { name: string; _id: string } | undefined
  task: string
  dateOfMeet: string
  suitsStudents: Array<IStudent>
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
  const [students, setStudents] = useState<Array<IStudent>>([])
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        inputIs === 'blur' &&
        action !== 'plan'
      ) {
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
    if (action === 'plan') {
      getUsersLatest()
    }
  }, [])

  //эта функция полуает studentName: имя студента, у которого нужно в базе сделать plan: true
  const makePlan = async (studentName: string) => {
    //если в строке уже имеется студент: presentValue, то получаем его из базы
    if (presentValue) {
      const presentUser = await window.api.getOneUserByLFName(
        presentValue?.name
      )

      //проверяем у этого студента поле plan: true и меняем на false
      if (presentUser.success && presentUser.data?.plan) {
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
    }

    //если вновь полученное имя отличается от предыдущего (если оно вообще есть), то меняем поле plan: true
    if (studentName !== presentValue?.name) {
      try {
        const updateUser = {
          studentName: studentName,
          keyName: 'plan',
          newValue: true,
        }
        const resultUser = await window.api.updateOneUser(updateUser)

        //если обновить студента получилось, то обновляем данные в базе недели
        if (resultUser.success) {
          const updateWeek = {
            dateOfMeet,
            keyName: task,
            newValue: {
              name: resultUser.data.lastFirstName,
              _id: resultUser.data._id,
            },
          }
          const resultWeek = await window.api.updateOneWeek(updateWeek)

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

  //для заполнения базы данных датами выступлений у студентов, достаточно внести имена в поля недели. И после нажатия кнопки "сохранить" в AddInfoByWeek - обновятся поя дат у студентов
  const makeUpdate = async (studentName: string) => {
    const student = await window.api.getOneUserByLFName(studentName)

    if (student.success) {
      try {
        const updateWeek = {
          dateOfMeet,
          keyName: task,
          newValue: studentName,
        }
        const resultWeek = await window.api.updateOneWeek(updateWeek)

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
      {action === 'plan'
        ? students.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makePlan(student.lastFirstName)}
            >
              {student.lastFirstName}
            </div>
          ))
        : action === 'confirm'
        ? suitsStudents.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makePlan(student.lastFirstName)}
            >
              {student.lastFirstName}
            </div>
          ))
        : action === 'update' &&
          suitsStudents.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makeUpdate(student.lastFirstName)}
            >
              {student.lastFirstName}
            </div>
          ))}
    </div>
  )
}

export default ListOfCandidates
