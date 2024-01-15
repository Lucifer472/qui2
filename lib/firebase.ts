import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDFKsE0yv8zUxSiLD1gjhn1mZidnZ-O23U",

  authDomain: "blog-website-7ff75.firebaseapp.com",

  projectId: "blog-website-7ff75",

  storageBucket: "blog-website-7ff75.appspot.com",

  messagingSenderId: "492922210801",

  appId: "1:492922210801:web:d30f1b7bb0c4969af89c50",

  measurementId: "G-35XHDKQDFD",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
