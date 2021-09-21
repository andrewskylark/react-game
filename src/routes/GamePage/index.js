import s from './style.module.css';
import Btn from '../../components/btn';
import PokemonCard from '../../components/pokemonCard';
import CARDSDATA from '../../components/pokemonCard/cardsData.json';

import {useState, useEffect} from 'react';

import database from "../../service/firebase.js"


const GamePage = () => {
    const [pokemons, setPokemons] = useState({});

    const getPokemons = () => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val());
        });
    }

    useEffect(() => {
        getPokemons();
    }, []);// [empty] - gets pokemons data once and sets render
    // [pokemons] - watches pokemons and sets render on change

    const onClickPokemon = (id, isActive, objID) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    acc[item[0]] = pokemon;//key / objID of Poke in firebase
                };
        
                return acc;
            }, {});
        });

        database.ref('pokemons/'+ objID).set({
            ...pokemons[objID],
            active: !isActive,
        });
    }

    const onClickAddPoke = () => {
        const getRandom = (max) => {
            return Math.floor(Math.random() * max);
        }
        let randomId = getRandom(CARDSDATA.length)
        const newKey = database.ref().child('pokemons').push().key;
        
        database.ref('pokemons/' + newKey).set(CARDSDATA[randomId]).then(() => getPokemons());
    }
    
    return (
        <div className={s.page}>
            <h1>GAMEPAGE</h1>
            <button onClick={onClickAddPoke}>
                Add new pokemon
            </button>
            <div className={s.flex}>
          {
            Object.entries(pokemons).map(([key, {name,img, id, type, values, active}]) => 
                <PokemonCard
                    key={key}
                    objID={key}
                    name={name}
                    img={img}
                    id={id}
                    type={type}
                    values={values}
                    isActive={active}
                    onClickPokemon={onClickPokemon}
            />)
          }
        </div>
            <Btn 
                text="Back to Home Page"
                route=""
            />
        </div>
    );
};

export default GamePage;