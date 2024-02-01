export interface IStudent {
  _id: string
  lastFirstName: string
  gender: string
  dontUse: boolean
  comments: string
  plan: false
  portners: Array<string>

  latest: number | null

  isPortnerOnly: boolean
  isSecondClassOnly: boolean
  isNotBibleStudy: boolean

  mainSlave: number | null
  smallSlave: number | null

  mainStarting: number | null
  smallStarting: number | null

  mainFollowing: number | null
  smallFollowing: number | null

  mainMaking: number | null
  smallMaking: number | null

  mainExplaining: number | null
  smallExplaining: number | null

  isExplainSpeech: boolean
  mainExplainSpeech: number | null
  smallExplaiSpeech: number | null

  isRead: boolean
  mainRead: number | null
  smallRead: number | null

  isSpeech: boolean
  mainSpeech: number | null
  smallSpeech: number | null

  isEndPrayer: boolean
  endPrayer: number | null

  isStudyBibleInReader: boolean
  studyBibleInReader: number | null

  isGems: boolean
  gems: number | null

  isLiveAndServ: boolean
  liveAndServ: number | null

  isFirstSpeech: boolean
  firstSpeech: number | null

  isStudyBibleIn: boolean
  studyBibleIn: number | null

  isSecondChairm: boolean
  secondChairm: number | null

  isChairman: boolean
  chairman: number | null
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
  isFirstSpeech: boolean
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
  firstSpeech: string
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

  readPointStMC: { name: string; _id: string } | null
  readPointStSC: { name: string; _id: string } | null

  startPointStMC: { name: string; _id: string } | null
  startPointAsMC: { name: string; _id: string } | null
  startPointStSC: { name: string; _id: string } | null
  startPointAsSC: { name: string; _id: string } | null

  followPointStMC: { name: string; _id: string } | null
  followPointAsMC: { name: string; _id: string } | null
  followPointStSC: { name: string; _id: string } | null
  followPointAsSC: { name: string; _id: string } | null

  makePointStMC: { name: string; _id: string } | null
  makePointAsMC: { name: string; _id: string } | null
  makePointStSC: { name: string; _id: string } | null
  makePointAsSC: { name: string; _id: string } | null

  explainPointStMC: { name: string; _id: string } | null
  explainPointAsMC: { name: string; _id: string } | null
  explainPointStSC: { name: string; _id: string } | null
  explainPointAsSC: { name: string; _id: string } | null

  speechPointStMC: { name: string; _id: string } | null
  speechPointStSC: { name: string; _id: string } | null
}
