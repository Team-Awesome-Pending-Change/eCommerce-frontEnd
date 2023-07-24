// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/cards',
});

export const getAllCards = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getCardByName = async (name) => {
  const response = await api.get(`?name=${name}`);
  return response.data;
};

// similarly define other methods...

export default api;
