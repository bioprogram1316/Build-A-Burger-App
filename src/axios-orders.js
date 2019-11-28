import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-6dcfc.firebaseio.com/'
});

export default instance;