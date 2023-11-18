import React, { useEffect, useState } from 'react'

//написать функцию для редактирования user-------------------------------------

interface unitDB {
  lastFirstName: string
  gender: string
  chairman?: boolean
  secondChairM?: boolean
  firstSpeach?: boolean
  gems?: boolean
  live?: boolean
  studyB?: boolean
  studyBReader?: boolean
  endPray?: boolean
  portnerOnly?: boolean
  secondClassOnly?: boolean
  notBibleStudy?: boolean
  dontUse: boolean
  comments: string
  plan: boolean
  _id: string
}

const PersonsList: React.FC = () => {
  const [allFileContent, setAllFileContent] = useState<Array<unitDB>>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [deletingName, setDeletingName] = useState('')
  const [genCode, setGenCode] = useState('')
  const [inputCode, setInputCode] = useState('')

  const readAllData = async () => {
    try {
      const allData = await window.api.readAllDatabase()
      setAllFileContent(allData)
    } catch (err) {
      //console.log('Error reading all data:', err)
    }
  }

  useEffect(() => {
    readAllData()
  }, [])

  const editPerson = (searchLFName: string) => {
    const result = allFileContent.find(
      (item) => item.lastFirstName === searchLFName
    )
    console.log(result)
  }

  const deletePerson = async (searchLFName: string) => {
    await window.api
      .deleteUser(searchLFName)
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
      <h2>All Data:</h2>
      <ul>
        {allFileContent.map((item, index) => (
          <li key={index}>
            <div>
              <p>FirstName: {item.lastFirstName}</p>
              <button onClick={() => editPerson(item.lastFirstName)}>
                Edit
              </button>
              {showConfirm && item.lastFirstName === deletingName ? (
                <div>
                  <p>
                    Inter '{genCode}' for delete user '{item.lastFirstName}'
                    from DB
                  </p>
                  <input
                    placeholder="Inter confirmation code"
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                  />
                  <button
                    onClick={() => confirmation(inputCode, item.lastFirstName)}
                  >
                    Confirm
                  </button>
                </div>
              ) : (
                <div>
                  <button onClick={() => askConfirm(item.lastFirstName)}>
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
