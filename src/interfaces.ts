export interface IStudent {
  _id: string
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
  _id: string | undefined
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

  readPointStMC: { name: string; _id: string } | undefined
  readPointStSC: { name: string; _id: string } | undefined

  startPointStMC: { name: string; _id: string } | undefined
  startPointAsMC: { name: string; _id: string } | undefined
  startPointStSC: { name: string; _id: string } | undefined
  startPointAsSC: { name: string; _id: string } | undefined

  followPointStMC: { name: string; _id: string } | undefined
  followPointAsMC: { name: string; _id: string } | undefined
  followPointStSC: { name: string; _id: string } | undefined
  followPointAsSC: { name: string; _id: string } | undefined

  makePointStMC: { name: string; _id: string } | undefined
  makePointAsMC: { name: string; _id: string } | undefined
  makePointStSC: { name: string; _id: string } | undefined
  makePointAsSC: { name: string; _id: string } | undefined

  explainPointStMC: { name: string; _id: string } | undefined
  explainPointAsMC: { name: string; _id: string } | undefined
  explainPointStSC: { name: string; _id: string } | undefined
  explainPointAsSC: { name: string; _id: string } | undefined

  speechPointStMC: { name: string; _id: string } | undefined
  speechPointStSC: { name: string; _id: string } | undefined
}
