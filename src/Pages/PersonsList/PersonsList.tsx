import React, { useEffect, useState } from 'react'
import AddAndEditPerson from '../../Components/AddAndEditPerson/AddAndEditPerson'
import { IFemaleDB, IMaleDB } from '../../interfaces'

//добавить фильтры для поиска, например кто и когда выступал

const PersonsList: React.FC = () => {
  const [allUsers, setAllUsers] = useState<Array<IMaleDB | IFemaleDB>>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [deletingName, setDeletingName] = useState('')
  const [genCode, setGenCode] = useState('')
  const [inputCode, setInputCode] = useState('')
  const [editablePerson, setEditablePerson] = useState<
    IMaleDB | IFemaleDB | undefined
  >()

  const readAllData = async () => {
    try {
      const allData = await window.api.getAllUsers()
      setAllUsers(allData)
      //console.log('allData', allData)
    } catch (err) {
      //console.log('Error reading all data:', err)
    }
  }

  useEffect(() => {
    readAllData()
  }, [])

  const deletePerson = async (searchLFName: string) => {
    await window.api
      .deleteOneUser(searchLFName)
      .then((result) => {
        if (result.success) {
          // добавить алерт об успешном результате
          setEditablePerson(undefined)
          readAllData() //заново читаем весь список
        } else {
          // Пользователь не найден
          console.error(result.message)
        }
      })
      .catch((error) => {
        console.log('Error deleting user by lastFirstName:', error)
      })
  }

  const generateCode = () => {
    const num = Math.floor(Math.random() * (999 - 100 + 1)) + 100
    const str = num.toString()
    setGenCode(str)
  }

  const askConfirmDel = (name: string) => {
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
    <div className="df">
      <div>
        <h2>All users:</h2>
        <ul>
          {allUsers.map((user, index) => (
            <li key={index}>
              <div>
                <div className="df g-2">
                  <div className="df g-1">
                    <div>Name: </div>
                    <div>{user.lastFirstName}</div>
                  </div>
                  <div className="df g-1">
                    <div>Gender: </div>
                    <div>{user.gender}</div>
                  </div>
                </div>
                <div className="df g-2">
                  <button onClick={() => setEditablePerson(user)}>Edit</button>
                  {showConfirm && user.lastFirstName === deletingName ? (
                    <div className="df g-1">
                      <div>
                        Inter '{genCode}' for delete user '{user.lastFirstName}'
                        from DB
                      </div>
                      <input
                        className="w-1-5"
                        placeholder="-/-/-"
                        type="text"
                        maxLength={3}
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                      />
                      <button
                        onClick={() =>
                          confirmation(inputCode, user.lastFirstName)
                        }
                      >
                        Confirm
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => askConfirmDel(user.lastFirstName)}>
                        Delite
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <AddAndEditPerson
          PropPerson={editablePerson}
          readAllData={readAllData}
        />
      </div>
    </div>
  )
}

export default PersonsList
