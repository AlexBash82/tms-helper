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
    width: 1200,
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
    //autoload: true,
  })
  usersDB.loadDatabase((err) => {
    if (err) {
      console.error('Error loading users database:', err)
      // Обработка ошибок, если требуется
    } else {
      console.log('usersDB has connected')
    }
  })

  weeksDB = new Datastore({
    filename: path.join(app.getAppPath(), '../data/weeks.db'),
    //autoload: true,
  })
  weeksDB.loadDatabase((err) => {
    if (err) {
      console.error('Error loading weeks database:', err)
      // Обработка ошибок, если требуется
    } else {
      console.log('weeksDB has connected')
    }
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

//------------------------GET-ALL-STUDENTS---------------------------------------------

ipcMain.handle('get-all-students', async (event) => {
  try {
    const allStudents = await new Promise((resolve, reject) => {
      usersDB.find({}, (err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve(docs)
        }
      })
    })

    // Сбрасываем кэш базы данных
    //usersDB.loadDatabase()

    if (allStudents) {
      return { success: true, message: '', data: allStudents }
    }
  } catch (error) {
    //console.error('read-all-users error', error)
    return { success: false, message: 'Error with geting all users' }
  }
})

//------------------------UPDATE-ONE-USER------update one field---------------------------

ipcMain.handle('update-one-user', async (event, updatedItem) => {
  try {
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
      return { success: false, message: 'User not found' }
    }

    // Создаем обновленный объект с новым значением
    const updatedObject = { ...originalItem, [keyName]: newValue }

    // Обновляем объект в базе данных
    const numUpdated = await new Promise((resolve, reject) => {
      usersDB.update(
        { lastFirstName: studentName },
        updatedObject,
        {},
        (err, numReplaced) => {
          if (err) {
            console.error('update-one-user error update', err)
            reject(err)
          } else {
            //console.log('update-one-user number', numReplaced)
            resolve(numReplaced)
          }
        }
      )
    })
    usersDB.persistence.compactDatafile()

    if (numUpdated) {
      return {
        success: true,
        message: `${studentName} updated field ${keyName} to ${newValue}`,
        data: updatedObject,
      }
    }
  } catch (error) {
    console.error('update-one-user error', error)
    return { success: false, message: 'Error updating item' }
  }
})

//------------------------EDIT-ONE-USER---------------------------------------------

ipcMain.handle('edit-one-user', async (event, editItem) => {
  try {
    const { idPerson, newValue } = editItem

    const originalPerson = await new Promise((resolve, reject) => {
      usersDB.findOne({ _id: idPerson }, (err, person) => {
        if (err) {
          reject(err)
        } else {
          resolve(person)
        }
      })
    })

    if (!originalPerson) {
      return { success: false, message: 'Item not found' }
    }

    const updatedObject = Object.assign(originalPerson, newValue)

    const updatedPerson = await new Promise((resolve, reject) => {
      usersDB.update(
        { _id: idPerson },
        updatedObject,
        {},
        (err, numUpdated) => {
          if (err) {
            console.error('edit-one-user error update', err)
            reject(err)
          } else {
            resolve(numUpdated)
          }
        }
      )
    })

    if (updatedPerson) {
      usersDB.persistence.compactDatafile()
      return { success: true, message: 'Item updated successfully' }
    }
  } catch (error) {
    console.error('edit-one-user error', error)
    return { success: false, message: 'Error updating item' }
  }
})

//---------------------GET-SORTED-USERS-BY-LASTNAME----------------------------------------

ipcMain.handle('get-sorted-users-by-lastname', async (event, searchTerm) => {
  try {
    const filteredUsers = await new Promise((resolve, reject) => {
      usersDB.find(
        { lastFirstName: { $regex: new RegExp(`^${searchTerm}`, 'i') } },
        (err, users) => {
          if (err) {
            reject(err)
          } else {
            resolve(users)
          }
        }
      )
    })

    return { success: true, message: 'I have found users', data: filteredUsers }
  } catch (error) {
    console.error('get-sorted-users-by-lastname error', error)
    return { success: true, message: 'I have found users' }
  }
})

//------------------------GET-ONE-USER-BY-LASTNAME-------------------------------------------

ipcMain.handle('get-one-user-by-lfname', async (event, LFName) => {
  try {
    const foundUser = await new Promise((resolve, reject) => {
      usersDB.findOne({ lastFirstName: LFName }, (err, user) => {
        if (err) {
          reject(err)
        } else {
          console.log('get one user, found', user)
          resolve(user)
        }
      })
    })

    return { success: true, message: 'I have found one user', data: foundUser }
  } catch (error) {
    console.error('get-one-user-by-lfname error', error)
    return { success: false, message: 'I have notfound' }
  }
})

//------------------------DELITE-ONE-USER--------------------------------------------

