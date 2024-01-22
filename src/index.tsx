// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { IStudent, IWeek } from './interfaces'

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
type ResultMaleOrFemale = {
  success: boolean
  message: string
  data?: IMaleDB | IFemaleDB
}
type SuccessMalesOrFemales = {
  success: true
  message: string
  data: Array<IMaleDB | IFemaleDB>
}
type UnSuccessMalesOrFemales = {
  success: false
  message: string
}
//новый формат типов
type SuccessStudents = {
  success: true
  message: string
  data: IStudent[]
}
type FailureStudents = {
  success: false
  message: string
}
type ResultStudents = SuccessStudents | FailureStudents

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => void
      receive: (channel: string, func: (...args: any[]) => void) => void

      getAllStudents: () => Promise<ResultStudents>
      //обновить типы функций что ниже
      writeOneUser: (personData: object) => Promise<Result>
      getUsersByLastname: (
        lastFirstName: string
      ) => Promise<SuccessMalesOrFemales | UnSuccessMalesOrFemales>
      getUsersByLatest: (
        addParam: object
      ) => Promise<Array<IMaleDB | IFemaleDB>>
      getOneUserByLFName: (lastFirstName: string) => Promise<ResultMaleOrFemale>
      updateOneUser: (data: object) => Promise<Result>
      editOneUser: (data: object) => Promise<Result>
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
