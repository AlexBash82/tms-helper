import React, { useState } from 'react'
import './AddInfoByWeek.css'
import ListOfCandidates from '../../Components/ListOfCandidates/ListOfCandidates'
import CoupleInput from '../../Components/CoupleInput/CoupleInput'
import { IFemaleDB, IMaleDB, IWeek } from '../../interfaces'
import { getStartAndEndWeek } from '../../services/logicDate'
import Weeks from '../../Components/Weeks/Weeks'

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
  const [readPointStMC, setReadPointStMC] = useState('Didnt choose yet')
  const [startPointStMC, setStartPointStMC] = useState('Didnt choose yet')
  const [startPointAsMC, setStartPointASMC] = useState('Didnt choose yet')
  const [followPointStMC, setFollowPointStMC] = useState('Didnt choose yet')
  const [followPointAsMC, setFollowPointAsMC] = useState('Didnt choose yet')
  const [makePointStMC, setMakePointStMC] = useState('Didnt choose yet')
  const [makePointAsMC, setMakePointAsMC] = useState('Didnt choose yet')
  const [explainPointStMC, setExplainPointStMC] = useState('Didnt choose yet')
  const [explainPointAsMC, setExplainPointAsMC] = useState('Didnt choose yet')
  const [speechPointStMC, setSpeechPointStMC] = useState('Didnt choose yet')
  const [readPointStSC, setReadPointStSC] = useState('Didnt choose yet')
  const [startPointStSC, setStartPointStSC] = useState('Didnt choose yet')
  const [startPointAsSC, setStartPointAsSC] = useState('Didnt choose yet')
  const [followPointStSC, setFollowPointStSC] = useState('Didnt choose yet')
  const [followPointAsSC, setFollowPointAsSC] = useState('Didnt choose yet')
  const [makePointStSC, setMakePointStSC] = useState('Didnt choose yet')
  const [makePointAsSC, setMakePointAsSC] = useState('Didnt choose yet')
  const [explainPointStSC, setExplainPointStSC] = useState('Didnt choose yet')
  const [explainPointAsSC, setExplainPointAsSC] = useState('Didnt choose yet')
  const [speechPointStSC, setSpeechPointStSC] = useState('Didnt choose yet')
  const [openedList, setOpenedList] = useState('')
  const [action, setAction] = useState<
    'plan' | 'confirm' | 'update' | undefined
  >()
  const [foundByLettReadStMC, setFoundByLettReadStMC] = useState<
    Array<IMaleDB | IFemaleDB>
  >([])
  const [foundByLettReadStSC, setFoundByLettReadStSC] = useState<
    Array<IMaleDB | IFemaleDB>
  >([])
  const [foundByLettSpeechStMC, setFoundByLettSpeechStMC] = useState<
    Array<IMaleDB | IFemaleDB>
  >([])
  const [foundByLettSpeechStSC, setFoundByLettSpeechStSC] = useState<
    Array<IMaleDB | IFemaleDB>
  >([])
  const [inputReadStMC, setInputReadStMC] = useState('')
  const [inputReadStSC, setInputReadStSC] = useState('')
  const [inputSpeechStMC, setInputSpeechStMC] = useState('')
  const [inputSpeechStSC, setInputSpeechStSC] = useState('')
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

    readPointStMC: 'Didnt choose yet',
    startPointStMC: 'Didnt choose yet',
    startPointAsMC: 'Didnt choose yet',
    followPointStMC: 'Didnt choose yet',
    followPointAsMC: 'Didnt choose yet',
    makePointStMC: 'Didnt choose yet',
    makePointAsMC: 'Didnt choose yet',
    explainPointStMC: 'Didnt choose yet',
    explainPointAsMC: 'Didnt choose yet',
    speechPointStMC: 'Didnt choose yet',
    readPointStSC: 'Didnt choose yet',
    startPointStSC: 'Didnt choose yet',
    startPointAsSC: 'Didnt choose yet',
    followPointStSC: 'Didnt choose yet',
    followPointAsSC: 'Didnt choose yet',
    makePointStSC: 'Didnt choose yet',
    makePointAsSC: 'Didnt choose yet',
    explainPointStSC: 'Didnt choose yet',
    explainPointAsSC: 'Didnt choose yet',
    speechPointStSC: 'Didnt choose yet',
  }

  const openAndChoose = (task: string) => {
    openedList === task ? setOpenedList('') : setOpenedList(task)
  }

  const searchByLettReadStMC = async (inputLatters: string) => {
    if (inputLatters) {
      const students = await window.api.getUsersByLastname(inputLatters)
      if (students.success) {
        setFoundByLettReadStMC(students.data)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    }
    setInputReadStMC(inputLatters)
  }

  const searchByLettReadStSC = async (inputLatters: string) => {
    if (inputLatters) {
      const students = await window.api.getUsersByLastname(inputLatters)
      if (students.success) {
        setFoundByLettReadStSC(students.data)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    }
    setInputReadStSC(inputLatters)
  }

  const searchByLettSpeechStMC = async (inputLatters: string) => {
    if (inputLatters) {
      const students = await window.api.getUsersByLastname(inputLatters)
      if (students.success) {
        setFoundByLettSpeechStMC(students.data)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    }
    setInputSpeechStMC(inputLatters)
  }

  const searchByLettSpeechStSC = async (inputLatters: string) => {
    if (inputLatters) {
      const students = await window.api.getUsersByLastname(inputLatters)
      if (students.success) {
        setFoundByLettSpeechStSC(students.data)
      } else {
        console.error('Error searching users by lastname:', students.message)
      }
    }
    setInputSpeechStSC(inputLatters)
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
        console.log('past get - confirm', isWeekExist)
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
    clearInputAndArr()
  }

  const clearInputAndArr = () => {
    setFoundByLettReadStMC([])
    setFoundByLettReadStSC([])
    setFoundByLettSpeechStMC([])
    setFoundByLettSpeechStSC([])
    setInputReadStMC('')
    setInputReadStSC('')
    setInputSpeechStMC('')
    setInputSpeechStSC('')
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

      readPointStMC: 'Didnt choose yet',
      startPointStMC: 'Didnt choose yet',
      startPointAsMC: 'Didnt choose yet',
      followPointStMC: 'Didnt choose yet',
      followPointAsMC: 'Didnt choose yet',
      makePointStMC: 'Didnt choose yet',
      makePointAsMC: 'Didnt choose yet',
      explainPointStMC: 'Didnt choose yet',
      explainPointAsMC: 'Didnt choose yet',
      speechPointStMC: 'Didnt choose yet',
      readPointStSC: 'Didnt choose yet',
      startPointStSC: 'Didnt choose yet',
      startPointAsSC: 'Didnt choose yet',
      followPointStSC: 'Didnt choose yet',
      followPointAsSC: 'Didnt choose yet',
      makePointStSC: 'Didnt choose yet',
      makePointAsSC: 'Didnt choose yet',
      explainPointStSC: 'Didnt choose yet',
      explainPointAsSC: 'Didnt choose yet',
      speechPointStSC: 'Didnt choose yet',
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

                <div className="df">
                  <div>Bible Reading - </div>
                  <div className="">
                    {action === 'plan' ? (
                      <div
                        className="input-box"
                        onClick={() => openAndChoose('readPointStMC')}
                      >
                        {readPointStMC}
                      </div>
                    ) : (
                      <input
                        placeholder="Start print Lastname"
                        type="text"
                        value={inputReadStMC}
                        onChange={(e) => searchByLettReadStMC(e.target.value)}
                        onFocus={() => openAndChoose('readPointStMC')}
                        onBlur={() => openAndChoose('')}
                      />
                    )}
                    {openedList === 'readPointStMC' && (
                      <ListOfCandidates
                        openAndChoose={openAndChoose}
                        presentValue={readPointStMC}
                        task="readPointStMc"
                        getCurrentWeek={getCurrentWeek}
                        action={action}
                        dateOfMeet={dateOfMeet}
                        suitsStudents={foundByLettReadStMC}
                      />
                    )}
                  </div>
                </div>

                {startingPointChBx && (
                  <CoupleInput
                    title={'Starting a Conversation - '}
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    close={setOpenedList}
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
                  <CoupleInput
                    title="Following Up - "
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    close={setOpenedList}
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
                  <CoupleInput
                    title="Making Disciples - "
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    close={setOpenedList}
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
                  <CoupleInput
                    title="Explaining Your Beliefs - "
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    close={setOpenedList}
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
                  <div className="df">
                    <div>Talk - </div>
                    <div className="">
                      {action === 'plan' ? (
                        <div
                          className="input-box"
                          onClick={() => openAndChoose('speechPointStMC')}
                        >
                          {speechPointStMC}
                        </div>
                      ) : (
                        <input
                          placeholder="Start print Lastname"
                          type="text"
                          value={inputSpeechStMC}
                          onChange={(e) =>
                            searchByLettSpeechStMC(e.target.value)
                          }
                          onFocus={() => openAndChoose('speechPointStMC')}
                          onBlur={() => openAndChoose('')}
                        />
                      )}
                      {openedList === 'speechPointStMC' && (
                        <ListOfCandidates
                          openAndChoose={openAndChoose}
                          presentValue={speechPointStMC}
                          task="speechPointStMC"
                          getCurrentWeek={getCurrentWeek}
                          action={action}
                          dateOfMeet={dateOfMeet}
                          suitsStudents={foundByLettSpeechStMC}
                        />
                      )}
                    </div>
                  </div>
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
                    <div className="df">
                      <div>Bible Reading - </div>
                      <div className="">
                        {action === 'plan' ? (
                          <div
                            className="input-box"
                            onClick={() => openAndChoose('readPointStSC')}
                          >
                            {readPointStSC}
                          </div>
                        ) : (
                          <input
                            placeholder="Start print Lastname"
                            type="text"
                            value={inputReadStSC}
                            onChange={(e) =>
                              searchByLettReadStSC(e.target.value)
                            }
                            onFocus={() => openAndChoose('readPointStSC')}
                            onBlur={() => openAndChoose('')}
                          />
                        )}
                        {openedList === 'readPointStSC' && (
                          <ListOfCandidates
                            openAndChoose={openAndChoose}
                            presentValue={readPointStSC}
                            task="readPointStSC"
                            getCurrentWeek={getCurrentWeek}
                            action={action}
                            dateOfMeet={dateOfMeet}
                            suitsStudents={foundByLettReadStSC}
                          />
                        )}
                      </div>
                    </div>

                    {startingPointChBx && (
                      <CoupleInput
                        title="Starting a Conversation - "
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        close={setOpenedList}
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
                      <CoupleInput
                        title="Following Up - "
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        close={setOpenedList}
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
                      <CoupleInput
                        title="Making Disciples - "
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        close={setOpenedList}
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
                      <CoupleInput
                        title="Explaining Your Beliefs - "
                        openAndChoose={openAndChoose}
                        openedList={openedList}
                        close={setOpenedList}
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
                      <div className="df">
                        <div>Talk - </div>
                        <div className="">
                          {action === 'plan' ? (
                            <div
                              className="input-box"
                              onClick={() => openAndChoose('speechPointStSC')}
                            >
                              {speechPointStSC}
                            </div>
                          ) : (
                            <input
                              placeholder="Start print Lastname"
                              type="text"
                              value={inputSpeechStSC}
                              onChange={(e) =>
                                searchByLettSpeechStSC(e.target.value)
                              }
                              onFocus={() => openAndChoose('speechPointStSC')}
                              onBlur={() => openAndChoose('')}
                            />
                          )}
                          {openedList === 'speechPointStSC' && (
                            <ListOfCandidates
                              openAndChoose={openAndChoose}
                              presentValue={speechPointStSC}
                              task="speechPointStSC"
                              getCurrentWeek={getCurrentWeek}
                              action={action}
                              dateOfMeet={dateOfMeet}
                              suitsStudents={foundByLettSpeechStSC}
                            />
                          )}
                        </div>
                      </div>
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
        <div onClick={updateWeek}>Update student info</div>
      )}
    </div>
  )
}

export default AddInfoByWeek
