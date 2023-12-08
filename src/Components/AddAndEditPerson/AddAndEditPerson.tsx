import React, { useState, useEffect } from 'react'
import InputMale from './InputMale'
import InputFemale from './InputFemale'
import { IFemaleDB, IFemaleData, IMaleDB, IMaleData } from '../../interfaces'

//исключить возможность добавления одноименных пользователей----------------
//исключить возможность пробела в начале, в конце, и более одного между-----
//отключить кнопку save если инпут пуст
//редактирование: после введения информации искать по ID и изменять (id т.к. имя можно поменять)
//добавить кнопку возврата в "добавление пользователя"
//setIdEditPropPerson('') сбрасывать при возврате

interface IProps {
  PropPerson?: IMaleDB | IFemaleDB
}

const AddAndEditPropPerson: React.FC<IProps> = ({ PropPerson }) => {
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
  const [foundArrName, setFoundArrName] = useState([''])
  const [idEditPerson, setIdEditPerson] = useState('')
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
      setIdEditPerson(editPropPerson._id)

      if (editPropPerson.gender === 'male') {
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
        setMaleData(result as IMaleDB)
      } else if (editPropPerson.gender === 'famale') {
        const editP = editPropPerson as IFemaleDB
        const femaleData = {
          isPortnerOnly: editP.isPortnerOnly,
          isSecondClassOnly: editP.isSecondClassOnly,
          isNotBibleStudy: editP.isNotBibleStudy,
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
    let result: Array<string> = []
    if (inputLatters) {
      await window.api
        .getUsersByLastname(inputLatters)
        .then((filteredUsers) => {
          // Обработка отфильтрованных пользователей
          result = filteredUsers.map((item) => item.lastFirstName)
          console.log('array filtered students', result)
        })
        .catch((error) => {
          console.error('Error searching users by lastname:', error)
        })
    }
    setInputLFName(inputLatters)
    setFoundArrName(result)
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

          _id: '',
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

          _id: '',
        }
        await window.api.writeOneUser(personData)
      }
      setClearState()
    } catch (error) {
      console.log('Error writing to database:', error)
    }
  }

  // const addPerson = async () => {
  //   const result = await writeOneUserToDB(gender, inputLFName, maleData, dontUse, comments, femaleData)
  // }

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
      {foundArrName.length !== 0 && (
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
