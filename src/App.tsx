//App.tsx

import React, { useState, useEffect } from 'react'
import { Route, Link, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import PersonsList from './Pages/PersonsList/PersonsList'
import AddInfoByWeek from './Pages/AddInfoByWeek/AddInfoByWeek'

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
    <div className="mainWindow">
      <nav>
        <ul>
          <li>
            <Link to="/">AddInfoByWeek</Link>
          </li>
          <li>
            <Link to="/personsList">Persons List</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<AddInfoByWeek />} />
        <Route path="/personsList" element={<PersonsList />} />
      </Routes>
    </div>
  )
}

export default App
