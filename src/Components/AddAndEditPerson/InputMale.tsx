import React, { useState, useEffect } from 'react'
import { IMaleData } from '../../interfaces'

interface IProps {
  setMaleData: (arg0: IMaleData) => void
  maleData: IMaleData
}

const InputMale: React.FC<IProps> = ({ maleData, setMaleData }) => {
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
  } = maleData

  return (
    <div>
      <input
        type="checkbox"
        checked={isEndPrayer}
        onChange={(e) =>
          setMaleData({ ...maleData, isEndPrayer: !isEndPrayer })
        }
      />
      -Study speech
      <input
        type="checkbox"
        checked={isSpeech}
        onChange={(e) =>
          setMaleData({
            ...maleData,
            isSpeech: !isSpeech,
          })
        }
      />
      -Prayer in the end
      <input
        type="checkbox"
        checked={isStudyBibleInReader}
        onChange={(e) =>
          setMaleData({
            ...maleData,
            isStudyBibleInReader: !isStudyBibleInReader,
          })
        }
      />
      -Study Bible reader
      <input
        type="checkbox"
        checked={isGems}
        onChange={(e) => setMaleData({ ...maleData, isGems: !isGems })}
      />
      -Spiritual isGems
      <input
        type="checkbox"
        checked={isFirstSpeach}
        onChange={(e) =>
          setMaleData({ ...maleData, isFirstSpeach: !isFirstSpeach })
        }
      />
      -First speach
      <input
        type="checkbox"
        checked={isLiveAndServ}
        onChange={(e) =>
          setMaleData({ ...maleData, isLiveAndServ: !isLiveAndServ })
        }
      />
      -isLiveAndServ and service
      <input
        type="checkbox"
        checked={isStudyBibleIn}
        onChange={(e) =>
          setMaleData({ ...maleData, isLiveAndServ: !isStudyBibleIn })
        }
      />
      -Study Bible
      <input
        type="checkbox"
        checked={isSecondChairm}
        onChange={(e) =>
          setMaleData({ ...maleData, isLiveAndServ: !isSecondChairm })
        }
      />
      -isChairman in second
      <input
        type="checkbox"
        checked={isChairman}
        onChange={(e) =>
          setMaleData({ ...maleData, isLiveAndServ: !isChairman })
        }
      />
      -isChairman in main
    </div>
  )
}

export default InputMale
