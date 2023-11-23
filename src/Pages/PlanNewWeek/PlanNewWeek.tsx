import React, { useEffect, useState } from 'react'
import { IUserDB } from '../interfaces'
import './PlanNewWeek.css'
import ListOfCandidates from '../../Components/ListOfCandidates/ListOfCandidates'
import CoupleInput from '../../Components/CoupleInput/CoupleInput'

//отображать планирование в зависимости от выбраннх полей: учебные и/или обучающие
//функцию получения запланированых недель
//после выбора недели проверить не прошлое ли это и есть ли план на эту неделю
//выводить календарь - какие недели запланированы
//функцию получения всех юзеров и расстановка по самому последнему выстыпавшему (в отдельный масс)
//отображение в выпадающем окне из этого массива. сортировка по полям, одно поле "оставить пустым"
//поле партнера добавить
//кнопку формирования бланка
//кнопку сохранения недели
//чтение должно быть выбрано без возможности отменить

const PlanNewWeek: React.FC = () => {
  const [dateOfMeet, setDateOfMeet] = useState('')
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
  const [planedWeeks, setPlanedWeeks] = useState([])
  const [usersLatest, setUsersLatest] = useState<Array<IUserDB>>([])

  //получаем тех кто не выступал дольше всех в количестве до 10, и кто может и не запланирован
  const getUsersLatest = async (addParam: object) => {
    try {
      const users = await window.api.getUsersByLatest(addParam)
      setUsersLatest(users)
      console.log(users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    getUsersLatest({})
  }, [])

  const openAndChoose = (task: string) => {
    openedList === task ? setOpenedList('') : setOpenedList(task)
  }

  return (
    <div>
      <input
        placeholder="Date of meeting"
        type="date"
        value={dateOfMeet}
        onChange={(e) => setDateOfMeet(e.target.value)}
      />
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
              <input type="checkbox" checked={true} />
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
                onChange={(e) => setExplainingPointChBx(!explainingPointChBx)}
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
                />
              )}
            </div>

            {startingPointChBx && (
              <CoupleInput
                title={'Starting a Conversation - '}
                openAndChoose={openAndChoose}
                openedList={openedList}
                close={setOpenedList}
                firstInput={startPointStMC}
                firstInputStr="startPointStMC"
                secondInput={startPointAsMC}
                secondInputStr="startPointAsMC"
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
                secondInput={followPointAsMC}
                secondInputStr="followPointAsMC"
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
                secondInput={makePointAsMC}
                secondInputStr="makePointAsMC"
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
                secondInput={explainPointAsMC}
                secondInputStr="explainPointAsMC"
              />
            )}

            {speechPointChBx && (
              <div className="df">
                <div>Talk - </div>
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
                  />
                )}
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
                    />
                  )}
                </div>

                {startingPointChBx && (
                  <CoupleInput
                    title="Starting a Conversation - "
                    openAndChoose={openAndChoose}
                    openedList={openedList}
                    close={setOpenedList}
                    firstInput={startPointStSC}
                    firstInputStr="startPointStSC"
                    secondInput={startPointAsSC}
                    secondInputStr="startPointAsSC"
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
                    secondInput={followPointAsSC}
                    secondInputStr="followPointAsSC"
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
                    secondInput={makePointAsSC}
                    secondInputStr="makePointAsSC"
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
                    secondInput={explainPointAsSC}
                    secondInputStr="explainPointAsSC"
                  />
                )}

                {speechPointChBx && (
                  <div className="df">
                    <div>Talk - </div>
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
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlanNewWeek
