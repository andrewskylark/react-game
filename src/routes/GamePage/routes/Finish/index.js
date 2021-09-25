import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import cn from 'classnames';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext';
import s from './style.module.css';
import Btn from '../../../../components/btn'
import PokemonCard from '../../../../components/pokemonCard';
import PlayerBoard from '../Board/PlayerBoard';

const FinishPage = () => {
    const { pokemons, player2Cards, clearContext, win } = useContext(PokemonContext);
    const firebase = useContext(FireBaseContext);
    const history = useHistory();
    let endGameMsg = '';

    const onClickEndGame = () => {
        clearContext();
        if (win === true) {
            firebase.addPokemon(chosenCard)
        }
        history.replace('/game');
    }

    if (Object.keys(pokemons).length === 0 && Object.keys(player2Cards).length === 0) {
        history.replace('/game');
    }//return to gamepage if no cards

    const [chosenCard, setChosenCard] = useState({})
    
    const setCardToGet = (card) => {
        if (win === true) {
            let card2 = card;

            delete card2.player
            setChosenCard(card2)
        }
    }

    if (win === true) {
        endGameMsg = "You won! Choose one card from your oponnent's deck, hit END GAME and make it yours!"
    }
    if (win === false) {
        endGameMsg = "You can take one card from your oponnent's deck, if you win next time!"
    }

    return (
        <div className={s.page}>
            <h1>GAME OVER</h1>
            <p className={s.promt}>Your cards</p>
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
                <p className={s.promt}>{endGameMsg}</p>
                <Btn
                    text="Back to Home Page"
                    route=""
                />
                <button onClick={onClickEndGame}>
                    End Game
                </button>
            </div>

            <div className={s.flex}>
                <p className={s.promt}>Your opponent's cards</p>
                <PlayerBoard
                    className={s.card}
                    player={2}
                    cards={player2Cards}
                    onClickCard={(card) => setCardToGet(card)}
                />
            </div>
        </div>
    );
};

export default FinishPage;