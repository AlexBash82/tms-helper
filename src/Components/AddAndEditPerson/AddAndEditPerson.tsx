import React, { useState, useEffect } from 'react'
import InputCheckBox from './InputCheckBox'
import {
  IStudent,
  IStudentDateToString,
  IStudentCheckBox,
} from '../../interfaces'

//исключить возможность добавления одноименных пользователей--ok--------------
//исключить возможность пробела в начале, в конце, и более одного между-----
//отключить кнопку save если инпут пуст
//редактирование: после введения информации искать по ID и изменять (id т.к. имя можно поменять)
//исключить возможность редактирования если студент.план = тру

interface IProps {
  PropPerson?: IStudent
  getAllStudents: () => void
}

const AddAndEditPerson: React.FC<IProps> = ({ PropPerson, getAllStudents }) => {
  const defaultInputChBx: IStudentCheckBox = {
    isPortnerOnly: false,
    isSecondClassOnly: false,
    isNotBibleStudy: false,
    isExplainSpeech: false,
    isRead: false,
    isSpeech: false,
    isEndPrayer: false,
    isStudyBibleInReader: false,
    isGems: false,
    isLiveAndServ: false,
    isFirstSpeach: false,
    isStudyBibleIn: false,
    isSecondChairm: false,
    isChairman: false,
  }

  const [inputCheckBox, setInputCheckBox] =
    useState<IStudentCheckBox>(defaultInputChBx)
  const [inputLFName, setInputLFName] = useState('')
  const [gender, setGender] = useState('')
  const [dontUse, setDontUse] = useState(false)
  const [comments, setComments] = useState('')
  const [foundStudentsByLetter, setFoundStudentsByLetter] = useState<
    Array<IStudent>
  >([])
  const [editPropPerson, setEditPropPerson] = useState<IStudent>()

  //храним даные студента с преобразованными датами в формат "мм дд гггг"
  const [studentDateToString, setStudentDateToString] =
    useState<IStudentDateToString>()

  //если в пропсах есть студент, то преобразуем его метки времени в формат "мм дд гггг" и сохраняем в studentDateToString
  useEffect(() => {
    if (PropPerson) {
      //функция возвращает студента по типу IStudentDateToString
      const makeStudentDateToString = () => {
        // создаем строковый массив из ключей IStudentDateToString
        const keyOfStudentDateToString = [
          'latest',

          'mainSlave',
          'smallSlave',

          'mainStarting',
          'smallStarting',

          'mainFollowing',
          'smallFollowing',

          'mainMaking',
          'smallMaking',

          'mainExplaining',
          'smallExplaining',

          'mainExplainSpeech',
          'smallExplaiSpeech',

          'mainRead',
          'smallRead',

          'mainSpeech',
          'smallSpeech',

          'endPrayer',
          'studyBibleInReader',
          'gems',
          'liveAndServ',
          'firstSpeach',
          'studyBibleIn',
          'secondChairm',
          'chairman',
        ]

        const result = {}
        keyOfStudentDateToString.forEach((keyName) => {
          result[keyName] = getStringOrDefault(PropPerson, keyName)
        })
        return result as IStudentDateToString
      }

      const student = makeStudentDateToString()

      // const student: IStudentDateToString = {
      //   mainStarting: getDateToSting(PropPerson, 'mainStarting', 'Din not perform'),
      //   smallStarting: getDateToSting(PropPerson, 'smallStarting', 'Din not perform'),
      //   mainFollowing: getDateToSting(PropPerson, 'mainFollowing', 'Din not perform'),
      //   smallFollowing: getDateToSting(PropPerson, 'smallFollowing', 'Din not perform'),
      //   mainMaking: getDateToSting(PropPerson, 'mainMaking', 'Din not perform'),
      //   smallMaking: getDateToSting(PropPerson, 'smallMaking', 'Din not perform'),
      //   mainExplaining: getDateToSting(PropPerson, 'mainExplaining', 'Din not perform'),
      //   smallExplaining: getDateToSting(PropPerson, 'smallExplaining', 'Din not perform'),
      //   mainSlave: getDateToSting(PropPerson, 'mainSlave', 'Din not perform'),
      //   smallSlave: getDateToSting(PropPerson, 'smallSlave', 'Din not perform'),
      //   latest: getDateToSting(PropPerson, 'latest', 'Din not perform'),

      //   chairman: stampToDate(person.chairman)
      //   secondChairm: stampToDate(person.secondChairm)
      //   firstSpeach: stampToDate(person.firstSpeach)
      //   gems: stampToDate(person.gems)
      //   mainRead: stampToDate(person.mainRead)
      //   smallRead: stampToDate(person.smallRead)
      //   mainSpeech: stampToDate(person.mainSpeech)
      //   smallSpeech: stampToDate(person.smallSpeech)
      //   liveAndServ: stampToDate(person.liveAndServ)
      //   studyBibleIn: stampToDate(person.studyBibleIn)
      //   studyBibleInReader: stampToDate(person.studyBibleInReader)
      //   endPrayer: stampToDate(person.endPrayer)

      // }
      setStudentDateToString(student)
    }
  }, [PropPerson])

  //закидываем полученного в пропсах студента в состояние
  useEffect(() => {
    setEditPropPerson(PropPerson)
  }, [PropPerson])

  //проверяем ниличие ключа в обьекте и возвращаем stampToString или дефолтное зачение
  const getStringOrDefault = (obj: IStudent, key: string) => {
    if (key in obj && typeof obj[key] === 'number') {
      return stampToString(obj[key] as number)
    } else {
      return 'Din not perform'
    }
  }

  //преобразуем stamp в формат "мм дд гггг"
  const stampToString = (stamp: number) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const date = new Date(stamp)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const result = `${months[month]} ${day} ${year}`
    return result
  }

  //если есть editPropPerson, то заполняем данными checkBox, lastFirstName, gender, dontUse, comments
  useEffect(() => {
    if (editPropPerson) {
      const checkBoxData = {
        isPortnerOnly: editPropPerson.isPortnerOnly || false,
        isSecondClassOnly: editPropPerson.isSecondClassOnly || false,
        isNotBibleStudy: editPropPerson.isNotBibleStudy || false,
        isExplainSpeech: editPropPerson.isExplainSpeech || false,
        isRead: editPropPerson.isRead || false,
        isSpeech: editPropPerson.isSpeech || false,
        isEndPrayer: editPropPerson.isEndPrayer || false,
        isStudyBibleInReader: editPropPerson.isStudyBibleInReader || false,
        isGems: editPropPerson.isGems || false,
        isLiveAndServ: editPropPerson.isLiveAndServ || false,
        isFirstSpeach: editPropPerson.isFirstSpeach || false,
        isStudyBibleIn: editPropPerson.isStudyBibleIn || false,
        isSecondChairm: editPropPerson.isSecondChairm || false,
        isChairman: editPropPerson.isChairman || false,
      }
      setInputCheckBox(checkBoxData)

      searchByLetter(editPropPerson.lastFirstName)
      setGender(editPropPerson.gender)
      setDontUse(editPropPerson.dontUse)
      setComments(editPropPerson.comments)
    } else {
      setClearState()
    }
  }, [editPropPerson])

  const setClearState = () => {
    setInputLFName('')
    setGender('')
    setDontUse(false)
    setComments('')
    setFoundStudentsByLetter([])
    setInputCheckBox(defaultInputChBx)
  }

  //ищем по букве в фамилии и обновляем стейты setFoundStudentsByLetter и setInputLFName
  const searchByLetter = async (inputLatters: string) => {
    if (inputLatters) {
      const students = await window.api.getUsersByLastname(inputLatters)
      if (students.success) {
        setFoundStudentsByLetter(students.data)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    }
    setInputLFName(inputLatters)
  }

  const addPerson = async () => {
    try {
      //добавить проверку по переменной valid где проверять на пробелы и т.д.
      if (inputLFName !== '') {
        const defaultStudentData: Omit<IStudent, '_id'> = {
          lastFirstName: inputLFName,
          gender: gender,
          dontUse: dontUse,
          comments: comments,
          plan: false,
          portners: [],

          latest: null,

          isPortnerOnly: inputCheckBox.isPortnerOnly,
          isSecondClassOnly: inputCheckBox.isSecondClassOnly,
          isNotBibleStudy: inputCheckBox.isNotBibleStudy,

          mainSlave: null,
          smallSlave: null,

          mainStarting: null,
          smallStarting: null,

          mainFollowing: null,
          smallFollowing: null,

          mainMaking: null,
          smallMaking: null,

          mainExplaining: null,
          smallExplaining: null,

          isExplainSpeech: inputCheckBox.isExplainSpeech,
          mainExplainSpeech: null,
          smallExplaiSpeech: null,

          isRead: inputCheckBox.isRead,
          mainRead: null,
          smallRead: null,

          isSpeech: inputCheckBox.isSpeech,
          mainSpeech: null,
          smallSpeech: null,

          isEndPrayer: inputCheckBox.isEndPrayer,
          endPrayer: null,

          isStudyBibleInReader: inputCheckBox.isStudyBibleInReader,
          studyBibleInReader: null,

          isGems: inputCheckBox.isGems,
          gems: null,

          isLiveAndServ: inputCheckBox.isLiveAndServ,
          liveAndServ: null,

          isFirstSpeach: inputCheckBox.isFirstSpeach,
          firstSpeach: null,

          isStudyBibleIn: inputCheckBox.isStudyBibleIn,
          studyBibleIn: null,

          isSecondChairm: inputCheckBox.isSecondChairm,
          secondChairm: null,

          isChairman: inputCheckBox.isChairman,
          chairman: null,
        }
        const result = await window.api.writeOneUser(defaultStudentData)
        alert(result.message)
      }

      setClearState()
      getAllStudents() //заново читаем весь список
    } catch (error) {
      console.log('Error writing to database:', error)
    }
  }

  //эта функция не просто обновляет некоторые поля, она полность перезаписывает данные студента учитывая шаблон который в нее заложен через переменную newStudentData
  const editPerson = async () => {
    if (editPropPerson) {
      const newStudentData: Omit<IStudent, '_id'> = {
        lastFirstName: inputLFName,
        gender: gender,
        dontUse: dontUse,
        comments: comments,
        plan: editPropPerson.plan,
        portners: editPropPerson.portners,

        latest: editPropPerson.latest || null,

        isPortnerOnly: inputCheckBox.isPortnerOnly,
        isSecondClassOnly: inputCheckBox.isSecondClassOnly,
        isNotBibleStudy: inputCheckBox.isNotBibleStudy,

        mainSlave: editPropPerson.mainSlave || null,
        smallSlave: editPropPerson.smallSlave || null,

        mainStarting: editPropPerson.mainStarting || null,
        smallStarting: editPropPerson.smallStarting || null,

        mainFollowing: editPropPerson.mainFollowing || null,
        smallFollowing: editPropPerson.smallFollowing || null,

        mainMaking: editPropPerson.mainMaking || null,
        smallMaking: editPropPerson.smallMaking || null,

        mainExplaining: editPropPerson.mainExplaining || null,
        smallExplaining: editPropPerson.smallExplaining || null,

        isExplainSpeech: inputCheckBox.isExplainSpeech,
        mainExplainSpeech: editPropPerson.mainExplainSpeech || null,
        smallExplaiSpeech: editPropPerson.smallExplaiSpeech || null,

        isRead: inputCheckBox.isRead,
        mainRead: editPropPerson.mainRead || null,
        smallRead: editPropPerson.smallRead || null,

        isSpeech: inputCheckBox.isSpeech,
        mainSpeech: editPropPerson.mainSpeech || null,
        smallSpeech: editPropPerson.smallSpeech || null,

        isEndPrayer: inputCheckBox.isEndPrayer,
        endPrayer: editPropPerson.endPrayer || null,

        isStudyBibleInReader: inputCheckBox.isStudyBibleInReader,
        studyBibleInReader: editPropPerson.studyBibleInReader || null,

        isGems: inputCheckBox.isGems,
        gems: editPropPerson.gems || null,

        isLiveAndServ: inputCheckBox.isLiveAndServ,
        liveAndServ: editPropPerson.liveAndServ || null,

        isFirstSpeach: inputCheckBox.isFirstSpeach,
        firstSpeach: editPropPerson.firstSpeach || null,

        isStudyBibleIn: inputCheckBox.isStudyBibleIn,
        studyBibleIn: editPropPerson.studyBibleIn || null,

        isSecondChairm: inputCheckBox.isSecondChairm,
        secondChairm: editPropPerson.secondChairm || null,

        isChairman: inputCheckBox.isChairman,
        chairman: editPropPerson.chairman || null,
      }
      //задание:
      //если в базе есть такое имя но id не совпадает, то не обновлять базу а сообщить об этом
      await window.api
        .editOneUser({ idStudent: editPropPerson._id, newStudentData })
        .then((result) => {
          getAllStudents() //обновляем список после внесения изменений.
          alert(result.message)
        })
        .catch((error) => {
          console.error('Error edit user by id:', error)
        })
    }
  }

  // const findToEdit = async (LFName: string) => {
  //   const result = await window.api.getOneUserByLFName(LFName)
  //   if (result.success) {
  //     setEditPropPerson(result.data)
  //     //console.log('find to edit', filteredUser)
  //   } else {
  //     console.error('Error searching users by lastname:', result.message)
  //   }
  // }

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
      {editPropPerson ? (
        <>
          <input
            type="checkbox"
            value="Male"
            checked={gender === 'Male'}
            readOnly
          />
          -Male
          <input
            type="checkbox"
            value="Female"
            checked={gender === 'Female'}
            readOnly
          />
          -Female
        </>
      ) : (
        <>
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
        </>
      )}

      <InputCheckBox
        inputCheckBox={inputCheckBox}
        setInputCheckBox={setInputCheckBox}
        gender={gender}
      />

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
            <div className="myButton" onClick={() => editPerson()}>
              Confirm edit
            </div>
          ) : inputLFName === foundStudentsByLetter[0]?.lastFirstName ? (
            <div>That person is already exist</div>
          ) : (
            <button className="myButton" onClick={() => addPerson()}>
              Save person
            </button>
          )}
        </div>
      )}

      {(foundStudentsByLetter.length === 1 &&
        foundStudentsByLetter[0].lastFirstName !== inputLFName) ||
      foundStudentsByLetter.length > 1 ? (
        <div>
          <div>I've found in DB: </div>
          {foundStudentsByLetter.map(
            (student, index) =>
              student && (
                <div key={index}>
                  <div>{student.lastFirstName}</div>
                  <div
                    className="myButton"
                    onClick={() => setEditPropPerson(student)}
                  >
                    Edit that
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        false
      )}

      <div className="myButton" onClick={() => backToAddPerson()}>
        Back to add
      </div>

      {editPropPerson?.lastFirstName === inputLFName && (
        <div>
          <div>Another information about student</div>
          <div>latest - {studentDateToString?.latest}</div>
          <div>mainStarting - {studentDateToString?.mainStarting}</div>
          <div>smallStarting - {studentDateToString?.smallStarting}</div>
          <div>mainFollowing - {studentDateToString?.mainFollowing}</div>
          <div>smallFollowing - {studentDateToString?.smallFollowing}</div>
          <div>mainMaking - {studentDateToString?.mainMaking}</div>
          <div>smallMaking - {studentDateToString?.smallMaking}</div>
          <div>mainExplaining - {studentDateToString?.mainExplaining}</div>
          <div>smallExplaining - {studentDateToString?.smallExplaining}</div>
          <div>mainSlave - {studentDateToString?.mainSlave}</div>
          <div>smallSlave - {studentDateToString?.smallSlave}</div>
          {editPropPerson.plan ? (
            <div>student has planned</div>
          ) : (
            <div>student is open to plan</div>
          )}
          <div>portners - {editPropPerson.portners}</div>
          {editPropPerson.isChairman && (
            <div>chairman - {studentDateToString?.chairman}</div>
          )}
          {editPropPerson.isSecondChairm && (
            <div>secondChairm - {studentDateToString?.secondChairm}</div>
          )}
          {editPropPerson.isFirstSpeach && (
            <div>firstSpeach - {studentDateToString?.firstSpeach}</div>
          )}
          {editPropPerson.isGems && (
            <div>gems - {studentDateToString?.gems}</div>
          )}
          {editPropPerson.isRead && (
            <>
              <div>mainRead - {studentDateToString?.mainRead}</div>
              <div>smallRead - {studentDateToString?.smallRead}</div>
            </>
          )}
          {editPropPerson.isSpeech && (
            <>
              <div>mainSpeech - {studentDateToString?.mainSpeech}</div>
              <div>smallSpeech - {studentDateToString?.smallSpeech}</div>
            </>
          )}
          {editPropPerson.isLiveAndServ && (
            <div>liveAndServ - {studentDateToString?.liveAndServ}</div>
          )}
          {editPropPerson.isStudyBibleIn && (
            <div>studyBibleIn - {studentDateToString?.studyBibleIn}</div>
          )}
          {editPropPerson.isStudyBibleInReader && (
            <div>
              studyBibleInReader - {studentDateToString?.studyBibleInReader}
            </div>
          )}
          {editPropPerson.isEndPrayer && (
            <div>endPrayer - {studentDateToString?.endPrayer}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default AddAndEditPerson
