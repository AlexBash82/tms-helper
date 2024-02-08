import React, { useEffect, useRef, useState } from 'react'
import './ListOfCandidates.css'
import { IStudent } from '../../interfaces'
import { getTimeStamps } from '../../services/getTimeStamps'

//добавить фильтрацию по колонкам: перый разговор, повтор, главный зал...
//можно в виде перебора массива и если поле с таском самое старое то в начало массива
//а если нет,то в конец массива
//а в самом массиве можно сделать среднее дефолтное значение - разделитель
//при наведении на кандидата открывать еще одно окно с доп инф

interface IProps {
  openAndChoose: (arg: string) => void
  getCurrentWeek: () => void
  presentValue: { name: string; _id: string } | null
  task: string
  dateOfMeet: string
  suitsStudents: Array<IStudent>
  inputIs: string
  action: 'plan' | 'confirm' | 'update' | undefined
}

interface IAddParams {
  isRead?: boolean
  isSpeech?: boolean
  isSecondClassOnly?: boolean
  isPortnerOnly?: boolean
  isNotBibleStudy?: boolean
  isChairman?: boolean
  isFirstSpeech?: boolean
  isGems?: boolean
  isSecondChairm?: boolean
  isLiveAndServ?: boolean
  isStudyBibleIn?: boolean
  isStudyBibleInReader?: boolean
  isEndPrayer?: boolean
}

interface IUpdateStudent {
  idStudent: string
  newStudentData: { plan: boolean; latest?: number }
}

