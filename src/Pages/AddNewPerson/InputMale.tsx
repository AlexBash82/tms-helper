import React, { useState, useEffect } from 'react'

interface IMaleData {
  chairman: boolean
  secondChairM: boolean
  firstSpeach: boolean
  gems: boolean
  live: boolean
  studyB: boolean
  studyBReader: boolean
  endPray: boolean
}

interface IInputMaleProps {
  setMaleData: (arg0: IMaleData) => void
}

const InputMale: React.FC<IInputMaleProps> = ({ setMaleData }) => {
  const [chairman, setChairman] = useState(false)
  const [secondChairM, setSecondChairM] = useState(false)
  const [firstSpeach, setFirstSpeach] = useState(false)
  const [gems, setGems] = useState(false)
  const [live, setLive] = useState(false)
  const [studyB, setStudyB] = useState(false)
  const [studyBReader, setStudyBReader] = useState(false)
  const [endPray, setEndPray] = useState(false)

  useEffect(() => {
    setMaleData({
      chairman: chairman,
      secondChairM: secondChairM,
      firstSpeach: firstSpeach,
      gems: gems,
      live: live,
      studyB: studyB,
      studyBReader: studyBReader,
      endPray: endPray,
    })
  }, [
    chairman,
    secondChairM,
    firstSpeach,
    gems,
    live,
    studyB,
    studyBReader,
    endPray,
  ])

  return (
    <div>
      <input
        type="checkbox"
        checked={endPray}
        onChange={(e) => setEndPray(!endPray)}
      />
      -Prayer in the end
      <input
        type="checkbox"
        checked={studyBReader}
        onChange={(e) => setStudyBReader(!studyBReader)}
      />
      -Study Bible reader
      <input type="checkbox" checked={gems} onChange={(e) => setGems(!gems)} />
      -Spiritual Gems
      <input
        type="checkbox"
        checked={firstSpeach}
        onChange={(e) => setFirstSpeach(!firstSpeach)}
      />
      -First speach
      <input type="checkbox" checked={live} onChange={(e) => setLive(!live)} />
      -Live and service
      <input
        type="checkbox"
        checked={studyB}
        onChange={(e) => setStudyB(!studyB)}
      />
      -Study Bible
      <input
        type="checkbox"
        checked={secondChairM}
        onChange={(e) => setSecondChairM(!secondChairM)}
      />
      -Chairman in second
      <input
        type="checkbox"
        checked={chairman}
        onChange={(e) => setChairman(!chairman)}
      />
      -Chairman in main
    </div>
  )
}

export default InputMale
