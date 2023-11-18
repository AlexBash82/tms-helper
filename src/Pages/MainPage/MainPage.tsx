import React, { useEffect, useState } from 'react'

interface unitDB {
  lastFirstName: string
}

const MainPage: React.FC = () => {
  const [lastFirstName, setLastFirstName] = useState('')
  const [found, setFound] = useState([''])
  const [inputSearch, setInputSearch] = useState('')
  const [inputNewName, setInputNewName] = useState('')
  const [allFileContent, setAllFileContent] = useState<Array<unitDB>>([])

  const searchByLetter = (inputLatters) => {
    window.api
      .searchUsersByLastname(inputLatters)
      .then((filteredUsers) => {
        // Обработка отфильтрованных пользователей
        const result = filteredUsers.map((item) => item.lastFirstName)
        setLastFirstName(inputLatters)
        setFound(result)
      })
      .catch((error) => {
        console.error('Error searching users by lastname:', error)
      })
  }

  const handleReadAll = async () => {
    try {
      const allData = await window.api.readAllDatabase()
      setAllFileContent(allData)
    } catch (error) {
      console.error('Error reading all data:', error)
    }
  }

  // const handleSubmit = async () => {
  //   try {
  //     await window.api.writeDatabase({ inputFName, inputSName })
  //     setInputFName('')
  //     setInputSName('')
  //   } catch (error) {
  //     console.error('Error writing to database:', error)
  //   }
  // }

  const rewrite = async () => {
    try {
      const updatedItem = {
        oldFirstname: inputSearch,
        newFirstname: inputNewName,
      }
      const result = await window.api.updateItem(updatedItem)
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
        placeholder="FirstName"
        type="text"
        value={lastFirstName}
        onChange={(e) => searchByLetter(e.target.value)}
      />
      {found.map((item, index) => item && <p key={index}>I found: {item}</p>)}
      {/* <input
        placeholder="SecondName"
        type="text"
        value={inputSName}
        onChange={(e) => setInputSName(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button> */}

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

export default MainPage
