import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5232/api',
});

export const getBooks = () => api.get('/Book');
export const createBook = (book) => api.post('/Book', book);

export default api;
