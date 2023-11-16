//App.tsx
/// <reference path="./types/global.d.ts" />

import React, { useState, useEffect } from 'react'
import { Route, Link, Routes, useNavigate } from 'react-router-dom'

import MainPage from './Pages/MainPage/MainPage'
import AddNewPerson from './Pages/AddNewPerson/AddNewPerson'
const Page1: React.FC = () => <div>Page 1</div>
const Page2: React.FC = () => <div>Page 2</div>

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
            <Link to="/page2">Page 2</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/AddNewPerson" element={<AddNewPerson />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </div>
  )
}

export default App
