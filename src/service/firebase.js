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

class Firebase {
  constructor() {
    this.fire = firebase;
    this.database = this.fire.database();
    this.host = 'https://react-game-1c6e1-default-rtdb.firebaseio.com';
    this.localID = null;
  }

  IDTocken = () => localStorage.getItem('idToken');
  
  setLocalID = (localID) => {
    this.localID = localID;
  }

  checkLocalID() {
    if (!this.localID) {
      // eslint-disable-next-line no-throw-literal
      throw {
        msg: 'loaclID does not exist',
      }
    }
  }

  getPokemons = async () => {
    try {
      this.checkLocalID();

      const res = await fetch(`${this.host}/${this.localID}/pokemons.json?auth=${this.IDTocken()}`)

      return res;
    } catch (err) {

    }
  }

  addPokemonAuth = async (data) => {
    const res = await fetch(`${this.host}/${this.localID}/pokemons.json?auth=${this.IDTocken()}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(res => res.json());

    return res;
  }

  getPokemonsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
  }

  getPokemonSocket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {
      cb(snapshot.val());
    })
  }

  getOffPokemonSocket = () => {
    this.database.ref('pokemons').off();
  }

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }

  addPokemon = (data, userID) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref(userID + '/pokemons/' + newKey).set(data);
  }
}

const FirebaseClass = new Firebase();

export default FirebaseClass;