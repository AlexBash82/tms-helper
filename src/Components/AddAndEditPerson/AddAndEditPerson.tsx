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

const AddAndEditPropPerson: React.FC<IProps> = ({
  PropPerson,
  getAllStudents,
}) => {
  const defaultStudentChBx: IStudentCheckBox = {
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
    useState<IStudentCheckBox>(defaultStudentChBx)
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
        const keysArray = Object.keys({} as IStudentDateToString) as Array<
          keyof IStudentDateToString
        >

        const result = {}
        keysArray.forEach((keyName) => {
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
        isPortnerOnly: editPropPerson.isPortnerOnly,
        isSecondClassOnly: editPropPerson.isSecondClassOnly,
        isNotBibleStudy: editPropPerson.isNotBibleStudy,
        isExplainSpeech: editPropPerson.isExplainSpeech,
        isRead: editPropPerson.isRead,
        isSpeech: editPropPerson.isSpeech,
        isEndPrayer: editPropPerson.isEndPrayer,
        isStudyBibleInReader: editPropPerson.isStudyBibleInReader,
        isGems: editPropPerson.isGems,
        isLiveAndServ: editPropPerson.isLiveAndServ,
        isFirstSpeach: editPropPerson.isFirstSpeach,
        isStudyBibleIn: editPropPerson.isStudyBibleIn,
        isSecondChairm: editPropPerson.isSecondChairm,
        isChairman: editPropPerson.isChairman,
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
    //нужно ли тут чистить имя и фамиию????
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
        const studentData: Omit<IStudent, '_id'> = {
          lastFirstName: inputLFName,
          gender: gender,
          dontUse: dontUse,
          comments: comments,
          plan: false,
          portners: [],

          latest: undefined,

          isPortnerOnly: inputCheckBox.isPortnerOnly,
          isSecondClassOnly: inputCheckBox.isSecondClassOnly,
          isNotBibleStudy: inputCheckBox.isNotBibleStudy,

          mainSlave: undefined,
          smallSlave: undefined,

          mainStarting: undefined,
          smallStarting: undefined,

          mainFollowing: undefined,
          smallFollowing: undefined,

          mainMaking: undefined,
          smallMaking: undefined,

          mainExplaining: undefined,
          smallExplaining: undefined,

          isExplainSpeech: inputCheckBox.isExplainSpeech,
          mainExplainSpeech: undefined,
          smallExplaiSpeech: undefined,

          isRead: inputCheckBox.isRead,
          mainRead: undefined,
          smallRead: undefined,

          isSpeech: inputCheckBox.isSpeech,
          mainSpeech: undefined,
          smallSpeech: undefined,

          isEndPrayer: inputCheckBox.isEndPrayer,
          endPrayer: undefined,

          isStudyBibleInReader: inputCheckBox.isStudyBibleInReader,
          studyBibleInReader: undefined,

          isGems: inputCheckBox.isGems,
          gems: undefined,

          isLiveAndServ: inputCheckBox.isLiveAndServ,
          liveAndServ: undefined,

          isFirstSpeach: inputCheckBox.isFirstSpeach,
          firstSpeach: undefined,

          isStudyBibleIn: inputCheckBox.isStudyBibleIn,
          studyBibleIn: undefined,

          isSecondChairm: inputCheckBox.isSecondChairm,
          secondChairm: undefined,

          isChairman: inputCheckBox.isChairman,
          chairman: undefined,
        }
        const result = await window.api.writeOneUser(studentData)
        alert(result.message)
      }

      setClearState()
      getAllStudents() //заново читаем весь список
    } catch (error) {
      console.log('Error writing to database:', error)
    }
  }

  const editPerson = async () => {
    if (editPropPerson) {
      const idPerson = editPropPerson._id
      const newValue = {
        ...inputCheckBox,
        lastFirstName: inputLFName,
        dontUse,
        comments,
      }
      //задание:
      //если в базе есть такое имя но id не совпадает, то не обновлять базу а сообщить об этом
      await window.api
        .editOneUser({ idPerson, newValue })
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
          {/* {editPropPerson.isChairman && (
            <div>chairman - {edPPDate?.chairman}</div>
          )} */}
          secondChairm: defoltStamp, firstSpeach: defoltStamp, gems:
          defoltStamp, mainRead: defoltStamp, smallRead: defoltStamp,
          mainSpeech: defoltStamp, smallSpeech: defoltStamp, liveAndServ:
          defoltStamp, studyBibleIn: defoltStamp, studyBibleInReader:
          defoltStamp, endPrayer: defoltStamp,
        </div>
      )}
    </div>
  )
}

export default AddAndEditPropPerson
