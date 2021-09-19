import firebase from "firebase/compat/app"; //firebase9!
import "firebase/compat/database" //firebase9!

const firebaseConfig = {
  apiKey: "AIzaSyB5F8VIr6hcBgKoQAN6yWJ-c145EiJmZdA",
  authDomain: "react-game-1c6e1.firebaseapp.com",
  databaseURL: "https://react-game-1c6e1-default-rtdb.firebaseio.com",
  projectId: "react-game-1c6e1",
  storageBucket: "react-game-1c6e1.appspot.com",
  messagingSenderId: "64100595475",
  appId: "1:64100595475:web:7fc7193e2519a3a05c4ce6"
};
  
firebase.initializeApp(firebaseConfig);

export const fire = firebase
export const database = fire.database();

export default database;