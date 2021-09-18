import s from './style.module.css';
import Btn from '../../components/btn';
import PokemonCard from '../../components/pokemonCard';
// import CARDSDATA from '../../components/pokemonCard/cardsData.json';

import {useState, useEffect} from 'react';

import database from "../../service/firebase.js"

// const POKEMONS = CARDSDATA.map(pokemon => {
//     Object.assign(pokemon, {'active': false})
//     return pokemon;
// })

const GamePage = () => {
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val())
          });
    }, []);

    const onClickPokemon = (id) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = true;
                };
        
                acc[item[0]] = pokemon;
        
                return acc;
            }, {});
        });
    }
    
    return (
        <div className={s.page}>
            <h1>GAMEPAGE</h1>
            <div className={s.flex}>
          {
            Object.entries(pokemons).map(([key, {name,img, id, type, values, active}]) => 
                <PokemonCard
                    key={key}
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