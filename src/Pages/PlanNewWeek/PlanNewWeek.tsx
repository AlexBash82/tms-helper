import React, { useEffect, useState } from 'react'
import { IUserDB } from '../interfaces'
//import './PlanNewWeek.scss'

//отображать планирование в зависимости от выбраннх полей: учебные и/или обучающие
//функцию полуение запланированых недель
//после выбора недели проверить не прошлое ли это и есть ли план на эту неделю
//выводить календарь - какие недели запланированы
//функцию получения всех юзеров и расстановка по самому последнему выстыпавшему (в отдльный масс)
//отображение в выпадающем окне из этого массива. сортировка по полям, одно поле "оставить пустым"

const PlanNewWeek: React.FC = () => {
  const [dateOfMeet, setDateOfMeet] = useState('')
  const [teaching, setTeaching] = useState(false)
  const [training, setTraining] = useState(false)
  const [planedWeeks, setPlanedWeeks] = useState([])
  const [usersLatest, setUsersLatest] = useState<Array<IUserDB>>([])

  useEffect(() => {
    const getUsersLatest = async () => {
      try {
        const users = await window.api.getUsersByLatest()
        setUsersLatest(users)
        console.log(users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    getUsersLatest()
  }, [])

  return (
    <div>
      <input
        placeholder="Date of meeting"
        type="date"
        value={dateOfMeet}
        onChange={(e) => setDateOfMeet(e.target.value)}
      />
      <input
        type="checkbox"
        checked={teaching}
        onChange={(e) => setTeaching(!teaching)}
      />
      -Teaching points
      <input
        type="checkbox"
        checked={training}
        onChange={(e) => setTraining(!training)}
      />
      -Training points
    </div>
  )
}

export default PlanNewWeek
