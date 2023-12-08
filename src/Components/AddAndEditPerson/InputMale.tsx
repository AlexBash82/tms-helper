import React, { useState, useEffect } from 'react'
import { IMaleData } from '../../interfaces'

interface IInputMaleProps {
  setMaleData: (arg0: IMaleData) => void
}

const InputMale: React.FC<IInputMaleProps> = ({ setMaleData }) => {
  const [isChairman, setIsChairman] = useState(false)
  const [isSecondChairm, setIsSecondChairm] = useState(false)
  const [isFirstSpeach, setIsFirstSpeach] = useState(false)
  const [isGems, setIsGems] = useState(false)
  const [isLiveAndServ, setIsLiveAndServ] = useState(false)
  const [isStudyBibleIn, setIsStudyBibleIn] = useState(false)
  const [isStudyBibleInReader, setIsStudyBibleInReader] = useState(false)
  const [isEndPrayer, setIsEndPrayer] = useState(false)

  useEffect(() => {
    setMaleData({
      isChairman: isChairman,
      isSecondChairm: isSecondChairm,
      isFirstSpeach: isFirstSpeach,
      isGems: isGems,
      isLiveAndServ: isLiveAndServ,
      isStudyBibleIn: isStudyBibleIn,
      isStudyBibleInReader: isStudyBibleInReader,
      isEndPrayer: isEndPrayer,
    })
  }, [
    isChairman,
    isSecondChairm,
    isFirstSpeach,
    isGems,
    isLiveAndServ,
    isStudyBibleIn,
    isStudyBibleInReader,
    isEndPrayer,
    setMaleData,
  ])

  return (
    <div>
      <input
        type="checkbox"
        checked={isEndPrayer}
        onChange={(e) => setIsEndPrayer(!isEndPrayer)}
      />
      -Prayer in the end
      <input
        type="checkbox"
        checked={isStudyBibleInReader}
        onChange={(e) => setIsStudyBibleInReader(!isStudyBibleInReader)}
      />
      -Study Bible reader
      <input
        type="checkbox"
        checked={isGems}
        onChange={(e) => setIsGems(!isGems)}
      />
      -Spiritual isGems
      <input
        type="checkbox"
        checked={isFirstSpeach}
        onChange={(e) => setIsFirstSpeach(!isFirstSpeach)}
      />
      -First speach
      <input
        type="checkbox"
        checked={isLiveAndServ}
        onChange={(e) => setIsLiveAndServ(!isLiveAndServ)}
      />
      -isLiveAndServ and service
      <input
        type="checkbox"
        checked={isStudyBibleIn}
        onChange={(e) => setIsStudyBibleIn(!isStudyBibleIn)}
      />
      -Study Bible
      <input
        type="checkbox"
        checked={isSecondChairm}
        onChange={(e) => setIsSecondChairm(!isSecondChairm)}
      />
      -isChairman in second
      <input
        type="checkbox"
        checked={isChairman}
        onChange={(e) => setIsChairman(!isChairman)}
      />
      -isChairman in main
    </div>
  )
}

export default InputMale
