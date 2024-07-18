import React, { useEffect, useState } from 'react'
import AddAndEditPerson from '../../Components/AddAndEditPerson/AddAndEditPerson'
import { IStudent } from '../../interfaces'
import './PersonsList.css'

//добавить фильтры для поиска, например кто и когда выступал, м ж,

const PersonsList: React.FC = () => {
  const [allUsers, setAllUsers] = useState<Array<IStudent>>([])
  const [showConfirm, setShowConfirm] = useState(false)
  const [deletingName, setDeletingName] = useState('')
  const [genCode, setGenCode] = useState('')
  const [inputCode, setInputCode] = useState('')
  const [editablePerson, setEditablePerson] = useState<IStudent | undefined>()

  const getAllStudents = async () => {
    try {
      const allStudents = await window.api.getAllStudents()
      if (allStudents.success) {
        setAllUsers(allStudents.data)
      }
    } catch (err) {
      //console.log('Error reading all data:', err)
    }
  }

  useEffect(() => {
    getAllStudents()
  }, [])

  const deletePerson = async (searchLFName: string) => {
    await window.api
      .deleteOneUser(searchLFName)
      .then((result) => {
        if (result.success) {
          // добавить алерт об успешном результате
          setEditablePerson(undefined)
          getAllStudents() //заново читаем весь список
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
    <div className="df container">
      <div className="allUsers">
        <h1>All users:</h1>
        <div className="overflow">
          {allUsers.map((user, index) => (
            <div key={index}>
              <div className="df">
                <div className="df g-1 firstNlast">
                  <div className="df">
                    <div>{user.lastFirstName}</div>
                  </div>
                  <div className="df">
                    {user.gender === 'Male' ? <div>M</div> : <div>F</div>}
                  </div>
                </div>
                <div className="df g-1">
                  <div
                    className="myButton"
                    onClick={() => setEditablePerson(user)}
                  >
                    Edit
                  </div>

                  <div>
                    <div
                      className="myButton"
                      onClick={() => askConfirmDel(user.lastFirstName)}
                    >
                      Delite
                    </div>
                  </div>
                </div>
              </div>
              {showConfirm && user.lastFirstName === deletingName ? (
                <div className="df g-1 deleteForm">
                  <div className="textDelete">
                    For delete - inter code: '{genCode}'
                  </div>
                  <input
                    className="inputCode"
                    placeholder="-/-/-"
                    type="text"
                    maxLength={3}
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                  />
                  <div
                    className="myButton"
                    onClick={() => confirmation(inputCode, user.lastFirstName)}
                  >
                    Confirm
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <AddAndEditPerson
          PropPerson={editablePerson}
          getAllStudents={getAllStudents}
        />
      </div>
    </div>
  )
}

export default PersonsList
