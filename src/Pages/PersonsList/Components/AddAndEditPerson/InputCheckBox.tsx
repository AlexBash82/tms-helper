import React from 'react'
import { IStudentCheckBox } from '../../../../interfaces'

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
    isPortnerOnly,
    isSecondClassOnly,
    isNotBibleStudy,
    isExplainTalk,
    isBibleReading,
    isTalk,
    isEndPrayer,
    isCongBibleStudyReader,
    isGems,
    isLivingAsChr,
    isFirstSpeech,
    isCongBibleStudy,
    isSecondChairm,
    isChairman,
  } = inputCheckBox

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
      {gender === 'Male' && (
        <>
          <input
            type="checkbox"
            checked={isExplainTalk}
            onChange={(e) =>
              setInputCheckBox({
                ...inputCheckBox,
                isExplainTalk: !isExplainTalk,
              })
            }
          />
          -Explain - speech
          <input
            type="checkbox"
            checked={isBibleReading}
            onChange={(e) =>
              setInputCheckBox({
                ...inputCheckBox,
                isBibleReading: !isBibleReading,
              })
            }
          />
          -Read Bible
          <input
            type="checkbox"
            checked={isTalk}
            onChange={(e) =>
              setInputCheckBox({
                ...inputCheckBox,
                isTalk: !isTalk,
              })
            }
          />
          -Study speech
          <input
            type="checkbox"
            checked={isEndPrayer}
            onChange={(e) =>
              setInputCheckBox({ ...inputCheckBox, isEndPrayer: !isEndPrayer })
            }
          />
          -Prayer in the end
          <input
            type="checkbox"
            checked={isCongBibleStudyReader}
            onChange={(e) =>
              setInputCheckBox({
                ...inputCheckBox,
                isCongBibleStudyReader: !isCongBibleStudyReader,
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
          -Spiritual Gems
          <input
            type="checkbox"
            checked={isLivingAsChr}
            onChange={(e) =>
              setInputCheckBox({
                ...inputCheckBox,
                isLivingAsChr: !isLivingAsChr,
              })
            }
          />
          -LiveAndServ and service
          <input
            type="checkbox"
            checked={isFirstSpeech}
            onChange={(e) =>
              setInputCheckBox({
                ...inputCheckBox,
                isFirstSpeech: !isFirstSpeech,
              })
            }
          />
          -First speach
          <input
            type="checkbox"
            checked={isCongBibleStudy}
            onChange={(e) =>
              setInputCheckBox({
                ...inputCheckBox,
                isCongBibleStudy: !isCongBibleStudy,
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
                isSecondChairm: !isSecondChairm,
              })
            }
          />
          -Chairman in second
          <input
            type="checkbox"
            checked={isChairman}
            onChange={(e) =>
              setInputCheckBox({ ...inputCheckBox, isChairman: !isChairman })
            }
          />
          -Chairman in main
        </>
      )}
    </div>
  )
}

export default inputCheckBox
