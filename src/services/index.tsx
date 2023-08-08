import axios from 'axios';

const api = axios.create({
	baseURL: 'https://rickandmortyapi.com/api/character0',
});

export default api;
