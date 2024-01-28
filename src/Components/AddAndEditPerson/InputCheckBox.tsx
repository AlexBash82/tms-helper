import React from 'react'
import { IStudentCheckBox } from '../../interfaces'

interface IProps {
  setInputCheckBox: (arg0: IStudentCheckBox) => void
  inputCheckBox: IStudentCheckBox
  gender: string
}

const inputCheckBox: React.FC<IProps> = ({
  inputCheckBox,
  setInputCheckBox,
  gender,
}) => {
  const {
    isChairman,
    isSecondChairm,
    isFirstSpeach,
    isGems,
    isLiveAndServ,
    isStudyBibleIn,
    isStudyBibleInReader,
    isEndPrayer,
    isSpeech,
    isPortnerOnly,
    isSecondClassOnly,
    isNotBibleStudy,
  } = inputCheckBox

  if (gender === 'Male')
    return (
      <div>
        <input
          type="checkbox"
          checked={isEndPrayer}
          onChange={(e) =>
            setInputCheckBox({ ...inputCheckBox, isEndPrayer: !isEndPrayer })
          }
        />
        -Study speech
        <input
          type="checkbox"
          checked={isSpeech}
          onChange={(e) =>
            setInputCheckBox({
              ...inputCheckBox,
              isSpeech: !isSpeech,
            })
          }
        />
        -Prayer in the end
        <input
          type="checkbox"
          checked={isStudyBibleInReader}
          onChange={(e) =>
            setInputCheckBox({
              ...inputCheckBox,
              isStudyBibleInReader: !isStudyBibleInReader,
            })
          }
        />
        -Study Bible reader
        <input
          type="checkbox"
          checked={isGems}
          onChange={(e) =>
            setInputCheckBox({ ...inputCheckBox, isGems: !isGems })
          }
        />
        -Spiritual isGems
        <input
          type="checkbox"
          checked={isFirstSpeach}
          onChange={(e) =>
            setInputCheckBox({
              ...inputCheckBox,
              isFirstSpeach: !isFirstSpeach,
            })
          }
        />
        -First speach
        <input
          type="checkbox"
          checked={isLiveAndServ}
          onChange={(e) =>
            setInputCheckBox({
              ...inputCheckBox,
              isLiveAndServ: !isLiveAndServ,
            })
          }
        />
        -isLiveAndServ and service
        <input
          type="checkbox"
          checked={isStudyBibleIn}
          onChange={(e) =>
            setInputCheckBox({
              ...inputCheckBox,
              isLiveAndServ: !isStudyBibleIn,
            })
          }
        />
        -Study Bible
        <input
          type="checkbox"
          checked={isSecondChairm}
          onChange={(e) =>
            setInputCheckBox({
              ...inputCheckBox,
              isLiveAndServ: !isSecondChairm,
            })
          }
        />
        -isChairman in second
        <input
          type="checkbox"
          checked={isChairman}
          onChange={(e) =>
            setInputCheckBox({ ...inputCheckBox, isLiveAndServ: !isChairman })
          }
        />
        -isChairman in main
      </div>
    )

  if (gender === 'Female')
    return (
      <div>
        <input
          type="checkbox"
          checked={isPortnerOnly}
          onChange={(e) =>
            setInputCheckBox({
              ...inputCheckBox,
              isPortnerOnly: !isPortnerOnly,
            })
          }
        />
        -Portner only
        <input
          type="checkbox"
          checked={isSecondClassOnly}
          onChange={(e) =>
            setInputCheckBox({
              ...inputCheckBox,
              isSecondClassOnly: !isSecondClassOnly,
            })
          }
        />
        -Second class only
        <input
          type="checkbox"
          checked={isNotBibleStudy}
          onChange={(e) =>
            setInputCheckBox({
              ...inputCheckBox,
              isNotBibleStudy: !isNotBibleStudy,
            })
          }
        />
        -Not a Bible study
      </div>
    )
}

export default inputCheckBox
