import axios from 'axios';

const API_BASE_URL = 'https://fs-web-backend.onrender.com/api/v1';

export const fetchNotes = () => axios.get(`${API_BASE_URL}/notes/`);
export const fetchNoteById = (noteId) => axios.get(`${API_BASE_URL}/notes/${noteId}/`);
export const createNote = (data) => axios.post(`${API_BASE_URL}/notes/`, data);
export const updateNote = (noteId, data) => axios.put(`${API_BASE_URL}/notes/${noteId}/`, data);
export const deleteNote = (noteId) => axios.delete(`${API_BASE_URL}/notes/${noteId}`);

// export const paginationNotes =  () => axios.get(`${API_BASE_URL}/notespg/`);

export const paginationNotes = (page = 1, page_size = 5) => {
  return axios.get(`${API_BASE_URL}/notespg/`, {
    params: {
      page: page,
      page_size: page_size,
    },
  });
};