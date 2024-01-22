export interface IStudent {
  _id: string
  lastFirstName: string
  gender: string
  dontUse: boolean
  comments: string
  plan: false
  portners: Array<string>
  latest: number

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

export interface IMaleDB {
  lastFirstName: string
  gender: string

  isChairman: boolean
  isSecondChairm: boolean
  isFirstSpeach: boolean
  isGems: boolean
  isLiveAndServ: boolean
  isStudyBibleIn: boolean
  isStudyBibleInReader: boolean
  isEndPrayer: boolean
  isSpeech: boolean
  dontUse: boolean
  comments: string

  plan: false
  chairman: number
  secondChairm: number
  firstSpeach: number
  gems: number
  mainRead: number
  smallRead: number
  mainStarting: number
  smallStarting: number
  mainFollowing: number
  smallFollowing: number
  mainMaking: number
  smallMaking: number
  mainExplaining: number
  smallExplaining: number
  mainSpeech: number
  smallSpeech: number
  mainSlave: number
  smallSlave: number
  portners: Array<string>
  liveAndServ: number
  studyBibleIn: number
  studyBibleInReader: number
  endPrayer: number
  latest: number

  _id: string | undefined
}

export interface IFemaleDB {
  lastFirstName: string
  gender: string
  isPortnerOnly: boolean
  isSecondClassOnly: boolean
  isNotBibleStudy: boolean
  dontUse: boolean
  comments: string

  plan: false
  mainStarting: number
  smallStarting: number
  mainFollowing: number
  smallFollowing: number
  mainMaking: number
  smallMaking: number
  mainExplaining: number
  smallExplaining: number
  mainSlave: number
  smallSlave: number
  portners: Array<string>
  latest: number

  _id: string | undefined
}
export interface IMaleData {
  isChairman: boolean
  isSecondChairm: boolean
  isFirstSpeach: boolean
  isGems: boolean
  isLiveAndServ: boolean
  isStudyBibleIn: boolean
  isStudyBibleInReader: boolean
  isEndPrayer: boolean
  isSpeech: boolean
}

export interface IFemaleData {
  isPortnerOnly: boolean
  isSecondClassOnly: boolean
  isNotBibleStudy: boolean
}

export interface IWeek {
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

  readPointStMC: string
  startPointStMC: string
  startPointAsMC: string
  followPointStMC: string
  followPointAsMC: string
  makePointStMC: string
  makePointAsMC: string
  explainPointStMC: string
  explainPointAsMC: string
  speechPointStMC: string
  readPointStSC: string
  startPointStSC: string
  startPointAsSC: string
  followPointStSC: string
  followPointAsSC: string
  makePointStSC: string
  makePointAsSC: string
  explainPointStSC: string
  explainPointAsSC: string
  speechPointStSC: string
}
