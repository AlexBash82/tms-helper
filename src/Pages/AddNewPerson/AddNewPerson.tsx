import React, { useState, useEffect } from 'react'
import InputMale from './InputMale'
import InputFemale from './InputFemale'
//исключить возможность добавления одноименных пользователей----------------
//исключить возможность пробела в начале, в конце, и более одного между-----
interface IPersonData {
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
}

const AddNewPerson: React.FC = () => {
  const defaultMaleData = {
    chairman: false,
    secondChairM: false,
    firstSpeach: false,
    gems: false,
    live: false,
    studyB: false,
    studyBReader: false,
    endPray: false,
  }

  const defaultFemaleData = {
    portnerOnly: false,
    secondClassOnly: false,
    notBibleStudy: false,
  }

  const [maleData, setMaleData] = useState(defaultMaleData)
  const [femaleData, setFemaleData] = useState(defaultFemaleData)
  const [inputLFName, setInputLFName] = useState('')
  const [gender, setGender] = useState('')
  const [dontUse, setDontUse] = useState(false)
  const [comments, setComments] = useState('')
  const [found, setFound] = useState([''])

  const setClearState = () => {
    setInputLFName('')
    setGender('')
    setDontUse(false)
    setComments('')
  }

  const searchByLetter = async (inputLatters: string) => {
    let result = ['']
    if (inputLatters) {
      await window.api
        .searchUsersByLastname(inputLatters)
        .then((filteredUsers) => {
          // Обработка отфильтрованных пользователей
          result = filteredUsers.map((item) => item.lastFirstName)
          //console.log(result)
        })
        .catch((error) => {
          console.error('Error searching users by lastname:', error)
        })
    }
    setInputLFName(inputLatters)
    setFound(result)
  }

  let personData: IPersonData

  const handleSubmit = async () => {
    try {
      if (gender === 'Male' && inputLFName !== '') {
        personData = {
          lastFirstName: inputLFName,
          gender: gender,
          chairman: maleData.chairman,
          secondChairM: maleData.secondChairM,
          firstSpeach: maleData.firstSpeach,
          gems: maleData.gems,
          live: maleData.live,
          studyB: maleData.studyB,
          studyBReader: maleData.studyBReader,
          endPray: maleData.endPray,
          dontUse: dontUse,
          comments: comments,
          plan: false,
        }
        await window.api.writeDatabase(personData)
      }

      if (gender === 'Female' && inputLFName !== '') {
        personData = {
          lastFirstName: inputLFName,
          gender: gender,
          portnerOnly: femaleData.portnerOnly,
          secondClassOnly: femaleData.secondClassOnly,
          notBibleStudy: femaleData.notBibleStudy,
          dontUse: dontUse,
          comments: comments,
          plan: false,
        }
        await window.api.writeDatabase(personData)
      }
      setClearState()
    } catch (error) {
      console.log('Error writing to database:', error)
    }
  }

  return (
    <div>
      <p>Add new person</p>
      <input
        placeholder="Last name and first name"
        type="text"
        value={inputLFName}
        onChange={(e) => searchByLetter(e.target.value)}
      />
      {found.map((item, index) => item && <p key={index}>I found: {item}</p>)}
      <input
        type="checkbox"
        value="Male"
        checked={gender === 'Male'}
        onChange={(e) => setGender(e.target.value)}
      />
      -Male
      <input
        type="checkbox"
        value="Female"
        checked={gender === 'Female'}
        onChange={(e) => setGender(e.target.value)}
      />
      -Female
      {gender === 'Male' ? (
        <InputMale setMaleData={setMaleData} />
      ) : gender === 'Female' ? (
        <InputFemale setFemaleData={setFemaleData} />
      ) : (
        <div>Input lastname, firstname and choose the gender</div>
      )}
      {(gender === 'Male' || gender === 'Female') && (
        <div>
          <input
            type="checkbox"
            checked={dontUse}
            onChange={(e) => setDontUse(!dontUse)}
          />
          -Do not use
          <input
            placeholder="Short comments"
            type="text"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <button onClick={() => handleSubmit()}>Save</button>
        </div>
      )}
    </div>
  )
}

export default AddNewPerson
