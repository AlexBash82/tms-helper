export interface IStudent {
  _id: string | undefined
  lastFirstName: string
  gender: string
  dontUse: boolean
  comments: string
  plan: false
  portners: Array<string>

  latest: number | undefined

  isPortnerOnly: boolean
  isSecondClassOnly: boolean
  isNotBibleStudy: boolean

  mainSlave: number | undefined
  smallSlave: number | undefined

  mainStarting: number | undefined
  smallStarting: number | undefined

  mainFollowing: number | undefined
  smallFollowing: number | undefined

  mainMaking: number | undefined
  smallMaking: number | undefined

  mainExplaining: number | undefined
  smallExplaining: number | undefined

  isExplainSpeech: boolean
  mainExplainSpeech: number | undefined
  smallExplaiSpeech: number | undefined

  isRead: boolean
  mainRead: number | undefined
  smallRead: number | undefined

  isSpeech: boolean
  mainSpeech: number | undefined
  smallSpeech: number | undefined

  isEndPrayer: boolean
  endPrayer: number | undefined

  isStudyBibleInReader: boolean
  studyBibleInReader: number | undefined

  isGems: boolean
  gems: number | undefined

  isLiveAndServ: boolean
  liveAndServ: number | undefined

  isFirstSpeach: boolean
  firstSpeach: number | undefined

  isStudyBibleIn: boolean
  studyBibleIn: number | undefined

  isSecondChairm: boolean
  secondChairm: number | undefined

  isChairman: boolean
  chairman: number | undefined
}

export interface IStudentCheckBox {
  isPortnerOnly: boolean
  isSecondClassOnly: boolean
  isNotBibleStudy: boolean
  isExplainSpeech: boolean
  isRead: boolean
  isSpeech: boolean
  isEndPrayer: boolean
  isStudyBibleInReader: boolean
  isGems: boolean
  isLiveAndServ: boolean
  isFirstSpeach: boolean
  isStudyBibleIn: boolean
  isSecondChairm: boolean
  isChairman: boolean
}

export interface IStudentDateToString {
  latest: string

  mainSlave: string
  smallSlave: string

  mainStarting: string
  smallStarting: string

  mainFollowing: string
  smallFollowing: string

  mainMaking: string
  smallMaking: string

  mainExplaining: string
  smallExplaining: string

  mainExplainSpeech: string
  smallExplaiSpeech: string

  mainRead: string
  smallRead: string

  mainSpeech: string
  smallSpeech: string

  endPrayer: string
  studyBibleInReader: string
  gems: string
  liveAndServ: string
  firstSpeach: string
  studyBibleIn: string
  secondChairm: string
  chairman: string
}

export interface IWeek {
  _id: string
  startWeekTSt: number
  dateOfMeet: string
  isPlanned: boolean

  teachingChBx: boolean
  trainingChBx: boolean
  smallClassChBx: boolean
  startingPointChBx: boolean
  followingPointChBx: boolean
  makingPointChBx: boolean
  explainingPointChBx: boolean
  speechPointChBx: boolean

  readPointStMC: string | undefined
  readPointStSC: string | undefined

  startPointStMC: string | undefined
  startPointAsMC: string | undefined
  startPointStSC: string | undefined
  startPointAsSC: string | undefined

  followPointStMC: string | undefined
  followPointAsMC: string | undefined
  followPointStSC: string | undefined
  followPointAsSC: string | undefined

  makePointStMC: string | undefined
  makePointAsMC: string | undefined
  makePointStSC: string | undefined
  makePointAsSC: string | undefined

  explainPointStMC: string | undefined
  explainPointAsMC: string | undefined
  explainPointStSC: string | undefined
  explainPointAsSC: string | undefined

  speechPointStMC: string | undefined
  speechPointStSC: string | undefined
}
