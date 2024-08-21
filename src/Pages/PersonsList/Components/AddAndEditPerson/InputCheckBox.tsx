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
    isExplainSpeech,
    isRead,
    isSpeech,
    isEndPrayer,
    isStudyBibleInReader,
    isGems,
    isLiveAndServ,
    isFirstSpeech,
    isStudyBibleIn,
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
            checked={isExplainSpeech}
            onChange={(e) =>
              setInputCheckBox({
                ...inputCheckBox,
                isExplainSpeech: !isExplainSpeech,
              })
            }
          />
          -Explain - speech
          <input
            type="checkbox"
            checked={isRead}
            onChange={(e) =>
              setInputCheckBox({ ...inputCheckBox, isRead: !isRead })
            }
          />
          -Read Bible
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
          -Spiritual Gems
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
            checked={isStudyBibleIn}
            onChange={(e) =>
              setInputCheckBox({
                ...inputCheckBox,
                isStudyBibleIn: !isStudyBibleIn,
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
