// import { IFemaleDB, IMaleDB } from '../interfaces'

// export const writeOneUeserToDB = async (
//   gender,
//   inputLFName,
//   maleData,
//   dontUse,
//   comments,
//   femaleData
// ) => {
//   const defoltStamp = 1685000178013
//   let personData: IMaleDB | IFemaleDB
//   try {
//     if (gender === 'Male' && inputLFName !== '') {
//       personData = {
//         lastFirstName: inputLFName,
//         gender: gender,
//         isChairman: maleData.isChairman,
//         isSecondChairm: maleData.isSecondChairm,
//         isFirstSpeach: maleData.isFirstSpeach,
//         isGems: maleData.isGems,
//         isLiveAndServ: maleData.isLiveAndServ,
//         isStudyBibleIn: maleData.isStudyBibleIn,
//         isStudyBibleInReader: maleData.isStudyBibleInReader,
//         isEndPrayer: maleData.isEndPrayer,
//         dontUse: dontUse,
//         comments: comments,

//         plan: false,
//         chairman: defoltStamp,
//         secondChairm: defoltStamp,
//         firstSpeach: defoltStamp,
//         gems: defoltStamp,
//         mainRead: defoltStamp,
//         smallRead: defoltStamp,
//         mainStarting: defoltStamp,
//         smallStarting: defoltStamp,
//         mainFollowing: defoltStamp,
//         smallFollowing: defoltStamp,
//         mainMaking: defoltStamp,
//         smallMaking: defoltStamp,
//         mainExplaining: defoltStamp,
//         smallExplaining: defoltStamp,
//         mainSpeech: defoltStamp,
//         smallSpeech: defoltStamp,
//         mainSlave: defoltStamp,
//         smallSlave: defoltStamp,
//         portners: [],
//         liveAndServ: defoltStamp,
//         studyBibleIn: defoltStamp,
//         studyBibleInReader: defoltStamp,
//         endPrayer: defoltStamp,
//         latest: defoltStamp,

//         _id: '',
//       }
//       const result = await window.api.writeOneUser(personData)
//       return result
//     }

//     if (gender === 'Female' && inputLFName !== '') {
//       personData = {
//         lastFirstName: inputLFName,
//         gender: gender,
//         isPortnerOnly: femaleData.isPortnerOnly,
//         isSecondClassOnly: femaleData.isSecondClassOnly,
//         isNotBibleStudy: femaleData.isNotBibleStudy,
//         dontUse: dontUse,
//         comments: comments,

//         plan: false,
//         mainStarting: defoltStamp,
//         smallStarting: defoltStamp,
//         mainFollowing: defoltStamp,
//         smallFollowing: defoltStamp,
//         mainMaking: defoltStamp,
//         smallMaking: defoltStamp,
//         mainExplaining: defoltStamp,
//         smallExplaining: defoltStamp,
//         mainSlave: defoltStamp,
//         smallSlave: defoltStamp,
//         portners: [],
//         latest: defoltStamp,

//         _id: '',
//       }
//       const result = await window.api.writeOneUser(personData)
//       return result
//     }
//   } catch (error) {
//     console.log('Error writing to database:', error)
//   }
// }
export {}
