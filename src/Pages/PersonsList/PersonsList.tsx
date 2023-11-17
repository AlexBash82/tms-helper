import React, { useEffect, useState } from 'react'

interface unitDB {
  lastFirstName: string
}

const PersonsList: React.FC = () => {
  const [allFileContent, setAllFileContent] = useState<Array<unitDB>>([])

  const readAllData = async () => {
    try {
      const allData = await window.api.readAllDatabase()
      setAllFileContent(allData)
    } catch (error) {
      console.error('Error reading all data:', error)
    }
  }

  useEffect(() => {
    readAllData()
  }, [])

  return (
    <div>
      <h2>All Data:</h2>
      <ul>
        {allFileContent.map((item, index) => (
          <li key={index}>
            <p>FirstName: {item.lastFirstName}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PersonsList
