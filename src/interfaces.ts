export interface IStudent {
  _id: string
  lastFirstName: string
  gender: string
  dontUse: boolean
  comments: string
  plan: false
  status: 'free' | 'planed' | 'sent' | 'accepted' | 'rejected'
  portners: Array<{ name: string; _id: string }>

  latest: number | null

  isPortnerOnly: boolean
  isSecondClassOnly: boolean
  isNotBibleStudy: boolean

  assistantPointAsMC: number | null
  assistantPointAsSC: number | null

  startPointStMC: number | null
  startPointStSC: number | null

  followPointStMC: number | null
  followPointStSC: number | null

  makePointStMC: number | null
  makePointStSC: number | null

  explainPointStMC: number | null
  explainPointStSC: number | null

  isExplainTalk: boolean
  explainTalkPointStMC: number | null
  explainTalkPointStSC: number | null

  isBibleReading: boolean
  bibleReadingPointStMC: number | null
  bibleReadingPointStSC: number | null

  isTalk: boolean
  talkPointStMC: number | null
  talkPointStSC: number | null

  isEndPrayer: boolean
  endPrayerPoint: number | null

  isCongBibleStudyReader: boolean
  congBibleStudyReaderPoint: number | null

  isGems: boolean
  gemsPoint: number | null

  isLivingAsChr: boolean
  livingAsChrPoint: number | null

  isFirstSpeech: boolean
  firstTalkPoint: number | null

  isCongBibleStudy: boolean
  congBibleStudyPoint: number | null

  isSecondChairm: boolean
  secondChairmanPoint: number | null

  isChairman: boolean
  chairmanPoint: number | null
}

export interface IStudentCheckBox {
  isPortnerOnly: boolean
  isSecondClassOnly: boolean
  isNotBibleStudy: boolean
  isExplainTalk: boolean
  isBibleReading: boolean
  isTalk: boolean
  isEndPrayer: boolean
  isCongBibleStudyReader: boolean
  isGems: boolean
  isLivingAsChr: boolean
  isFirstSpeech: boolean
  isCongBibleStudy: boolean
  isSecondChairm: boolean
  isChairman: boolean
}

export interface IStudentDateToString {
  latest: string

  assistantPointAsMC: string
  assistantPointAsSC: string

  startPointStMC: string
  startPointStSC: string

  followPointStMC: string
  followPointStSC: string

  makePointStMC: string
  makePointStSC: string

  explainPointStMC: string
  explainPointStSC: string

  explainTalkPointStMC: string
  explainTalkPointStSC: string

  bibleReadingPointStMC: string
  bibleReadingPointStSC: string

  talkPointStMC: string
  talkPointStSC: string

  endPrayerPoint: string
  congBibleStudyReaderPoint: string
  gemsPoint: string
  livingAsChrPoint: string
  firstTalkPoint: string
  congBibleStudyPoint: string
  secondChairmanPoint: string
  chairmanPoint: string
}

export interface IFieldsOneSt {
  name: string
  _id: string
  status: string
}

export interface IOneStudent {
  [key: string]: IFieldsOneSt | null
}

export interface IWeek {
  _id: string | undefined
  startWeekTSt: number
  dateOfMeet: string
  isPlanned: boolean

  comment: string
  range: string

  teachingChBx: boolean
  trainingChBx: boolean
  secondClassChBx: boolean

  // startPointChBx: boolean
  // followPointChBx: boolean
  // makePointChBx: boolean
  // explainPointChBx: boolean
  // explainTalkPointChBx: boolean
  // talkPointChBx: boolean

  // lessonOneChBx: boolean
  // lessonTwoChBx: boolean
  // liveAndServTwoChBx: boolean
  // liveAndServThreeChBx: boolean

  list: IOneStudent[]

  // examples:
  // chairmanPointT00: { name: string; _id: string } | null
  // firstTalkPointT01: { name: string; _id: string } | null
  // gemsPointT02: { name: string; _id: string } | null

  // livingAsChrPointA04: { name: string; _id: string } | null
  // livingAsChrPointL06: { name: string; _id: string } | null
  // congBibleStudyPointL00: { name: string; _id: string } | null
  // congBibleStudyReaderPointL00: { name: string; _id: string } | null
  // endPrayerPointL00: { name: string; _id: string } | null
  // secondChairmanPointT00: { name: string; _id: string } | null

