// src/index.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

interface unitDB {
  timestamp: number
  firstName: string
  secondName: string
  _id: string
}

declare global {
  interface Window {
    api: {
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
      <App />
    </React.StrictMode>
  )
}
