import React, { useState, useEffect } from 'react'
import InputMale from './InputMale'
import InputFemale from './InputFemale'
import { IFemaleDB, IFemaleData, IMaleDB, IMaleData } from '../../interfaces'

//исключить возможность добавления одноименных пользователей--ok--------------
//исключить возможность пробела в начале, в конце, и более одного между-----
//отключить кнопку save если инпут пуст
//редактирование: после введения информации искать по ID и изменять (id т.к. имя можно поменять)
//исключить возможность редактирования если студент.план = тру

interface IProps {
  PropPerson?: IMaleDB | IFemaleDB
  readAllData: () => void
}

const AddAndEditPropPerson: React.FC<IProps> = ({
  PropPerson,
  readAllData,
}) => {
  const defaultMaleData = {
    isChairman: false,
    isSecondChairm: false,
    isFirstSpeach: false,
    isGems: false,
    isLiveAndServ: false,
    isStudyBibleIn: false,
    isStudyBibleInReader: false,
    isEndPrayer: false,
  }
  const defaultFemaleData = {
    isPortnerOnly: false,
    isSecondClassOnly: false,
    isNotBibleStudy: false,
  }

  const [maleData, setMaleData] = useState<IMaleData>(defaultMaleData)
  const [femaleData, setFemaleData] = useState<IFemaleData>(defaultFemaleData)
  const [inputLFName, setInputLFName] = useState('')
  const [gender, setGender] = useState('')
  const [dontUse, setDontUse] = useState(false)
  const [comments, setComments] = useState('')
  const [foundArrName, setFoundArrName] = useState<Array<IMaleDB | IFemaleDB>>(
    []
  )
  const [editPropPerson, setEditPropPerson] = useState<IMaleDB | IFemaleDB>()

  useEffect(() => {
    setEditPropPerson(PropPerson)
  }, [PropPerson])

  useEffect(() => {
    if (editPropPerson) {
      searchByLetter(editPropPerson.lastFirstName)
      setGender(editPropPerson.gender)
      setDontUse(editPropPerson.dontUse)
      setComments(editPropPerson.comments)

      if (editPropPerson.gender === 'Male') {
        const editP = editPropPerson as IMaleDB
        const maleData = {
          isChairman: editP.isChairman,
          isSecondChairm: editP.isSecondChairm,
          isFirstSpeach: editP.isFirstSpeach,
          isGems: editP.isGems,
          isLiveAndServ: editP.isLiveAndServ,
          isStudyBibleIn: editP.isStudyBibleIn,
          isStudyBibleInReader: editP.isStudyBibleInReader,
          isEndPrayer: editP.isEndPrayer,
        }
        const result = Object.assign(editPropPerson, maleData)
        setMaleData(result)
      } else if (editPropPerson.gender === 'Female') {
        const editP = editPropPerson as IFemaleDB
        const femaleData = {
          isPortnerOnly: editP.isPortnerOnly,
          isSecondClassOnly: editP.isSecondClassOnly,
          isNotBibleStudy: editP.isNotBibleStudy,
        }
        const result = Object.assign(editPropPerson, femaleData)
        setFemaleData(result)
      }
    } else {
      setClearState()
    }
  }, [editPropPerson])

  const setClearState = () => {
    setInputLFName('')
    setGender('')
    setDontUse(false)
    setComments('')
    setFoundArrName([])
  }

  const searchByLetter = async (inputLatters: string) => {
    if (inputLatters) {
      const students = await window.api.getUsersByLastname(inputLatters)
      if (students.success) {
        setFoundArrName(students.data)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    }
    setInputLFName(inputLatters)
  }

  const addPerson = async () => {
    const defoltStamp = 1685000178013
    let personData: IMaleDB | IFemaleDB
    try {
      if (gender === 'Male' && inputLFName !== '') {
        personData = {
          lastFirstName: inputLFName,
          gender: gender,
          isChairman: maleData.isChairman,
          isSecondChairm: maleData.isSecondChairm,
          isFirstSpeach: maleData.isFirstSpeach,
          isGems: maleData.isGems,
          isLiveAndServ: maleData.isLiveAndServ,
          isStudyBibleIn: maleData.isStudyBibleIn,
          isStudyBibleInReader: maleData.isStudyBibleInReader,
          isEndPrayer: maleData.isEndPrayer,
          dontUse: dontUse,
          comments: comments,

          plan: false,
          chairman: defoltStamp,
          secondChairm: defoltStamp,
          firstSpeach: defoltStamp,
          gems: defoltStamp,
          mainRead: defoltStamp,
          smallRead: defoltStamp,
          mainStarting: defoltStamp,
          smallStarting: defoltStamp,
          mainFollowing: defoltStamp,
          smallFollowing: defoltStamp,
          mainMaking: defoltStamp,
          smallMaking: defoltStamp,
          mainExplaining: defoltStamp,
          smallExplaining: defoltStamp,
          mainSpeech: defoltStamp,
          smallSpeech: defoltStamp,
          mainSlave: defoltStamp,
          smallSlave: defoltStamp,
          portners: [],
          liveAndServ: defoltStamp,
          studyBibleIn: defoltStamp,
          studyBibleInReader: defoltStamp,
          endPrayer: defoltStamp,
          latest: defoltStamp,

          _id: undefined,
        }
        await window.api.writeOneUser(personData)
      }

      if (gender === 'Female' && inputLFName !== '') {
        personData = {
          lastFirstName: inputLFName,
          gender: gender,
          isPortnerOnly: femaleData.isPortnerOnly,
          isSecondClassOnly: femaleData.isSecondClassOnly,
          isNotBibleStudy: femaleData.isNotBibleStudy,
          dontUse: dontUse,
          comments: comments,

          plan: false,
          mainStarting: defoltStamp,
          smallStarting: defoltStamp,
          mainFollowing: defoltStamp,
          smallFollowing: defoltStamp,
          mainMaking: defoltStamp,
          smallMaking: defoltStamp,
          mainExplaining: defoltStamp,
          smallExplaining: defoltStamp,
          mainSlave: defoltStamp,
          smallSlave: defoltStamp,
          portners: [],
          latest: defoltStamp,

          _id: undefined,
        }
        const result = await window.api.writeOneUser(personData)
        console.log('result of write one user', result)
      }
      setClearState()
      readAllData() //заново читаем весь список
    } catch (error) {
      console.log('Error writing to database:', error)
    }
  }

  const editPerson = async () => {
    //получить новые даные, старые из базы и обновить
    if (editPropPerson) {
      const idPerson = editPropPerson._id
      let newValue
      if (editPropPerson.gender === 'Male') {
        newValue = {
          ...maleData,
          lastFirstName: inputLFName,
          gender,
          dontUse,
          comments,
        }
      } else if (editPropPerson.gender === 'Female') {
        newValue = {
          ...femaleData,
          lastFirstName: inputLFName,
          gender,
          dontUse,
          comments,
        }
      }

      await window.api
        .editOneUser({ idPerson, newValue })
        .then((result) => {
          console.log('result of edit', result)
          readAllData() //обновляем список после внесения изменений.
          //нужно вывести алерт об успешном обновлении и сбросить стейт
        })
        .catch((error) => {
          console.error('Error edit user by id:', error)
        })
    }
  }

  const findToEdit = async (LFName: string) => {
    const result = await window.api.getOneUserByLFName(LFName)
    if (result.success) {
      setEditPropPerson(result.data)
      //console.log('find to edit', filteredUser)
    } else {
      console.error('Error searching users by lastname:', result.message)
    }
  }

  const backToAddPerson = () => {
    setClearState()
    setEditPropPerson(undefined)
  }

  return (
    <div>
      {editPropPerson ? <h1>Edit person</h1> : <h1>Add new person</h1>}
      <input
        placeholder="Last name and first name"
        type="text"
        value={inputLFName}
        onChange={(e) => searchByLetter(e.target.value)}
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
        <InputMale maleData={maleData} setMaleData={setMaleData} />
      ) : gender === 'Female' ? (
        <InputFemale femaleData={femaleData} setFemaleData={setFemaleData} />
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
          {editPropPerson ? (
            <button onClick={() => editPerson()}>Edit person</button>
          ) : inputLFName === foundArrName[0]?.lastFirstName ? (
            <div>That person is already exist</div>
          ) : (
            <button onClick={() => addPerson()}>Save person</button>
          )}
        </div>
      )}
      {foundArrName.length !== 0 && (
        <div>
          <div>I found in DB: </div>
          {foundArrName.map(
            (student, index) =>
              student && (
                <div key={index}>
                  <div>{student.lastFirstName}</div>
                  <div onClick={() => findToEdit(student.lastFirstName)}>
                    Edit
                  </div>
                </div>
              )
          )}
        </div>
      )}
      {editPropPerson && (
        <div onClick={() => backToAddPerson()}>Back to add person</div>
      )}
    </div>
  )
}

export default AddAndEditPropPerson
