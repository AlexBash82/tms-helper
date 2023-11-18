// electron.js
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const Datastore = require('nedb')
const isDev = require('electron-is-dev')

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

  // Код для работы меню электрон с навигацией реакт
  //-------нужно разобраться
  // mainWindow.webContents.on('did-finish-load', () => {
  //   mainWindow.webContents.send('ipcRenderer-ready')
  // })

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`

  mainWindow.loadURL(startUrl)

  // Создаем меню
  const menu = Menu.buildFromTemplate([
    {
      label: 'Page 1',
      click: () => mainWindow.webContents.send('navigate', 'page1'),
    },
    {
      label: 'Pages',
      submenu: [
        {
          label: 'Page 1',
          click: () => mainWindow.webContents.send('navigate', 'page1'),
        },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
  ])

  // Устанавливаем созданное меню
  Menu.setApplicationMenu(menu)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow?.destroy()
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

ipcMain.on('navigate', (event, page) => {
  mainWindow.webContents.send('navigate', page)
})

ipcMain.handle('write-file', (event, personData) => {
  const timestamp = Date.now()
  const defoltStamp = 1685000178013

  const schema = {
    //основные данные введенные вручную
    lastFirstName: personData.lastFirstName,
    gender: personData.gender,
    responsibility: personData.responsibility,
    portnerOnly: personData.portnerOnly,
    secondClassOnly: personData.secondClassOnly,
    notBibleStudy: personData.notBibleStudy,
    dontUse: personData.dontUse,
    commemts: personData.comments,
    // Дополнительные поля добавляемые автоматически
    plan: false,
    portners: [],
    mainStarting: defoltStamp,
    mainFollowing: defoltStamp,
    mainMaking: defoltStamp,
    mainRead: defoltStamp,
    mainExplaining: defoltStamp,
    smalStarting: defoltStamp,
    smalFollowing: defoltStamp,
    smalMaking: defoltStamp,
    smalRead: defoltStamp,
    smalExplaining: defoltStamp,
    chairMan: defoltStamp,
    firstSpeach: defoltStamp,
    gems: defoltStamp,
    live: defoltStamp,
    study: defoltStamp,
    pray: defoltStamp,
    studyReader: defoltStamp,
    secondShair: defoltStamp,
    mainSlave: defoltStamp,
    smalSlave: defoltStamp,
  }

  db.insert(schema, (err, newDoc) => {
    if (err) {
      console.error('Error inserting data into NeDB:', err)
    } else {
      //console.log('Data inserted into NeDB:', newDoc)
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

ipcMain.handle('search-users-by-lastname', async (event, searchTerm) => {
  try {
    const filteredUsers = await new Promise((resolve, reject) => {
      db.find(
        { lastFirstName: { $regex: new RegExp(`^${searchTerm}`, 'i') } },
        (err, docs) => {
          if (err) {
            reject(err)
          } else {
            resolve(docs)
          }
        }
      )
    })

    return filteredUsers
  } catch (error) {
    console.error('Error searching users by lastname:', error)
    return []
  }
})

ipcMain.handle('delete-item', async (event, lastFirstName) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.remove({ lastFirstName: lastFirstName }, {}, (err, numRemoved) => {
        if (err) {
          reject(err)
        } else if (numRemoved > 0) {
          resolve({ success: true, message: 'User deleted successfully' })
        } else {
          resolve({ success: false, message: 'User not found' })
        }
      })
    })

    return result
  } catch (error) {
    console.error('Error deleting user by lastFirstName:', error)
    return { success: false, message: 'Error deleting user' }
  }
})
