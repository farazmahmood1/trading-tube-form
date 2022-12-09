import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBPa7iVpeg2wq-06K1aNAaaW6fJ0zVcp8E",
  authDomain: "tradingtubee.firebaseapp.com",
  projectId: "tradingtubee",
  storageBucket: "tradingtubee.appspot.com",
  messagingSenderId: "575329565062",
  appId: "1:575329565062:web:f4fd4449191355418e9407",
  measurementId: "G-38E4DV1GCP"
  };

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);

export default authentication;
