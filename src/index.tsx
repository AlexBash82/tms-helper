// src/index.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

interface unitDB {
  lastFirstName: string
}

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => void
      receive: (channel: string, func: (...args: any[]) => void) => void
      readAllDatabase: () => Promise<Array<unitDB>>
      writeDatabase: (data: object) => Promise<void>
      updateItem: (data: object) => Promise<void>
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
