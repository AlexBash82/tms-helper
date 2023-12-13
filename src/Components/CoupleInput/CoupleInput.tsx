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
  firstSetChoose: (arg: string) => void
  secondSetChoose: (arg: string) => void
  //dateOfMeet:string
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
    firstSetChoose,
    secondSetChoose,
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
            setChoose={firstSetChoose}
            action={action}
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
            setChoose={secondSetChoose}
            action={action}
          />
        )}
      </div>
    </div>
  )
}

export default CoupleInput
