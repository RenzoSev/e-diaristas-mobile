import axios from 'axios';

//https://ediaristas-workshop.herokuapp.com
//http://127.0.0.1:8000/
const url = 'https://ediaristas-workshop.herokuapp.com';

export const ApiService = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json'
  }
});
