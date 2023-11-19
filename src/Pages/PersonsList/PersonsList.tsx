import React, { useEffect, useState } from 'react'
import { IUserDB } from '../interfaces'

//написать функцию для редактирования user-------------------------------------
//ставить курсор в инпут при введении когда

const PersonsList: React.FC = () => {
  const [allUsers, setAllUsers] = useState<Array<IUserDB>>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [deletingName, setDeletingName] = useState('')
  const [genCode, setGenCode] = useState('')
  const [inputCode, setInputCode] = useState('')

  const readAllData = async () => {
    try {
      const allData = await window.api.getAllUsers()
      setAllUsers(allData)
    } catch (err) {
      //console.log('Error reading all data:', err)
    }
  }

  useEffect(() => {
    readAllData()
  }, [])

  const editPerson = (searchLFName: string) => {
    const result = allUsers.find((item) => item.lastFirstName === searchLFName)
    console.log(result)
  }

  const deletePerson = async (searchLFName: string) => {
    await window.api
      .deleteOneUser(searchLFName)
      .then((result) => {
        if (result.success) {
          // Пользователь успешно удален
          console.log(result.message)
        } else {
          // Пользователь не найден
          console.error(result.message)
        }
      })
      .catch((error) => {
        console.log('Error deleting user by lastname:', error)
      })
    readAllData()
  }

  const generateCode = () => {
    const num = Math.floor(Math.random() * (999 - 100 + 1)) + 100
    const str = num.toString()
    setGenCode(str)
  }

  const askConfirm = (name: string) => {
    generateCode()
    setDeletingName(name)
    setShowConfirm(true)
  }

  const confirmation = (inputCode: string, name: string) => {
    if (inputCode === genCode) {
      deletePerson(name)
    }
    setInputCode('')
    setDeletingName('')
    setShowConfirm(false)
  }

  return (
    <div>
      <h2>All users:</h2>
      <ul>
        {allUsers.map((user, index) => (
          <li key={index}>
            <div>
              <p>FirstName: {user.lastFirstName}</p>
              <button onClick={() => editPerson(user.lastFirstName)}>
                Edit
              </button>
              {showConfirm && user.lastFirstName === deletingName ? (
                <div>
                  <p>
                    Inter '{genCode}' for delete user '{user.lastFirstName}'
                    from DB
                  </p>
                  <input
                    placeholder="Inter confirmation code"
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                  />
                  <button
                    onClick={() => confirmation(inputCode, user.lastFirstName)}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div>
                  <button onClick={() => askConfirm(user.lastFirstName)}>
                    Delite
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PersonsList
