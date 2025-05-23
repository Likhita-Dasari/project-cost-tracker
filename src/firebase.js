import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_7d_Uvsdj3Xd3b_pkrvUwCgAE98yRgXA",
  authDomain: "cost-tracker-a7342.firebaseapp.com",
  projectId: "cost-tracker-a7342",
  storageBucket: "cost-tracker-a7342.firebasestorage.app",
  messagingSenderId: "191439058908",
  appId: "1:191439058908:web:7712a25428592f4561c119"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };