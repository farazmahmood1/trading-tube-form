import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAGlgUXca4uKwv08uShLaoXD1uNiVt736Q",
  authDomain: "tradingtube-c3346.firebaseapp.com",
  projectId: "tradingtube-c3346",
  storageBucket: "tradingtube-c3346.appspot.com",
  messagingSenderId: "498904996572",
  appId: "1:498904996572:web:c3d6986095158bf9b5b219",
  measurementId: "G-7B4WBGFJKE"
  };

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);

export default authentication;
