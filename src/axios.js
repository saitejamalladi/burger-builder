import axios from 'axios';

let instance = axios.create({
	baseURL: 'https://my-first-buger.firebaseio.com/'
});

export default instance;