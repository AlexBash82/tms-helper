import React, { useState } from 'react'
import './AddInfoByWeek.css'
import { IWeek } from '../../interfaces'
import { getStartAndEndWeek } from '../../services/logicDate'
import Weeks from '../../Components/Weeks/Weeks'
import SingleInput from '../../Components/SingleInput/SingleInput'
import CoupleInputs from '../../Components/CoupleInputs/CoupleInputs'

interface IStateWeek
  extends Omit<IWeek, 'startWeekTSt' | 'dateOfMeet' | 'isPlanned'> {
  dateOfMeet?: string
}

//кнопку формирования бланка

const AddInfoByWeek: React.FC = () => {
  const [dateOfMeet, setDateOfMeet] = useState<string | undefined>()

  const [teachingChBx, setTeachingChBx] = useState(false)
  const [trainingChBx, setTrainingChBx] = useState(false)
  const [smallClassChBx, setSmallClassChBx] = useState(false)
  const [startingPointChBx, setStartingPointChBx] = useState(false)
  const [followingPointChBx, setFollowingPointChBx] = useState(false)
  const [makingPointChBx, setMakingPointChBx] = useState(false)
  const [explainingPointChBx, setExplainingPointChBx] = useState(false)
  const [speechPointChBx, setSpeechPointChBx] = useState(false)
  const [readPointStMC, setReadPointStMC] = useState('')
  const [startPointStMC, setStartPointStMC] = useState('')
  const [startPointAsMC, setStartPointASMC] = useState('')
  const [followPointStMC, setFollowPointStMC] = useState('')
  const [followPointAsMC, setFollowPointAsMC] = useState('')
  const [makePointStMC, setMakePointStMC] = useState('')
  const [makePointAsMC, setMakePointAsMC] = useState('')
  const [explainPointStMC, setExplainPointStMC] = useState('')
  const [explainPointAsMC, setExplainPointAsMC] = useState('')
  const [speechPointStMC, setSpeechPointStMC] = useState('')
  const [readPointStSC, setReadPointStSC] = useState('')
  const [startPointStSC, setStartPointStSC] = useState('')
  const [startPointAsSC, setStartPointAsSC] = useState('')
  const [followPointStSC, setFollowPointStSC] = useState('')
  const [followPointAsSC, setFollowPointAsSC] = useState('')
  const [makePointStSC, setMakePointStSC] = useState('')
  const [makePointAsSC, setMakePointAsSC] = useState('')
  const [explainPointStSC, setExplainPointStSC] = useState('')
  const [explainPointAsSC, setExplainPointAsSC] = useState('')
  const [speechPointStSC, setSpeechPointStSC] = useState('')
  const [openedList, setOpenedList] = useState('')
  const [action, setAction] = useState<
    'plan' | 'confirm' | 'update' | undefined
  >()

  const timeEndOfMeet = '21:45'

  const defaultState = {
    dateOfMeet: undefined,

    teachingChBx: false,
    trainingChBx: false,
    smallClassChBx: false,
    startingPointChBx: false,
    followingPointChBx: false,
    makingPointChBx: false,
    explainingPointChBx: false,
    speechPointChBx: false,

    readPointStMC: '',
    startPointStMC: '',
    startPointAsMC: '',
    followPointStMC: '',
    followPointAsMC: '',
    makePointStMC: '',
    makePointAsMC: '',
    explainPointStMC: '',
    explainPointAsMC: '',
    speechPointStMC: '',
    readPointStSC: '',
    startPointStSC: '',
    startPointAsSC: '',
    followPointStSC: '',
    followPointAsSC: '',
    makePointStSC: '',
    makePointAsSC: '',
    explainPointStSC: '',
    explainPointAsSC: '',
    speechPointStSC: '',
  }

  const openAndChoose = (task: string) => {
    openedList === task ? setOpenedList('') : setOpenedList(task)
  }

  const makeAMeet = async (inpDateOfMeet: string) => {
    const [year, month, day] = inpDateOfMeet.split('-').map(Number)
    const [hour, minute] = timeEndOfMeet.split(':').map(Number)

    const { startWeekTSt } = getStartAndEndWeek(year, month, day)
    const dateObject = new Date(year, month - 1, day, hour, minute)
    // Получаем метку времени календаря и сейчас
    const timestampCal = dateObject.getTime()
    const timestampNow = Date.now()

    if (timestampCal > timestampNow) {
      const isPlanned = true
      const result = await writeDefaultWeekToDB(
        inpDateOfMeet,
        startWeekTSt,
        isPlanned
      )
      console.log('future result', result)
      if (result.success) {
        setState(result.data)
      }
      setAction('plan')
    }

    if (timestampCal < timestampNow) {
      const isWeekExist = await window.api.getOneWeek(inpDateOfMeet)

      if (isWeekExist.success) {
        //console.log('past get - confirm', isWeekExist)
        setState(isWeekExist.data)
        if (isWeekExist.data.isPlanned) {
          setAction('confirm')
        } else {
          setAction('update')
        }
      } else {
        const isPlanned = false
        const result = await writeDefaultWeekToDB(
          inpDateOfMeet,
          startWeekTSt,
          isPlanned
        )
        if (result.success) {
          console.log('past insert - update', result)
          setState(result.data)
          setAction('update')
        } //а сли не успех
      }
    }
    openAndChoose('')
  }

  const writeDefaultWeekToDB = async (
    dateOfMeet: string,
    startWeekTSt: number,
    isPlanned: boolean
  ) => {
    const newWeek: IWeek = {
      startWeekTSt,
      dateOfMeet,
      isPlanned,

      teachingChBx: false,
      trainingChBx: false,
      smallClassChBx: false,
      startingPointChBx: false,
      followingPointChBx: false,
      makingPointChBx: false,
      explainingPointChBx: false,
      speechPointChBx: false,

      readPointStMC: '',
      startPointStMC: '',
      startPointAsMC: '',
      followPointStMC: '',
      followPointAsMC: '',
      makePointStMC: '',
      makePointAsMC: '',
      explainPointStMC: '',
      explainPointAsMC: '',
      speechPointStMC: '',
      readPointStSC: '',
      startPointStSC: '',
      startPointAsSC: '',
      followPointStSC: '',
      followPointAsSC: '',
      makePointStSC: '',
      makePointAsSC: '',
      explainPointStSC: '',
      explainPointAsSC: '',
      speechPointStSC: '',
    }

    const result = await window.api.writeNewWeek(newWeek)
    //console.log('result', result)
    return result
  }

  const setState = (week: IStateWeek) => {
    if (dateOfMeet !== week.dateOfMeet) {
      setDateOfMeet(week.dateOfMeet)
    }
    if (teachingChBx !== week.teachingChBx) {
      setTeachingChBx(week.teachingChBx)
    }
    if (trainingChBx !== week.trainingChBx) {
      setTrainingChBx(week.trainingChBx)
    }
    if (smallClassChBx !== week.smallClassChBx) {
      setSmallClassChBx(week.smallClassChBx)
    }
    if (startingPointChBx !== week.startingPointChBx) {
      setStartingPointChBx(week.startingPointChBx)
    }
    if (followingPointChBx !== week.followingPointChBx) {
      setFollowingPointChBx(week.followingPointChBx)
    }
    if (makingPointChBx !== week.makingPointChBx) {
      setMakingPointChBx(week.makingPointChBx)
    }
    if (explainingPointChBx !== week.explainingPointChBx) {
      setExplainingPointChBx(week.explainingPointChBx)
    }
    if (speechPointChBx !== week.speechPointChBx) {
      setSpeechPointChBx(week.speechPointChBx)
    }
    if (readPointStMC !== week.readPointStMC) {
      setReadPointStMC(week.readPointStMC)
    }
    if (startPointStMC !== week.startPointStMC) {
      setStartPointStMC(week.startPointStMC)
    }
    if (startPointAsMC !== week.startPointAsMC) {
      setStartPointASMC(week.startPointAsMC)
    }
    if (followPointStMC !== week.followPointStMC) {
      setFollowPointStMC(week.followPointStMC)
    }
    if (followPointAsMC !== week.followPointAsMC) {
      setFollowPointAsMC(week.followPointAsMC)
    }
    if (makePointStMC !== week.makePointStMC) {
      setMakePointStMC(week.makePointStMC)
    }
    if (makePointAsMC !== week.makePointAsMC) {
      setMakePointAsMC(week.makePointAsMC)
    }
    if (explainPointStMC !== week.explainPointStMC) {
      setExplainPointStMC(week.explainPointStMC)
    }
    if (explainPointAsMC !== week.explainPointAsMC) {
      setExplainPointAsMC(week.explainPointAsMC)
    }
    if (speechPointStMC !== week.speechPointStMC) {
      setSpeechPointStMC(week.speechPointStMC)
    }
    if (readPointStSC !== week.readPointStSC) {
      setReadPointStSC(week.readPointStSC)
    }
    if (startPointStSC !== week.startPointStSC) {
      setStartPointStSC(week.startPointStSC)
    }
    if (startPointAsSC !== week.startPointAsSC) {
      setStartPointAsSC(week.startPointAsSC)
    }
    if (followPointStSC !== week.followPointStSC) {
      setFollowPointStSC(week.followPointStSC)
    }
    if (followPointAsSC !== week.followPointAsSC) {
      setFollowPointAsSC(week.followPointAsSC)
    }
    if (makePointStSC !== week.makePointStSC) {
      setMakePointStSC(week.makePointStSC)
    }
    if (makePointAsSC !== week.makePointAsSC) {
      setMakePointAsSC(week.makePointAsSC)
    }
    if (explainPointStSC !== week.explainPointStSC) {
      setExplainPointStSC(week.explainPointStSC)
    }
    if (explainPointAsSC !== week.explainPointAsSC) {
      setExplainPointAsSC(week.explainPointAsSC)
    }
    if (speechPointStSC !== week.speechPointStSC) {
      setSpeechPointStSC(week.speechPointStSC)
    }
  }

  const makeChangeChBx = async (nameChBx: string, value: boolean) => {
    const updateWeek = {
      dateOfMeet,
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
    if (dateOfMeet) {
      const weekFromBD = await window.api.getOneWeek(dateOfMeet)
      if (weekFromBD.success) {
        setState(weekFromBD.data)
      }
    }
  }

  const confirmWeek = async () => {
    console.log('test confirm')
  }

  const updateWeek = async () => {
    console.log('test update')
  }

  return (
    <div>
      <Weeks
        calendarDateOfMeet={dateOfMeet}
        timeEndOfMeet={timeEndOfMeet}
        makeAMeet={makeAMeet}
        activeDate={dateOfMeet}
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
        value={dateOfMeet ? dateOfMeet : ''}
        onChange={(e) => makeAMeet(e.target.value)}
      />
      {!dateOfMeet ? (
        <div>For creating new week just choose the date</div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={teachingChBx}
            onChange={(e) => makeChangeChBx('teachingChBx', !teachingChBx)}
          />
          -Teaching points
          <input
            type="checkbox"
            checked={trainingChBx}
            onChange={(e) => makeChangeChBx('trainingChBx', !trainingChBx)}
          />
          -Training points
          {/*---------------------------Teaching--------------------------- */}
          {teachingChBx && <div>teaching</div>}
          {/*---------------------------Training--------------------------- */}
          {trainingChBx && (
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
                    checked={startingPointChBx}
                    onChange={(e) =>
                      makeChangeChBx('startingPointChBx', !startingPointChBx)
                    }
                  />
                  <div> - Starting a Conversation</div>
                </div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={followingPointChBx}
                    onChange={(e) =>
                      makeChangeChBx('followingPointChBx', !followingPointChBx)
                    }
                  />
                  <div> - Following Up</div>
                </div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={makingPointChBx}
                    onChange={(e) =>
                      makeChangeChBx('makingPointChBx', !makingPointChBx)
                    }
                  />
                  <div> - Making Disciples</div>
                </div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={explainingPointChBx}
                    onChange={(e) =>
                      makeChangeChBx(
                        'explainingPointChBx',
                        !explainingPointChBx
                      )
                    }
                  />
                  <div> - Explaining Your Beliefs</div>
                </div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={speechPointChBx}
                    onChange={(e) =>
                      makeChangeChBx('speechPointChBx', !speechPointChBx)
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
                  firstInput={readPointStMC}
                  firstInputStr="readPointStMC"
                  getCurrentWeek={getCurrentWeek}
                  action={action}
                  dateOfMeet={dateOfMeet}
                />

                {startingPointChBx && (
                  <CoupleInputs
                    title={'Starting a Conversation'}
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={startPointStMC}
                    firstInputStr="startPointStMC"
                    getCurrentWeek={getCurrentWeek}
                    secondInput={startPointAsMC}
                    secondInputStr="startPointAsMC"
                    action={action}
                    dateOfMeet={dateOfMeet}
                  />
                )}

                {followingPointChBx && (
                  <CoupleInputs
                    title="Following Up"
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={followPointStMC}
                    firstInputStr="followPointStMC"
                    getCurrentWeek={getCurrentWeek}
                    secondInput={followPointAsMC}
                    secondInputStr="followPointAsMC"
                    action={action}
                    dateOfMeet={dateOfMeet}
                  />
                )}

                {makingPointChBx && (
                  <CoupleInputs
                    title="Making Disciples"
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={makePointStMC}
                    firstInputStr="makePointStMC"
                    getCurrentWeek={getCurrentWeek}
                    secondInput={makePointAsMC}
                    secondInputStr="makePointAsMC"
                    action={action}
                    dateOfMeet={dateOfMeet}
                  />
                )}

                {explainingPointChBx && (
                  <CoupleInputs
                    title="Explaining Your Beliefs"
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={explainPointStMC}
                    firstInputStr="explainPointStMC"
                    getCurrentWeek={getCurrentWeek}
                    secondInput={explainPointAsMC}
                    secondInputStr="explainPointAsMC"
                    action={action}
                    dateOfMeet={dateOfMeet}
                  />
                )}

                {speechPointChBx && (
                  <SingleInput
                    title={'Talk'}
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    firstInput={speechPointStMC}
                    firstInputStr="speechPointStMC"
                    getCurrentWeek={getCurrentWeek}
                    action={action}
                    dateOfMeet={dateOfMeet}
                  />
                )}
              </div>
              {/*---------------------------Small class--------------------------- */}
              <div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={smallClassChBx}
                    onChange={(e) =>
                      makeChangeChBx('smallClassChBx', !smallClassChBx)
                    }
                  />
                  <div>- Training points small class</div>
                </div>
                {smallClassChBx && (
                  <div>
                    <SingleInput
                      title={'Bible Reading'}
                      openAndChoose={openAndChoose}
                      openedList={openedList}
                      firstInput={readPointStSC}
                      firstInputStr="readPointStSC"
                      getCurrentWeek={getCurrentWeek}
                      action={action}
                      dateOfMeet={dateOfMeet}
                    />

                    {startingPointChBx && (
                      <CoupleInputs
                        title="Starting a Conversation"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={startPointStSC}
                        firstInputStr="startPointStSC"
                        getCurrentWeek={getCurrentWeek}
                        secondInput={startPointAsSC}
                        secondInputStr="startPointAsSC"
                        action={action}
                        dateOfMeet={dateOfMeet}
                      />
                    )}

                    {followingPointChBx && (
                      <CoupleInputs
                        title="Following Up"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={followPointStSC}
                        firstInputStr="followPointStSC"
                        getCurrentWeek={getCurrentWeek}
                        secondInput={followPointAsSC}
                        secondInputStr="followPointAsSC"
                        action={action}
                        dateOfMeet={dateOfMeet}
                      />
                    )}

                    {makingPointChBx && (
                      <CoupleInputs
                        title="Making Disciples"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={makePointStSC}
                        firstInputStr="makePointStSC"
                        getCurrentWeek={getCurrentWeek}
                        secondInput={makePointAsSC}
                        secondInputStr="makePointAsSC"
                        action={action}
                        dateOfMeet={dateOfMeet}
                      />
                    )}

                    {explainingPointChBx && (
                      <CoupleInputs
                        title="Explaining Your Beliefs"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={explainPointStSC}
                        firstInputStr="explainPointStSC"
                        getCurrentWeek={getCurrentWeek}
                        secondInput={explainPointAsSC}
                        secondInputStr="explainPointAsSC"
                        action={action}
                        dateOfMeet={dateOfMeet}
                      />
                    )}

                    {speechPointChBx && (
                      <SingleInput
                        title="Talk"
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        firstInput={speechPointStSC}
                        firstInputStr="speechPointStSC"
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={dateOfMeet}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {action === 'plan' && dateOfMeet && (
        <div onClick={() => setState(defaultState)}>Close the window</div>
      )}
      {/* close week - setdate-und */}
      {action === 'confirm' && <div onClick={confirmWeek}>Confirm change</div>}
      {action === 'update' && (
        <div>
          <div onClick={updateWeek}>Update student info</div>
          <div>Delete this week</div>
        </div>
      )}
    </div>
  )
}

export default AddInfoByWeek
