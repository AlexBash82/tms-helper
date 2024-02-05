import React, { useEffect, useRef, useState } from 'react'
import './ListOfCandidates.css'
import { IStudent } from '../../interfaces'

//повесить слушатель клика вне окошка на закрытие
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

const ListOfCandidates: React.FC<IProps> = ({
  openAndChoose,
  getCurrentWeek,
  presentValue,
  task,
  dateOfMeet,
  action,
  suitsStudents,
  inputIs,
}) => {
  const [students, setStudents] = useState<Array<IStudent>>([])
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        listRef.current &&
        !listRef.current.contains(event.target as Node) &&
        inputIs === 'blur' &&
        action !== 'plan'
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
    if (task.includes('chearManPoint')) addParams.isChairman = true
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
        isSuits = minValues.includes('mainRead')
        break
      case 'startPointStMC':
        isSuits = minValues.includes('mainStarting')
        break
      case 'followPointStMC':
        isSuits = minValues.includes('mainFollowing')
        break
      case 'makePointStMC':
        isSuits = minValues.includes('mainMaking')
        break
      case 'explainPointStMC':
        isSuits = minValues.includes('mainExplaining')
        break
      case 'explainSpPointStMC':
        isSuits = minValues.includes('mainExplainSpeech')
        break
      case 'speechPointStMC':
        isSuits = minValues.includes('mainSpeech')
        break
      case 'readPointStSC':
        isSuits = minValues.includes('smallRead')
        break
      case 'startPointStSC':
        isSuits = minValues.includes('smallStarting')
        break
      case 'followPointStSC':
        isSuits = minValues.includes('smallFollowing')
        break
      case 'makePointStSC':
        isSuits = minValues.includes('smallMaking')
        break
      case 'explainPointStSC':
        isSuits = minValues.includes('smallExplaining')
        break
      case 'explainSpPointStSC':
        isSuits = minValues.includes('smallExplaiSpeech')
        break
      case 'speechPointStSC':
        isSuits = minValues.includes('smallSpeech')
        break
      case 'startPointAsMC':
      case 'followPointAsMC':
      case 'makePointAsMC':
      case 'explainPointAsMC':
        isSuits = minValues.includes('mainSlave')
        break
      case 'startPointAsSC':
      case 'followPointAsSC':
      case 'makePointAsSC':
      case 'explainPointAsSC':
        isSuits = minValues.includes('smallSlave')
        break
      case 'chearManPoint':
        isSuits = minValues.includes('chairman')
        break
      case 'firstSpeechPoint':
        isSuits = minValues.includes('firstSpeech')
        break
      case 'gemsPoint':
        isSuits = minValues.includes('gems')
        break
      case 'lessonOnePoint':
      case 'lessonTwoPoint':
      case 'liveAndServPoint':
      case 'liveAndServTwoPoint':
      case 'liveAndServThreePoint':
        isSuits = minValues.includes('liveAndServ')
        break
      case 'studyBibleInPoint':
        isSuits = minValues.includes('studyBibleIn')
        break
      case 'studyBibleInReaderPoint':
        isSuits = minValues.includes('studyBibleInReader')
        break
      case 'endPrayerPoint':
        isSuits = minValues.includes('endPrayer')
        break
      case 'secondChairmPoint':
        isSuits = minValues.includes('secondChairm')
        break
    }

    return isSuits
  }

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

  //эта функция полуает studentName: имя студента, у которого нужно в базе сделать plan: true
  const makePlan = async (studentName: string) => {
    //если в строке уже имеется студент: presentValue, то получаем его из базы
    if (presentValue) {
      const presentUser = await window.api.getOneUserByLFName(
        presentValue?.name
      )

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
    if (studentName !== presentValue?.name) {
      try {
        const updateUser = {
          studentName: studentName,
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
        console.error('Error updating item:', error)
      }
    }
    openAndChoose('')
  }

  //для заполнения базы данных датами выступлений у студентов, достаточно внести имена в поля недели. И после нажатия кнопки "сохранить" в AddInfoByWeek - (должны) обновятся поля дат у студентов
  const makeUpdate = async (studentName: string) => {
    const student = await window.api.getOneUserByLFName(studentName)

    if (student.success) {
      try {
        const updateWeek = {
          dateOfMeet,
          keyName: task,
          newValue: studentName,
        }
        const resultWeek = await window.api.updateOneWeek(updateWeek)

        if (resultWeek.success) {
          getCurrentWeek()
        }
      } catch (error) {
        console.error('Error updating item:', error)
      }
    }
    openAndChoose('')
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
              onClick={() => makePlan(student.lastFirstName)}
            >
              {student.lastFirstName}
            </div>
          ))
        : action === 'confirm'
        ? suitsStudents.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makePlan(student.lastFirstName)}
            >
              {student.lastFirstName}
            </div>
          ))
        : action === 'update' &&
          suitsStudents.map((student) => (
            <div
              key={student.lastFirstName}
              onClick={() => makeUpdate(student.lastFirstName)}
            >
              {student.lastFirstName}
            </div>
          ))}
    </div>
  )
}

export default ListOfCandidates
