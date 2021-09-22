import s from './style.module.css';
import Btn from '../../../../components/btn';
import PokemonCard from '../../../../components/pokemonCard';

// import CARDSDATA from '../../../../components/pokemonCard/cardsData.json';

import { useState, useEffect, useContext } from 'react';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';
import { useHistory } from 'react-router';


const StartPage = () => {
    const firebase = useContext(FireBaseContext);
    const [pokemons, setPokemons] = useState({});
    const history = useHistory();
    const pokemonContext = useContext(PokemonContext);

    useEffect(() => {
        firebase.getPokemonSocket((pokemons) => {
            setPokemons(pokemons);
        });

        return () => firebase.getOffPokemonSocket();
    }, []);// [empty] - gets pokemons data once and sets render
    // [pokemons] - watches pokemons and sets render on change

    const onClickPokemon = (key) => {
        const pokemon = { ...pokemons[key] };
        pokemonContext.onSelectedPokemons(key, pokemon);

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
    const onClickStartGame = () => {
        history.push('/game/board');
    }

    return (
        <div className={s.page}>
            <h1>GAMEPAGE</h1>
            <button
                onClick={onClickStartGame}
                disabled={Object.keys(pokemonContext.pokemons).length < 5}
            >
                Start Game
            </button>
            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, { name, img, id, type, values, selected }]) =>
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
                            onClickPokemon={() => {
                                if (Object.keys(pokemonContext.pokemons).length < 5 || selected) {
                                    onClickPokemon(key)
                                }
                            }}
                        />
                    )
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