import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const fetchNotes = () => axios.get(`${API_BASE_URL}/notes/`);
export const fetchNoteById = (noteId) => axios.get(`${API_BASE_URL}/notes/${noteId}/`);
export const createNote = (data) => axios.post(`${API_BASE_URL}/notes/`, data);
export const updateNote = (noteId, data) => axios.put(`${API_BASE_URL}/notes/${noteId}/`, data);
export const deleteNote = (noteId) => axios.delete(`${API_BASE_URL}/notes/${noteId}`);
