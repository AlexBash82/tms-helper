//App.tsx

import React from 'react'
import { Route, Link, Routes } from 'react-router-dom'
import './App.css'
import PersonsList from './Pages/PersonsList/PersonsList'
import AddInfoByWeek from './Pages/AddInfoByWeek/AddInfoByWeek'

const App: React.FC = () => {
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
