import React, { useEffect, useState } from 'react'
import './AddInfoByWeek.css'
import { getStartAndEndWeek } from '../../Servces/getStartAndEndWeek'
import { getTimeStamps } from '../../Servces/getTimeStamps'
import Weeks from './Components/Weeks/Weeks'
import SingleInput from './Components/SingleInput/SingleInput'
import CoupleInputs from './Components/CoupleInputs/CoupleInputs'
import BuildWeek from './Components/BuildWeek/BuildWeek'
import { IWeek, IWeekCopy } from '../../interfaces'
import _ from 'lodash'

interface Amount {
  keysOfCopyWeek: number
  successUpdated: number
  unSuccessUpdated: string[]
}

interface IUpdateData {
  idStudent: string
  newStudentData: {
    [key: string]:
      | number
      | boolean
      | Array<{ name: string; _id: string }>
      | undefined
      | string
    // latest?: number
    // portners?: Array<{ name: string; _id: string }>
  }
}

//----------------------------------------------------------------сделать кнопку формирования бланка

const AddInfoByWeek: React.FC = () => {
  const allTitles: { [key: string]: string } = {
    firstTalkPoint: 'First Talk',
    gemsPoint: 'Spiritual Gems',
    livingAsChrPoint: 'Living as christian',
    congBibleStudyPoint: 'Congregation Bible Study',
    chairmanPoint: 'Chairman',
    congBibleStudyReaderPoint: 'Cong. Bible St. reader',
    endPrayerPoint: 'Prayer',
    secondChairmanPoint: 'Second Class Chairman',
    bibleReadingPointStMC: 'Bible Reading',
    bibleReadingPointStSC: 'Bible Reading',
  }

  const defaultWeekState: IWeek = {
    _id: undefined,
    startWeekTSt: 0,
    dateOfMeet: '',
    isPlanned: false,

    comment: '',
    range: '',

    teachingChBx: false,
    trainingChBx: false,
    secondClassChBx: false,

    // startPointChBx: false,
    // followPointChBx: false,
    // makePointChBx: false,
    // explainPointChBx: false,
    // explainTalkPointChBx: false,
    // talkPointChBx: false,

    // lessonOneChBx: false,
    // lessonTwoChBx: false,
    // liveAndServTwoChBx: false,
    // liveAndServThreeChBx: false,

    list: [],
    // { chairmanPointT00: null }, // { name: string; _id: string }
    // { firstTalkPointT01: null },
    // { gemsPointT02: null },

    // bibleReadingPointStSCT03: null,

    // secondChairmanPoint: null,

    // startPointStMC: null,
    // startPointAsMC: null,
    // followPointStMC: null,
    // followPointAsMC: null,
    // makePointStMC: null,
    // makePointAsMC: null,
    // explainPointStMC: null,
    // explainPointAsMC: null,
    // talkPointStMC: null,

    // startPointStSC: null,
    // startPointAsSC: null,
    // followPointStSC: null,
    // followPointAsSC: null,
    // makePointStSC: null,
    // makePointAsSC: null,
    // explainPointStSC: null,
    // explainPointAsSC: null,
    // explainTalkPointStMC: null,
    // explainTalkPointStSC: null,
    // talkPointStSC: null,
  }
  const [weekState, setWeekState] = useState<IWeek>(defaultWeekState)
  const [isBuildWeekOpen, setBuildWeekOpen] = useState(false)

  const [openedList, setOpenedList] = useState<string | undefined>()
  const [action, setAction] = useState<
    'plan' | 'confirm' | 'update' | undefined
  >()

  const timeEndOfMeet = '20:45' //------------настроить получение из бд--------------------------------------------------------

  const getSettings = async () => {
    const defaultSetting = await window.api.getSettings()
    return defaultSetting.success ? defaultSetting.data : undefined
  }

  const openAndChoose = (task: string) => {
    openedList === task ? setOpenedList('') : setOpenedList(task)
  }

  const makeAMeet = async (inpDateOfMeet: string) => {
    //inpDateOfMeet - дата выбранная пользователем в календаре или при нажатии на уже созданную неделю

    const { timeStampInp, timestampNow } = getTimeStamps(
      inpDateOfMeet,
      timeEndOfMeet
    )
    const { startWeekTSt } = getStartAndEndWeek(inpDateOfMeet)

    //условие: если выбранная дата - это будущее
    if (timeStampInp > timestampNow) {
      const isPlanned = true
      const result = await writeDefaultWeekToDB(
        inpDateOfMeet,
        startWeekTSt,
        isPlanned
      )
      //в случае result.success: data = уже имеющаяся неделя, либо только что созданная
      if (result.success) {
        setWeekState(result.data)
      }
      setAction('plan')
    }

    //условие: если выбранная дата - это прошлое
    if (timeStampInp < timestampNow) {
      //проверяем есть ли эта неделя в планах и если есть полуачем ее
      const isWeekExist = await window.api.getOneWeek(inpDateOfMeet)
      if (isWeekExist.success) {
        setWeekState(isWeekExist.data)

        //если прошедшая неделя была в планах, то включаем "подтверждение", иначе "обновление"
        if (isWeekExist.data.isPlanned) {
          setAction('confirm')
        } else {
          setAction('update')
        }
      } else {
        //если такой недели в запланированных нет, то создаем ее
        const isPlanned = false
        const result = await writeDefaultWeekToDB(
          inpDateOfMeet,
          startWeekTSt,
          isPlanned
        )

        //включаем режим "обновление"
        if (result.success) {
          setWeekState(result.data)
          setAction('update')
        } //а сли не успех
      }
    }
    openAndChoose('')
  }

  const writeDefaultWeekToDB = async (
    inpDateOfMeet: string,
    startWeekTSt: number,
    isPlanned: boolean
  ) => {
    const newWeek = _.cloneDeep(defaultWeekState)

    Object.assign(newWeek, {
      dateOfMeet: inpDateOfMeet,
      startWeekTSt,
      isPlanned,
    })

    //------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    //------добавить вставку дефолтной недели в зависимости от того что выбрано в настройках.

    //const gotSettings = await getSettings()
    //console.log('def ', gotSettings)
    //закомментировал метод и пока поставил загушку:
    const gotSettings = {
      teachingChBx: false,
      trainingChBx: true,
      secondClassChBx: true,
      timeEndOfMeet: '20:45',
      _id: '6qTAW7vEdD5QVOZG',
    }

    setBuildWeekOpen(true)

    if (gotSettings && gotSettings.teachingChBx) {
      Object.assign(newWeek, {
        teachingChBx: true,
      })
      newWeek.list.push(
        { chairmanPointT00: null },
        { firstTalkPointT01: null },
        { gemsPointT02: null }
      )

      if (gotSettings.secondClassChBx) {
        Object.assign(newWeek, {
          secondClassChBx: true,
        })
        newWeek.list.push()
      }
    }

    if (gotSettings && gotSettings.trainingChBx) {
      Object.assign(newWeek, {
        trainingChBx: true,
      })
      newWeek.list.push({ bibleReadingPointStMCT03: null })

      if (gotSettings.secondClassChBx) {
        Object.assign(newWeek, {
          secondClassChBx: true,
        })
        newWeek.list.push()
      }
    }

    delete newWeek._id
    //console.log('sending to db', newWeek)
    const result = await window.api.writeNewWeek(newWeek)
    //console.log('getting back from db', result)
    return result
  }

  // const makeChangeChBx = async (nameChBx: string, value: boolean) => {
  //   const updateWeek = {
  //     dateOfMeet: weekState.dateOfMeet,
  //     keyName: nameChBx,
  //     newValue: value,
  //   }
  //   const resultWeek = await window.api.updateOneWeek(updateWeek)
  //   //console.log('makeChangeChBx', resultWeek)
  //   if (resultWeek.success) {
  //     getCurrentWeek()
  //   }
  // }

  const getCurrentWeek = async () => {
    if (weekState.dateOfMeet) {
      const weekFromBD = await window.api.getOneWeek(weekState.dateOfMeet)
      if (weekFromBD.success) {
        setWeekState(weekFromBD.data)
      }
    }
  }

  //---CONFIRM WEEK------------------------------------------------------------------------------------------------
  // меняем (plan: trye на false) status !!!! у всех студентов в этой неделе
  // в БД студента вносим дату в поля задания и в latest
  // Обновляем напарников студента
  // Удаляем неделю из БД.
  const confirmWeek = async () => {
    // Получаем метку времени даты недели
    const { timeStampInp } = getTimeStamps(weekState.dateOfMeet, timeEndOfMeet)

    // инициализируем счетчики: количества заданий недели, количества успешных и провальных обновлений
    const amount: Amount = {
      keysOfCopyWeek: 0,
      successUpdated: 0,
      unSuccessUpdated: [],
    }

    // проходим по weekState.list, получаем на каждый ход: "name" - студента из БД
    for (const taskAndName of weekState.list) {
      amount.keysOfCopyWeek += 1

      const task = Object.keys(taskAndName)[0]
      const name = taskAndName[task]?.name

      if (task && name) {
        const student = await window.api.getOneUserByLFName(name)
        if (student.success) {
          //формируем ключ для поиска в БД у студента, т.к. некоторые поля в БД недели отличаются
          let key = task

          //находим те поля, что отличаются и формируем key
          if (task.includes('AsMC')) key = 'assistantPointAsMC'
          if (task.includes('AsSC')) key = 'assistantPointAsSC'
          if (task.includes('lesson')) key = 'livingAsChrPoint'
          if (task.includes('live')) key = 'livingAsChrPoint'

          const updateData: IUpdateData = {
            idStudent: student.data._id,
            newStudentData: {
              [key]: timeStampInp,
              latest: timeStampInp,
              status: 'free',
            },
          }

          //проверям есть ли напарник у этого задания и добавляем в updateData.newStudentData
          if (
            task.includes('startPointSt') ||
            task.includes('followPointSt') ||
            task.includes('makePointSt') ||
            task.includes('explainPointSt')
          ) {
            let searchPortner: {
              name: string
              _id: string
            } | null = null

            //присваеваем searchPortner имя напарника и его id из недели, если есть
            const taskKeyMap: { [key: string]: string } = {
              startPointStMC: 'startPointAsMC',
              startPointStSC: 'startPointAsSC',
              followPointStMC: 'followPointAsMC',
              followPointStSC: 'followPointAsSC',
              makePointStMC: 'makePointAsMC',
              makePointStSC: 'makePointAsSC',
              explainPointStMC: 'explainPointAsMC',
              explainPointStSC: 'explainPointAsSC',
            }

            const keyToFind = taskKeyMap[task]
            if (keyToFind) {
              const foundObj = weekState.list.find((obj) =>
                obj.hasOwnProperty(keyToFind)
              )
              searchPortner = foundObj ? foundObj[keyToFind] : null
            } else {
              searchPortner = null
            }

            //ищем у студента в массиве этого напарника и если нет добавляем в updateData.newStudentData
            if (searchPortner) {
              const isPortnerExist = student.data.portners.find(
                (portner) => portner._id === searchPortner?._id
              )

              if (!isPortnerExist) {
                student.data.portners.push(searchPortner)
                updateData.newStudentData.portners = student.data.portners
              }
            }
          }

          const result = await window.api.editOneUser(updateData)

          if (result.success) {
            amount.successUpdated += 1
            //console.log('3 stud key: ', key, 'value: ', result.data[key])
          } else {
            amount.unSuccessUpdated.push(student.data.lastFirstName)
          }
        }
      }
    }

    if (amount.unSuccessUpdated.length) {
      alert(`ERROR: I can not update: ${amount.unSuccessUpdated}`)
    }

    if (
      amount.successUpdated > 0 &&
      amount.successUpdated === amount.keysOfCopyWeek
    ) {
      alert(
        `All ${amount.successUpdated} student${
          amount.successUpdated === 1 ? '' : 's'
        } was succesfully updated`
      )
    } else if (amount.successUpdated === 0 && amount.keysOfCopyWeek === 0) {
      alert('I deleted empty week')
    }

    const result = await window.api.deleteOneWeek(weekState.dateOfMeet)
    if (result.success) {
      setWeekState(defaultWeekState)
      setAction(undefined)
    }
  }

  //---UPDATE WEEK-------------------------------------------------------------------------------------------------
  // заполнение базы выступлений уже прошедшими неделями
  // сравниваем дату недели с графой соответствующего студента в базе и, если дата недели свежее, то
  // ...то обновляем в базе поле даты выступления студента.
  // обновляем напарников студента.
  // Удаляем неделю из БД.
  const updateWeek = async () => {
    // Получаем метку времени даты недели
    const { timeStampInp } = getTimeStamps(weekState.dateOfMeet, timeEndOfMeet)

    // инициализируем счетчики: количества заданий недели, количества успешных и провальных обновлений
    const amount: Amount = {
      keysOfCopyWeek: 0,
      successUpdated: 0,
      unSuccessUpdated: [],
    }

    // проходим по weekState.list, получаем на каждый ход: "name" - студента из БД
    for (const taskAndName of weekState.list) {
      amount.keysOfCopyWeek += 1

      const task = Object.keys(taskAndName)[0]
      const name = taskAndName[task]?.name

      if (task && name) {
        const student = await window.api.getOneUserByLFName(name)
        if (student.success) {
          //т.к. некоторые поля в БД недели отличаются от полей в БД студента
          //формируем ключ для поиска у студента нужного поля

          let key = task
          //находим те поля, что отличаются и формируем key
          if (task.includes('AsMC')) key = 'assistantPointAsMC'
          if (task.includes('AsSC')) key = 'assistantPointAsSC'
          if (task.includes('lesson')) key = 'livingAsChrPoint'
          if (task.includes('live')) key = 'livingAsChrPoint'

          const updateData: IUpdateData = {
            idStudent: student.data._id,
            newStudentData: {},
          }

          //проверяем является ли task более свежим чем timeStampInp и добавляем в updateData.newStudentData
          if (
            student.data[key as keyof typeof student.data] === null ||
            (student.data[key as keyof typeof student.data] as number) <
              timeStampInp
          )
            updateData.newStudentData[key] = timeStampInp

          //проверяем является ли latest более свежим чем timeStampInp и добавляем в updateData.newStudentData
          if (
            student.data.latest === null ||
            student.data.latest < timeStampInp
          )
            updateData.newStudentData.latest = timeStampInp

          //проверям есть ли напарник у этого задания и добавляем в updateData.newStudentData
          if (
            task.includes('startPointSt') ||
            task.includes('followPointSt') ||
            task.includes('makePointSt') ||
            task.includes('explainPointSt')
          ) {
            let searchPortner: { name: string; _id: string } | null = null

            //присваеваем searchPortner имя напарника и его id из недели, если есть
            const taskKeyMap: { [key: string]: string } = {
              startPointStMC: 'startPointAsMC',
              startPointStSC: 'startPointAsSC',
              followPointStMC: 'followPointAsMC',
              followPointStSC: 'followPointAsSC',
              makePointStMC: 'makePointAsMC',
              makePointStSC: 'makePointAsSC',
              explainPointStMC: 'explainPointAsMC',
              explainPointStSC: 'explainPointAsSC',
            }

            const keyToFind = taskKeyMap[task]
            if (keyToFind) {
              const foundObj = weekState.list.find((obj) =>
                obj.hasOwnProperty(keyToFind)
              )
              searchPortner = foundObj ? foundObj[keyToFind] : null
            } else {
              searchPortner = null
            }

            //ищем у студента в массиве этого напарника и если нет добавляем в updateData.newStudentData
            if (searchPortner) {
              const isPortnerExist = student.data.portners.find(
                (portner) => portner._id === searchPortner?._id
              )

              if (!isPortnerExist) {
                student.data.portners.push(searchPortner)
                updateData.newStudentData.portners = student.data.portners
              }
            }
          }

          // Добавляем поля студента, если есть, что обновлять
          if (Object.keys(updateData.newStudentData).length) {
            const result = await window.api.editOneUser(updateData)

            if (result.success) {
              amount.successUpdated += 1
              //console.log('3 stud key: ', key, 'value: ', result.data[key])
            } else {
              amount.unSuccessUpdated.push(student.data.lastFirstName)
            }
          }
        }
      }
    }

    if (amount.unSuccessUpdated.length) {
      alert(`ERROR: I can not update: ${amount.unSuccessUpdated}`)
    }

    if (
      amount.successUpdated > 0 &&
      amount.successUpdated === amount.keysOfCopyWeek
    ) {
      alert(
        `All ${amount.successUpdated} student${
          amount.successUpdated === 1 ? '' : 's'
        } was succesfully updated`
      )
    } else if (amount.successUpdated === 0 && amount.keysOfCopyWeek > 0) {
      alert('Everything is already updated')
    } else if (amount.successUpdated === 0 && amount.keysOfCopyWeek === 0) {
      alert('I deleted empty week')
    } else {
      alert(
        `I just updated ${amount.successUpdated} of the ${
          amount.keysOfCopyWeek
        } student${amount.keysOfCopyWeek === 1 ? '' : 's'}`
      )
    }

    const result = await window.api.deleteOneWeek(weekState.dateOfMeet)
    if (result.success) {
      setWeekState(defaultWeekState)
      setAction(undefined)
    }
  }
  //----DELETE PLAN------------------------------------------------------------------------------------------------
  // меняем (plan: trye на false) status!!!! у всех студентов в этой неделе. Удаляем неделю из БД.
  const deletePlan = async () => {
    // инициализируем счетчики: количества заданий недели, количества успешных и провальных обновлений
    const amount: Amount = {
      keysOfCopyWeek: 0,
      successUpdated: 0,
      unSuccessUpdated: [],
    }

    // проходим по weekState.list, получаем на каждый ход: "name" - студента из БД
    for (const taskAndName of weekState.list) {
      amount.keysOfCopyWeek += 1

      const task = Object.keys(taskAndName)[0]
      const name = taskAndName[task]?.name

      if (task && name) {
        const student = await window.api.getOneUserByLFName(name)
        if (student.success) {
          const updateData = {
            idStudent: student.data._id,
            newStudentData: {
              status: 'free',
            },
          }

          const result = await window.api.editOneUser(updateData)

          if (result.success) {
            amount.successUpdated += 1
            //console.log('3 stud key: ', key, 'value: ', result.data[key])
          } else {
            amount.unSuccessUpdated.push(student.data.lastFirstName)
          }
        }
      }
    }

    if (amount.unSuccessUpdated.length) {
      alert(`ERROR: I can not update: ${amount.unSuccessUpdated}`)
    }

    if (
      amount.successUpdated > 0 &&
      amount.successUpdated === amount.keysOfCopyWeek
    ) {
      alert(
        `All ${amount.successUpdated} student${
          amount.successUpdated === 1 ? '' : 's'
        } was succesfully updated`
      )
    } else if (amount.successUpdated === 0 && amount.keysOfCopyWeek === 0) {
      alert('I deleted empty week')
    }

    const result = await window.api.deleteOneWeek(weekState.dateOfMeet)
    if (result.success) {
      setWeekState(defaultWeekState)
      setAction(undefined)
    }
  }
  //-------DELETE WEEK---------------------------------------------------------------------------------------------
  const deleteWeek = async () => {
    console.log('delete weekState', weekState.dateOfMeet)
    if (weekState.dateOfMeet) {
      const result = await window.api.deleteOneWeek(weekState.dateOfMeet)
      if (result.success) {
        alert(result.message)
        setWeekState(defaultWeekState)
        setAction(undefined)
      }
    }
  }
  //---------------------------------------------------------------------------------------------------------------

  const getTask = (title: string) => {
    // нужно пройтись по всем массивам и найти нужный
    const result = weekState.list.find(
      (obj) => Object.keys(obj)[0] === title
    )?.[title]
    return result
  }

  return (
    <div>
      <BuildWeek
        isBildWeekOpen={isBuildWeekOpen}
        onCloseBildWeek={() => setBuildWeekOpen(false)}
      />
      <Weeks
        timeEndOfMeet={timeEndOfMeet}
        makeAMeet={makeAMeet}
        dateOfMeet={weekState.dateOfMeet}
      />
      {action === 'plan' ? (
        <div>Plan the week</div>
      ) : action === 'confirm' ? (
        <div>Confirm the week</div>
      ) : action === 'update' ? (
        <div>Update the week</div>
      ) : (
        <></>
      )}
      <input
        placeholder="Date of meeting"
        type="date"
        value={weekState.dateOfMeet ? weekState.dateOfMeet : ''}
        onChange={(e) => makeAMeet(e.target.value)}
      />
      {!weekState.dateOfMeet ? (
        <div>For creating new week just choose the date</div>
      ) : (
        <div
          className={`grid-container ${
            weekState.teachingChBx ? 'teaching' : ''
          }`}
        >
          <input type="checkbox" checked={weekState.teachingChBx} readOnly />
          -Teaching points
          <input type="checkbox" checked={weekState.trainingChBx} readOnly />
          -Training points
          <input type="checkbox" checked={weekState.secondClassChBx} readOnly />
          - Second class
          {/*---------------------------Teaching--------------------------- */}
          <div>TREASURES FROM GOD'S WORD</div>
          {weekState.teachingChBx && (
            <div className="df">
              {weekState.list.map((itemOfList) => {
                const fullTask = Object.keys(itemOfList)[0]
                if (fullTask) {
                  const title = allTitles[fullTask.slice(0, -3)]
                  const numberOfTask = +fullTask.slice(-1)
                  if (numberOfTask < 3) {
                    const fullTitle =
                      numberOfTask == 0 ? title : `${numberOfTask}-${title}`
                    return (
                      <SingleInput
                        key={fullTask}
                        title={fullTitle}
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={itemOfList[fullTask]}
                        fullTask={fullTask}
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )
                  }
                }
              })}
            </div>
          )}
          {/*---------------------------Training--------------------------- */}
          {weekState.trainingChBx && (
            <div className="df">
              {weekState.list.map((itemOfList) => {
                const fullTask = Object.keys(itemOfList)[0]
                if (fullTask) {
                  const title = allTitles[fullTask.slice(0, -3)]
                  const numberOfTask = +fullTask.slice(-1)
                  if (numberOfTask == 3) {
                    const fullTitle = `${numberOfTask}-${title}`
                    return (
                      <SingleInput
                        key={fullTask}
                        title={fullTitle}
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={itemOfList[fullTask]}
                        fullTask={fullTask}
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )
                  }
                }
              })}
            </div>
          )}
          <div>APPLY YOURSELF TO THE FIELD MINISTRY</div>
          {weekState.trainingChBx && (
            <></>
            // <div className="df">
            //   <div>
            //     <div>Choose</div>

            //     <div className="df">
            //       <input type="checkbox" checked={true} readOnly />
            //       <div> - Bible Reading</div>
            //     </div>

            //     <div className="df">
            //       <input
            //         type="checkbox"
            //         checked={weekState.startPointChBx}
            //         onChange={(e) =>
            //           makeChangeChBx(
            //             'startPointChBx',
            //             !weekState.startPointChBx
            //           )
            //         }
            //       />
            //       <div> - Starting a Conversation</div>
            //     </div>

            //     <div className="df">
            //       <input
            //         type="checkbox"
            //         checked={weekState.followPointChBx}
            //         onChange={(e) =>
            //           makeChangeChBx(
            //             'followPointChBx',
            //             !weekState.followPointChBx
            //           )
            //         }
            //       />
            //       <div> - Following Up</div>
            //     </div>

            //     <div className="df">
            //       <input
            //         type="checkbox"
            //         checked={weekState.makePointChBx}
            //         onChange={(e) =>
            //           makeChangeChBx('makePointChBx', !weekState.makePointChBx)
            //         }
            //       />
            //       <div> - Making Disciples</div>
            //     </div>

            //     <div className="df">
            //       <input
            //         type="checkbox"
            //         checked={weekState.explainTalkPointChBx}
            //         onChange={(e) =>
            //           makeChangeChBx(
            //             'explainTalkPointChBx',
            //             !weekState.explainTalkPointChBx
            //           )
            //         }
            //       />
            //       <div> - Explaining as Speech</div>
            //     </div>

            //     <div className="df">
            //       <input
            //         type="checkbox"
            //         checked={weekState.explainPointChBx}
            //         onChange={(e) =>
            //           makeChangeChBx(
            //             'explainPointChBx',
            //             !weekState.explainPointChBx
            //           )
            //         }
            //       />
            //       <div> - Explaining Your Beliefs</div>
            //     </div>

            //     <div className="df">
            //       <input
            //         type="checkbox"
            //         checked={weekState.talkPointChBx}
            //         onChange={(e) =>
            //           makeChangeChBx('talkPointChBx', !weekState.talkPointChBx)
            //         }
            //       />
            //       <div> - Talk</div>
            //     </div>
            //   </div>
            //   {/*---------------------------Main class--------------------------- */}
            //   <div>
            //     <div>Training points main class</div>

            //     <SingleInput
            //       title={'Bible Reading'}
            //       openAndChoose={openAndChoose}
            //       openedList={openedList}
            //       firstInput={getNumbStTask('bibleReadingPointStMC')}
            //       task="bibleReadingPointStMC"
            //       getCurrentWeek={getCurrentWeek}
            //       action={action}
            //       dateOfMeet={weekState.dateOfMeet}
            //     />

            //     {weekState.startPointChBx && (
            //       <CoupleInputs
            //         title={'Starting a Conversation'}
            //         openAndChoose={openAndChoose}
            //         openedList={openedList}
            //         firstInput={getNumbStTask('startPointStMC')}
            //         firstTask="startPointStMC"
            //         getCurrentWeek={getCurrentWeek}
            //         secondInput={getNumbAsTask('startPointAsMC')}
            //         secondTask="startPointAsMC"
            //         action={action}
            //         dateOfMeet={weekState.dateOfMeet}
            //       />
            //     )}

            //     {weekState.followPointChBx && (
            //       <CoupleInputs
            //         title="Following Up"
            //         openAndChoose={openAndChoose}
            //         openedList={openedList}
            //         firstInput={getNumbStTask('followPointStMC')}
            //         firstTask="followPointStMC"
            //         getCurrentWeek={getCurrentWeek}
            //         secondInput={getNumbAsTask('followPointAsMC')}
            //         secondTask="followPointAsMC"
            //         action={action}
            //         dateOfMeet={weekState.dateOfMeet}
            //       />
            //     )}

            //     {weekState.makePointChBx && (
            //       <CoupleInputs
            //         title="Making Disciples"
            //         openAndChoose={openAndChoose}
            //         openedList={openedList}
            //         firstInput={getNumbStTask('makePointStMC')}
            //         firstTask="makePointStMC"
            //         getCurrentWeek={getCurrentWeek}
            //         secondInput={getNumbAsTask('makePointAsMC')}
            //         secondTask="makePointAsMC"
            //         action={action}
            //         dateOfMeet={weekState.dateOfMeet}
            //       />
            //     )}

            //     {weekState.explainTalkPointChBx && (
            //       <SingleInput
            //         title={'Explaining as Speech'}
            //         openAndChoose={openAndChoose}
            //         openedList={openedList}
            //         firstInput={getNumbStTask('explainTalkPointStMC')}
            //         task="explainTalkPointStMC"
            //         getCurrentWeek={getCurrentWeek}
            //         action={action}
            //         dateOfMeet={weekState.dateOfMeet}
            //       />
            //     )}

            //     {weekState.explainPointChBx && (
            //       <CoupleInputs
            //         title="Explaining Your Beliefs"
            //         openAndChoose={openAndChoose}
            //         openedList={openedList}
            //         firstInput={getNumbStTask('explainPointStMC')}
            //         firstTask="explainPointStMC"
            //         getCurrentWeek={getCurrentWeek}
            //         secondInput={getNumbAsTask('explainPointAsMC')}
            //         secondTask="explainPointAsMC"
            //         action={action}
            //         dateOfMeet={weekState.dateOfMeet}
            //       />
            //     )}

            //     {weekState.talkPointChBx && (
            //       <SingleInput
            //         title={'Talk'}
            //         openAndChoose={openAndChoose}
            //         openedList={openedList}
            //         firstInput={getNumbStTask('talkPointStMC')}
            //         task="talkPointStMC"
            //         getCurrentWeek={getCurrentWeek}
            //         action={action}
            //         dateOfMeet={weekState.dateOfMeet}
            //       />
            //     )}
            //   </div>
            //   {/*---------------------------Second class--------------------------- */}
            //   <div>
            //     <div className="df">
            //       <input
            //         type="checkbox"
            //         checked={weekState.secondClassChBx}
            //         onChange={(e) =>
            //           makeChangeChBx(
            //             'secondClassChBx',
            //             !weekState.secondClassChBx
            //           )
            //         }
            //       />
            //       <div>- Training points second class</div>
            //     </div>
            //     {weekState.secondClassChBx && (
            //       <div>
            //         <SingleInput
            //           title={'Bible Reading'}
            //           openAndChoose={openAndChoose}
            //           openedList={openedList}
            //           firstInput={getNumbStTask('bibleReadingPointStSC')}
            //           task="bibleReadingPointStSC"
            //           getCurrentWeek={getCurrentWeek}
            //           action={action}
            //           dateOfMeet={weekState.dateOfMeet}
            //         />

            //         {weekState.startPointChBx && (
            //           <CoupleInputs
            //             title="Starting a Conversation"
            //             openAndChoose={openAndChoose}
            //             openedList={openedList}
            //             firstInput={getNumbStTask('startPointStSC')}
            //             firstTask="startPointStSC"
            //             getCurrentWeek={getCurrentWeek}
            //             secondInput={getNumbAsTask('startPointAsSC')}
            //             secondTask="startPointAsSC"
            //             action={action}
            //             dateOfMeet={weekState.dateOfMeet}
            //           />
            //         )}

            //         {weekState.followPointChBx && (
            //           <CoupleInputs
            //             title="Following Up"
            //             openAndChoose={openAndChoose}
            //             openedList={openedList}
            //             firstInput={getNumbStTask('followPointStSC')}
            //             firstTask="followPointStSC"
            //             getCurrentWeek={getCurrentWeek}
            //             secondInput={getNumbAsTask('followPointAsSC')}
            //             secondTask="followPointAsSC"
            //             action={action}
            //             dateOfMeet={weekState.dateOfMeet}
            //           />
            //         )}

            //         {weekState.makePointChBx && (
            //           <CoupleInputs
            //             title="Making Disciples"
            //             openAndChoose={openAndChoose}
            //             openedList={openedList}
            //             firstInput={getNumbStTask('makePointStSC')}
            //             firstTask="makePointStSC"
            //             getCurrentWeek={getCurrentWeek}
            //             secondInput={getNumbAsTask('makePointAsSC')}
            //             secondTask="makePointAsSC"
            //             action={action}
            //             dateOfMeet={weekState.dateOfMeet}
            //           />
            //         )}

            //         {weekState.explainTalkPointChBx && (
            //           <SingleInput
            //             title={'Explaining as Speech'}
            //             openAndChoose={openAndChoose}
            //             openedList={openedList}
            //             firstInput={getNumbStTask('explainTalkPointStSC')}
            //             task="explainTalkPointStSC"
            //             getCurrentWeek={getCurrentWeek}
            //             action={action}
            //             dateOfMeet={weekState.dateOfMeet}
            //           />
            //         )}

            //         {weekState.explainPointChBx && (
            //           <CoupleInputs
            //             title="Explaining Your Beliefs"
            //             openAndChoose={openAndChoose}
            //             openedList={openedList}
            //             firstInput={getNumbStTask('explainPointStSC')}
            //             firstTask="explainPointStSC"
            //             getCurrentWeek={getCurrentWeek}
            //             secondInput={getNumbAsTask('explainPointAsSC')}
            //             secondTask="explainPointAsSC"
            //             action={action}
            //             dateOfMeet={weekState.dateOfMeet}
            //           />
            //         )}

            //         {weekState.talkPointChBx && (
            //           <SingleInput
            //             title="Talk"
            //             openAndChoose={openAndChoose}
            //             openedList={openedList}
            //             firstInput={getNumbStTask('talkPointStSC')}
            //             task="talkPointStSC"
            //             getCurrentWeek={getCurrentWeek}
            //             action={action}
            //             dateOfMeet={weekState.dateOfMeet}
            //           />
            //         )}
            //       </div>
            //     )}
            //   </div>
            // </div>
          )}
          {action === 'plan' && weekState.dateOfMeet && (
            <div className="df">
              <div
                className="myButton"
                onClick={() => setWeekState(defaultWeekState)}
              >
                Close window
              </div>
              <div className="myButton" onClick={deletePlan}>
                Delete week
              </div>
              {/* <div className="myButton" onClick={() => console.log('hi')}>
            Make Forms
          </div> */}
            </div>
          )}
          {action === 'confirm' && (
            <div onClick={confirmWeek}>Confirm week</div>
          )}
          {action === 'update' && (
            <div className="df">
              <div className="myButton" onClick={updateWeek}>
                Update & del
              </div>
              <div className="myButton" onClick={deleteWeek}>
                Delete week
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AddInfoByWeek
