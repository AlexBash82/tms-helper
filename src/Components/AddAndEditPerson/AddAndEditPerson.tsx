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

interface IResultToStr {
  latest?: string

  assistantPointAsMC?: string
  assistantPointAsSC?: string

  startPointStMC?: string
  startPointStSC?: string

  followPointStMC?: string
  followPointStSC?: string

  makePointStMC?: string
  makePointStSC?: string

  explainPointStMC?: string
  explainPointStSC?: string

  explainSpPointStMC?: string
  explainSpPointStSC?: string

  readPointStMC?: string
  readPointStSC?: string

  speechPointStMC?: string
  speechPointStSC?: string

  endPrayerPoint?: string
  studyBibleInReaderPoint?: string
  gemsPoint?: string
  liveAndServPoint?: string
  firstSpeechPoint?: string
  studyBibleInPoint?: string
  secondChairmPoint?: string
  chairmanPoint?: string
}

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
    isFirstSpeech: false,
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

          'assistantPointAsMC',
          'assistantPointAsSC',

          'startPointStMC',
          'startPointStSC',

          'followPointStMC',
          'followPointStSC',

          'makePointStMC',
          'makePointStSC',

          'explainPointStMC',
          'explainPointStSC',

          'explainSpPointStMC',
          'explainSpPointStSC',

          'readPointStMC',
          'readPointStSC',

          'speechPointStMC',
          'speechPointStSC',

          'endPrayerPoint',
          'studyBibleInReaderPoint',
          'gemsPoint',
          'liveAndServPoint',
          'firstSpeechPoint',
          'studyBibleInPoint',
          'secondChairmPoint',
          'chairmanPoint',
        ]

        const result: IResultToStr = {}
        keyOfStudentDateToString.forEach((keyName) => {
          result[keyName as keyof typeof result] = getStringOrDefault(
            PropPerson,
            keyName
          )
        })
        return result as IStudentDateToString
      }

      const student = makeStudentDateToString()

      // const student: IStudentDateToString = {
      //   startPointStMC: getDateToSting(PropPerson, 'startPointStMC', 'Din not perform'),
      //   startPointStSC: getDateToSting(PropPerson, 'startPointStSC', 'Din not perform'),
      //   followPointStMC: getDateToSting(PropPerson, 'followPointStMC', 'Din not perform'),
      //   followPointStSC: getDateToSting(PropPerson, 'followPointStSC', 'Din not perform'),
      //   makePointStMC: getDateToSting(PropPerson, 'makePointStMC', 'Din not perform'),
      //   makePointStSC: getDateToSting(PropPerson, 'makePointStSC', 'Din not perform'),
      //   explainPointStMC: getDateToSting(PropPerson, 'explainPointStMC', 'Din not perform'),
      //   explainPointStSC: getDateToSting(PropPerson, 'explainPointStSC', 'Din not perform'),
      //   assistantPointAsMC: getDateToSting(PropPerson, 'assistantPointAsMC', 'Din not perform'),
      //   assistantPointAsSC: getDateToSting(PropPerson, 'assistantPointAsSC', 'Din not perform'),
      //   latest: getDateToSting(PropPerson, 'latest', 'Din not perform'),

      //   chairmanPoint: stampToDate(person.chairmanPoint)
      //   secondChairmPoint: stampToDate(person.secondChairmPoint)
      //   firstSpeechPoint: stampToDate(person.firstSpeechPoint)
      //   gemsPoint: stampToDate(person.gemsPoint)
      //   readPointStMC: stampToDate(person.readPointStMC)
      //   readPointStSC: stampToDate(person.readPointStSC)
      //   speechPointStMC: stampToDate(person.speechPointStMC)
      //   speechPointStSC: stampToDate(person.speechPointStSC)
      //   liveAndServPoint: stampToDate(person.liveAndServPoint)
      //   studyBibleInPoint:stampToDate(person.studyBibleInPoint)
      //   studyBibleInReaderPoint: stampToDate(person.studyBibleInReaderPoint)
      //   endPrayerPoint: stampToDate(person.endPrayerPoint)

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
    if (key in obj && typeof obj[key as keyof typeof obj] === 'number') {
      return stampToString(obj[key as keyof typeof obj] as number)
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
        isFirstSpeech: editPropPerson.isFirstSpeech || false,
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

          assistantPointAsMC: null,
          assistantPointAsSC: null,

          startPointStMC: null,
          startPointStSC: null,

          followPointStMC: null,
          followPointStSC: null,

          makePointStMC: null,
          makePointStSC: null,

          explainPointStMC: null,
          explainPointStSC: null,

          isExplainSpeech: inputCheckBox.isExplainSpeech,
          explainSpPointStMC: null,
          explainSpPointStSC: null,

          isRead: inputCheckBox.isRead,
          readPointStMC: null,
          readPointStSC: null,

          isSpeech: inputCheckBox.isSpeech,
          speechPointStMC: null,
          speechPointStSC: null,

          isEndPrayer: inputCheckBox.isEndPrayer,
          endPrayerPoint: null,

          isStudyBibleInReader: inputCheckBox.isStudyBibleInReader,
          studyBibleInReaderPoint: null,

          isGems: inputCheckBox.isGems,
          gemsPoint: null,

          isLiveAndServ: inputCheckBox.isLiveAndServ,
          liveAndServPoint: null,

          isFirstSpeech: inputCheckBox.isFirstSpeech,
          firstSpeechPoint: null,

          isStudyBibleIn: inputCheckBox.isStudyBibleIn,
          studyBibleInPoint: null,

          isSecondChairm: inputCheckBox.isSecondChairm,
          secondChairmPoint: null,

          isChairman: inputCheckBox.isChairman,
          chairmanPoint: null,
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

        assistantPointAsMC: editPropPerson.assistantPointAsMC || null,
        assistantPointAsSC: editPropPerson.assistantPointAsSC || null,

        startPointStMC: editPropPerson.startPointStMC || null,
        startPointStSC: editPropPerson.startPointStSC || null,

        followPointStMC: editPropPerson.followPointStMC || null,
        followPointStSC: editPropPerson.followPointStSC || null,

        makePointStMC: editPropPerson.makePointStMC || null,
        makePointStSC: editPropPerson.makePointStSC || null,

        explainPointStMC: editPropPerson.explainPointStMC || null,
        explainPointStSC: editPropPerson.explainPointStSC || null,

        isExplainSpeech: inputCheckBox.isExplainSpeech,
        explainSpPointStMC: editPropPerson.explainSpPointStMC || null,
        explainSpPointStSC: editPropPerson.explainSpPointStSC || null,

        isRead: inputCheckBox.isRead,
        readPointStMC: editPropPerson.readPointStMC || null,
        readPointStSC: editPropPerson.readPointStSC || null,

        isSpeech: inputCheckBox.isSpeech,
        speechPointStMC: editPropPerson.speechPointStMC || null,
        speechPointStSC: editPropPerson.speechPointStSC || null,

        isEndPrayer: inputCheckBox.isEndPrayer,
        endPrayerPoint: editPropPerson.endPrayerPoint || null,

        isStudyBibleInReader: inputCheckBox.isStudyBibleInReader,
        studyBibleInReaderPoint: editPropPerson.studyBibleInReaderPoint || null,

        isGems: inputCheckBox.isGems,
        gemsPoint: editPropPerson.gemsPoint || null,

        isLiveAndServ: inputCheckBox.isLiveAndServ,
        liveAndServPoint: editPropPerson.liveAndServPoint || null,

        isFirstSpeech: inputCheckBox.isFirstSpeech,
        firstSpeechPoint: editPropPerson.firstSpeechPoint || null,

        isStudyBibleIn: inputCheckBox.isStudyBibleIn,
        studyBibleInPoint: editPropPerson.studyBibleInPoint || null,

        isSecondChairm: inputCheckBox.isSecondChairm,
        secondChairmPoint: editPropPerson.secondChairmPoint || null,

        isChairman: inputCheckBox.isChairman,
        chairmanPoint: editPropPerson.chairmanPoint || null,
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
          <div>startPointStMC - {studentDateToString?.startPointStMC}</div>
          <div>startPointStSC - {studentDateToString?.startPointStSC}</div>
          <div>followPointStMC - {studentDateToString?.followPointStMC}</div>
          <div>followPointStSC - {studentDateToString?.followPointStSC}</div>
          <div>makePointStMC - {studentDateToString?.makePointStMC}</div>
          <div>makePointStSC - {studentDateToString?.makePointStSC}</div>
          <div>explainPointStMC - {studentDateToString?.explainPointStMC}</div>
          <div>explainPointStSC - {studentDateToString?.explainPointStSC}</div>
          <div>
            assistantPointAsMC - {studentDateToString?.assistantPointAsMC}
          </div>
          <div>
            assistantPointAsSC - {studentDateToString?.assistantPointAsSC}
          </div>
          {editPropPerson.plan ? (
            <div>student has planned</div>
          ) : (
            <div>student is open to plan</div>
          )}
          <div>portner - one -{editPropPerson.portners[0]?.name}</div>
          {editPropPerson.isChairman && (
            <div>Chairman - {studentDateToString?.chairmanPoint}</div>
          )}
          {editPropPerson.isSecondChairm && (
            <div>second Chairm - {studentDateToString?.secondChairmPoint}</div>
          )}
          {editPropPerson.isFirstSpeech && (
            <div>first Speech - {studentDateToString?.firstSpeechPoint}</div>
          )}
          {editPropPerson.isGems && (
            <div>Gems - {studentDateToString?.gemsPoint}</div>
          )}
          {editPropPerson.isRead && (
            <>
              <div>read in main- {studentDateToString?.readPointStMC}</div>
              <div>read in small- {studentDateToString?.readPointStSC}</div>
            </>
          )}
          {editPropPerson.isSpeech && (
            <>
              <div>speech in main- {studentDateToString?.speechPointStMC}</div>
              <div>speech in small- {studentDateToString?.speechPointStSC}</div>
            </>
          )}
          {editPropPerson.isLiveAndServ && (
            <div>live and Serv - {studentDateToString?.liveAndServPoint}</div>
          )}
          {editPropPerson.isStudyBibleIn && (
            <div>study Bible In - {studentDateToString?.studyBibleInPoint}</div>
          )}
          {editPropPerson.isStudyBibleInReader && (
            <div>
              studyBibleInReaderPoint -{' '}
              {studentDateToString?.studyBibleInReaderPoint}
            </div>
          )}
          {editPropPerson.isEndPrayer && (
            <div>end Prayer - {studentDateToString?.endPrayerPoint}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default AddAndEditPerson
