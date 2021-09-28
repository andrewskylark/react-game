import s from './style.module.css';
import Btn from '../../../../components/btn';
import PokemonCard from '../../../../components/pokemonCard';
import { useState, useEffect, useContext } from 'react';
// import { FireBaseContext } from '../../../../context/firebaseContext';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPokemonsAsync, selectPokemonsData } from '../../../../store/pokemons';
import { getChosenPokemonsAsync} from '../../../../store/chosenPokemons';

const StartPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const pokemonsRedux = useSelector(selectPokemonsData);
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        dispatch(getPokemonsAsync());//send pokes to redux
        // firebase.getPokemonSocket((pokemons) => {
        //     setPokemons(pokemons);
        // });
        // return () => firebase.getOffPokemonSocket();
    }, []);// [empty] - gets pokemons data once and sets render
    // [pokemons] - watches pokemons and sets render on change
    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);//set Pokemons on change of pokemonsRedux
    
    const [chosenPokemons, setChosenPokemons] = useState({});
    const onClickPokemon = (key) => {
        const pokemon = { ...pokemons[key] };

        setPokemons(prevState => ({
            ...prevState,
            [key]: {
                ...prevState[key],
                selected: !prevState[key].selected,
            }
        }))
        setChosenPokemons(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState};
                delete copyState[key];

                return copyState;
            }
            return {
                ...prevState,
                [key]: pokemon,
            }
        })
    }
    // useEffect(() => {
    //     dispatch(fetchChosenPokemonsResolve(ChosenPokemons));
    // }, []);
    // useEffect(() => {
    //     setChosenPokemons(ChosenPokemons);
    // }, [ChosenPokemons]);//set Pokemons on change of pokemonsRedux
    const onClickStartGame = () => {
        dispatch(getChosenPokemonsAsync(chosenPokemons));
        history.push('/game/board');
    }

    return (
        <div className={s.page}>
            <h1>GAMEPAGE</h1>
            <p className={s.promt}>Choose 5 cards</p>
            <button
                onClick={onClickStartGame}
                disabled={Object.keys(chosenPokemons).length < 5}
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
                                if (Object.keys(chosenPokemons).length < 5 || selected) {
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