ipcMain.handle('delete-one-user', async (event, lastFirstName) => {
  try {
    const result = await new Promise((resolve, reject) => {
      usersDB.remove({ lastFirstName }, {}, (err, numRemoved) => {
        if (err) {
          reject(err)
        } else if (numRemoved > 0) {
          resolve({ success: true, message: 'User deleted successfully' })
        } else {
          resolve({ success: false, message: 'User not found' })
        }
      })
    })
    usersDB.persistence.compactDatafile()
    return result
  } catch (error) {
    console.error('delete-one-user error', error)
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
    console.error('get-sorted-users-by-latest error', error)
    return []
  }
})
//-----------------------------------------------------------------------------------

//------------------------WRITE-NEW-WEEK---------------------------------------------

ipcMain.handle('write-new-week', async (event, weekData) => {
  try {
    const { startWeekTSt } = weekData

    const foundWeek = await new Promise((resolve, reject) => {
      weeksDB.findOne({ startWeekTSt }, (err, week) => {
        if (err) {
          console.log('write-new-week error findOne', err)
          reject(err)
        } else {
          resolve(week)
        }
      })
    })
    if (foundWeek) {
      return {
        success: true,
        message: 'The week is already exist',
        data: foundWeek,
      }
    }
    console.log('insert data', weekData)
    const insertWeek = await new Promise((resolve, reject) => {
      weeksDB.insert(weekData, (err, newDoc) => {
        if (err) {
          console.log('write-new-week error-insert: ', err)
          reject(err)
        } else {
          resolve(newDoc)
        }
      })
    })
    if (insertWeek) {
      return {
        success: true,
        message: 'The week has succesfully inserted',
        data: insertWeek,
      }
    }
  } catch (error) {
    //console.error('write-new-week error', error)
    return { success: false, message: 'Error creating new week' }
  }
})

//------------------------GET-ALL-WEEKS---------------------------------------------

ipcMain.handle('get-all-weeks', async (event) => {
  try {
    const allWeeks = await new Promise((resolve, reject) => {
      weeksDB
        .find({})
        .sort({ startWeekTSt: 1 })
        .exec((err, docs) => {
          if (err) {
            reject(err)
          } else {
            resolve(docs)
          }
        })
    })

    return {
      success: true,
      message: 'Weeks has found',
      data: allWeeks,
    }
  } catch (error) {
    console.error('get-all-weeks error', error)
    return {
      success: false,
      message: 'Weeks has notfound',
    }
  }
})

//-------------------------GET-ONE-WEEK---------------------------------------------

ipcMain.handle('get-one-week', async (event, dateOfMeet) => {
  try {
    const foundWeek = await new Promise((resolve, reject) => {
      weeksDB.findOne({ dateOfMeet }, (err, oneWeek) => {
        if (err) {
          console.error('get-one-week error findOne', err)
          reject(err)
        } else {
          resolve(oneWeek)
        }
      })
    })
    if (foundWeek) {
      return {
        success: true,
        message: 'The week has found',
        data: foundWeek,
      }
    } else {
      return {
        success: false,
        message: 'The week has notfound',
      }
    }
  } catch (error) {
    return { success: false, message: 'Error finding week in weeksDB' }
  }
})

//-------------------------UPDATE-ONE-WEEK---------------------------------------------

ipcMain.handle('update-one-week', async (event, weekData) => {
  try {
    const { dateOfMeet, keyName, newValue } = weekData

    const originalWeek = await new Promise((resolve, reject) => {
      weeksDB.findOne({ dateOfMeet }, (err, foundWeek) => {
        if (err) {
          console.error('update-one-week error findOne', err)
          reject(err)
        } else {
          resolve(foundWeek)
        }
      })
    })

    if (!originalWeek) {
      return { success: false, message: 'The week not found' }
    }

    const updatingWeek = { ...originalWeek, [keyName]: newValue }

    const updatedWeek = await new Promise((resolve, reject) => {
      weeksDB.update({ dateOfMeet }, updatingWeek, {}, (err, numUpdated) => {
        if (err) {
          console.error('update-one-week error update', err)
          reject(err)
        } else {
          //console.log('update-one-week number', numUpdated)
          resolve(numUpdated)
        }
      })
    })

    weeksDB.persistence.compactDatafile()

    return {
      success: true,
      message: 'Week updated successfully',
      data: updatingWeek,
    }
  } catch (error) {
    console.error('update-one-week error', error)
    return { success: false, message: 'Error updating week' }
  }
})

//------------------------DELITE-ONE-WEEK--------------------------------------------

ipcMain.handle('delete-one-week', async (event, dateOfMeet) => {
  try {
    const result = await new Promise((resolve, reject) => {
      weeksDB.remove({ dateOfMeet }, {}, (err, numRemoved) => {
        if (err) {
          reject(err)
        } else if (numRemoved > 0) {
          resolve({ success: true, message: 'Week deleted successfully' })
        } else {
          resolve({ success: false, message: 'Week not found' })
        }
      })
    })
    weeksDB.persistence.compactDatafile()
    return result
  } catch (error) {
    console.error('delete-one-week error', error)
    return { success: false, message: 'Error deleting week' }
  }
})
