import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonContext } from '../../../../context/pokemonContext';

import s from './style.module.css';
import Btn from '../../../../components/btn'
import PokemonCard from '../../../../components/pokemonCard';
import PlayerBoard from '../Board/PlayerBoard';
import { selectChosenPokemonsData } from '../../../../store/chosenPokemons';
import { selectPlayer2CardsData } from '../../../../store/player2Cards';
import FirebaseClass from '../../../../service/firebase';
import { getPokemonsAsync } from '../../../../store/pokemons';

const FinishPage = () => {
    const { win } = useContext(PokemonContext);
    const history = useHistory();
    const dispatch = useDispatch();
    const player1Cards = useSelector(selectChosenPokemonsData);
    const player2Cards = useSelector(selectPlayer2CardsData)
    const [chosenCard, setChosenCard] = useState({})
    
    let endGameMsg = '';
    let turn = ''
    if (win === true) {
        turn = 2;//player 2 card cab be selected if player = turn = 2
        endGameMsg = "You won! Choose one card from your oponnent's deck, hit END GAME and claim it!"
    }
    if (win === false) {
        turn = 1;
        endGameMsg = "Win and get one of your opponent's cards next time!!"
    }
    if (Object.keys(player1Cards).length === 0 && Object.keys(player2Cards).length === 0) {
        history.replace('/game');
    }//return to gamepage if no cards
    
    const onClickEndGame = () => {
        if (win === true) {
            if (Object.keys(chosenCard).length > 0) {
                FirebaseClass.addPokemonAuth(chosenCard);
                dispatch(getPokemonsAsync());
                history.replace('/game');
            } else if (Object.keys(chosenCard).length === 0) {
                alert('CHOOSE CARD!')
            }
        }
        if (win === false) {
            history.replace('/game');   
        }
    }
    const setCardToGet = (card) => {
        if (win === true) {
            let card2 = card;

            delete card2.player
            setChosenCard(card2)
        }
    }

    return (
        <div className={s.page}>
            <h1>GAME OVER</h1>
            <p className={s.promt}>Your cards</p>
            <div className={s.flex}>
                {
                    Object.values(player1Cards).map(item => {
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
                    turn={turn}
                    cards={player2Cards}
                    onClickCard={(card) => setCardToGet(card)}
                />
            </div>
        </div>
    );
};

export default FinishPage;