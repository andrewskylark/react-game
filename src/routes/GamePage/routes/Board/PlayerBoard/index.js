import cn from 'classnames';
import PokemonCard from '../../../../../components/pokemonCard';
import s from './style.module.css';
import { useState } from 'react';

const PlayerBoard = ({ className, player, turn, cards, onClickCard }) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <>
            {
                cards.map((item) => (
                    <div key={item.id}
                        className={cn(className, s.cardBoard, {
                            [s.selected]: isSelected === item.id
                            // })}
                        })}
                        
                        // className={cn(className, s.cardBoard, {
                        //     [s.selected]: item.selected === item.id
                        // })}
                        onClick={() => {
                            if (turn === player) {
                                setSelected(item.id);
                                // item.selected = true;
                                onClickCard && onClickCard({
                                    player,
                                    ...item,
                                });
                            }

                        }}
                    >
                        <PokemonCard
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            // isSelected={item.selected}
                            isActive
                            minimize
                        />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;