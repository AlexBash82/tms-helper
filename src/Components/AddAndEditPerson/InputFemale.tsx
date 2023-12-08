import React, { useState, useEffect } from 'react'
import { IFemaleData } from '../../interfaces'

interface IInputFemaleProps {
  setFemaleData: (arg0: IFemaleData) => void
}

const InputFemale: React.FC<IInputFemaleProps> = ({ setFemaleData }) => {
  const [isPortnerOnly, setIsPortnerOnly] = useState(false)
  const [isSecondClassOnly, setIsSecondClassOnly] = useState(false)
  const [isNotBibleStudy, setIsNotBibleStudy] = useState(false)

  useEffect(() => {
    setFemaleData({
      isPortnerOnly: isPortnerOnly,
      isSecondClassOnly: isSecondClassOnly,
      isNotBibleStudy: isNotBibleStudy,
    })
  }, [isPortnerOnly, isSecondClassOnly, isNotBibleStudy, setFemaleData])

  return (
    <div>
      <input
        type="checkbox"
        checked={isPortnerOnly}
        onChange={(e) => setIsPortnerOnly(!isPortnerOnly)}
      />
      -Portner only
      <input
        type="checkbox"
        checked={isSecondClassOnly}
        onChange={(e) => setIsSecondClassOnly(!isSecondClassOnly)}
      />
      -Second class only
      <input
        type="checkbox"
        checked={isNotBibleStudy}
        onChange={(e) => setIsNotBibleStudy(!isNotBibleStudy)}
      />
      -Not a Bible study
    </div>
  )
}

export default InputFemale
