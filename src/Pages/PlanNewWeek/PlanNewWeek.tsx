import React, { useEffect, useState } from 'react'
import { IUserDB } from '../interfaces'
import './PlanNewWeek.css'

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
  const [readPointChBx, setReadPointChBx] = useState(false)
  const [startingPointChBx, setStartingPointChBx] = useState(false)
  const [followingPointChBx, setFollowingPointChBx] = useState(false)
  const [makingPointChBx, setMakingPointChBx] = useState(false)
  const [explainingPointChBx, setExplainingPointChBx] = useState(false)
  const [speechPointChBx, setSpeechPointChBx] = useState(false)
  const [readPointMC, setReadPointMC] = useState('Didnt choose yet')
  const [startPointMC, setStartPointMC] = useState('Didnt choose yet')
  const [followPointMC, setFollowPointMC] = useState('Didnt choose yet')
  const [makePointMC, setMakePointMC] = useState('Didnt choose yet')
  const [explainPointMC, setExplainPointMC] = useState('Didnt choose yet')
  const [speechPointMC, setSpeechPointMC] = useState('Didnt choose yet')
  const [readPointSC, setReadPointSC] = useState('Didnt choose yet')
  const [startPointSC, setStartPointSC] = useState('Didnt choose yet')
  const [followPointSC, setFollowPointSC] = useState('Didnt choose yet')
  const [makePointSC, setMakePointSC] = useState('Didnt choose yet')
  const [explainPointSC, setExplainPointSC] = useState('Didnt choose yet')
  const [speechPointSC, setSpeechPointSC] = useState('Didnt choose yet')
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

  const openAndChoose = (task: string, clas: string) => {
    console.log('I am here!')
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
              <input
                type="checkbox"
                checked={readPointChBx}
                onChange={(e) => setReadPointChBx(!readPointChBx)}
              />
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
            {readPointChBx && (
              <div className="df">
                <div>Bible Reading - </div>
                <div
                  className="input-box"
                  onClick={() => openAndChoose('read', 'mainClass')}
                >
                  {readPointMC}
                </div>
              </div>
            )}
            {startingPointChBx && (
              <div className="df">
                <div>Starting a Conversation - </div>
                <div
                  className="input-box"
                  onClick={() => openAndChoose('start', 'mainClass')}
                >
                  {startPointMC}
                </div>
              </div>
            )}
            {followingPointChBx && (
              <div className="df">
                <div>Following Up - </div>
                <div
                  className="input-box"
                  onClick={() => openAndChoose('follow', 'mainClass')}
                >
                  {followPointMC}
                </div>
              </div>
            )}
            {makingPointChBx && (
              <div className="df">
                <div>Making Disciples - </div>
                <div
                  className="input-box"
                  onClick={() => openAndChoose('make', 'mainClass')}
                >
                  {makePointMC}
                </div>
              </div>
            )}
            {explainingPointChBx && (
              <div className="df">
                <div>Explaining Your Beliefs - </div>
                <div
                  className="input-box"
                  onClick={() => openAndChoose('explain', 'mainClass')}
                >
                  {explainPointMC}
                </div>
              </div>
            )}
            {speechPointChBx && (
              <div className="df">
                <div>Talk - </div>
                <div
                  className="input-box"
                  onClick={() => openAndChoose('speech', 'mainClass')}
                >
                  {speechPointMC}
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
                {readPointChBx && (
                  <div className="df">
                    <div>Bible Reading - </div>
                    <div
                      className="input-box"
                      onClick={() => openAndChoose('read', 'smallClass')}
                    >
                      {readPointSC}
                    </div>
                  </div>
                )}
                {startingPointChBx && (
                  <div className="df">
                    <div>Starting a Conversation - </div>
                    <div
                      className="input-box"
                      onClick={() => openAndChoose('start', 'smallClass')}
                    >
                      {startPointSC}
                    </div>
                  </div>
                )}
                {followingPointChBx && (
                  <div className="df">
                    <div>Following Up - </div>
                    <div
                      className="input-box"
                      onClick={() => openAndChoose('follow', 'smallClass')}
                    >
                      {followPointSC}
                    </div>
                  </div>
                )}
                {makingPointChBx && (
                  <div className="df">
                    <div>Making Disciples - </div>
                    <div
                      className="input-box"
                      onClick={() => openAndChoose('make', 'smallClass')}
                    >
                      {makePointSC}
                    </div>
                  </div>
                )}
                {explainingPointChBx && (
                  <div className="df">
                    <div>Explaining Your Beliefs - </div>
                    <div
                      className="input-box"
                      onClick={() => openAndChoose('explain', 'smallClass')}
                    >
                      {explainPointSC}
                    </div>
                  </div>
                )}
                {speechPointChBx && (
                  <div className="df">
                    <div>Talk - </div>
                    <div
                      className="input-box"
                      onClick={() => openAndChoose('speech', 'smallClass')}
                    >
                      {speechPointSC}
                    </div>
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
