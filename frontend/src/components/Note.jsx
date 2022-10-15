import React from 'react'

const Note = ({ note, toggleImportance, deleteNote }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={deleteNote} disabled={[1, 2, 3].includes(note.id)}>
        删除
      </button>
    </li>
  )
}

export default Note
