import React, { useState } from 'react'
import './AddInfoByWeek.css'
import { getStartAndEndWeek } from '../../services/logicDate'
import Weeks from '../../Components/Weeks/Weeks'
import SingleInput from '../../Components/SingleInput/SingleInput'
import CoupleInputs from '../../Components/CoupleInputs/CoupleInputs'
import { IWeek } from '../../interfaces'

//кнопку формирования бланка

const AddInfoByWeek: React.FC = () => {
  const defaultWeekState = {
    _id: undefined,
    startWeekTSt: 0,
    dateOfMeet: '',
    isPlanned: false,

    teachingChBx: false,
    trainingChBx: false,
    smallClassChBx: false,
    startingPointChBx: false,
    followingPointChBx: false,
    makingPointChBx: false,
    explainingPointChBx: false,
    speechPointChBx: false,

    readPointStMC: undefined,
    startPointStMC: undefined,
    startPointAsMC: undefined,
    followPointStMC: undefined,
    followPointAsMC: undefined,
    makePointStMC: undefined,
    makePointAsMC: undefined,
    explainPointStMC: undefined,
    explainPointAsMC: undefined,
    speechPointStMC: undefined,
    readPointStSC: undefined,
    startPointStSC: undefined,
    startPointAsSC: undefined,
    followPointStSC: undefined,
    followPointAsSC: undefined,
    makePointStSC: undefined,
    makePointAsSC: undefined,
    explainPointStSC: undefined,
    explainPointAsSC: undefined,
    speechPointStSC: undefined,
  }
  const [weekState, setWeekState] = useState<IWeek>(defaultWeekState)

  const [openedList, setOpenedList] = useState<string | undefined>()
  const [action, setAction] = useState<
    'plan' | 'confirm' | 'update' | undefined
  >()

  const timeEndOfMeet = '21:45'

  const openAndChoose = (task: string) => {
    openedList === task ? setOpenedList('') : setOpenedList(task)
  }

  const makeAMeet = async (inpDateOfMeet: string) => {
    //inpDateOfMeet - дата выбранная пользователем в календаре
    const [year, month, day] = inpDateOfMeet.split('-').map(Number)
    const [hour, minute] = timeEndOfMeet.split(':').map(Number)

    const { startWeekTSt } = getStartAndEndWeek(year, month, day)
    const dateObject = new Date(year, month - 1, day, hour, minute)
    // Получаем метку времени даты выбранной в календаре и сейчас
    const timestampCal = dateObject.getTime()
    const timestampNow = Date.now()

    //условие: если выбранная дата - это будущее
    if (timestampCal > timestampNow) {
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
    if (timestampCal < timestampNow) {
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
        //если такой недели в запланированных нет, значит создаем ее
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
    const newWeek = Object.assign(weekState, {
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

  const confirmWeek = async () => {
    //удалить план у всех и внести дату в соотв.графы
    console.log('test confirm')
  }

  const updateWeek = async () => {
    //сравнить дату с графой в базе и если она свежее то обновить базу
    console.log('test update')
  }

  const deleteWeek = async () => {
    if (weekState.dateOfMeet) {
      const result = await window.api.deleteOneWeek(weekState.dateOfMeet)
      if (result.success) {
        alert(result.message)
        setWeekState(defaultWeekState)
        setAction(undefined)
      }
    }
  }

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
          {weekState.teachingChBx && <div>teaching</div>}
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
        <div onClick={() => setWeekState(defaultWeekState)}>
          Close the window
        </div>
      )}
      {/* close week - setdate-und */}
      {action === 'confirm' && <div onClick={confirmWeek}>Confirm change</div>}
      {action === 'update' && (
        <div className="df">
          <div className="myButton" onClick={updateWeek}>
            Update info
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
