import { IAddParams, IStudent } from '../interfaces'

export async function getLatestStudents(
  task: string
): Promise<IStudent[] | undefined> {
  const taskMappings = [
    { keyword: 'readPoint', param: { isRead: true } },
    { keyword: 'speechPoint', param: { isSpeech: true } },
    { keyword: 'makePoint', param: { isNotBibleStudy: false } },
    { keyword: 'MC', param: { isSecondClassOnly: false } },
    { keyword: 'St', param: { isPortnerOnly: false } },
    { keyword: 'chairmanPoint', param: { isChairman: true } },
    { keyword: 'firstSpeechPoint', param: { isFirstSpeech: true } },
    { keyword: 'explainSpPoint', param: { isExplainSpeech: true } },
    { keyword: 'gemsPoint', param: { isGems: true } },
    { keyword: 'secondChairmPoint', param: { isSecondChairm: true } },
    { keyword: 'liveAndServPoint', param: { isLiveAndServ: true } },
    { keyword: 'lessonOnePoint', param: { isLiveAndServ: true } },
    { keyword: 'lessonTwoPoint', param: { isLiveAndServ: true } },
    { keyword: 'studyBibleInPoint', param: { isStudyBibleIn: true } },
    {
      keyword: 'studyBibleInReaderPoint',
      param: { isStudyBibleInReader: true },
    },
    { keyword: 'endPrayerPoint', param: { isEndPrayer: true } },
  ]

  const addSearchParams = (): IAddParams => {
    return taskMappings.reduce((params, mapping) => {
      if (task.includes(mapping.keyword)) {
        return { ...params, ...mapping.param }
      }
      return params
    }, {} as IAddParams)
  }

  const getStudents = async (): Promise<IStudent[] | undefined> => {
    try {
      const addParams = addSearchParams()
      const users = await window.api.getUsersByLatest(addParams)
      if (users.success) {
        return users.data
      } else {
        console.warn('Failed to fetch users:', users.message)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  return getStudents()
}
