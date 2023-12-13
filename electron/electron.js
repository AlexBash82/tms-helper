// electron.js
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const Datastore = require('nedb')
const isDev = require('electron-is-dev')

let mainWindow
let usersDB
let weeksDB

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'), // Используем расширение .js
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
  usersDB = new Datastore({
    filename: path.join(app.getAppPath(), '../data/users.db'),
    autoload: true,
  })
  weeksDB = new Datastore({
    filename: path.join(app.getAppPath(), '../data/weeks.db'),
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

//------------------------WRITE-ONE-USER---------------------------------------------
//хорошо бы проверить есть ли такой в базе данных
ipcMain.handle('write-one-user', async (event, personData) => {
  try {
    const result = await new Promise((resolve, reject) => {
      usersDB.insert(personData, (err, newDoc) => {
        if (err) {
          reject(err)
        } else {
          resolve(newDoc)
        }
      })
    })
    return { success: true, message: 'Write new user is successfully' }
  } catch (error) {
    return { success: false, message: 'Write new user is faild' }
  }
})

//------------------------READ-ALL-USERS---------------------------------------------

ipcMain.handle('read-all-users', async (event) => {
  try {
    const allDocs = await new Promise((resolve, reject) => {
      usersDB.find({}, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })

    // Сбрасываем кэш базы данных
    usersDB.loadDatabase()

    return allDocs
  } catch (error) {
    console.error('Error reading all data from NeDB:', error)
    return []
  }
})

//------------------------UPDATE-ONE-USER---------------------------------------------

ipcMain.handle('update-one-user', async (event, updatedItem) => {
  //console.log(updatedItem)
  try {
    //нужно получать имя для поиска, названия поля для обновления и новое значение
    const { studentName, keyName, newValue } = updatedItem

    // Получаем оригинальный объект из базы данных
    const originalItem = await new Promise((resolve, reject) => {
      usersDB.findOne({ lastFirstName: studentName }, (err, doc) => {
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
    const updatedObject = { ...originalItem, [keyName]: newValue }

    // Обновляем объект в базе данных
    usersDB.update(
      { lastFirstName: studentName },
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

//------------------------EDIT-ONE-USER---------------------------------------------

ipcMain.handle('edit-one-user', async (event, updatedItem) => {
  try {
    //нужно получать id для поиска и новые значения - объект
    const { idPerson, newValue } = updatedItem

    // Получаем оригинальный объект из базы данных
    const originalItem = await new Promise((resolve, reject) => {
      usersDB.findOne({ _id: idPerson }, (err, doc) => {
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
    const updatedObject = Object.assign(originalItem, newValue)
    console.log('original item', originalItem)
    console.log('newvalue', newValue)
    console.log('updated obj', updatedObject)

    // Обновляем объект в базе данных
    usersDB.update({ _id: idPerson }, updatedObject, {}, (err, numReplaced) => {
      if (err) {
        console.error('Error updating item in NeDB:', err)
      } else {
        console.log('Number of items updated:', numReplaced)
      }
    })

    // Возвращаем обновленные данные (по вашему усмотрению)
    return { success: true, message: 'Item updated successfully' }
  } catch (error) {
    console.error('Error updating item in NeDB:', error)
    return { success: false, message: 'Error updating item' }
  }
})

//---------------------GET-SORTED-USERS-BY-LASTNAME----------------------------------------

ipcMain.handle('get-sorted-users-by-lastname', async (event, searchTerm) => {
  try {
    const filteredUsers = await new Promise((resolve, reject) => {
      usersDB.find(
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

//------------------------GET-ONE-USER-BY-LASTNAME-------------------------------------------

ipcMain.handle('get-one-user-by-lfname', async (event, LFName) => {
  try {
    const foundUser = await new Promise((resolve, reject) => {
      usersDB.findOne({ lastFirstName: LFName }, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })

    return foundUser
  } catch (error) {
    console.error('Error searching user by lastname:', error)
    return {}
  }
})

//------------------------DELITE-ONE-USER--------------------------------------------

ipcMain.handle('delete-one-user', async (event, lastFirstName) => {
  try {
    const result = await new Promise((resolve, reject) => {
      usersDB.remove(
        { lastFirstName: lastFirstName },
        {},
        (err, numRemoved) => {
          if (err) {
            reject(err)
          } else if (numRemoved > 0) {
            resolve({ success: true, message: 'User deleted successfully' })
          } else {
            resolve({ success: false, message: 'User not found' })
          }
        }
      )
    })

    return result
  } catch (error) {
    console.error('Error deleting user by lastFirstName:', error)
    return { success: false, message: 'Error deleting user' }
  }
})

//------------------------GET-SORTED-USERS-BY-LATEST-------------------------------------------

ipcMain.handle('get-sorted-users-by-latest', async (event, addParam) => {
  try {
    const filteredUsers = new Promise((resolve, reject) => {
      usersDB
        .find({ dontUse: false, plan: false, ...addParam })
        .sort({ latest: 1 })
        .limit(10)
        .exec((err, users) => {
          if (err) {
            reject(err)
          } else {
            resolve(users)
          }
        })
    })
    return filteredUsers
  } catch (error) {
    console.error('Error searching users by latest:', error)
    return []
  }
})

//------------------------WRITE-NEW-WEEK---------------------------------------------

ipcMain.handle('write-new-week', async (event, weekData) => {
  try {
    const allWees = await new Promise((resolve, reject) => {
      weeksDB.find({}, (err, weeks) => {
        if (err) {
          reject(err)
        } else {
          resolve(weeks)
        }
      })
    })

    isFound = allWees.find(
      (week) => week.startWeekTSt === weekData.startWeekTSt
    )

    if (!isFound) {
      const result = await new Promise((resolve, reject) => {
        weeksDB.insert(weekData, (err, newDoc) => {
          if (err) {
            reject(err)
          } else {
            resolve(newDoc)
          }
        })
      })
      return {
        success: true,
        message: 'Write new week is successfully',
      }
    } else {
      return {
        success: false,
        message: 'The week is already exist',
        date: isFound,
      }
    }
  } catch (error) {
    return { success: false, message: 'Write in weeksDB is faild' }
  }
})

//------------------------READ-ALL-WEEKS---------------------------------------------

// ipcMain.handle('read-all-weeks', async (event) => {
//   try {
//     const allDocs = await new Promise((resolve, reject) => {
//       usersDB.find({}, (err, docs) => {
//         if (err) {
//           reject(err)
//         } else {
//           resolve(docs)
//         }
//       })
//     })

//     // Сбрасываем кэш базы данных
//     usersDB.loadDatabase()

//     return allDocs
//   } catch (error) {
//     console.error('Error reading all data from NeDB:', error)
//     return []
//   }
// })
