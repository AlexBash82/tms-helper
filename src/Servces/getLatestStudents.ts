import { IAddParams, IStudent } from '../interfaces'

export async function getLatestStudents(
  task: string
): Promise<IStudent[] | undefined> {
  const taskMappings = [
    { keyword: 'bibleReadingPoint', param: { isBibleReading: true } },
    { keyword: 'talkPoint', param: { isTalk: true } },
    { keyword: 'makePoint', param: { isNotBibleStudy: false } },
    { keyword: 'MC', param: { isSecondClassOnly: false } },
    { keyword: 'St', param: { isPortnerOnly: false } },
    { keyword: 'chairmanPoint', param: { isChairman: true } },
    { keyword: 'firstTalkPoint', param: { isFirstSpeech: true } },
    { keyword: 'explainTalkPoint', param: { isExplainTalk: true } },
    { keyword: 'gemsPoint', param: { isGems: true } },
    { keyword: 'secondChairmanPoint', param: { isSecondChairm: true } },
    { keyword: 'livingAsChrPoint', param: { isLivingAsChr: true } },
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
      //console.log('getLatestSt - addParams: ', addParams)
      const users = await window.api.getUsersByLatest(addParams)
      //console.log('getLatestSt - users: ', users)
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
