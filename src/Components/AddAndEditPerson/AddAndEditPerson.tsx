import React, { useState, useEffect } from 'react'
import InputMale from './InputMale'
import InputFemale from './InputFemale'
import { IUserDB } from '../../Pages/interfaces'
import { IFemaleData, IMaleData } from './interfaces'

//исключить возможность добавления одноименных пользователей----------------
//исключить возможность пробела в начале, в конце, и более одного между-----
//отключить кнопку save если инпут пуст
//редактирование: после введения информации искать по ID и изменять (id т.к. имя можно поменять)
//добавить кнопку возврата в "добавление пользователя"
//setIdEditPropPerson('') сбрасывать при возврате

export interface IPropMaleData extends IMaleData {
  gender: string
  lastFirstName: string
  dontUse: boolean
  comments: string
  _id: string
}
export interface IPropFemaleData extends IFemaleData {
  gender: string
  lastFirstName: string
  dontUse: boolean
  comments: string
  _id: string
}

interface IProps {
  PropPerson?: IPropMaleData | IPropFemaleData
}

const AddAndEditPropPerson: React.FC<IProps> = ({ PropPerson }) => {
  let defaultMaleData = {
    chairman: false,
    secondChairM: false,
    firstSpeach: false,
    gems: false,
    live: false,
    studyB: false,
    studyBReader: false,
    endPray: false,
  }
  let defaultFemaleData = {
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
  const [foundArrName, setFoundArrName] = useState([''])
  const [idEditPerson, setIdEditPerson] = useState('')
  const [editPropPerson, setEditPropPerson] = useState<
    IPropMaleData | IPropFemaleData
  >()

  useEffect(() => {
    setEditPropPerson(PropPerson)
  }, [PropPerson])

  useEffect(() => {
    if (editPropPerson) {
      searchByLetter(editPropPerson.lastFirstName)
      setGender(editPropPerson.gender)
      setDontUse(editPropPerson.dontUse)
      setComments(editPropPerson.comments)
      setIdEditPerson(editPropPerson._id)

      if (editPropPerson.gender === 'male') {
        const editP = editPropPerson as IMaleData
        const maleData = {
          chairman: editP.chairman,
          secondChairM: editP.secondChairM,
          firstSpeach: editP.firstSpeach,
          gems: editP.gems,
          live: editP.live,
          studyB: editP.studyB,
          studyBReader: editP.studyBReader,
          endPray: editP.endPray,
        }
        setMaleData(maleData)
      } else if (editPropPerson.gender === 'famale') {
        const editP = editPropPerson as IFemaleData
        const femaleData = {
          portnerOnly: editP.portnerOnly,
          secondClassOnly: editP.secondClassOnly,
          notBibleStudy: editP.notBibleStudy,
        }

        setFemaleData(femaleData)
      }
    }
  }, [editPropPerson])

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
        .getUsersByLastname(inputLatters)
        .then((filteredUsers) => {
          // Обработка отфильтрованных пользователей
          result = filteredUsers.map((item) => item.lastFirstName)
          //console.log('array filtered students', result)
        })
        .catch((error) => {
          console.error('Error searching users by lastname:', error)
        })
    }
    setInputLFName(inputLatters)
    setFoundArrName(result)
  }

  const addPerson = async () => {
    let personData: IUserDB
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
        }
        await window.api.writeOneUser(personData)
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
        }
        await window.api.writeOneUser(personData)
      }
      setClearState()
    } catch (error) {
      console.log('Error writing to database:', error)
    }
  }

  const editPerson = async () => {
    console.log('id edit person', idEditPerson)
  }

  const findToEdit = async (LFName: string) => {
    await window.api
      .getOneUserByLFName(LFName)
      .then((filteredUser) => {
        setEditPropPerson(filteredUser)
        //console.log('find to edit', filteredUser)
      })
      .catch((error) => {
        console.error('Error searching users by lastname:', error)
      })
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
          {editPropPerson ? (
            <button onClick={() => editPerson()}>Edit person</button>
          ) : (
            <button onClick={() => addPerson()}>Save person</button>
          )}
        </div>
      )}
      {foundArrName.length >= 1 && (
        <>
          <div>I found: </div>
          {foundArrName.map(
            (item, index) =>
              item && (
                <div onClick={() => findToEdit(item)} key={index}>
                  {item}
                </div>
              )
          )}
        </>
      )}
    </div>
  )
}

export default AddAndEditPropPerson
