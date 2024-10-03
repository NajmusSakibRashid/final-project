// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR7WYH_w5sDnXFhSZPHQcrB4iZBNpsrOw",
  authDomain: "itransition-final-project.firebaseapp.com",
  projectId: "itransition-final-project",
  storageBucket: "itransition-final-project.appspot.com",
  messagingSenderId: "474039167891",
  appId: "1:474039167891:web:915783434e2f35362b5666",
  measurementId: "G-DPLVYGZ094",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

// const analytics = getAnalytics(app);
