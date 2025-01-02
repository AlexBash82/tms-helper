import React, { useEffect, useRef, useState } from 'react'
import './ListOfCandidates.css'
import { IStudent } from '../../../../interfaces'
import { getTimeStamps } from '../../../../Servces/getTimeStamps'
import { getLatestStudents } from '../../../../Servces/getLatestStudents'

//можно в виде перебора массива и если поле с таском самое старое то в начало массива
//а если нет,то в конец массива
//а в самом массиве можно сделать среднее дефолтное значение - разделитель

//при наведении на кандидата открывать еще одно окно с доп инф:

interface IProps {
  openAndChoose: (arg: string) => void
  getCurrentWeek: () => void
  presentValue: { name: string; _id: string; status: string } | null
  fullTask: string
  dateOfMeet: string
  foundByLetter: Array<IStudent>
  inputIs: string
  action: 'plan' | 'confirm' | 'update' | undefined
}

interface IUpdateStudent {
  idStudent: string
  newStudentData: { status: string; latest?: number }
}

const ListOfCandidates: React.FC<IProps> = ({
  openAndChoose,
  getCurrentWeek,
  presentValue,
  fullTask,
  dateOfMeet, //example '2024-01-10'
  action,
  foundByLetter,
  inputIs,
}) => {
  const listRef = useRef<HTMLDivElement | null>(null)
  const [latestStudents, setLatestStudents] = useState<Array<IStudent>>([])

  useEffect(() => {
    const fetchStudents = async () => {
      if (action === 'plan') {
        //console.log('ready')
        const students = await getLatestStudents(fullTask.slice(0, -3))
        //console.log('got')
        //console.log('listOfCand fetchStudents - ', students)
        if (students) {
          setLatestStudents(students)
        }
      }
    }

    fetchStudents()

    //console.log('task', task)
    //console.log('action', action)
  }, [fullTask, action])

  const timeEndOfMeet = '21:45'
  // вешаем слушатель на клик. Если вне родительского инпута и вне списка - закрываем список.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // проверяем: listRef.current - есть ли у нас ссылка на список?
      // !listRef.current.contains(event.target as Node) - был ли клик вне списка?
      //  inputIs === 'blur' - был ли клик вне родительского инпута?
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        inputIs === 'blur'
      ) {
        openAndChoose('')
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [inputIs])

  //функция для поиска задания с которым студент не выступал дольше всего. Сравниваем его с task и возвращаем true или false
  const oldestPerform = (studentData: IStudent): boolean => {
    //формируем массивы из ключей, значение которых number или null - это ключи дат выступлений
    const nullFields: string[] = []
    const numericFields: string[] = Object.keys(studentData).filter((key) => {
      if (studentData[key as keyof typeof studentData] === null) {
        nullFields.push(key)
        return false
      }
      return typeof studentData[key as keyof typeof studentData] === 'number'
    })

    let minField: string = ''
    if (numericFields.length > 0) {
      //ищем поле с минимальным значением
      minField = numericFields.reduce((minField, currentField) => {
        const currentValue = studentData[
          currentField as keyof typeof studentData
        ] as number
        const minValue = studentData[
          minField as keyof typeof studentData
        ] as number

        return currentValue < minValue ? currentField : minField
      }, numericFields[0])
    }

    //создаем массив ключей со значением null и ключа с миимальным значением
    const minValues =
      nullFields.length > 0 ? [...nullFields, minField] : [minField]

    let isSuits = false
    //сравниваем название task и строки массива ключей и если совпадения есть, то isSuits присваиваем true
    switch (fullTask.slice(0, -3)) {
      case 'bibleReadingPointStMC':
        isSuits = minValues.includes('bibleReadingPointStMC')
        break
      case 'startPointStMC':
        isSuits = minValues.includes('startPointStMC')
        break
      case 'followPointStMC':
        isSuits = minValues.includes('followPointStMC')
        break
      case 'makePointStMC':
        isSuits = minValues.includes('makePointStMC')
        break
      case 'explainPointStMC':
        isSuits = minValues.includes('explainPointStMC')
        break
      case 'explainTalkPointStMC':
        isSuits = minValues.includes('explainTalkPointStMC')
        break
      case 'talkPointStMC':
        isSuits = minValues.includes('talkPointStMC')
        break
      case 'bibleReadingPointStSC':
        isSuits = minValues.includes('bibleReadingPointStSC')
        break
      case 'startPointStSC':
        isSuits = minValues.includes('startPointStSC')
        break
      case 'followPointStSC':
        isSuits = minValues.includes('followPointStSC')
        break
      case 'makePointStSC':
        isSuits = minValues.includes('makePointStSC')
        break
      case 'explainPointStSC':
        isSuits = minValues.includes('explainPointStSC')
        break
      case 'explainTalkPointStSC':
        isSuits = minValues.includes('explainTalkPointStSC')
        break
      case 'talkPointStSC':
        isSuits = minValues.includes('talkPointStSC')
        break
      case 'startPointAsMC':
      case 'followPointAsMC':
      case 'makePointAsMC':
      case 'explainPointAsMC':
        isSuits = minValues.includes('assistantPointAsMC')
        break
      case 'startPointAsSC':
      case 'followPointAsSC':
      case 'makePointAsSC':
      case 'explainPointAsSC':
        isSuits = minValues.includes('assistantPointAsSC')
        break
      case 'chairmanPoint':
        isSuits = minValues.includes('chairmanPoint')
        break
      case 'firstTalkPoint':
        isSuits = minValues.includes('firstTalkPoint')
        break
      case 'gemsPoint':
        isSuits = minValues.includes('gemsPoint')
        break
      case 'lessonOnePoint':
      case 'lessonTwoPoint':
      case 'livingAsChrPoint':
      case 'liveAndServTwoPoint':
      case 'liveAndServThreePoint':
        isSuits = minValues.includes('livingAsChrPoint')
        break
      case 'congBibleStudyPoint':
        isSuits = minValues.includes('congBibleStudyPoint')
        break
      case 'congBibleStudyReaderPoint':
        isSuits = minValues.includes('congBibleStudyReaderPoint')
        break
      case 'endPrayerPoint':
        isSuits = minValues.includes('endPrayerPoint')
        break
      case 'secondChairmanPoint':
        isSuits = minValues.includes('secondChairmanPoint')
        break
    }

    return isSuits
  }

  //---------------------------------------MAKE PLAN--------------------------------------------------------------------
  // эта функция получает (student) студента, у которого нужно в базе сделать status: 'planned'. И если в этой строке уже есть имя другого студента, то в базе ищем его и меняем поле status: 'free'
  const makePlan = async (student: IStudent) => {
    //меняем поле status у имеющегося студента
    if (presentValue && presentValue.name !== student.lastFirstName) {
      const presentUser = await window.api.getOneUserByLFName(presentValue.name)

      if (presentUser.success) {
        try {
          const updatePresent = {
            studentName: presentValue.name,
            keyName: 'status',
            newValue: 'free',
          }
          const presentResult = await window.api.updateOneUser(updatePresent)
          //console.log('presentResult', presentResult)
        } catch (error) {
          console.error('Error updating item:', error)
        }
      } else {
        alert('I can not find prior student!')
      }
    }

    //обновляем поле status у нового студента
    if (!presentValue || presentValue.name !== student.lastFirstName) {
      try {
        const updateUser = {
          studentName: student.lastFirstName,
          keyName: 'status',
          newValue: 'planned',
        }
        const resultUser = await window.api.updateOneUser(updateUser)
        //если обновить студента получилось, то обновляем данные в базе недели
        if (resultUser.success) {
          const updateWeek = {
            dateOfMeet,
            fullTask,
            newValue: {
              name: resultUser.data.lastFirstName,
              _id: resultUser.data._id,
            },
          }
          //console.log('try to update by: ', updateWeek)
          const resultWeek = await window.api.updateListOfWeek(updateWeek)
          //console.log('got result as: ', resultWeek)

          if (resultWeek.success) {
            getCurrentWeek()
          } else {
            //если обновить неделю не получилось - отзываем изменения у студента и выводим alert
            const updateUser = {
              studentName: student.lastFirstName,
              keyName: 'status',
              newValue: 'free',
            }
            const resultUser = await window.api.updateOneUser(updateUser)

            if (resultUser.success) {
              alert('I can not updete this week!')
            } else {
              alert(
                `WARNING! I updated stedent ${student.lastFirstName} as "planed", but I can not update this week`
              )
            }
          }
        }
      } catch (error) {
        console.error('Error updating:', error)
      }
    }
    openAndChoose('')
  }

  // для заполнения базы данных датами выступлений у студентов, достаточно внести имена в поля недели. И после нажатия кнопки "сохранить" в AddInfoByWeek - произойдет обновление полей дат у студентов
  const makeUpdate = async (student: IStudent) => {
    try {
      const updateWeek = {
        dateOfMeet,
        keyName: fullTask,
        newValue: { name: student.lastFirstName, id: student._id },
      }
      //перепроверить логику!!!!!!!!!!!!!!!!!!!!!!!!!
      const resultWeek = await window.api.updateOneWeek(updateWeek)

      if (resultWeek.success) {
        getCurrentWeek()
      }
    } catch (error) {
      console.error('Error updating item:', error)
    }

    openAndChoose('')
  }

  const absence = ['Absence for a reason', 'Absence for NO reason']

  //Сделать - Если пропустил без причины, то обновлем поле latest на дату недели (ставим в конец списка).
  //Сделать -  Если пропустил по причине, то оставляем его в начале списка.
  // В любом случае меняем (plan: truе на false) status!!! и удаляем имя из поля в БД недели.
  const makeConfirm = async (reason: string) => {
    if (presentValue) {
      const presentUser = await window.api.getOneUserByLFName(presentValue.name)

      if (presentUser.success) {
        // формируем данные для обновления полей студента в БД
        const updatePresent: IUpdateStudent = {
          idStudent: presentUser.data._id,
          newStudentData: { status: 'free' },
        }

        if (reason === 'Absence for NO reason') {
          const { timeStampInp } = getTimeStamps(dateOfMeet, timeEndOfMeet)
          updatePresent.newStudentData.latest = timeStampInp
        }
        //console.log('makeConfirm', updatePresent)

        // обновляем данные полей (plan) status!!! и, если нужно, latest
        try {
          const resultUser = await window.api.editOneUser(updatePresent)

          //если обновить студента получилось, то обновляем данные в базе недели
          if (resultUser.success) {
            const updateWeek = {
              dateOfMeet,
              keyName: fullTask,
              newValue: null,
            }
            //поменять на upateListOfWeek и перепроверить логику
            const resultWeek = await window.api.updateOneWeek(updateWeek)

            if (resultWeek.success) {
              alert(
                `I have updated ${
                  presentUser.data.lastFirstName
                } as ${reason.toLowerCase()}`
              )
              openAndChoose('')
              getCurrentWeek()
            }
          }
        } catch (error) {
          alert(`I have truoble : ${error}`)
          //console.error('Error updating:', error)
        }
      }
    }
  }

  return (
    <div ref={listRef} className="listOfCand">
      {action === 'plan'
        ? latestStudents.map((student) => (
            <div
              className={`Candidate ${
                oldestPerform(student) ? 'Match-student' : ''
              } `}
              key={student._id}
              onClick={() => makePlan(student)}
            >
              {student.lastFirstName}
            </div>
          ))
        : action === 'confirm'
        ? absence.map((reason) => (
            <div key={reason} onClick={() => makeConfirm(reason)}>
              {reason}
            </div>
          ))
        : action === 'update' &&
          foundByLetter.map((student) => (
            <div key={student._id} onClick={() => makeUpdate(student)}>
              {student.lastFirstName}
            </div>
          ))}
    </div>
  )
}

export default ListOfCandidates
