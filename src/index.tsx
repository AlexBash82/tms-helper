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
  plan: boolean
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
      readAllDatabase: () => Promise<Array<IunitDB>>
      writeDatabase: (data: object) => Promise<void>
      updateItem: (data: object) => Promise<void>
      searchUsersByLastname: (lastFirstName: string) => Promise<Array<IunitDB>>
      deleteUser: (lastFirstName: string) => Promise<Result>
    }
  }
}

const root = document.getElementById('root')

if (root) {
  const reactRoot = ReactDOM.createRoot(root)
  reactRoot.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
