import React, { useState, useEffect } from 'react'

interface IPersonData {
  lastFirstName: string
  gender: string
  responsibility: string
  portnerOnly: boolean
  secondClassOnly: boolean
  notBibleStudy: boolean
  dontUse: boolean
  comments: string
}

const AddNewPerson: React.FC = () => {
  const [inputLFName, setInputLFName] = useState('')
  const [gender, setGender] = useState('Female')
  const [responsib, setResponsib] = useState('Publisher')
  const [portnerOnly, setPortnerOnly] = useState(false)
  const [secondClassOnly, setSecondClassOnly] = useState(false)
  const [notStudy, setNotStudy] = useState(false)
  const [dontUse, setDontUse] = useState(false)
  const [comments, setComments] = useState('')

  const setClearSate = () => {
    setInputLFName('')
    setGender('Female')
    setResponsib('Publisher')
    setPortnerOnly(false)
    setSecondClassOnly(false)
    setNotStudy(false)
    setDontUse(false)
    setComments('')
  }

  let personData: IPersonData

  const handleSubmit = async () => {
    try {
      if (gender === 'Male') {
        personData = {
          lastFirstName: inputLFName,
          gender: gender,
          responsibility: responsib,
          portnerOnly: portnerOnly,
          secondClassOnly: secondClassOnly,
          notBibleStudy: notStudy,
          dontUse: dontUse,
          comments: comments,
        }
      } else {
        personData = {
          lastFirstName: inputLFName,
          gender: gender,
          responsibility: 'Publisher',
          portnerOnly: portnerOnly,
          secondClassOnly: secondClassOnly,
          notBibleStudy: notStudy,
          dontUse: dontUse,
          comments: comments,
        }
      }
      await window.api.writeDatabase(personData)
      setClearSate()
    } catch (error) {
      console.error('Error writing to database:', error)
    }
  }

  return (
    <div>
      <p>Add new person</p>
      <input
        placeholder="Last name and first name"
        type="text"
        value={inputLFName}
        onChange={(e) => setInputLFName(e.target.value)}
      />
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
        <div>
          <input
            type="checkbox"
            value="Publisher"
            checked={responsib === 'Publisher'}
            onChange={(e) => setResponsib(e.target.value)}
          />
          -Publisher
          <input
            type="checkbox"
            value="Servant"
            checked={responsib === 'Servant'}
            onChange={(e) => setResponsib(e.target.value)}
          />
          -Servant
          <input
            type="checkbox"
            value="Elder"
            checked={responsib === 'Elder'}
            onChange={(e) => setResponsib(e.target.value)}
          />
          -Elder
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={portnerOnly}
            onChange={(e) => setPortnerOnly(!portnerOnly)}
          />
          -Portner only
          <input
            type="checkbox"
            checked={secondClassOnly}
            onChange={(e) => setSecondClassOnly(!secondClassOnly)}
          />
          -Second class only
          <input
            type="checkbox"
            checked={notStudy}
            onChange={(e) => setNotStudy(!notStudy)}
          />
          -Not a Bible study
        </div>
      )}
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddNewPerson
