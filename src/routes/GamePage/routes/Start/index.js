import s from './style.module.css';
import Btn from '../../../../components/btn';
import PokemonCard from '../../../../components/pokemonCard';

// import CARDSDATA from '../../../../components/pokemonCard/cardsData.json';

import {useState, useEffect, useContext} from 'react';
import { FireBaseContext } from '../../../../context/firebaseContext';


const StartPage = () => {
    const firebase = useContext(FireBaseContext);
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {
            setPokemons(pokemons);
        });

        return () => firebase.getOffPokemonSocket();
    }, []);// [empty] - gets pokemons data once and sets render
    // [pokemons] - watches pokemons and sets render on change

    const onClickPokemon = (key) => {
        setPokemons(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }

        }))
    }

    // const onClickAddPoke = () => {
    //     const getRandom = (max) => {
    //         return Math.floor(Math.random() * max);
    //     }
    //     let randomId = getRandom(CARDSDATA.length)

    //     firebase.addPokemon(CARDSDATA[randomId]);
    // }
    
    return (
        <div className={s.page}>
            <h1>GAMEPAGE</h1>
            <button>
                Start Game
            </button>
            <div className={s.flex}>
          {
            Object.entries(pokemons).map(([key, {name,img, id, type, values, selected}]) => 
                <PokemonCard
                    className={s.card}
                    key={key}
                    objID={key}
                    name={name}
                    img={img}
                    id={id}
                    type={type}
                    values={values}
                    isActive={true}
                    isSelected={selected}
                    onClickPokemon={() => onClickPokemon(key)}
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

export default StartPage;