import React, { useState, useEffect } from 'react'

interface IFemaleData {
  portnerOnly: boolean
  secondClassOnly: boolean
  notBibleStudy: boolean
}

interface IInputFemaleProps {
  setFemaleData: (arg0: IFemaleData) => void
}

const InputFemale: React.FC<IInputFemaleProps> = ({ setFemaleData }) => {
  const [portnerOnly, setPortnerOnly] = useState(false)
  const [secondClassOnly, setSecondClassOnly] = useState(false)
  const [notBibleStudy, setNotBibleStudy] = useState(false)

  useEffect(() => {
    setFemaleData({
      portnerOnly: portnerOnly,
      secondClassOnly: secondClassOnly,
      notBibleStudy: notBibleStudy,
    })
  })

  return (
    <div>
      <input
        type="checkbox"
        checked={portnerOnly}
        onChange={(e) => setPortnerOnly(!portnerOnly)}
      />
      -Portner only
      <input
        type="checkbox"
        checked={secondClassOnly}
        onChange={(e) => setSecondClassOnly(!secondClassOnly)}
      />
      -Second class only
      <input
        type="checkbox"
        checked={notBibleStudy}
        onChange={(e) => setNotBibleStudy(!notBibleStudy)}
      />
      -Not a Bible study
    </div>
  )
}

export default InputFemale
