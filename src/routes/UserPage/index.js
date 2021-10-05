import s from './style.module.css';
import Btn from '../../components/btn';
import PokemonCard from '../../components/pokemonCard';
import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectPokemonsData } from '../../store/pokemons';
import { selectUserData } from '../../store/user';

const UserPage = () => {
    // const dispatch = useDispatch();
    const pokemonsRedux = useSelector(selectPokemonsData);
    const [pokemons, setPokemons] = useState({});
    const userData = useSelector(selectUserData);
    const toLocalTime = (date) => new Date(parseInt(date, 10)).toLocaleString('uk-UA');

    // useEffect(() => {
    //     dispatch(getPokemonsAsync());//send pokes to redux
    // }, []);// [empty] - gets pokemons data once and sets render
    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);//set Pokemons on change of pokemonsRedux

    return (
        <div className={s.page}>
            <h1>Your Account:</h1>
            <div className={s.stats}>
                <p> Name: {userData.email} </p> 
                <p>Created: {toLocalTime(userData.createdAt)}</p>
                <p>Last visit: {toLocalTime(userData.lastLoginAt)}</p> 
            </div>
            <p className={s.promt}>Your cards:</p>
            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, { name, img, id, type, values }]) =>
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

export default UserPage;