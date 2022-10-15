import http from './axios/http'

export const noteService = {
  /** 查询 */
  getAllNotes() {
    return http.get('/api/notes')
  },
  /** 增加 */
  createNote(newObject) {
    return http.post('/api/notes', newObject)
  },
  /** 更新 */
  updateNote(id, newObject) {
    return http.put(`/api/notes/${id}`, newObject)
  },
  /** 删除 */
  deleteNote(id) {
    return http.delete(`/api/notes/${id}`)
  },
}
