import React, { useEffect, useState } from 'react'
import './ListOfCandidates.css'

//нужно передать сюда дату недели!!! для обновления поля недели при выборе юзера
//повесить слушатель клика вне окошка на закрытие
//добавить фильтрацию по колонкам: перый разговор, повтор, главный зал...
//можно в виде перебора массива и если поле с таском самое старое то в начало массива
//а если нет,то в конец массива
//а в самом массиве можно сделать среднее дефолтное значение - разделитель

interface ListOfCandidatesProps {
  close: (arg: string) => void
  setChoose: (arg: string) => void
  presentValue: string
  task: string
  //dateOfMeet: string
}

const ListOfCandidates: React.FC<ListOfCandidatesProps> = ({
  close,
  presentValue,
  task,
  setChoose,
}) => {
  const [students, setStudents] = useState([
    { _id: '0', lastFirstName: 'Didnt choose yet' },
  ])

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

  const makeChoose = async (studentName: string) => {
    if (presentValue !== 'Didnt choose yet') {
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
        const newResult = await window.api.updateOneUser(updateNew)
        //при внесении поля план-тру, нужно также сохранять это поле в неделе, чтобы при закрытии
        //страницы учащийся не выпадал из списка навсегда как запланированный
        //например: updateOneField в неделе

        console.log('newResult', newResult)
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }

    setChoose(studentName)
    close('')
  }

  return (
    <div className="listOfCand">
      {students.map((student) => (
        <div
          key={student._id}
          onClick={() => makeChoose(student.lastFirstName)}
        >
          {student.lastFirstName}
        </div>
      ))}
    </div>
  )
}

export default ListOfCandidates