const ListOfCandidates: React.FC<IProps> = ({
  openAndChoose,
  getCurrentWeek,
  presentValue,
  task,
  dateOfMeet, //example '2024-01-10'
  action,
  suitsStudents,
  inputIs,
}) => {
  const [students, setStudents] = useState<Array<IStudent>>([])
  const listRef = useRef<HTMLDivElement | null>(null)

  const timeEndOfMeet = '21:45'

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // проверяем: listRef.current - есть ли у нас ссылка на список?
      // !listRef.current.contains(event.target as Node) - был ли клик вне списка?
      //  inputIs === 'blur' - был ли клик вне родительского инпута?
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        inputIs === 'blur' &&
        action !== 'plan' //нужно поменять div на input и удалить эту проверку----------------------
      ) {
        openAndChoose('')
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [inputIs])

  //в зависимости от содержания строки task - формируется объект для поиска по базе с дополнительными фильтрами
  const addSearchParams = () => {
    const addParams: IAddParams = {}

    if (task.includes('readPoint')) addParams.isRead = true
    if (task.includes('speechPoint')) addParams.isSpeech = true
    if (task.includes('makePoint')) addParams.isNotBibleStudy = false
    if (task.includes('MC')) addParams.isSecondClassOnly = false
    if (task.includes('St')) addParams.isPortnerOnly = false
    if (task.includes('chairmanPoint')) addParams.isChairman = true
    if (task.includes('firstSpeechPoint')) addParams.isFirstSpeech = true
    if (task.includes('gemsPoint')) addParams.isGems = true
    if (task.includes('secondChairmPoint')) addParams.isSecondChairm = true
    if (task.includes('liveAndServPoint')) addParams.isLiveAndServ = true
    if (task.includes('lessonOnePoint')) addParams.isLiveAndServ = true
    if (task.includes('lessonTwoPoint')) addParams.isLiveAndServ = true
    if (task.includes('studyBibleInPoint')) addParams.isStudyBibleIn = true
    if (task.includes('studyBibleInReaderPoint'))
      addParams.isStudyBibleInReader = true
    if (task.includes('endPrayerPoint')) addParams.isEndPrayer = true

    //console.log('search params: ', addParams)
    //console.log('task: ', task)
    return addParams
  }

  //функция для поиска задания с которым студент не выступал дольше всего. Сравниваем его с task и возвращаем true или false
  const oldestPerform = (studentData: IStudent): boolean => {
    //формируем массивы из ключей, значение которых number или null - это ключи дат выступлений
    const nullFields: string[] = []
    const numericFields = Object.keys(studentData).filter((key) => {
      if (studentData[key] === null) {
        nullFields.push(key)
        return false
      }
      return typeof studentData[key] === 'number'
    })

    let minField: string = ''
    if (numericFields.length > 0) {
      //ищем поле с минимальным значением
      minField = numericFields.reduce((minField, currentField) => {
        const currentValue = studentData[currentField]
        const minValue = studentData[minField]

        return currentValue < minValue ? currentField : minField
      }, numericFields[0])
    }

    //создаем массив ключей со значением null и ключа с миимальным значением
    const minValues =
      nullFields.length > 0 ? [...nullFields, minField] : [minField]

    let isSuits = false
    //сравниваем название task и строки массива ключей и если совпадения есть, то isSuits присваиваем true
    switch (task) {
      case 'readPointStMC':
        isSuits = minValues.includes('readPointStMC')
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
      case 'explainSpPointStMC':
        isSuits = minValues.includes('explainSpPointStMC')
        break
      case 'speechPointStMC':
        isSuits = minValues.includes('speechPointStMC')
        break
      case 'readPointStSC':
        isSuits = minValues.includes('readPointStSC')
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
      case 'explainSpPointStSC':
        isSuits = minValues.includes('explainSpPointStSC')
        break
      case 'speechPointStSC':
        isSuits = minValues.includes('speechPointStSC')
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
      case 'firstSpeechPoint':
        isSuits = minValues.includes('firstSpeechPoint')
        break
      case 'gemsPoint':
        isSuits = minValues.includes('gemsPoint')
        break
      case 'lessonOnePoint':
      case 'lessonTwoPoint':
      case 'liveAndServPoint':
      case 'liveAndServTwoPoint':
      case 'liveAndServThreePoint':
        isSuits = minValues.includes('liveAndServPoint')
        break
      case 'studyBibleInPoint':
        isSuits = minValues.includes('studyBibleInPoint')
        break
      case 'studyBibleInReaderPoint':
        isSuits = minValues.includes('studyBibleInReaderPoint')
        break
      case 'endPrayerPoint':
        isSuits = minValues.includes('endPrayerPoint')
        break
      case 'secondChairmPoint':
        isSuits = minValues.includes('secondChairmPoint')
        break
    }

    return isSuits
  }

  // функция для получения списка студентов из базы и обновления им стейта.
  // Вызывается только если action === 'plan'
  const getUsersLatest = async () => {
    try {
      //формируем параметры для фильтрации студентов по task
      const addParam = addSearchParams()
      const users = await window.api.getUsersByLatest(addParam)
      setStudents(users)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  useEffect(() => {
    if (action === 'plan') {
      getUsersLatest()
    }
  }, [])

  // эта функция полуает student: студента, у которого нужно в базе сделать plan: true. И если в этой строке уже есть имя студента, то в базе меняем поле plan: true на false
  const makePlan = async (student: IStudent) => {
    //если в строке уже имеется студент: presentValue, то получаем его из базы
    if (presentValue) {
      const presentUser = await window.api.getOneUserByLFName(presentValue.name)

      //проверяем у этого студента поле plan: true и меняем на false
      if (presentUser.success && presentUser.data?.plan) {
        try {
          const updatePresent = {
            studentName: presentValue,
            keyName: 'plan',
            newValue: false,
          }
          const presentResult = await window.api.updateOneUser(updatePresent)
          console.log('presentResult', presentResult)
        } catch (error) {
          console.error('Error updating item:', error)
        }
      }
    }

    //если вновь полученное имя отличается от предыдущего (если оно вообще есть), то меняем поле plan: true
    if (student.lastFirstName !== presentValue?.name) {
      try {
        const updateUser = {
          studentName: student.lastFirstName,
          keyName: 'plan',
          newValue: true,
        }
        const resultUser = await window.api.updateOneUser(updateUser)

        //если обновить студента получилось, то обновляем данные в базе недели
        if (resultUser.success) {
          const updateWeek = {
            dateOfMeet,
            keyName: task,
            newValue: {
              name: resultUser.data.lastFirstName,
              _id: resultUser.data._id,
            },
          }
          const resultWeek = await window.api.updateOneWeek(updateWeek)

          if (resultWeek.success) {
            getCurrentWeek()
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
        keyName: task,
        newValue: { name: student.lastFirstName, id: student._id },
      }
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

  // Если пропустил без причины, то обновлем поле latest на дату недели (ставим в конец списка).
  // Если пропустил по причине, то оставляем его в начале списка.
  // В любом случае меняем plan: truе на false и удаляем имя из поля в БД недели.
  const makeConfirm = async (reason: string) => {
    if (presentValue) {
      const presentUser = await window.api.getOneUserByLFName(presentValue.name)

      if (presentUser.success) {
        // формируем данные для обновления полей студента в БД
        const updatePresent: IUpdateStudent = {
          idStudent: presentUser.data._id,
          newStudentData: { plan: false },
        }

        if (reason === 'Absence for NO reason') {
          const { timeStampInp } = getTimeStamps(dateOfMeet, timeEndOfMeet)
          updatePresent.newStudentData.latest = timeStampInp
        }
        //console.log('makeConfirm', updatePresent)

        // обновляем данные полей plan и, если нужно, latest
        try {
          const resultUser = await window.api.editOneUser(updatePresent)

          //если обновить студента получилось, то обновляем данные в базе недели
          if (resultUser.success) {
            const updateWeek = {
              dateOfMeet,
              keyName: task,
              newValue: null,
            }
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
        ? students.map((student) => (
            <div
              className={`Candidate ${
                oldestPerform(student) ? 'Match-student' : ''
              } `}
              key={student.lastFirstName}
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
          suitsStudents.map((student) => (
            <div key={student._id} onClick={() => makeUpdate(student)}>
              {student.lastFirstName}
            </div>
          ))}
    </div>
  )
}

export default ListOfCandidates
