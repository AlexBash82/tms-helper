// src/index.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { IFemaleDB, IMaleDB, IWeek } from './interfaces'

type Result = {
  success: boolean
  message: string
}
type ResultWithNewWeek = {
  success: boolean
  message: string
  data?: IWeek
}

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => void
      receive: (channel: string, func: (...args: any[]) => void) => void

      writeOneUser: (personData: object) => Promise<Result>
      getAllUsers: () => Promise<Array<IMaleDB | IFemaleDB>>
      getUsersByLastname: (
        lastFirstName: string
      ) => Promise<Array<IMaleDB | IFemaleDB>>
      getUsersByLatest: (
        addParam: object
      ) => Promise<Array<IMaleDB | IFemaleDB>>
      getOneUserByLFName: (
        lastFirstName: string
      ) => Promise<IMaleDB | IFemaleDB>
      updateOneUser: (data: object) => Promise<Result>
      editOneUser: (data: object) => Promise<Result>
      deleteOneUser: (lastFirstName: string) => Promise<Result>

      writeNewWeek: (weekData: object) => Promise<ResultWithNewWeek>
      getOneWeek: (dataOfMeet: string) => Promise<ResultWithNewWeek>
      updateOneWeek: (weekData: object) => Promise<Result>
    }
  }
}

const root = document.getElementById('root')

if (root) {
  const reactRoot = ReactDOM.createRoot(root)
  reactRoot.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
