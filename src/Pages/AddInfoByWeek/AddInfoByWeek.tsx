import React, { useEffect, useState } from 'react'
import './AddInfoByWeek.css'
import ListOfCandidates from '../../Components/ListOfCandidates/ListOfCandidates'
import CoupleInput from '../../Components/CoupleInput/CoupleInput'
import { IWeek } from '../../interfaces'
import { getStartAndEndWeek } from '../../services/logicDate'

//функцию получения запланированых недель
//выводить календарь - какие недели запланированы и какие нуждаются в подтверждении
//кнопку формирования бланка
//кнопку сохранения недели
//в неделю нужно сохранять: timestamp, дни недели которые под планом, все поля с учащимися
// teaching, training, ...ChBx

const AddInfoByWeek: React.FC = () => {
  //const [week, setWeek] = useState<IWeek|undefined>(undefined)
  const [dateOfMeet, setDateOfMeet] = useState<string | undefined>()
  //const [planedWeeks, setPlanedWeeks] = useState([])

  const [teaching, setTeaching] = useState(false)
  const [training, setTraining] = useState(false)
  const [smallClass, setSmallClass] = useState(false)
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

  //useEffect на чек боксы - при изменении - перезаписывать данные для этой недели

  const openAndChoose = (task: string) => {
    openedList === task ? setOpenedList('') : setOpenedList(task)
  }

  const planOfMeet = (dateOfMeet: string) => {
    //в этой функции нужно (сходить в базу недель) взять переменную которая сходит в базу
    //если выбранная неделя "прошлое", то сравнить с базой - есть ли что для подтверждения
    // и если есть вывести окно подтверждения, после подтверждения - неделю из базы удалить
    // если "прошлое" и данных нет, то включить режим обновления данных
    //если "будущее" то сравнить - есть ли в базе такая неделя, и если есть вывести и предложить
    //редактировать, если  нет вывести пустую форму
    const timeEndOfMeet = '21:45'
    const [year, month, day] = dateOfMeet.split('-').map(Number)
    const [hour, minute] = timeEndOfMeet.split(':').map(Number)

    const { startWeekTSt, endWeekTSt } = getStartAndEndWeek(year, month, day)
    //console.log('Начало недели:', new Date(startWeekTSt))
    //console.log('Конец недели:', new Date(endWeekTSt))

    //console.log('dateOfMeet', dateOfMeet)
    // Месяцы в JavaScript начинаются с 0, поэтому вычитаем 1
    const dateObject = new Date(year, month - 1, day, hour, minute)
    //console.log('dateObject', dateObject)
    // Получаем метку времени
    const timestamp = dateObject.getTime()
    const timestampNow = Date.now()

    if (timestamp > timestampNow) {
      //если есть такая неделя то взять ее и заполнить поля, если нет, точистую форму
      setAction('plan')
      //console.log('future')
    }
    if (timestamp < timestampNow) {
      //если есть неделя для подтверждения то______________________________
      setAction('confirm')
      //если нет для подтверждения, то
      setAction('update')
      console.log('past')
    }

    //console.log(dateObject)
    setDateOfMeet(dateOfMeet)
    writeWeekToDB(dateOfMeet, startWeekTSt, endWeekTSt)
  }

  const writeWeekToDB = async (
    dateOfMeet: string,
    startWeekTSt: number,
    endWeekTSt: number
  ) => {
    const newWeek: IWeek = {
      startWeekTSt,
      endWeekTSt,
      dateOfMeet,

      teaching,
      training,
      smallClass,
      startingPointChBx,
      followingPointChBx,
      makingPointChBx,
      explainingPointChBx,
      speechPointChBx,

      readPointStMC,
      startPointStMC,
      startPointAsMC,
      followPointStMC,
      followPointAsMC,
      makePointStMC,
      makePointAsMC,
      explainPointStMC,
      explainPointAsMC,
      speechPointStMC,
      readPointStSC,
      startPointStSC,
      startPointAsSC,
      followPointStSC,
      followPointAsSC,
      makePointStSC,
      makePointAsSC,
      explainPointStSC,
      explainPointAsSC,
      speechPointStSC,
    }

    const result = await window.api.writeNewWeek(newWeek)
    //console.log('result.date', result.date)
    if (result.date) {
      const week = result.date as IWeek
      setDateOfMeet(week.dateOfMeet)
      setTeaching(week.teaching)
      setTraining(week.training)
      setSmallClass(week.smallClass)
      setStartingPointChBx(week.startingPointChBx)
      setFollowingPointChBx(week.followingPointChBx)
      setMakingPointChBx(week.makingPointChBx)
      setExplainingPointChBx(week.explainingPointChBx)
      setSpeechPointChBx(week.speechPointChBx)
      setReadPointStMC(week.readPointStMC)
      setStartPointStMC(week.startPointStMC)
      setStartPointASMC(week.startPointAsMC)
      setFollowPointStMC(week.followPointStMC)
      setFollowPointAsMC(week.followPointAsMC)
      setMakePointStMC(week.makePointStMC)
      setMakePointAsMC(week.makePointAsMC)
      setExplainPointStMC(week.explainPointStMC)
      setExplainPointAsMC(week.explainPointAsMC)
      setSpeechPointStMC(week.speechPointStMC)
      setReadPointStSC(week.readPointStSC)
      setStartPointStSC(week.startPointStSC)
      setStartPointAsSC(week.startPointAsSC)
      setFollowPointStSC(week.followPointStSC)
      setFollowPointAsSC(week.followPointAsSC)
      setMakePointStSC(week.makePointStSC)
      setMakePointAsSC(week.makePointAsSC)
      setExplainPointStSC(week.explainPointStSC)
      setExplainPointAsSC(week.explainPointAsSC)
      setSpeechPointStSC(week.speechPointStSC)
    }
  }

  return (
    <div>
      <input
        placeholder="Date of meeting"
        type="date"
        value={dateOfMeet ? dateOfMeet : ''}
        onChange={(e) => planOfMeet(e.target.value)}
      />
      {!dateOfMeet ? (
        <div>For creating new week just choose the date</div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={teaching}
            onChange={(e) => setTeaching(!teaching)}
          />
          -Teaching points
          <input
            type="checkbox"
            checked={training}
            onChange={(e) => setTraining(!training)}
          />
          -Training points
          {/*---------------------------Teaching--------------------------- */}
          {teaching && <div>teaching</div>}
          {/*---------------------------Training--------------------------- */}
          {training && (
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
                    onChange={(e) => setStartingPointChBx(!startingPointChBx)}
                  />
                  <div> - Starting a Conversation</div>
                </div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={followingPointChBx}
                    onChange={(e) => setFollowingPointChBx(!followingPointChBx)}
                  />
                  <div> - Following Up</div>
                </div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={makingPointChBx}
                    onChange={(e) => setMakingPointChBx(!makingPointChBx)}
                  />
                  <div> - Making Disciples</div>
                </div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={explainingPointChBx}
                    onChange={(e) =>
                      setExplainingPointChBx(!explainingPointChBx)
                    }
                  />
                  <div> - Explaining Your Beliefs</div>
                </div>
                <div className="df">
                  <input
                    type="checkbox"
                    checked={speechPointChBx}
                    onChange={(e) => setSpeechPointChBx(!speechPointChBx)}
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
                    <div
                      className="input-box"
                      onClick={() => openAndChoose('readPointStMc')}
                    >
                      {readPointStMC}
                    </div>
                    {openedList === 'readPointStMc' && (
                      <ListOfCandidates
                        close={setOpenedList}
                        presentValue={readPointStMC}
                        task="readPointStMc"
                        setChoose={setReadPointStMC}
                        action={action}
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
                    firstSetChoose={setStartPointStMC}
                    secondInput={startPointAsMC}
                    secondInputStr="startPointAsMC"
                    secondSetChoose={setStartPointASMC}
                    action={action}
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
                    firstSetChoose={setFollowPointStMC}
                    secondInput={followPointAsMC}
                    secondInputStr="followPointAsMC"
                    secondSetChoose={setFollowPointAsMC}
                    action={action}
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
                    firstSetChoose={setMakePointStMC}
                    secondInput={makePointAsMC}
                    secondInputStr="makePointAsMC"
                    secondSetChoose={setMakePointAsMC}
                    action={action}
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
                    firstSetChoose={setExplainPointStMC}
                    secondInput={explainPointAsMC}
                    secondInputStr="explainPointAsMC"
                    secondSetChoose={setExplainPointAsMC}
                    action={action}
                  />
                )}

                {speechPointChBx && (
                  <div className="df">
                    <div>Talk - </div>
                    <div className="">
                      <div
                        className="input-box"
                        onClick={() => openAndChoose('speechPointStMC')}
                      >
                        {speechPointStMC}
                      </div>
                      {openedList === 'speechPointStMC' && (
                        <ListOfCandidates
                          close={setOpenedList}
                          presentValue={speechPointStMC}
                          task="speechPointStMC"
                          setChoose={setSpeechPointStMC}
                          action={action}
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
                    checked={smallClass}
                    onChange={(e) => setSmallClass(!smallClass)}
                  />
                  <div>- Training points small class</div>
                </div>
                {smallClass && (
                  <div>
                    <div className="df">
                      <div>Bible Reading - </div>
                      <div className="">
                        <div
                          className="input-box"
                          onClick={() => openAndChoose('readPointStSC')}
                        >
                          {readPointStSC}
                        </div>
                        {openedList === 'readPointStSC' && (
                          <ListOfCandidates
                            close={setOpenedList}
                            presentValue={readPointStSC}
                            task="readPointStSC"
                            setChoose={setReadPointStSC}
                            action={action}
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
                        firstSetChoose={setStartPointStSC}
                        secondInput={startPointAsSC}
                        secondInputStr="startPointAsSC"
                        secondSetChoose={setStartPointAsSC}
                        action={action}
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
                        firstSetChoose={setFollowPointStSC}
                        secondInput={followPointAsSC}
                        secondInputStr="followPointAsSC"
                        secondSetChoose={setFollowPointAsSC}
                        action={action}
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
                        firstSetChoose={setMakePointStSC}
                        secondInput={makePointAsSC}
                        secondInputStr="makePointAsSC"
                        secondSetChoose={setMakePointAsSC}
                        action={action}
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
                        firstSetChoose={setExplainPointStSC}
                        secondInput={explainPointAsSC}
                        secondInputStr="explainPointAsSC"
                        secondSetChoose={setExplainPointAsSC}
                        action={action}
                      />
                    )}

                    {speechPointChBx && (
                      <div className="df">
                        <div>Talk - </div>
                        <div className="">
                          <div
                            className="input-box"
                            onClick={() => openAndChoose('speechPointStSC')}
                          >
                            {speechPointStSC}
                          </div>
                          {openedList === 'speechPointStSC' && (
                            <ListOfCandidates
                              close={setOpenedList}
                              presentValue={speechPointStSC}
                              task="speechPointStSC"
                              setChoose={setSpeechPointStSC}
                              action={action}
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
      {action === 'plan' && <div>Write week to DB</div>}
      {/* close week - setdate-und */}
      {action === 'confirm' && <div>Confirm change</div>}
      {action === 'update' && <div>Update student info</div>}
    </div>
  )
}

export default AddInfoByWeek
