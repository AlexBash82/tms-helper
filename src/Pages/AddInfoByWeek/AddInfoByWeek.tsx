import React, { useState } from 'react'
import { IUserDB } from '../../interfaces'

const AddInfoByWeek: React.FC = () => {
  const [dateOfMeet, setDateOfMeet] = useState('')
  //const [inputSName, setInputSName] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const [inputNewName, setInputNewName] = useState('')
  const [allFileContent, setAllFileContent] = useState<Array<IUserDB>>([])

  const handleReadAll = async () => {
    try {
      const allData = await window.api.getAllUsers()
      setAllFileContent(allData)
    } catch (error) {
      console.error('Error reading all data:', error)
    }
  }

  const rewrite = async () => {
    try {
      const updatedItem = {
        oldFirstname: inputSearch,
        newFirstname: inputNewName,
      }
      const result = await window.api.updateOneUser(updatedItem)
      console.log('result update', result)

      // После обновления, возможно, вы захотите вызвать функцию для повторного чтения данных и обновления состояния компонента
      setInputSearch('')
      setInputNewName('')
      handleReadAll()
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }

  return (
    <div>
      <input
        placeholder="Date of meeting"
        type="date"
        value={dateOfMeet}
        onChange={(e) => setDateOfMeet(e.target.value)}
      />

      <div>
        <button onClick={handleReadAll}>Read All Data</button>
        <div>
          <h2>All Data:</h2>
          <ul>
            {allFileContent.map((item, index) => (
              <li key={index}>
                <p>FirstName: {item.lastFirstName}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <input
        placeholder="SearchFirstName"
        type="text"
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <input
        placeholder="NewFirstName"
        type="text"
        value={inputNewName}
        onChange={(e) => setInputNewName(e.target.value)}
      />
      <button onClick={rewrite}>rewrite</button>
    </div>
  )
}

export default AddInfoByWeek
