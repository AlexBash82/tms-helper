// electron.js

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const Datastore = require('nedb')

let mainWindow
let db

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'public/electron/preload.js'), // Используем расширение .js
    },
  })

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`

  mainWindow.loadURL(startUrl)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function initializeDatabase() {
  // Используем NeDB для создания базы данных в папке приложения
  db = new Datastore({
    filename: path.join(app.getAppPath(), 'data.db'),
    autoload: true,
  })

  createWindow()
}

app.whenReady().then(initializeDatabase)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.handle('write-file', (event, data) => {
  const timestamp = Date.now()

  // Ваша схема данных
  const schema = {
    timestamp,
    firstName: data.inputFName,
    secondName: data.inputSName,
    // Дополнительные поля согласно вашей схеме
    // Например: name, sex, plan, tasks и так далее
  }

  db.insert(schema, (err, newDoc) => {
    if (err) {
      console.error('Error inserting data into NeDB:', err)
    } else {
      console.log('Data inserted into NeDB:', newDoc)
    }
  })
})

ipcMain.handle('read-all', async (event) => {
  try {
    const allDocs = await new Promise((resolve, reject) => {
      db.find({}, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })

    // Сбрасываем кэш базы данных
    db.loadDatabase()

    return allDocs
  } catch (error) {
    console.error('Error reading all data from NeDB:', error)
    return []
  }
})

ipcMain.handle('update-item', async (event, updatedItem) => {
  try {
    const { oldFirstname, newFirstname } = updatedItem

    // Получаем оригинальный объект из базы данных
    const originalItem = await new Promise((resolve, reject) => {
      db.findOne({ firstName: oldFirstname }, (err, doc) => {
        if (err) {
          reject(err)
        } else {
          resolve(doc)
        }
      })
    })

    if (!originalItem) {
      return { success: false, message: 'Item not found' }
    }

    // Создаем обновленный объект с новым значением
    const updatedObject = { ...originalItem, firstName: newFirstname }

    // Обновляем объект в базе данных
    db.update(
      { firstName: oldFirstname },
      updatedObject,
      {},
      (err, numReplaced) => {
        if (err) {
          console.error('Error updating item in NeDB:', err)
        } else {
          console.log('Number of items updated:', numReplaced)
        }
      }
    )

    // Возвращаем обновленные данные (по вашему усмотрению)
    return { success: true, message: 'Item updated successfully' }
  } catch (error) {
    console.error('Error updating item in NeDB:', error)
    return { success: false, message: 'Error updating item' }
  }
})
