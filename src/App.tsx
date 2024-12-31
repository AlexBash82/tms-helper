//App.tsx

import React from 'react'
import { Route, Link, Routes } from 'react-router-dom'
import './App.css'
import PersonsList from './Pages/PersonsList/PersonsList'
import AddInfoByWeek from './Pages/AddInfoByWeek/AddInfoByWeek'
import Forms from './Pages/Forms/Forms'
import Epub from './Pages/Epub/Epub'

const App: React.FC = () => {
  return (
    <div className="mainWindow">
      <nav>
        <div className="df">
          <div>
            <Link to="/">AddInfoByWeek</Link>
          </div>
          <div>
            <Link to="/personsList">Persons List</Link>
          </div>
          <div>
            <Link to="/forms">Forms</Link>
          </div>
          <div>
            <Link to="/epub">Epub</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<AddInfoByWeek />} />
        <Route path="/personsList" element={<PersonsList />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/epub" element={<Epub />} />
      </Routes>
    </div>
  )
}

export default App
