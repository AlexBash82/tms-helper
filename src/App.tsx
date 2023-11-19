//App.tsx

import React, { useState, useEffect } from 'react'
import { Route, Link, Routes, useNavigate } from 'react-router-dom'

import PersonsList from './Pages/PersonsList/PersonsList'
import AddNewPerson from './Pages/AddNewPerson/AddNewPerson'
import AddInfoByWeek from './Pages/AddInfoByWeek/AddInfoByWeek'
import MainPage from './Pages/MainPage/MainPage'
import PlanNewWeek from './Pages/PlanNewWeek/PlanNewWeek'

const App: React.FC = () => {
  //------нужно разобраться
  //const navigate = useNavigate() // Получаем функцию для программного перехода
  // useEffect(() => {
  //   window.api.receive('navigate', (page) => {
  //     navigate(`/${page}`) // Используем navigate для динамического перехода
  //   })

  //   return () => {
  //     window.api.receive('navigate', () => {})
  //   }
  // }, [navigate])

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Main Page</Link>
          </li>
          <li>
            <Link to="/addNewPerson">Add new person</Link>
          </li>
          <li>
            <Link to="/personsList">Persons List</Link>
          </li>
          <li>
            <Link to="/addInfoByWeek">Add info by week</Link>
          </li>
          <li>
            <Link to="/planNewWeek">Plan new week</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/addNewPerson" element={<AddNewPerson />} />
        <Route path="/personsList" element={<PersonsList />} />
        <Route path="/addInfoByWeek" element={<AddInfoByWeek />} />
        <Route path="/planNewWeek" element={<PlanNewWeek />} />
      </Routes>
    </div>
  )
}

export default App
