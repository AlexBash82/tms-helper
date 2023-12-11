import React from 'react'
import { IFemaleData } from '../../interfaces'

interface IProps {
  setFemaleData: (arg0: IFemaleData) => void
  femaleData: IFemaleData
}

const InputFemale: React.FC<IProps> = ({ femaleData, setFemaleData }) => {
  const { isPortnerOnly, isSecondClassOnly, isNotBibleStudy } = femaleData

  return (
    <div>
      <input
        type="checkbox"
        checked={isPortnerOnly}
        onChange={(e) =>
          setFemaleData({ ...femaleData, isPortnerOnly: !isPortnerOnly })
        }
      />
      -Portner only
      <input
        type="checkbox"
        checked={isSecondClassOnly}
        onChange={(e) =>
          setFemaleData({
            ...femaleData,
            isSecondClassOnly: !isSecondClassOnly,
          })
        }
      />
      -Second class only
      <input
        type="checkbox"
        checked={isNotBibleStudy}
        onChange={(e) =>
          setFemaleData({ ...femaleData, isNotBibleStudy: !isNotBibleStudy })
        }
      />
      -Not a Bible study
    </div>
  )
}

export default InputFemale
