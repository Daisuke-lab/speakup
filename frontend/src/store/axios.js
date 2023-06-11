import axios from 'axios'
const APIClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
      api_key: process.env.REACT_APP_API_URL,
    }
  });
  
  export default APIClient;