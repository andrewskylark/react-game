// import { useState } from 'react';
import cn from 'classnames';
import PokemonCard from '../../../../../components/pokemonCard';
import s from './style.module.css';

const PlayerBoard = ({ className, player, turn, cards, onClickCard }) => {
    // const [isSelected, setSelected] = useState(null);
    return (
        <>
            {
                cards.map((item) => (
                    <div
                        // className={cn(className, s.cardBoard, {
                        //     [s.selected]: isSelected === item.id
                        // })}
                        key={item.id}
                        className={cn(className, s.cardBoard, {
                            [s.selected]: item.selected === item.id
                        })}
                        onClick={() => {
                            if (turn === player) {
                                // setSelected(item.selected);
                                item.selected = true;
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
                            isSelected={item.selected}
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