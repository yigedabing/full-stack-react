import React, { useEffect, useRef, useState } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import { noteService } from './services/noteService'
import Footer from './components/Footer'
import { loginService } from './services/loginService'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import { setToken } from './services/axios/http'
import LoginForm from './components/LoginForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAllNotes().then((response) => {
      setNotes(response)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const openDialog = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }

  const addNote = async (noteObject) => {
    const res = await noteService.createNote(noteObject)
    if (res.code === 200) {
      setNotes(notes.concat(res.data))
      noteFormRef.current.toggleVisibility()
    } else {
      openDialog(res.msg)
    }
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.updateNote(id, changedNote).then((response) => {
      setNotes(notes.map((n) => (n.id !== id ? n : response)))
    })
  }

  const deleteNoteById = (id) => {
    noteService.deleteNote(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id))
      openDialog('删除成功')
    })
  }

  const noteToShow = showAll ? notes : notes.filter((note) => note.important === true)

  const handleLogin = async (loginParam) => {
    const res = await loginService.login(loginParam)
    if (res.code === 200) {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(res.data))
      setUser(res.data)
      setToken()
    } else {
      openDialog(res.msg)
      return
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm login={handleLogin}></LoginForm>
    </Togglable>
  )

  const noteFormRef = useRef()

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  return (
    <div className='full-stack-app'>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? loginForm() : noteForm()}
      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {noteToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNoteById(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App
