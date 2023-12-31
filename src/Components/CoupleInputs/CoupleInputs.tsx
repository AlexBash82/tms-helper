import React from 'react'
import './CoupleInputs.css'
import SingleInput from '../SingleInput/SingleInput'

interface IProps {
  title: string
  openAndChoose: (arg: string) => void
  openedList: string
  firstInput: string
  firstInputStr: string
  secondInput: string
  secondInputStr: string
  getCurrentWeek: () => void
  dateOfMeet: string
  action: 'plan' | 'confirm' | 'update' | undefined
}

const CoupleInputs: React.FC<IProps> = (props) => {
  const {
    title,
    openAndChoose,
    openedList,
    firstInput,
    firstInputStr,
    secondInput,
    secondInputStr,
    getCurrentWeek,
    dateOfMeet,
    action,
  } = props

  return (
    <div className="df">
      <SingleInput
        title={title}
        openAndChoose={openAndChoose}
        openedList={openedList}
        firstInput={firstInput}
        firstInputStr={firstInputStr}
        getCurrentWeek={getCurrentWeek}
        action={action}
        dateOfMeet={dateOfMeet}
      />
      <SingleInput
        title="Assistant"
        openAndChoose={openAndChoose}
        openedList={openedList}
        firstInput={secondInput}
        firstInputStr={secondInputStr}
        getCurrentWeek={getCurrentWeek}
        action={action}
        dateOfMeet={dateOfMeet}
      />
    </div>
  )
}

export default CoupleInputs
