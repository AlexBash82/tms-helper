import { IAddParams, IStudent } from '../interfaces'

export function getLatestStudents(task: string) {
  //в зависимости от содержания строки task - формируется объект для поиска полей студента по базе с дополнительными фильтрами
  const addSearchParams = () => {
    const addParams: IAddParams = {}

    if (task.includes('readPoint')) addParams.isRead = true
    if (task.includes('speechPoint')) addParams.isSpeech = true
    if (task.includes('makePoint')) addParams.isNotBibleStudy = false
    if (task.includes('MC')) addParams.isSecondClassOnly = false
    if (task.includes('St')) addParams.isPortnerOnly = false
    if (task.includes('chairmanPoint')) addParams.isChairman = true
    if (task.includes('firstSpeechPoint')) addParams.isFirstSpeech = true
    if (task.includes('explainSpPoint')) addParams.isExplainSpeech = true
    if (task.includes('gemsPoint')) addParams.isGems = true
    if (task.includes('secondChairmPoint')) addParams.isSecondChairm = true
    if (task.includes('liveAndServPoint')) addParams.isLiveAndServ = true
    if (task.includes('lessonOnePoint')) addParams.isLiveAndServ = true
    if (task.includes('lessonTwoPoint')) addParams.isLiveAndServ = true
    if (task.includes('studyBibleInPoint')) addParams.isStudyBibleIn = true
    if (task.includes('studyBibleInReaderPoint'))
      addParams.isStudyBibleInReader = true
    if (task.includes('endPrayerPoint')) addParams.isEndPrayer = true

    //console.log('search params: ', addParams)
    //console.log('task: ', task)
    return addParams
  }

  // функция для получения списка студентов из базы
  // Вызывается только если action === 'plan'
  let latestStudents
  const getStudents = async () => {
    try {
      //формируем параметры для фильтрации студентов по task
      const addParam = addSearchParams()
      const users = await window.api.getUsersByLatest(addParam)
      if (users.success) {
        console.log('users', users)
        latestStudents = users.data
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  getStudents()

  return latestStudents
}
