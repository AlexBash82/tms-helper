// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { IAddParams, IStudent, IWeek } from './interfaces'

type Result = {
  success: boolean
  message: string
}
type SuccecWithNewWeek = {
  success: true
  message: string
  data: IWeek
}
type UnSuccessWithNewWeek = {
  success: false
  message: string
}
type SuccesResultAllWeeks = {
  success: true
  message: string
  data: Array<IWeek>
}
type UnSuccessResultAllWeeks = {
  success: false
  message: string
}

//новый формат типов
type Failure = {
  success: false
  message: string
}

type SuccessStudent = {
  success: true
  message: string
  data: IStudent
}

type ResultStudent = SuccessStudent | Failure

type SuccessStudents = {
  success: true
  message: string
  data: IStudent[]
}

type ResultStudents = SuccessStudents | Failure

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => void
      receive: (channel: string, func: (...args: any[]) => void) => void

      getAllStudents: () => Promise<ResultStudents>
      getUsersByLastname: (lastFirstName: string) => Promise<ResultStudents>
      updateOneUser: (personData: object) => Promise<ResultStudent>
      getOneUserByLFName: (lastFirstName: string) => Promise<ResultStudent>
      editOneUser: (data: object) => Promise<ResultStudent>
      getUsersByLatest: (addParam: IAddParams) => Promise<ResultStudents>
      //обновить типы функций что ниже
      writeOneUser: (personData: object) => Promise<Result>
      deleteOneUser: (lastFirstName: string) => Promise<Result>

      writeNewWeek: (
        weekData: object
      ) => Promise<SuccecWithNewWeek | UnSuccessWithNewWeek>
      getOneWeek: (
        dataOfMeet: string
      ) => Promise<SuccecWithNewWeek | UnSuccessWithNewWeek>
      getAllWeeks: () => Promise<SuccesResultAllWeeks | UnSuccessResultAllWeeks>
      updateOneWeek: (weekData: object) => Promise<Result>
      deleteOneWeek: (dateOfMeet: string) => Promise<Result>
    }
  }
}
//все функции перепроверить и установить возврат в виде обьекта с полями успех, дата
const root = document.getElementById('root')

if (root) {
  const reactRoot = ReactDOM.createRoot(root)
  reactRoot.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
