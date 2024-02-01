import React from 'react'
import './CoupleInputs.css'
import SingleInput from '../SingleInput/SingleInput'

interface IProps {
  title: string
  openAndChoose: (arg: string) => void
  openedList: string | undefined
  firstInput: { name: string; _id: string } | null
  firstTask: string
  secondInput: { name: string; _id: string } | null
  secondTask: string
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
    firstTask,
    secondInput,
    secondTask,
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
        task={firstTask}
        getCurrentWeek={getCurrentWeek}
        action={action}
        dateOfMeet={dateOfMeet}
      />
      <SingleInput
        title="Assistant"
        openAndChoose={openAndChoose}
        openedList={openedList}
        firstInput={secondInput}
        task={secondTask}
        getCurrentWeek={getCurrentWeek}
        action={action}
        dateOfMeet={dateOfMeet}
      />
    </div>
  )
}

export default CoupleInputs
