import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/pokemonCard';
import { PokemonContext } from '../../../../context/pokemonContext';
import PlayerBoard from './PlayerBoard';
import s from './style.module.css';
import Result from '../../../../components/results';
import ArrowChoice from '../../../../components/arrowChoice';

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(el => {
        if (el.card.possession === 'red') {
            player2Count++;
        }
        if (el.card.possession === 'blue') {
            player1Count++;
        }
    });

    return [player1Count, player2Count]
}

const getRandomPlayer = () => {
    return (Math.random() > 0.5) ? 1 : 2;
}

const BoardPage = () => {
    const { pokemons, onPlayer2GetPokes, setWin } = useContext(PokemonContext);
    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue',
        }))//takes all poke values from context, sets posesion property
    });
    const [player2, setPlayer2] = useState([]);
    const [choiceCard, setChoiceCard] = useState(null);
    const [steps, setSteps] = useState(0);
    const history = useHistory();

    if (Object.keys(pokemons).length === 0) {
        history.replace('/game');
    }// if no cards go back to Game page

    useEffect(() => {
        const fetchData = async () => {
            const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board');
            const boardRequest = await boardResponse.json();

            setBoard(boardRequest.data)

            const player2Response = await fetch('https://reactmarathon-api.netlify.app/api/create-player');
            const player2Request = await player2Response.json();

            setPlayer2(player2Request.data.map(item => ({
                ...item,
                possession: 'red',
            })))

            onPlayer2GetPokes(player2Request.data.map(item => ({
                ...item,
                possession: 'red',
            })))   
        }
        fetchData();
    }, [])
    const [turn, setTurn] = useState()
   
    useEffect(() => {
        const SetTurnOnDelay = async () => {
            const sleep = (ms) => {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            await sleep(2500)
            const playerX = getRandomPlayer();
            setTurn(playerX)
        }
        SetTurnOnDelay()
    }, [])// gets random 1 or 2 after delay, sets who goes first

    const onClickBoardCell = async (position) => {
        const isDublicate = board.some(({ card }) => {
            return (
                card?.id === choiceCard?.id &&
                card?.id === choiceCard?.id
            );
        });
        if (isDublicate) return;
        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board,
            };
            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();

            if (choiceCard.player === 1) {
                setPlayer1(prevState => (prevState.filter(item => item.id !== choiceCard.id)))
                setTurn((prevState) => prevState + 1);
            }
            if (choiceCard.player === 2) {
                setPlayer2(prevState => (prevState.filter(item => item.id !== choiceCard.id)))
                setTurn((prevState) => prevState - 1);
            }//filter array, return array without choice.id card

            setBoard(request.data);
            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            })
        }
    }

    const [result, setResult] = useState();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2);

            if (count1 > count2) {
                setResult('win')
                setWin(prev => prev = true)
            } else if (count1 < count2) {
                setResult('lose')
                setWin(prev => prev = false)
            } else {
                setResult('draw')
                setWin(prev => prev = false)
            }
            setShow(true)
        }
    }, [steps]);

    return (
        <div className={s.root}>
            <ArrowChoice
                side={turn}
            />
            <Result
                type={result}
                show={show}
            />
            <div className={s.playerOne}>
                <PlayerBoard
                    turn={turn}
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => !item.card && onClickBoardCell(item.position)}// click on cell if no card
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimize />
                            }
                        </div>
                    ))
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard
                    turn={turn}
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>

        </div>
    );
};

export default BoardPage;