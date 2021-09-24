// import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './style.module.css';
import Btn from '../../../../components/btn'
import PokemonCard from '../../../../components/pokemonCard';

const FinishPage = () => {
    const { pokemons, player2Cards, clearContext } = useContext(PokemonContext);

    console.log(player2Cards)
    const history = useHistory();
    const onClickEndGame = () => {
        clearContext();
        history.replace('/game');
    }
    return (
        
        <div className={s.page}>
            <h1>FinishPAGE</h1>
            <div className={s.flex}>
                {
                    Object.values(pokemons).map(item => {
                        return <PokemonCard
                            className={s.card}
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive={true}
                        />
                    })
                }
            </div>
            <div className={s.btns}>
                <Btn
                    text="Back to Home Page"
                    route=""
                />
                <button onClick={onClickEndGame}>
                    End Game
                </button>
            </div>

            <div className={s.flex}>
                {
                    Object.values(player2Cards).map(item => {
                        return <PokemonCard
                            className={s.card}
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive={true}
                        // onClickPokemon={() => {
                        //     if (Object.keys(pokemonContext.pokemons).length < 5 || selected) {
                        //         onClickPokemon(key)
                        //     }
                        // }}
                        />
                    })
                }
            </div>
        </div>
    );
};

export default FinishPage;