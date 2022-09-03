// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAPWEqQvAOHS89spSKYLxc6oQ5IrW-fMWU',
  authDomain: 'charity-journal.firebaseapp.com',
  projectId: 'charity-journal',
  storageBucket: 'charity-journal.appspot.com',
  messagingSenderId: '292293935082',
  appId: '1:292293935082:web:c34abc5d2ad861703b7c93',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
