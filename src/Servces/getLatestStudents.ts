import { IAddParams, IStudent } from '../interfaces'

export async function getLatestStudents(
  task: string
): Promise<IStudent[] | undefined> {
  const taskMappings = [
    { keyword: 'readPoint', param: { isBibleReading: true } },
    { keyword: 'speechPoint', param: { isTalk: true } },
    { keyword: 'makePoint', param: { isNotBibleStudy: false } },
    { keyword: 'MC', param: { isSecondClassOnly: false } },
    { keyword: 'St', param: { isPortnerOnly: false } },
    { keyword: 'chairmanPoint', param: { isChairman: true } },
    { keyword: 'firstTalkPoint', param: { isFirstSpeech: true } },
    { keyword: 'explainSpPoint', param: { isExplainTalk: true } },
    { keyword: 'gemsPoint', param: { isGems: true } },
    { keyword: 'secondChairmPoint', param: { isSecondChairm: true } },
    { keyword: 'livingAsChrPoint', param: { isLivingAsChr: true } },
    { keyword: 'lessonOnePoint', param: { isLivingAsChr: true } },
    { keyword: 'lessonTwoPoint', param: { isLivingAsChr: true } },
    { keyword: 'congBibleStudyPoint', param: { isCongBibleStudy: true } },
    {
      keyword: 'congBibleStudyReaderPoint',
      param: { isCongBibleStudyReader: true },
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
