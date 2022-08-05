import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAI19AGF_l9gBUH9jR7DvmUmWUNFuBwfKM',
	authDomain: 'travel-react-5ed80.firebaseapp.com',
	projectId: 'travel-react-5ed80',
	storageBucket: 'travel-react-5ed80.appspot.com',
	messagingSenderId: '430499998419',
	appId: '1:430499998419:web:e8385d8621c9c965fd0226',
	measurementId: 'G-1NP7GQLJGQ',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
