import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import cn from 'classnames';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './style.module.css';
import Btn from '../../../../components/btn'
import PokemonCard from '../../../../components/pokemonCard';
import PlayerBoard from '../Board/PlayerBoard';

const FinishPage = () => {
    const { pokemons, player2Cards, clearContext, win} = useContext(PokemonContext);
    const firebase = useContext(FireBaseContext);
    const history = useHistory();
    const onClickEndGame = (card) => {
        clearContext();
        // const newKey = database.ref().child('pokemons').push().key;
        // database.ref('pokemons/' + newKey).set(card);
        firebase.addPokemon(...card)

        // history.replace('/game');
    }

    // if (Object.keys(pokemons).length === 0 && Object.keys(player2Cards).length === 0) {
    //     history.replace('/game');
    // }//return to gamepage if no cards

    const setCardToGet = (card) => {
        console.log(win)
        console.log(card)
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
                <PlayerBoard 
                    className={s.card}
                    player={2}
                    cards={player2Cards}
                    onClickCard={(card) => setCardToGet(card)}
                />
                {/* {
                    Object.values(player2Cards).map(item => {
                        return <PokemonCard
                            className={cn(s.card, {
                                [s.selected]: isSelected === item.id
                            })}
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive={true}
                            // onClick={() => {
                            //     setSelected(item.id);
                            //     console.log(item.id)
                            //     // onClickCard && onClickCard({
                            //     //     player,
                            //     //     ...item,
                            //     // });
                            // }}
                        />
                    })
                } */}
            </div>
        </div>
    );
};

export default FinishPage;