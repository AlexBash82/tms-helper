// src/index.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

interface IunitDB {
  lastFirstName: string
  gender: string
  chairman?: boolean
  secondChairM?: boolean
  firstSpeach?: boolean
  gems?: boolean
  live?: boolean
  studyB?: boolean
  studyBReader?: boolean
  endPray?: boolean
  portnerOnly?: boolean
  secondClassOnly?: boolean
  notBibleStudy?: boolean
  dontUse: boolean
  comments: string
  _id: string
}

type Result = {
  success: boolean
  message: string
}

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => void
      receive: (channel: string, func: (...args: any[]) => void) => void

      writeOneUser: (data: object) => Promise<void>
      getAllUsers: () => Promise<Array<IunitDB>>
      getUsersByLastname: (lastFirstName: string) => Promise<Array<IunitDB>>
      getUsersByLatest: (addParam: object) => Promise<Array<IunitDB>>
      updateOneUser: (data: object) => Promise<void>
      deleteOneUser: (lastFirstName: string) => Promise<Result>
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
