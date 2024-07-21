import React, { useState } from 'react'
import './AddInfoByWeek.css'
import { getStartAndEndWeek } from '../../Servces/getStartAndEndWeek'
import { getTimeStamps } from '../../Servces/getTimeStamps'
import Weeks from '../../Components/Weeks/Weeks'
import SingleInput from '../../Components/SingleInput/SingleInput'
import CoupleInputs from '../../Components/CoupleInputs/CoupleInputs'
import { IWeek, IWeekCopy } from '../../interfaces'

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
    // latest?: number
    // portners?: Array<{ name: string; _id: string }>
    // plan?: boolean
  }
}

//----------------------------------------------------------------сделать кнопку формирования бланка

const AddInfoByWeek: React.FC = () => {
  const defaultWeekState = {
    _id: undefined,
    startWeekTSt: 0,
    dateOfMeet: '',
    isPlanned: false,

    comment: '',
    range: '',

    teachingChBx: false,
    trainingChBx: false,
    smallClassChBx: false,

    startingPointChBx: false,
    followingPointChBx: false,
    makingPointChBx: false,
    explainingPointChBx: false,
    explainingSpPointChBx: false,
    speechPointChBx: false,

    lessonOneChBx: false,
    lessonTwoChBx: false,
    liveAndServTwoChBx: false,
    liveAndServThreeChBx: false,
    secondChairmChBx: false,

    chairmanPoint: null,
    firstSpeechPoint: null,
    gemsPoint: null,
    lessonOnePoint: null,
    lessonTwoPoint: null,
    liveAndServPoint: null,
    liveAndServTwoPoint: null,
    liveAndServThreePoint: null,
    studyBibleInPoint: null,
    studyBibleInReaderPoint: null,
    endPrayerPoint: null,
    secondChairmPoint: null,

    readPointStMC: null,
    startPointStMC: null,
    startPointAsMC: null,
    followPointStMC: null,
    followPointAsMC: null,
    makePointStMC: null,
    makePointAsMC: null,
    explainPointStMC: null,
    explainPointAsMC: null,
    speechPointStMC: null,
    readPointStSC: null,
    startPointStSC: null,
    startPointAsSC: null,
    followPointStSC: null,
    followPointAsSC: null,
    makePointStSC: null,
    makePointAsSC: null,
    explainPointStSC: null,
    explainPointAsSC: null,
    explainSpPointStMC: null,
    explainSpPointStSC: null,
    speechPointStSC: null,
  }
  const [weekState, setWeekState] = useState<IWeek>(defaultWeekState)

  const [openedList, setOpenedList] = useState<string | undefined>()
  const [action, setAction] = useState<
    'plan' | 'confirm' | 'update' | undefined
  >()

  const timeEndOfMeet = '21:45' //--------------------------------------------------------------------

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
    const newWeek = Object.assign(defaultWeekState, {
      dateOfMeet: inpDateOfMeet,
      startWeekTSt,
      isPlanned,
    })

    delete newWeek._id

    const result = await window.api.writeNewWeek(newWeek)
    //console.log('result', result)
    return result
  }

  const makeChangeChBx = async (nameChBx: string, value: boolean) => {
    const updateWeek = {
      dateOfMeet: weekState.dateOfMeet,
      keyName: nameChBx,
      newValue: value,
    }
    const resultWeek = await window.api.updateOneWeek(updateWeek)
    //console.log('makeChangeChBx', resultWeek)
    if (resultWeek.success) {
      getCurrentWeek()
    }
  }

  const getCurrentWeek = async () => {
    if (weekState.dateOfMeet) {
      const weekFromBD = await window.api.getOneWeek(weekState.dateOfMeet)
      if (weekFromBD.success) {
        setWeekState(weekFromBD.data)
      }
    }
  }

  //---CONFIRM WEEK------------------------------------------------------------------------------------------------
  // меняем plan: trye на false у всех студентов в этой неделе
  // в БД студента вносим дату в поля задания и в latest
  // Обновляем напарников студента
  // Удаляем неделю из БД.
  const confirmWeek = async () => {
    // Получаем метку времени даты недели
    const { timeStampInp } = getTimeStamps(weekState.dateOfMeet, timeEndOfMeet)

    // копируем из weekState в copyWeekState, только нужные ключи и зачения, т.е. те, что имеют значения в виде object например {name: string, id: string}
    const copyWeekState: IWeekCopy = {}
    for (const key in weekState) {
      if (Object.prototype.hasOwnProperty.call(weekState, key)) {
        const nestedObject = weekState[key as keyof typeof weekState]
        if (
          nestedObject &&
          typeof nestedObject === 'object' &&
          'name' in nestedObject
        ) {
          copyWeekState[key as keyof typeof copyWeekState] = nestedObject
        }
      }
    }
    //console.log('copiedObject', copyWeekState)

    // инициализируем счетчики: количества заданий недели, количества успешных и провальных обновлений
    const amount: Amount = {
      keysOfCopyWeek: 0,
      successUpdated: 0,
      unSuccessUpdated: [],
    }

    // проходим по ключам обьекта copyWeekState, получаем на каждый ключ: "name" - студента из БД
    for (const weeksKey in copyWeekState) {
      amount.keysOfCopyWeek += 1

      const object = copyWeekState[weeksKey as keyof typeof copyWeekState]

      if (object && object.name) {
        const student = await window.api.getOneUserByLFName(object.name)
        if (student.success) {
          //формируем ключ для поиска в БД у студента, т.к. некоторые поля в БД недели отличаются
          let key = weeksKey

          //находим те поля, что отличаются и формируем key
          if (weeksKey.includes('AsMC')) key = 'assistantPointAsMC'
          if (weeksKey.includes('AsSC')) key = 'assistantPointAsSC'
          if (weeksKey.includes('lesson')) key = 'liveAndServPoint'
          if (weeksKey.includes('live')) key = 'liveAndServPoint'

          //console.log('1 weeksKey: ', weeksKey, 'value: ', timestamp)
          //console.log('2 stud key: ', key, 'value: ', student.data[key])

          const updateData: IUpdateData = {
            idStudent: student.data._id,
            newStudentData: {
              [key]: timeStampInp,
              latest: timeStampInp,
              plan: false,
            },
          }

          //проверям есть ли напарник у этого задания и добавляем в updateData.newStudentData
          if (
            weeksKey.includes('startPointSt') ||
            weeksKey.includes('followPointSt') ||
            weeksKey.includes('makePointSt') ||
            weeksKey.includes('explainPointSt')
          ) {
            let searchPortner: { name: string; _id: string } | null = null

            //присваеваем searchPortner имя напарника и его id из недели, если есть
            switch (weeksKey) {
              case 'startPointStMC':
                copyWeekState.startPointAsMC &&
                  (searchPortner = copyWeekState.startPointAsMC)
                break

              case 'startPointStSC':
                copyWeekState.startPointAsSC &&
                  (searchPortner = copyWeekState.startPointAsSC)
                break

              case 'followPointStMC':
                copyWeekState.followPointAsMC &&
                  (searchPortner = copyWeekState.followPointAsMC)
                break

              case 'followPointStSC':
                copyWeekState.followPointAsSC &&
                  (searchPortner = copyWeekState.followPointAsSC)
                break

              case 'makePointStMC':
                copyWeekState.makePointAsMC &&
                  (searchPortner = copyWeekState.makePointAsMC)
                break

              case 'makePointStSC':
                copyWeekState.makePointAsSC &&
                  (searchPortner = copyWeekState.makePointAsSC)
                break

              case 'explainPointStMC':
                copyWeekState.explainPointAsMC &&
                  (searchPortner = copyWeekState.explainPointAsMC)
                break

              case 'explainPointStSC':
                copyWeekState.explainPointAsSC &&
                  (searchPortner = copyWeekState.explainPointAsSC)
                break
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
      alert('Every student was succesfully updated')
    } else if (amount.successUpdated === 0 && amount.keysOfCopyWeek === 0) {
      alert('I can not update empty week')
    }

    const result = await window.api.deleteOneWeek(weekState.dateOfMeet)
    if (result.success) {
      setWeekState(defaultWeekState)
      setAction(undefined)
    }
  }

  //---UPDATE WEEK-------------------------------------------------------------------------------------------------
  // сравниваем дату недели с графой соответствующего студента в базе и, если дата недели свежее, то
  // ...то обновляем поля студента в базе.
  // обновляем напарников студента.
  // Удаляем неделю из БД.
  const updateWeek = async () => {
    // Получаем метку времени даты недели
    const { timeStampInp } = getTimeStamps(weekState.dateOfMeet, timeEndOfMeet)

    // копируем из weekState в copyWeekState, только нужные ключи и зачения, т.е. те, что имеют значения в виде {name: string, id: string}
    const copyWeekState: IWeekCopy = {}
    for (const key in weekState) {
      if (Object.prototype.hasOwnProperty.call(weekState, key)) {
        const nestedObject = weekState[key as keyof typeof weekState]
        if (
          nestedObject &&
          typeof nestedObject === 'object' &&
          'name' in nestedObject
        ) {
          copyWeekState[key as keyof typeof copyWeekState] = nestedObject
        }
      }
    }
    //console.log('copiedObject', copyWeekState)

    // инициализируем счетчики: количества заданий недели, количества успешных и провальных обновлений
    const amount: Amount = {
      keysOfCopyWeek: 0,
      successUpdated: 0,
      unSuccessUpdated: [],
    }

    // проходим по ключам обьекта copyWeekState, получаем на каждый ключ: "name" - студента из БД
    // пример copyWeekState: {  speechPointStMC?: { name: string; _id: string } | null
    //                          speechPointStSC?: { name: string; _id: string } | null }
    for (const weeksKey in copyWeekState) {
      amount.keysOfCopyWeek += 1

      const object = copyWeekState[weeksKey as keyof typeof copyWeekState]

      if (object && object.name) {
        const student = await window.api.getOneUserByLFName(object.name)
        if (student.success) {
          //т.к. некоторые поля в БД недели отличаются от полей в БД студента
          //формируем ключ для поиска у студента нужного поля

          let key = weeksKey
          //находим те поля, что отличаются и формируем key
          if (weeksKey.includes('AsMC')) key = 'assistantPointAsMC'
          if (weeksKey.includes('AsSC')) key = 'assistantPointAsSC'
          if (weeksKey.includes('lesson')) key = 'liveAndServPoint'
          if (weeksKey.includes('live')) key = 'liveAndServPoint'

          //console.log('1 weeksKey: ', weeksKey, 'value: ', timestamp)
          //console.log('2 stud key: ', key, 'value: ', student.data[key])

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
            weeksKey.includes('startPointSt') ||
            weeksKey.includes('followPointSt') ||
            weeksKey.includes('makePointSt') ||
            weeksKey.includes('explainPointSt')
          ) {
            let searchPortner: { name: string; _id: string } | null = null

            //присваеваем searchPortner имя напарника и его id из недели, если есть
            switch (weeksKey) {
              case 'startPointStMC':
                copyWeekState.startPointAsMC &&
                  (searchPortner = copyWeekState.startPointAsMC)
                break

              case 'startPointStSC':
                copyWeekState.startPointAsSC &&
                  (searchPortner = copyWeekState.startPointAsSC)
                break

              case 'followPointStMC':
                copyWeekState.followPointAsMC &&
                  (searchPortner = copyWeekState.followPointAsMC)
                break

              case 'followPointStSC':
                copyWeekState.followPointAsSC &&
                  (searchPortner = copyWeekState.followPointAsSC)
                break

              case 'makePointStMC':
                copyWeekState.makePointAsMC &&
                  (searchPortner = copyWeekState.makePointAsMC)
                break

              case 'makePointStSC':
                copyWeekState.makePointAsSC &&
                  (searchPortner = copyWeekState.makePointAsSC)
                break

              case 'explainPointStMC':
                copyWeekState.explainPointAsMC &&
                  (searchPortner = copyWeekState.explainPointAsMC)
                break

              case 'explainPointStSC':
                copyWeekState.explainPointAsSC &&
                  (searchPortner = copyWeekState.explainPointAsSC)
                break
            }

            //определяем есть ли у студента в массиве такой напарник и добавляем в updateData.newStudentData
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
      alert('Every student was succesfully updated')
    } else if (amount.successUpdated === 0 && amount.keysOfCopyWeek > 0) {
      alert('Everything is already updated')
    } else if (amount.successUpdated === 0 && amount.keysOfCopyWeek === 0) {
      alert('I can not update empty fields')
    } else {
      alert(
        `I just updated ${amount.successUpdated} of the ${amount.keysOfCopyWeek} student`
      )
    }

    const result = await window.api.deleteOneWeek(weekState.dateOfMeet)
    if (result.success) {
      setWeekState(defaultWeekState)
      setAction(undefined)
    }
  }
  //----DELETE PLAN------------------------------------------------------------------------------------------------
  // меняем plan: trye на false у всех студентов в этой неделе. Удаляем неделю из БД.
  const deletePlan = async () => {
    // копируем из weekState в copyWeekState, только нужные ключи и зачения, т.е. те, что имеют значения в виде {name: string, id: string}
    const copyWeekState: IWeekCopy = {}
    for (const key in weekState) {
      if (Object.prototype.hasOwnProperty.call(weekState, key)) {
        const nestedObject = weekState[key as keyof typeof weekState]
        if (
          nestedObject &&
          typeof nestedObject === 'object' &&
          'name' in nestedObject
        ) {
          copyWeekState[key as keyof typeof copyWeekState] = nestedObject
        }
      }
    }
    //console.log('copiedObject', copyWeekState)

    // инициализируем счетчики: количества заданий недели, количества успешных и провальных обновлений
    const amount: Amount = {
      keysOfCopyWeek: 0,
      successUpdated: 0,
      unSuccessUpdated: [],
    }

    // проходим по ключам обьекта copyWeekState, получаем на каждый ключ: "name" - студента из БД
    for (const weeksKey in copyWeekState) {
      amount.keysOfCopyWeek += 1

      const object = copyWeekState[weeksKey as keyof typeof copyWeekState]

      if (object && object.name) {
        const student = await window.api.getOneUserByLFName(object.name)

        if (student.success) {
          const update = {
            idStudent: student.data._id,
            newStudentData: {
              plan: false,
            },
          }

          const result = await window.api.editOneUser(update)

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
      alert('Every student was succesfully updated')
    } else if (amount.successUpdated === 0 && amount.keysOfCopyWeek === 0) {
      alert('I can not update empty week')
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

  return (
    <div>
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
        <div>
          <input
            type="checkbox"
            checked={weekState.teachingChBx}
            onChange={(e) =>
              makeChangeChBx('teachingChBx', !weekState.teachingChBx)
            }
          />
          -Teaching points
          <input
            type="checkbox"
            checked={weekState.trainingChBx}
            onChange={(e) =>
              makeChangeChBx('trainingChBx', !weekState.trainingChBx)
            }
          />
          -Training points
          {/*---------------------------Teaching--------------------------- */}
          {weekState.teachingChBx && (
            <div className="df">
              <div>
                <div>Choose</div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.lessonOneChBx}
                    onChange={(e) =>
                      makeChangeChBx('lessonOneChBx', !weekState.lessonOneChBx)
                    }
                  />
                  <div> - Considering lesson</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.lessonTwoChBx && weekState.lessonOneChBx}
                    onChange={(e) =>
                      makeChangeChBx('lessonTwoChBx', !weekState.lessonTwoChBx)
                    }
                  />
                  <div> - Considering second lesson</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.liveAndServTwoChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'liveAndServTwoChBx',
                        !weekState.liveAndServTwoChBx
                      )
                    }
                  />
                  <div> - live And Serv second point</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.liveAndServThreeChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'liveAndServThreeChBx',
                        !weekState.liveAndServThreeChBx
                      )
                    }
                  />
                  <div> - live And Serv third point</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.secondChairmChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'secondChairmChBx',
                        !weekState.secondChairmChBx
                      )
                    }
                  />
                  <div> - Second class</div>
                </div>
              </div>
              {weekState.teachingChBx && (
                <div>
                  <div>Teaching points </div>
                  <div className="df">
                    <SingleInput
                      title={'Chearman'}
                      openAndChoose={openAndChoose}
                      openedList={openedList}
                      firstInput={weekState.chairmanPoint}
                      task="chairmanPoint"
                      getCurrentWeek={getCurrentWeek}
                      action={action}
                      dateOfMeet={weekState.dateOfMeet}
                    />

                    <SingleInput
                      title={'First speech'}
                      openAndChoose={openAndChoose}
                      openedList={openedList}
                      firstInput={weekState.firstSpeechPoint}
                      task="firstSpeechPoint"
                      getCurrentWeek={getCurrentWeek}
                      action={action}
                      dateOfMeet={weekState.dateOfMeet}
                    />

                    <SingleInput
                      title={'Spiritual gemsPoint'}
                      openAndChoose={openAndChoose}
                      openedList={openedList}
                      firstInput={weekState.gemsPoint}
                      task="gemsPoint"
                      getCurrentWeek={getCurrentWeek}
                      action={action}
                      dateOfMeet={weekState.dateOfMeet}
                    />

                    {weekState.secondChairmChBx && (
                      <SingleInput
                        title={'Second class'}
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.secondChairmPoint}
                        task="secondChairmPoint"
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}
                  </div>

                  <div className="df">
                    {weekState.lessonOneChBx && (
                      <SingleInput
                        title={'Lesson one'}
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.lessonOnePoint}
                        task="lessonOnePoint"
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}

                    {weekState.lessonTwoChBx && weekState.lessonOneChBx && (
                      <SingleInput
                        title={'Lesson two'}
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.lessonTwoPoint}
                        task="lessonTwoPoint"
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}
                  </div>

                  <div className="df">
                    <SingleInput
                      title={'Live and Serving'}
                      openAndChoose={openAndChoose}
                      openedList={openedList}
                      firstInput={weekState.liveAndServPoint}
                      task="liveAndServPoint"
                      getCurrentWeek={getCurrentWeek}
                      action={action}
                      dateOfMeet={weekState.dateOfMeet}
                    />

                    {weekState.liveAndServTwoChBx && (
                      <SingleInput
                        title={'Live and Serving second'}
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.liveAndServTwoPoint}
                        task="liveAndServTwoPoint"
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}

                    {weekState.liveAndServThreeChBx && (
                      <SingleInput
                        title={'Live and Serving third'}
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.liveAndServThreePoint}
                        task="liveAndServThreePoint"
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}
                  </div>

                  <div className="df">
                    <SingleInput
                      title={'Study Bible in'}
                      openAndChoose={openAndChoose}
                      openedList={openedList}
                      firstInput={weekState.studyBibleInPoint}
                      task="studyBibleInPoint"
                      getCurrentWeek={getCurrentWeek}
                      action={action}
                      dateOfMeet={weekState.dateOfMeet}
                    />

                    <SingleInput
                      title={'Study Bible Reader'}
                      openAndChoose={openAndChoose}
                      openedList={openedList}
                      firstInput={weekState.studyBibleInReaderPoint}
                      task="studyBibleInReaderPoint"
                      getCurrentWeek={getCurrentWeek}
                      action={action}
                      dateOfMeet={weekState.dateOfMeet}
                    />

                    <SingleInput
                      title={'End prayer'}
                      openAndChoose={openAndChoose}
                      openedList={openedList}
                      firstInput={weekState.endPrayerPoint}
                      task="endPrayerPoint"
                      getCurrentWeek={getCurrentWeek}
                      action={action}
                      dateOfMeet={weekState.dateOfMeet}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {/*---------------------------Training--------------------------- */}
          {weekState.trainingChBx && (
            <div className="df">
              <div>
                <div>Choose</div>

                <div className="df">
                  <input type="checkbox" checked={true} readOnly />
                  <div> - Bible Reading</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.startingPointChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'startingPointChBx',
                        !weekState.startingPointChBx
                      )
                    }
                  />
                  <div> - Starting a Conversation</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.followingPointChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'followingPointChBx',
                        !weekState.followingPointChBx
                      )
                    }
                  />
                  <div> - Following Up</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.makingPointChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'makingPointChBx',
                        !weekState.makingPointChBx
                      )
                    }
                  />
                  <div> - Making Disciples</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.explainingSpPointChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'explainingSpPointChBx',
                        !weekState.explainingSpPointChBx
                      )
                    }
                  />
                  <div> - Explaining as Speech</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.explainingPointChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'explainingPointChBx',
                        !weekState.explainingPointChBx
                      )
                    }
                  />
                  <div> - Explaining Your Beliefs</div>
                </div>

                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.speechPointChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'speechPointChBx',
                        !weekState.speechPointChBx
                      )
                    }
                  />
                  <div> - Talk</div>
                </div>
              </div>
              {/*---------------------------Main class--------------------------- */}
              <div>
                <div>Training points main class</div>

                <SingleInput
                  title={'Bible Reading'}
                  openAndChoose={openAndChoose}
                  openedList={openedList}
                  firstInput={weekState.readPointStMC}
                  task="readPointStMC"
                  getCurrentWeek={getCurrentWeek}
                  action={action}
                  dateOfMeet={weekState.dateOfMeet}
                />

                {weekState.startingPointChBx && (
                  <CoupleInputs
                    title={'Starting a Conversation'}
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={weekState.startPointStMC}
                    firstTask="startPointStMC"
                    getCurrentWeek={getCurrentWeek}
                    secondInput={weekState.startPointAsMC}
                    secondTask="startPointAsMC"
                    action={action}
                    dateOfMeet={weekState.dateOfMeet}
                  />
                )}

                {weekState.followingPointChBx && (
                  <CoupleInputs
                    title="Following Up"
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={weekState.followPointStMC}
                    firstTask="followPointStMC"
                    getCurrentWeek={getCurrentWeek}
                    secondInput={weekState.followPointAsMC}
                    secondTask="followPointAsMC"
                    action={action}
                    dateOfMeet={weekState.dateOfMeet}
                  />
                )}

                {weekState.makingPointChBx && (
                  <CoupleInputs
                    title="Making Disciples"
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={weekState.makePointStMC}
                    firstTask="makePointStMC"
                    getCurrentWeek={getCurrentWeek}
                    secondInput={weekState.makePointAsMC}
                    secondTask="makePointAsMC"
                    action={action}
                    dateOfMeet={weekState.dateOfMeet}
                  />
                )}

                {weekState.explainingSpPointChBx && (
                  <SingleInput
                    title={'Explaining as Speech'}
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={weekState.explainSpPointStMC}
                    task="explainSpPointStMC"
                    getCurrentWeek={getCurrentWeek}
                    action={action}
                    dateOfMeet={weekState.dateOfMeet}
                  />
                )}

                {weekState.explainingPointChBx && (
                  <CoupleInputs
                    title="Explaining Your Beliefs"
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={weekState.explainPointStMC}
                    firstTask="explainPointStMC"
                    getCurrentWeek={getCurrentWeek}
                    secondInput={weekState.explainPointAsMC}
                    secondTask="explainPointAsMC"
                    action={action}
                    dateOfMeet={weekState.dateOfMeet}
                  />
                )}

                {weekState.speechPointChBx && (
                  <SingleInput
                    title={'Talk'}
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={weekState.speechPointStMC}
                    task="speechPointStMC"
                    getCurrentWeek={getCurrentWeek}
                    action={action}
                    dateOfMeet={weekState.dateOfMeet}
                  />
                )}
              </div>
              {/*---------------------------Small class--------------------------- */}
              <div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={weekState.smallClassChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'smallClassChBx',
                        !weekState.smallClassChBx
                      )
                    }
                  />
                  <div>- Training points small class</div>
                </div>
                {weekState.smallClassChBx && (
                  <div>
                    <SingleInput
                      title={'Bible Reading'}
                      openAndChoose={openAndChoose}
                      openedList={openedList}
                      firstInput={weekState.readPointStSC}
                      task="readPointStSC"
                      getCurrentWeek={getCurrentWeek}
                      action={action}
                      dateOfMeet={weekState.dateOfMeet}
                    />

                    {weekState.startingPointChBx && (
                      <CoupleInputs
                        title="Starting a Conversation"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.startPointStSC}
                        firstTask="startPointStSC"
                        getCurrentWeek={getCurrentWeek}
                        secondInput={weekState.startPointAsSC}
                        secondTask="startPointAsSC"
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}

                    {weekState.followingPointChBx && (
                      <CoupleInputs
                        title="Following Up"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.followPointStSC}
                        firstTask="followPointStSC"
                        getCurrentWeek={getCurrentWeek}
                        secondInput={weekState.followPointAsSC}
                        secondTask="followPointAsSC"
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}

                    {weekState.makingPointChBx && (
                      <CoupleInputs
                        title="Making Disciples"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.makePointStSC}
                        firstTask="makePointStSC"
                        getCurrentWeek={getCurrentWeek}
                        secondInput={weekState.makePointAsSC}
                        secondTask="makePointAsSC"
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}

                    {weekState.explainingSpPointChBx && (
                      <SingleInput
                        title={'Explaining as Speech'}
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.explainSpPointStSC}
                        task="explainSpPointStSC"
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}

                    {weekState.explainingPointChBx && (
                      <CoupleInputs
                        title="Explaining Your Beliefs"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.explainPointStSC}
                        firstTask="explainPointStSC"
                        getCurrentWeek={getCurrentWeek}
                        secondInput={weekState.explainPointAsSC}
                        secondTask="explainPointAsSC"
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}

                    {weekState.speechPointChBx && (
                      <SingleInput
                        title="Talk"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={weekState.speechPointStSC}
                        task="speechPointStSC"
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={weekState.dateOfMeet}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
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

      {action === 'confirm' && <div onClick={confirmWeek}>Confirm week</div>}

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
  )
}

export default AddInfoByWeek
