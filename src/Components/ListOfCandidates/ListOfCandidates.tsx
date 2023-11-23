import React from 'react'
import './ListOfCandidates.css'

//нужно передать сюда дату недели!!!
//в этой функции нужно запомнить предыдущее значение и сравнить с выбранным.
//предыдущее не равно дефолт и не равно выбранному - удалить план из базы
//новое значение не равно дефолт и не равно предыдущему - добавить план

interface ListOfCandidatesProps {
  close: (arg: string) => void
  presentValue: string
  task: string
  //dateOfMeet: string
}

const ListOfCandidates: React.FC<ListOfCandidatesProps> = ({
  close,
  presentValue,
  task,
}) => {
  return (
    <div>
      <div>{presentValue}</div>
      <div>{task}</div>
    </div>
  )
}

export default ListOfCandidates