  // bibleReadingPointStMCT03: { name: string; _id: string } | null
  // bibleReadingPointStSCT03: { name: string; _id: string } | null

  // startPointStMCT04: { name: string; _id: string } | null
  // startPointAsMCT04: { name: string; _id: string } | null
  // startPointStSCT04: { name: string; _id: string } | null
  // startPointAsSCT04: { name: string; _id: string } | null

  // followPointStMC: { name: string; _id: string } | null
  // followPointAsMC: { name: string; _id: string } | null
  // followPointStSC: { name: string; _id: string } | null
  // followPointAsSC: { name: string; _id: string } | null

  // makePointStMC: { name: string; _id: string } | null
  // makePointAsMC: { name: string; _id: string } | null
  // makePointStSC: { name: string; _id: string } | null
  // makePointAsSC: { name: string; _id: string } | null

  // explainPointStMC: { name: string; _id: string } | null
  // explainPointAsMC: { name: string; _id: string } | null
  // explainPointStSC: { name: string; _id: string } | null
  // explainPointAsSC: { name: string; _id: string } | null

  // explainTalkPointStMC: { name: string; _id: string } | null
  // explainTalkPointStSC: { name: string; _id: string } | null

  // talkPointStMC: { name: string; _id: string } | null
  // talkPointStSC: { name: string; _id: string } | null
}

export interface IWeekCopy {
  // chairmanPoint?: { name: string; _id: string } | null
  // firstTalkPoint?: { name: string; _id: string } | null
  // gemsPoint?: { name: string; _id: string } | null
  // lessonOnePoint?: { name: string; _id: string } | null
  // lessonTwoPoint?: { name: string; _id: string } | null
  // livingAsChrPoint?: { name: string; _id: string } | null
  // liveAndServTwoPoint?: { name: string; _id: string } | null
  // liveAndServThreePoint?: { name: string; _id: string } | null
  // congBibleStudyPoint?: { name: string; _id: string } | null
  // congBibleStudyReaderPoint?: { name: string; _id: string } | null
  // endPrayerPoint?: { name: string; _id: string } | null
  // secondChairmanPoint?: { name: string; _id: string } | null

  // bibleReadingPointStMC?: { name: string; _id: string } | null
  // bibleReadingPointStSC?: { name: string; _id: string } | null

  // startPointStMC?: { name: string; _id: string } | null
  // startPointAsMC?: { name: string; _id: string } | null
  // startPointStSC?: { name: string; _id: string } | null
  // startPointAsSC?: { name: string; _id: string } | null

  // followPointStMC?: { name: string; _id: string } | null
  // followPointAsMC?: { name: string; _id: string } | null
  // followPointStSC?: { name: string; _id: string } | null
  // followPointAsSC?: { name: string; _id: string } | null

  // makePointStMC?: { name: string; _id: string } | null
  // makePointAsMC?: { name: string; _id: string } | null
  // makePointStSC?: { name: string; _id: string } | null
  // makePointAsSC?: { name: string; _id: string } | null

  // explainPointStMC?: { name: string; _id: string } | null
  // explainPointAsMC?: { name: string; _id: string } | null
  // explainPointStSC?: { name: string; _id: string } | null
  // explainPointAsSC?: { name: string; _id: string } | null

  // explainTalkPointStMC?: { name: string; _id: string } | null
  // explainTalkPointStSC?: { name: string; _id: string } | null

  // talkPointStMC?: { name: string; _id: string } | null
  // talkPointStSC?: { name: string; _id: string } | null

  orderedList: IOneStudent[]
  orderedStMC: IOneStudent[]
  orderedStSC: IOneStudent[]
  orderedAsMC: IOneStudent[]
  orderedAsSC: IOneStudent[]
  unorderedList: IOneStudent[]
}

export interface IAddParams {
  isBibleReading?: boolean
  isTalk?: boolean
  isSecondClassOnly?: boolean
  isPortnerOnly?: boolean
  isNotBibleStudy?: boolean
  isChairman?: boolean
  isFirstSpeech?: boolean
  isExplainTalk?: boolean
  isGems?: boolean
  isSecondChairm?: boolean
  isLivingAsChr?: boolean
  isCongBibleStudy?: boolean
  isCongBibleStudyReader?: boolean
  isEndPrayer?: boolean
}
