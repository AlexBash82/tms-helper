import React, { useEffect, useState } from 'react'
import './ListOfCandidates.css'

//нужно передать сюда дату недели!!!

interface ListOfCandidatesProps {
  close: (arg: string) => void
  setChoose: (arg: string) => void
  presentValue: string
  task: string
  //dateOfMeet: string
}

const ListOfCandidates: React.FC<ListOfCandidatesProps> = ({
  close,
  presentValue,
  task,
  setChoose,
}) => {
  const [students, setStudents] = useState([
    { _id: '0', lastFirstName: 'Didnt choose yet' },
  ])

  const addSearchParams = () => {
    if (task.includes('read') || task.includes('speech')) {
      return { gender: 'Male' }
    }
    return {}
  }

  const getUsersLatest = async () => {
    try {
      const addParam = addSearchParams()
      const users = await window.api.getUsersByLatest(addParam)
      setStudents(users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    getUsersLatest()
  }, [])

  const makeChoose = async (studentName: string) => {
    if (presentValue !== 'Didnt choose yet') {
      try {
        const updatePresent = {
          studentName: presentValue,
          keyName: 'plan',
          newValue: false,
        }
        const presentResult = await window.api.updateOneUser(updatePresent)

        console.log('presentResult', presentResult)
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }
    if (presentValue !== studentName) {
      try {
        const updateNew = {
          studentName: studentName,
          keyName: 'plan',
          newValue: true,
        }
        const newResult = await window.api.updateOneUser(updateNew)

        console.log('newResult', newResult)
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }

    setChoose(studentName)
    close('')
  }

  return (
    <div className="pos-abs">
      {students.map((student) => (
        <div
          key={student._id}
          onClick={() => makeChoose(student.lastFirstName)}
        >
          {student.lastFirstName}
        </div>
      ))}
    </div>
  )
}

export default ListOfCandidates
