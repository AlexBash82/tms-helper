import React from 'react'
import './CoupleInput.css'
import ListOfCandidates from '../ListOfCandidates/ListOfCandidates'

interface ICoupleInputProps {
  title: string
  openAndChoose: (arg: string) => void
  openedList: string
  close: (arg: string) => void
  firstInput: string
  firstInputStr: string
  secondInput: string
  secondInputStr: string
  getCurrentWeek: () => void
  dateOfMeet: string
  action: 'plan' | 'confirm' | 'update' | undefined
}

const CoupleInput: React.FC<ICoupleInputProps> = (props) => {
  const {
    title,
    openAndChoose,
    openedList,
    close,
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
      <div>{title}</div>
      <div className="">
        <div className="input-box" onClick={() => openAndChoose(firstInputStr)}>
          {firstInput}
        </div>
        {openedList === firstInputStr && (
          <ListOfCandidates
            close={close}
            presentValue={firstInput}
            task={firstInputStr}
            getCurrentWeek={getCurrentWeek}
            action={action}
            dateOfMeet={dateOfMeet}
          />
        )}
      </div>
      <div className="">
        <div
          className="input-box"
          onClick={() => openAndChoose(secondInputStr)}
        >
          {secondInput}
        </div>
        {openedList === secondInputStr && (
          <ListOfCandidates
            close={close}
            presentValue={secondInput}
            task={secondInputStr}
            getCurrentWeek={getCurrentWeek}
            action={action}
            dateOfMeet={dateOfMeet}
          />
        )}
      </div>
    </div>
  )
}

export default CoupleInput
