//App.tsx
/// <reference path="./types/global.d.ts" />

import React, { useState, useEffect } from 'react'
import { Route, Link, Routes, useNavigate } from 'react-router-dom'

import PersonsList from './Pages/PersonsList/PersonsList'
import AddNewPerson from './Pages/AddNewPerson/AddNewPerson'
import AddInfoByWeek from './Pages/AddInfoByWeek/AddInfoByWeek'
const Page1: React.FC = () => <div>Page 1</div>

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
            <Link to="/">Page 1</Link>
          </li>
          <li>
            <Link to="/AddNewPerson">Add new person</Link>
          </li>
          <li>
            <Link to="/PersonsList">Persons List</Link>
          </li>
          <li>
            <Link to="/AddInfoByWeek">Add info by week</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/AddNewPerson" element={<AddNewPerson />} />
        <Route path="/PersonsList" element={<PersonsList />} />
        <Route path="/AddInfoByWeek" element={<AddInfoByWeek />} />
      </Routes>
    </div>
  )
}

export default App
