import s from './style.module.css';
import Btn from '../../components/btn';
import PokemonCard from '../../components/pokemonCard';

import CARDSDATA from '../../components/pokemonCard/cardsData.json';

import {useState, useEffect, useContext} from 'react';
import { FireBaseContext } from '../../context/firebaseContext';


const GamePage = () => {
    const firebase = useContext(FireBaseContext);
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {
            setPokemons(pokemons);
        });

        return () => firebase.getOffPokemonSocket();
    }, []);// [empty] - gets pokemons data once and sets render
    // [pokemons] - watches pokemons and sets render on change

    const onClickPokemon = (id, isActive, objID) => {
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    
                };
                acc[item[0]] = pokemon;//key / objID of Poke in firebase

                firebase.postPokemon(item[0], pokemon);
                return acc;

            }, {});
        });
    }

    const onClickAddPoke = () => {
        const getRandom = (max) => {
            return Math.floor(Math.random() * max);
        }
        let randomId = getRandom(CARDSDATA.length)

        firebase.addPokemon(CARDSDATA[randomId]);
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