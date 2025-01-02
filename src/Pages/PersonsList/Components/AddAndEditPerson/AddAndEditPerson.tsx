import React, { useState, useEffect } from 'react'
import InputCheckBox from './InputCheckBox'
import {
  IStudent,
  IStudentDateToString,
  IStudentCheckBox,
} from '../../../../interfaces'

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

  explainTalkPointStMC?: string
  explainTalkPointStSC?: string

  bibleReadingPointStMC?: string
  bibleReadingPointStSC?: string

  talkPointStMC?: string
  talkPointStSC?: string

  endPrayerPoint?: string
  congBibleStudyReaderPoint?: string
  gemsPoint?: string
  livingAsChrPoint?: string
  firstTalkPoint?: string
  congBibleStudyPoint?: string
  secondChairmanPoint?: string
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
    isExplainTalk: false,
    isBibleReading: false,
    isTalk: false,
    isEndPrayer: false,
    isCongBibleStudyReader: false,
    isGems: false,
    isLivingAsChr: false,
    isFirstSpeech: false,
    isCongBibleStudy: false,
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

          'explainTalkPointStMC',
          'explainTalkPointStSC',

          'bibleReadingPointStMC',
          'bibleReadingPointStSC',

          'talkPointStMC',
          'talkPointStSC',

          'endPrayerPoint',
          'congBibleStudyReaderPoint',
          'gemsPoint',
          'livingAsChrPoint',
          'firstTalkPoint',
          'congBibleStudyPoint',
          'secondChairmanPoint',
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
        isExplainTalk: editPropPerson.isExplainTalk || false,
        isBibleReading: editPropPerson.isBibleReading || false,
        isTalk: editPropPerson.isTalk || false,
        isEndPrayer: editPropPerson.isEndPrayer || false,
        isCongBibleStudyReader: editPropPerson.isCongBibleStudyReader || false,
        isGems: editPropPerson.isGems || false,
        isLivingAsChr: editPropPerson.isLivingAsChr || false,
        isFirstSpeech: editPropPerson.isFirstSpeech || false,
        isCongBibleStudy: editPropPerson.isCongBibleStudy || false,
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
          status: 'free',
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

          isExplainTalk: inputCheckBox.isExplainTalk,
          explainTalkPointStMC: null,
          explainTalkPointStSC: null,

          isBibleReading: inputCheckBox.isBibleReading,
          bibleReadingPointStMC: null,
          bibleReadingPointStSC: null,

          isTalk: inputCheckBox.isTalk,
          talkPointStMC: null,
          talkPointStSC: null,

          isEndPrayer: inputCheckBox.isEndPrayer,
          endPrayerPoint: null,

          isCongBibleStudyReader: inputCheckBox.isCongBibleStudyReader,
          congBibleStudyReaderPoint: null,

          isGems: inputCheckBox.isGems,
          gemsPoint: null,

          isLivingAsChr: inputCheckBox.isLivingAsChr,
          livingAsChrPoint: null,

          isFirstSpeech: inputCheckBox.isFirstSpeech,
          firstTalkPoint: null,

          isCongBibleStudy: inputCheckBox.isCongBibleStudy,
          congBibleStudyPoint: null,

          isSecondChairm: inputCheckBox.isSecondChairm,
          secondChairmanPoint: null,

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
        status: editPropPerson.status,
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

        isExplainTalk: inputCheckBox.isExplainTalk,
        explainTalkPointStMC: editPropPerson.explainTalkPointStMC || null,
        explainTalkPointStSC: editPropPerson.explainTalkPointStSC || null,

        isBibleReading: inputCheckBox.isBibleReading,
        bibleReadingPointStMC: editPropPerson.bibleReadingPointStMC || null,
        bibleReadingPointStSC: editPropPerson.bibleReadingPointStSC || null,

        isTalk: inputCheckBox.isTalk,
        talkPointStMC: editPropPerson.talkPointStMC || null,
        talkPointStSC: editPropPerson.talkPointStSC || null,

        isEndPrayer: inputCheckBox.isEndPrayer,
        endPrayerPoint: editPropPerson.endPrayerPoint || null,

        isCongBibleStudyReader: inputCheckBox.isCongBibleStudyReader,
        congBibleStudyReaderPoint:
          editPropPerson.congBibleStudyReaderPoint || null,

        isGems: inputCheckBox.isGems,
        gemsPoint: editPropPerson.gemsPoint || null,

        isLivingAsChr: inputCheckBox.isLivingAsChr,
        livingAsChrPoint: editPropPerson.livingAsChrPoint || null,

        isFirstSpeech: inputCheckBox.isFirstSpeech,
        firstTalkPoint: editPropPerson.firstTalkPoint || null,

        isCongBibleStudy: inputCheckBox.isCongBibleStudy,
        congBibleStudyPoint: editPropPerson.congBibleStudyPoint || null,

        isSecondChairm: inputCheckBox.isSecondChairm,
        secondChairmanPoint: editPropPerson.secondChairmanPoint || null,

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
          {editPropPerson.status == 'planed' ? (
            <div>student has planned</div>
          ) : (
            <div>student is open to plan</div>
          )}
          <div>portner - one -{editPropPerson.portners[0]?.name}</div>
          {editPropPerson.isChairman && (
            <div>Chairman - {studentDateToString?.chairmanPoint}</div>
          )}
          {editPropPerson.isSecondChairm && (
            <div>
              second Chairm - {studentDateToString?.secondChairmanPoint}
            </div>
          )}
          {editPropPerson.isFirstSpeech && (
            <div>first Speech - {studentDateToString?.firstTalkPoint}</div>
          )}
          {editPropPerson.isGems && (
            <div>Gems - {studentDateToString?.gemsPoint}</div>
          )}
          {editPropPerson.isBibleReading && (
            <>
              <div>
                read in main- {studentDateToString?.bibleReadingPointStMC}
              </div>
              <div>
                read in small- {studentDateToString?.bibleReadingPointStSC}
              </div>
            </>
          )}
          {editPropPerson.isTalk && (
            <>
              <div>speech in main- {studentDateToString?.talkPointStMC}</div>
              <div>speech in small- {studentDateToString?.talkPointStSC}</div>
            </>
          )}
          {editPropPerson.isLivingAsChr && (
            <div>live and Serv - {studentDateToString?.livingAsChrPoint}</div>
          )}
          {editPropPerson.isCongBibleStudy && (
            <div>
              study Bible In - {studentDateToString?.congBibleStudyPoint}
            </div>
          )}
          {editPropPerson.isCongBibleStudyReader && (
            <div>
              congBibleStudyReaderPoint -{' '}
              {studentDateToString?.congBibleStudyReaderPoint}
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
