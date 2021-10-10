import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import s from './style.module.css';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/pokemonCard';
import Result from '../../../../components/results';
import ArrowChoice from '../../../../components/arrowChoice';
import PlayerBoard from './PlayerBoard';
import { selectChosenPokemonsData } from '../../../../store/chosenPokemons';
import { getPlayer2CardsAsync } from '../../../../store/player2Cards';
import request from '../../../../service/request';
import { selectPokemonsData } from '../../../../store/pokemons';

const getRandomPlayer = () => {
    return (Math.random() > 0.5) ? 1 : 2;
}
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

const BoardPage = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const { setWin } = useContext(PokemonContext);
    const chosenCards = useSelector(selectChosenPokemonsData);
    const allCards = useSelector(selectPokemonsData);

    const [board, setBoard] = useState([]);
    const [steps, setSteps] = useState(0);
    const [turn, setTurn] = useState()
    const [aiFirstTurn, setAiFirstTurn] = useState(false)
    const [choiceCard, setChoiceCard] = useState(null);
    const [result, setResult] = useState();
    const [show, setShow] = useState(false);
    const [player2, setPlayer2] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(chosenCards).map(item => ({
            ...item,
            possession: 'blue',
        }))//takes all poke values from redux, sets posesion property
    });
    const [serverBoard, setServerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])

    const returnBoard = (board) => {
        return board.map((item, i) => {
            let card = null;
            if (typeof item === 'object') {
                card = {
                    ...item.poke,
                    possession: item.holder === 'p1' ? 'blue' : 'red'
                };
            }

            return {
                position: i + 1,
                card,
            }
        });
    };

    if (Object.keys(chosenCards).length === 0) {
        history.replace('/game');
    }// if no cards go back to Game page

    useEffect(() => {
        const fetchData = async () => {
            const boardRequest = await request.getBoard();

            setBoard(boardRequest.data)

            const player2Request = await request.gameStart({
                pokemons: Object.values(allCards)
            });//send all player 1 cards to receive set of player 2 cards from request

            setPlayer2(player2Request.data.map(item => ({
                ...item,
                possession: 'red',
            })))//sets player 2 cards to board

            dispatch(getPlayer2CardsAsync(player2Request.data.map(item => ({
                ...item,
                possession: 'red',
            }))))//send player 2 to redux
            setTimeout(() => {
                const randomTurn = getRandomPlayer();
                setTurn(randomTurn);
                if (randomTurn === 2) {
                    setAiFirstTurn(true);
                }
            }, 2000);//set random turn on delay
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (aiFirstTurn) {// 1 turn of AI, if first turn
            const Aiturn = async () => {
                const params = {
                    currentPlayer: 'p2',
                    hands: {
                        p1: player1,
                        p2: player2
                    },
                    move: null,
                    board: serverBoard,
                };
                if (player2.length === 5) {
                    const game = await request.game(params);
                    const idAi = game.move.poke.id;

                    setTimeout(() => {
                        setPlayer2(prevState => prevState.map(item => {
                            if (item.id === idAi) {
                                return {
                                    ...item,
                                    selected: true,
                                }
                            }
                            return item;

                        }));
                    }, 1000);
                    setTimeout(() => {
                        setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
                        setServerBoard(game.board);
                        setBoard(returnBoard(game.board))
                        setSteps(prevState => {
                            const count = prevState + 1;
                            return count;
                        })//set AI steps
                        setTurn((prevState) => prevState - 1);
                    }, 1500);
                }
            }
            Aiturn();
        }
        // eslint-disable-next-line
    }, [aiFirstTurn])

    const onClickBoardCell = async (position) => {
        const isDublicate = board.some(({ card }) => {
            console.log(card)
            console.log(board)
            console.log(choiceCard)
            return (
                card?.id === choiceCard?.id 
                // &&
                // card?.id === choiceCard?.id
            );
        });
        if (isDublicate) return;

        if (choiceCard) {// click on board after choosing card

            if (choiceCard.player === 1) {
                setPlayer1(prevState => (prevState.filter(item => item.id !== choiceCard.id)))
                setTurn((prevState) => prevState + 1);
            }//filter array, return array without choice.id card
            // if (choiceCard.player === 2) {
            //     setPlayer2(prevState => (prevState.filter(item => item.id !== choiceCard.id)))
            //     setTurn((prevState) => prevState - 1);
            // }
            // player 2 move, disabled 

            setBoard(prevState => prevState.map(item => {
                if (item.position === position) {
                    return {
                        ...item,
                        card: choiceCard,
                    }
                }
                return item;
            }))

            const params = {
                currentPlayer: 'p1',
                hands: {
                    p1: player1,
                    p2: player2,
                },
                move: {
                    poke: {
                        ...choiceCard,
                    },
                    position,
                },
                board: serverBoard,
            };
            const game = await request.game(params);

            setBoard(returnBoard(game.oldBoard));
            setSteps(prevState => {
                const count = prevState + 1;
                return count;
            })//set player steps

            if (game.move !== null) {
                const idAi = game.move.poke.id;

                setTimeout(() => {//ai moves
                    setPlayer2(prevState => prevState.map(item => {
                        if (item.id === idAi) {
                            return {
                                ...item,
                                selected: true,
                            }
                        }
                        return item;

                    }));
                }, 1000);
                setTimeout(() => {
                    setPlayer2(() => game.hands.p2.pokes.map(item => item.poke));
                    setServerBoard(game.board);
                    setBoard(returnBoard(game.board))
                    setSteps(prevState => {
                        const count = prevState + 1;
                        return count;
                    })//set AI steps
                    setTurn((prevState) => prevState - 1);
                }, 1500);
            }
        }
    }

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
        }// eslint-disable-next-line
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
                            onClick={() => !item.card && onClickBoardCell(item.position)}
                        // click on cell if no card
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