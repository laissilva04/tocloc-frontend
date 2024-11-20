import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Base URL do back-end
});

export default api;
